import express from 'express';
import router from './routes/route.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route to verify server functionality
app.get('/', (req, res) => {
  res.send('Server is working');
});

// Use the router for '/login' route
app.use('/login', router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
