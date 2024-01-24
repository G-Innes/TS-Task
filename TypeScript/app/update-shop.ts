import axios from 'axios';
import fs from 'fs';
import { Item, GildedRose } from './gilded-rose';


const url = 'http://yesno.wtf/api';

// Parse command line args to get the number of initial requests (startRequests) and the number of times to update the shop's items (updateCount)
const [updateCount, startRequests] = process.argv.slice(2).map(Number);

// Gilded Rose shop instance with 4 items
const gildedRose = new GildedRose([
    new Item('Chocolate', 20, 40),
    new Item('Conjured Beer', 10, 30),
    new Item('Pizza Slice', 7, 25),
    new Item('Egg', 3, 5)
]);

//API response interface
interface ApiResponse {
    answer: string;
}

// Make a specified number of HTTP requests to the API
export async function makeRequests(numRequests: number): Promise<void> {
    try {
        const req = Array.from({ length: numRequests }, () => axios.get<ApiResponse>(url));
        const res = await Promise.all(req);

        // Count the number of responses received that are 'yes' for each request
        const positiveResponses = res.filter(response => response.data.answer === 'yes').length;

        // Log number of positive responses to to log.txt
        fs.appendFileSync('log.txt', `Number of positive responses: ${positiveResponses}\n`);
        // Also log to console
        console.log(`Number of positive responses: ${positiveResponses}`);

        // If there are any positive repsonses, recursively make that many requests again
        if (positiveResponses > 0) {
            await makeRequests(positiveResponses);
        }
    } catch (error) { // Catch any errors, log to console & txt file
        console.error(`Error making requests: ${error}`);
        fs.appendFileSync('log.txt', `Error making requests: ${error}\n`);
    }
}

// Update the items in the shop
export function updateShopItems(gildedRose: GildedRose, times: number): void {
    try {
        for (let i = 0; i < times; i++) {
        gildedRose.updateQuality();
        }
    } catch (error) {
        console.error(`Error updating shop: ${error}`);
        fs.appendFileSync('log.txt', `Error updating shop: ${error}\n`);
    }
}

// Start the script
makeRequests(startRequests)
   .then(() => {
    // Update the shop after all requests have been made
    updateShopItems(gildedRose, updateCount);
   })
   .catch(error => {
    // Logging for errors that occur during the script
       console.error(`Error: ${error}`);
       fs.appendFileSync('log.txt', `Error running script: ${error}\n`);
   });