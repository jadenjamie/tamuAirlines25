// import express from "express"
// import { getResponseFromLLM } from "./src/llm"

// const app = express()
// app.use(express.json())
// const port = process.env.PORT

// app.post('/', async (req: Request, res: Response, next) => {
//   if(!req.body) return next({ 
//     status: 400,
//     message: "input is required"
//   })
  
//   const response = await getResponseFromLLM(req.body.input)

//   res.json(response)
// })

// await app.listen(port, () => console.log(`Server is running`))

import express, { Request, Response } from "express";
import axios from "axios";
import { extract } from "fuzzball"; // Use named import for fuzzball
import { getResponseFromLLM } from "./src/llm";

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

// Flight search endpoint
const BASE_URL = 'https://flight-engine-kv1n.onrender.com';
const endpoint = '/flights';

const airportData: { [key: string]: string } = {
    'Dallas-Fort Worth': 'DFW',
    'New York City': 'JFK',
    'Los Angeles': 'LAX',
    'Chicago': 'ORD',
    'Greensboro': 'GSO',
    'Atlanta': 'ATL',
    'Denver': 'DEN',
    'Charlotte': 'CLT',
    'Las Vegas': 'LAS',
    'Phoenix': 'PHX',
    'Orlando': 'MCO',
    'Seattle': 'SEA',
    'Miami': 'MIA',
    'Houston': 'IAH',
    'Fort Lauderdale': 'FLL',
    'Baltimore': 'BWI',
    'San Francisco': 'SFO',
    'Newark': 'EWR',
    'Minneapolis': 'MSP',
    'Detroit': 'DTW',
    'Boston': 'BOS',
    'Tampa': 'TPA',
    'Salt Lake City': 'SLC',
    'San Diego': 'SAN',
    'Philadelphia': 'PHL'
};

function defineParams(origin: string, dest: string, date: string) {
    let bestMatchOrigin = origin;
    let bestMatchDest = dest;

    if (origin.length > 3) {
        const matches = extract(origin, Object.keys(airportData), { limit: 1 });
        if (matches.length > 0) {
            bestMatchOrigin = airportData[matches[0][0]];
        }
    }

    if (dest.length > 3) {
        const matches = extract(dest, Object.keys(airportData), { limit: 1 });
        if (matches.length > 0) {
            bestMatchDest = airportData[matches[0][0]];
        }
    }

    return {
        origin: bestMatchOrigin,
        destination: bestMatchDest,
        date: date
    };
}

// Existing LLM endpoint
app.post('/', async (req: Request, res: Response, next) => {
    if (!req.body) return next({
        status: 400,
        message: "input is required"
    });

    const response = await getResponseFromLLM(req.body.input);
    res.json(response);
});

// New flight search endpoint
app.post('/search-flights', async (req: Request, res: Response) => {
    const { origin, destination, date } = req.body;

    if (!origin || !destination || !date) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const params = defineParams(origin, destination, date);

    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, { params });

        if (response.status === 200) {
            return res.json(response.data);
        } else {
            return res.status(response.status).json({ error: 'Failed to fetch data from the API' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));