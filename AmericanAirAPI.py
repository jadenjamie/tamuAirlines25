import requests

# API_KEY = 'your_api_key' //Do not need this?
BASE_URL = 'https://flight-engine-kv1n.onrender.com'

# Sample endpoint: Get flight search results
endpoint = '/flights?'

param = {}

# Example query parameters (replace with actual parameters based on the API documentation)
def defineParams(origin, dest, date):
    global params
    params = {
        'origin': origin,
        'destination': dest, 
        'date': date, 
    } 
    

defineParams('DFW', 'LAX', '2005-06-02') #('XYX', 'XYX', YYYY-MM-DD)

# Make the GET request to the API
response = requests.get(f"{BASE_URL}{endpoint}", params=params)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()  # Get the data in JSON format
    print("Flight Search Results:")
    print(data)
else:
    print(f"Failed to fetch data. Status Code: {response.status_code}")
    print(response.text)
