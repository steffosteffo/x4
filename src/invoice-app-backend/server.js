
const dotenv = require('dotenv');
dotenv.config();

// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//EMAIL START ////////////
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// EMAIL END //////////


// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
// Connect to MongoDB
//const MONGO_URI = 'YOUR_MONGO_CONNECTION_URI';
const MONGO_URI='mongodb+srv://root:root@books-store-mern.ipulw5t.mongodb.net/steffo?retryWrites=true&w=majority'
// process.env.MONGO_URI
//mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });//
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/anames', require('./routes/anames'));



// Define a schema and model
const DataSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Data = mongoose.model('Data', DataSchema);

app.post('/api/data', async (req, res) => {
  try {
      const newData = new Data(req.body);
      const savedData = await newData.save();
      res.status(200).json(savedData);
  } catch (err) {
      res.status(500).send(err);
  }
});




// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







//EMAIL START ////////////
//EMAIL START ////////////
//EMAIL START ////////////
// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  
  service: 'gmail',
  auth: {
    user:  process.env.EMAIL_USER, // "steffo2024@gmail.com"
    pass:  process.env.EMAIL_PASS //"Sommar2018!Sommar2018!"
           
  }  
});

app.post('/send-email', (req, res) => {
  const { recipient, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // "steffo2024@gmail.com",
    to: recipient,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log('--- process.env.EMAIL_USER:'+ process.env.EMAIL_USER);
  console.log('--- process.env.EMAIL_PASS:'+ process.env.EMAIL_PASS);

    if (error) {
      console.error('Failed to send email:', error.message, error.stack);
      res.status(500).send({ error: 'Failed to send email', message: error.message });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});
// EMAIL END //////////
// EMAIL END //////////
// EMAIL END //////////

