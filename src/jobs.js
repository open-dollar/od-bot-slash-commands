const fetch = require("cross-fetch");
const dotenv = require("dotenv");
dotenv.config();

const RATE_SECRET = process.env.RATE_SECRET
const OD_API_URL = process.env.OD_API_URL || "https://localhost:3000/api";

const apiEndpoints = [
    `${OD_API_URL}/oracle?network=ARBITRUM`,
    `${OD_API_URL}/rate?secret=${process.env.RATE_SECRET}&network=ARBITRUM`,
    `${OD_API_URL}/analytics?secret=${process.env.RATE_SECRET}&network=ARBITRUM`,
    // `${OD_API_URL}/auction?secret=${process.env.RATE_SECRET}`,
    // `${OD_API_URL}/accounting?secret=${process.env.RATE_SECRET}&id=1`,
];

const callApiEndpoints = async () => {
    for (const endpoint of apiEndpoints) {
        await new Promise(resolve => setTimeout(resolve, 60000));
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(`API endpoint ${endpoint} called successfully.`);
        } catch (error) {
            console.error(`Failed to call API endpoint ${endpoint}. Error:`, error);
        }
    }
};

const runJobs = async () => {
    await callApiEndpoints()
}

module.exports = runJobs
