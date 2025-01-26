
use std::mem::replace;

use axum::{http::{HeaderMap, HeaderValue}, response, Json, Router};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use tokio::net::TcpListener;

use axum::routing::post;

use dotenv::dotenv;

#[derive(Serialize)]
struct OpenAiRequest {
    model: String,
    max_tokens: u32,
    messages: Vec<Messages>,
}

#[derive(Serialize)]
struct RequestFormat {
    #[serde(rename = "type")]
    rtype: String,
}

#[derive(Serialize)]
struct Messages {
    role: String,
    content: String,
}

#[derive(Deserialize)]
struct SearchRequest {
    body: String,
}

#[derive(Serialize)]
struct SearchResponse {
    results: Vec<String>
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    dotenv().ok();

    let tcplistener = TcpListener::bind("localhost:8080").await?;
    let app = Router::new()
        .route("/search", post(search_method));
    axum::serve(tcplistener, app).await?;
    Ok(())
}

async fn search_method(Json(req): Json<SearchRequest>) -> Json<SearchResponse> {

    let api_key = std::env::var("ANTHROPIC_KEY").unwrap();
    let mut headers = HeaderMap::new();
    headers.insert("x-api-key", HeaderValue::from_str(&api_key.to_string()).unwrap());
    headers.insert("anthropic-version", HeaderValue::from_str("2023-06-01").unwrap());

    let user_msg = Messages {
        role: "user".to_string(),
        content: req.body.clone()
    };

    let assis_msg = Messages {
        role: "assistant".to_string(),
        content: "You are the best travel planner. You will reccomend a city to travel based on the persons desires. You will give the City name, airport IATA, and a small description of the city based on their desires. You are structured and answer in the proper structure. after each city, iata, description, do a new line. GIVE JUST THE CITIES. NOTHING ELSE IN RESPONSE!!".to_string(),
    };

    let ai_req = OpenAiRequest {
        model: "claude-3-5-sonnet-20241022".to_string(),
        max_tokens: 256,
        messages: vec![user_msg, assis_msg],
    };

    let client = Client::new();
    let response = client.post("https://api.anthropic.com/v1/messages")
        .headers(headers)
        .json(&ai_req)
        .send()
        .await.unwrap()
        .text().await.unwrap();

    for line in response.lines() {
        line.replace(&"/".to_string(), "");
    }


    Json(SearchResponse{results: vec![]})
}
