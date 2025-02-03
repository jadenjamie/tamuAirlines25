use axum::{http::{HeaderMap, HeaderValue}, Json, Router};
use reqwest::{Client, Method};
use serde::{Deserialize, Serialize};
use tokio::net::TcpListener;

use axum::routing::post;

use dotenv::dotenv;
use tower_http::cors::CorsLayer;

#[derive(Serialize)]
struct OpenAiRequest {
    model: String,
    max_tokens: u32,
    messages: Vec<Messages>,
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
    city_json: CResponse
}

#[derive(Deserialize, Serialize, Debug)]
struct ClaudeResponse {
    content: Vec<Content>
}

#[derive(Deserialize, Serialize, Debug)]
struct Content {
    text: String,
    #[serde(rename = "type")]
    rtype: String,
}

#[derive(Deserialize, Serialize, Debug)]
struct Usage {
    input_tokens: i32,
    output_tokens: i32,
}

#[derive(Deserialize, Serialize)]
struct ResponseError {
    #[serde(rename = "type")]
    rtype: String,
    message: String
}

#[derive(Deserialize, Serialize)]
struct CResponse {
    cities: Vec<Cities>
}

#[derive(Deserialize, Serialize)]
struct Cities {
    name: String,
    iata: String,
    description: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    dotenv().ok();

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_origin("https://voip.jarenmchugh.com".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::POST, Method::GET, Method::OPTIONS])
        .allow_headers(tower_http::cors::Any);

    let tcplistener = TcpListener::bind("localhost:8080").await?;
    let app = Router::new()
        .route("/search", post(search_method))
        .layer(cors);

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

    let user_msg2 = Messages {
        role: "user".to_string(),
        content: "You are a helpful travel assistant, response with the json format. Give the city, iata, and description of things to do based on input. VALID JSON REPONSE FOLLOWING THE CORRECT FORMAT".to_string()
    };

    let assistant_content = r#"{"cities": ["name": "city name","iata": "closest airport IATA","description": "city description"]}"#;

    let assis_msg = Messages {
        role: "assistant".to_string(),
        content: assistant_content.to_string(),
    };

    let ai_req = OpenAiRequest {
        model: "claude-3-5-sonnet-20241022".to_string(),
        max_tokens: 500,
        messages: vec![user_msg, user_msg2, assis_msg],
    };

    let client = Client::new();
    let response = client.post("https://api.anthropic.com/v1/messages")
        .headers(headers)
        .json(&ai_req)
        .send()
        .await.unwrap()
        .json::<ClaudeResponse>()
        .await
        .unwrap();
    
    let response_text = response.content.first().unwrap();
    let city_json: CResponse = serde_json::from_str(&response_text.text).unwrap();
    city_json.cities.iter().for_each(|x| println!("{}, {}, {}", x.name, x.iata, x.description));

    Json(SearchResponse{city_json})
}
