const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const dotenv = require('dotenv');
const cityRoutes = require ('./routes/cityRoutes.js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cities', cityRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
