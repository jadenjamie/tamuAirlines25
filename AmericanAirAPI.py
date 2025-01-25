import requests
from fuzzywuzzy import process

# API_KEY = 'your_api_key' //Do not need this?
BASE_URL = 'https://flight-engine-kv1n.onrender.com'

# Sample endpoint: Get flight search results
endpoint = '/flights?'

param = {}

# List of destinations/origins
airport_data = {
'Dallas-Fort Worth' : 'DFW',
'New York City' : 'JFK',
'Los Angeles' : 'LAX',
'Chicago' : 'ORD',
'Greensboro' : 'GSO',
'Atlanta' : 'ATL',
'Denver' : 'DEN',
'Charlotte' : 'CLT',
'Chicago' : 'LAS',
'Phoenix' : 'PHX',
'Orlando' : 'MCO',
'Seattle' : 'SEA',
'Miami' : 'MIA',
'Houston' : 'IAH',
'Fort Lauderdale' : 'FLL',
'Baltimore' : 'BWI',
'San Francisco' : 'SFO',
'Newark' : 'EWR',
'Minneapolis' : 'MSP',
'Detroit' : 'DTW',
'Chicago' : 'BOS',
'Tampa' : 'TPA',
'Salt Lake City' : 'SLC',
'San Diego' : 'SAN',
'Philadelphia' : 'PHL'
}

# Example query parameters (replace with actual parameters based on the API documentation)
def defineParams(origin, dest, date):
    global params
    
    # print(airport_data.keys)

    if(len(origin) > 3):
        best_match_origin = airport_data[process.extractOne(origin, airport_data.keys())[0]]
    else:  
        best_match_origin = origin
    if(len(dest) > 3):
        best_match_dest = airport_data[process.extractOne(dest, airport_data.keys())[0]]
    else:
        best_match_dest = dest

    # print(best_match_origin)
    # print(best_match_dest)

    params = {
        'origin': best_match_origin,
        'destination': best_match_dest, 
        'date': date, 
    } 
    

defineParams('Dullus-Fort Woah', 'LAX', '2005-06-02') #('XYX', 'XYX', YYYY-MM-DD) //This can be commented out once output is gotten

# Make the GET request to the API
response = requests.get(f"{BASE_URL}{endpoint}", params=params)

# # Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()  # Get the data in JSON format
    print("Flight Search Results:")
    print(data)
else:
    print(f"Failed to fetch data. Status Code: {response.status_code}")
    print(response.text)

'''
# Cities = [{"code":"DFW","city":"Dallas-Fort Worth","timezone":"America/Chicago","location":{"latitude":32.8998,"longitude":-97.0403}},{"code":"JFK","city":"New York City","timezone":"America/New_York","location":{"latitude":40.6413,"longitude":-73.7781}},{"code":"LAX","city":"Los Angeles","timezone":"America/Los_Angeles","location":{"latitude":33.9416,"longitude":-118.4085}},{"code":"ORD","city":"Chicago","timezone":"America/Chicago","location":{"latitude":41.9742,"longitude":-87.9073}},{"code":"GSO","city":"Greensboro","timezone":"America/New_York","location":{"latitude":36.0726,"longitude":-79.792}},{"code":"ATL","city":"Atlanta","timezone":"America/New_York","location":{"latitude":33.6404,"longitude":-84.4198}},{"code":"DEN","city":"Denver","timezone":"America/Phoenix","location":{"latitude":39.8493,"longitude":-104.6738}},{"code":"CLT","city":"Charlotte","timezone":"America/New_York","location":{"latitude":35.2138,"longitude":-80.943}},{"code":"LAS","city":"Chicago","timezone":"America/Chicago","location":{"latitude":36.08601,"longitude":-115.1539}},{"code":"PHX","city":"Phoenix","timezone":"America/Phoenix","location":{"latitude":36.1043,"longitude":-79.935}},{"code":"MCO","city":"Orlando","timezone":"America/New_York","location":{"latitude":28.4179,"longitude":-81.3041}},{"code":"SEA","city":"Seattle","timezone":"America/Los_Angeles","location":{"latitude":47.4435,"longitude":-122.3016}},{"code":"MIA","city":"Miami","timezone":"America/Chicago","location":{"latitude":25.7969,"longitude":-80.2762}},{"code":"IAH","city":"Houston","timezone":"America/Chicago","location":{"latitude":29.9902,"longitude":-95.3368}},{"code":"FLL","city":"Fort Lauderdale","timezone":"America/New_York","location":{"latitude":26.0742,"longitude":-80.1506}},{"code":"BWI","city":"Baltimore","timezone":"America/New_York","location":{"latitude":39.1774,"longitude":-76.6684}},{"code":"SFO","city":"San Francisco","timezone":"America/Los_Angeles","location":{"latitude":37.6213,"longitude":-122.379}},{"code":"EWR","city":"Newark","timezone":"America/New_York","location":{"latitude":40.6895,"longitude":-74.1745}},{"code":"MSP","city":"Minneapolis","timezone":"America/Chicago","location":{"latitude":44.8848,"longitude":-93.2223}},{"code":"DTW","city":"Detroit","timezone":"America/New_York","location":{"latitude":36.1043,"longitude":-79.935}},{"code":"BOS","city":"Chicago","timezone":"America/Chicago","location":{"latitude":42.3656,"longitude":-71.0096}},{"code":"TPA","city":"Tampa","timezone":"America/New_York","location":{"latitude":36.1043,"longitude":-79.935}},{"code":"SLC","city":"Salt Lake City","timezone":"America/Chicago","location":{"latitude":40.7899,"longitude":-111.9791}},{"code":"SAN","city":"San Diego","timezone":"America/Los_Angeles","location":{"latitude":32.7338,"longitude":-117.1933}},{"code":"PHL","city":"Philadelphia","timezone":"America/New_York","location":{"latitude":39.8729,"longitude":-75.2437}}]

# print("{")

# for i in Cities:
#     cd = i['code']
#     cy = i['city']
#     print("'" + cy +"' : '" + cd + "',")

# print("}")
'''