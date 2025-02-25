import { Client, Databases } from 'appwrite';

// Initialize Appwrite Client
const client = new Client();

// Your Appwrite endpoint and project ID
const PROJECT_ID = '67bdd538001bfc08a8ea';  // Your Project ID
const DATABASE_ID = '67bdd625e8a9dc858128';  // Your Database ID (filmda_wait)
const COLLECTION_ID = '67bdd62d0021758dfce6';  // Your Collection ID (wait)
const API_KEY = 'standard_63e0d9b6931a3c556860625363956da6ec747c2a14babc7cc2af4ee930d3028ff766ec7d1d3bd75bc90acdc5cd6355d2f98091cee4a9b2e2ba20ffb3822771eb2375685c8f2491813a9d0970fc8507707053738e699d';

// Initialize client
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

// Initialize Appwrite services
const databases = new Databases(client);

// Export everything needed
export {
    client,
    databases,
    DATABASE_ID,
    COLLECTION_ID
};
