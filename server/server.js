const PORT = process.env.PORT || 8080;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(`${process.env.MONGO_URI}/eventplanner`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log(err)
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});