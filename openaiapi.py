import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

destinations = {
    'Dallas-Fort Worth': 'DFW', 'New York City': 'JFK', 'Los Angeles': 'LAX', 'Chicago': 'ORD', 'Greensboro': 'GSO',
    'Atlanta': 'ATL', 'Denver': 'DEN', 'Charlotte': 'CLT', 'Phoenix': 'PHX', 'Orlando': 'MCO',
    'Seattle': 'SEA', 'Miami': 'MIA', 'Houston': 'IAH', 'Fort Lauderdale': 'FLL', 'Baltimore': 'BWI',
    'San Francisco': 'SFO', 'Newark': 'EWR', 'Minneapolis': 'MSP', 'Detroit': 'DTW',
    'Tampa': 'TPA', 'Salt Lake City': 'SLC', 'San Diego': 'SAN', 'Philadelphia': 'PHL'
}

def get_dream_destination():
    """Prompt the user to describe their dream destination."""
    return input("Describe your dream destination (e.g., beaches, historical sites, nightlife, etc.): ")

def get_recommended_destinations(description):
    """Use OpenAI's API to get recommended destinations limited to specific U.S. cities."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OpenAI API key is not set. Please create a .env file and add OPENAI_API_KEY.")

    client = openai.Client(api_key=api_key)

    prompt = f"Based on the following description, suggest the best U.S. cities from this list: {', '.join(destinations.keys())}.\n\n'{description}'\n\nGive at least three options with brief explanations."

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a travel expert who suggests ideal U.S. cities based on user preferences."},
            {"role": "user", "content": prompt},
            {"role": "system" , "content": "Respond in .json format. Respond with name and explanation seperated every time."}
        ]
    )

    return response.choices[0].message.content.strip()

def main():
    """Main function to interact with the user and display recommended U.S. destinations."""
    description = get_dream_destination()
    try:
        recommendations = get_recommended_destinations(description)
        print("\nRecommended destinations:\n")
        print(recommendations)
    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
