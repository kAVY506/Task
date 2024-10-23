const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://kavyareddyamanaganti:kavyareddyamanaganti@cluster0.fgrgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/tasks', taskRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port `);
});
