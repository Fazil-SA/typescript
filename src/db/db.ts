// Import the Mongoose library
import Mongoose from "mongoose";

// Set an option to allow for more flexible queries
Mongoose.set('strictQuery', false);

// Import the configuration file for the development environment
import config from "../config/dev";

// Connect to the MongoDB database using the URL and properties defined in the configuration file
Mongoose.connect(config.database.url, config.database.properties);

// Get a reference to the database connection object
const db = Mongoose.connection;

// Log an error message to the console if there's an error connecting to the database
db.on('error', console.error.bind(console, 'Connection error.'));

// Log a success message to the console if the connection to the database is successful
db.once('open', () => {
  console.log('Connection with database succeeded.');
});

// Export the database connection object for use in other modules
exports.db = db;
