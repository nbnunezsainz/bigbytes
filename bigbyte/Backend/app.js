const express = require('express');
const cors = require('cors');

const app = express();

// Define your custom middleware first

// Then, define the CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  credentials: true, // Allow credentials (cookies, authentication headers, etc.)
}));

app.get('/', (req, res) => {
  res.send('Hello from Express!'); // Send a simple response
}); //when data sent ehre then it will follow to other middlewear

app.use((req, res, next) => {
  console.log("Inside custom middleware");
  res.status(200); // Set the status before sending any response
  next(); // Call next to pass control to the next middleware/route handler
});



module.exports = app;
