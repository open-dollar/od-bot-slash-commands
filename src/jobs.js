const fetch = require("cross-fetch");
const dotenv = require("dotenv");
dotenv.config();

const OD_API_SECRET = process.env.OD_API_SECRET
const OD_API_URL = process.env.OD_API_URL || "https://localhost:3000/api";

const apiEndpoints = [
    `${OD_API_URL}/oracle?network=ARBITRUM`,
    `${OD_API_URL}/rate?network=ARBITRUM`,
    `${OD_API_URL}/analytics?network=ARBITRUM`,
    // `${OD_API_URL}/auction?etwork=ARBITRUM`,
];

const callApiEndpoints = async () => {
    for (const endpoint of apiEndpoints) {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(`API endpoint ${endpoint.split('?')[0]} called successfully.`);
            console.log(data)
            await new Promise(resolve => setTimeout(resolve, 60000));
        } catch (error) {
            console.error(`Failed to call API endpoint ${endpoint}. Error:`, error);
        }
    }
};

const runJobs = async () => {
    await callApiEndpoints()
}

module.exports = runJobs
