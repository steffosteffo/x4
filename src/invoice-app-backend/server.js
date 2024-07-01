
const dotenv = require('dotenv');
dotenv.config();


// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
//const PORT = process.env.PORT || 3000;

//EMAIL START ////////////
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// EMAIL END //////////


const corsOpt = {
  origin: [
    'http://steffohost.hopto.org:5000',
    'http://85.227.215.53:5000', 
    'http://steffohost.hopto.org:3000/api/anames',
    'http://steffohost.hopto.org:5000/api/customers',
    'http://steffohost.hopto.org:3000/api/customers',
    'http://steffohost.hopto.org:3000', 
    'http://85.227.215.53:3000',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://85.227.215.53:5000/api/customers',
    'http://85.227.215.53:5000/api/users',
    
   // process.env.CUSTOMER_API_1,
  //  process.env.CUSTOMER_API_2,
  ],



                                                                                                                                                                    
 
  credential: true
};
// Middleware
app.use(cors(corsOpt));

/*
const MONGO_URI='mongodb+srv://root:root@books-store-mern.ipulw5t.mongodb.net/steffo?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));
*/

//---
mongoose.connect('mongodb+srv://root:root@books-store-mern.ipulw5t.mongodb.net/steffo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  
});

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


//---

// Your API endpoints github  -vi måste lägga upp koden på Git hub för att se den på nätet!!!
app.get('x4', (req, res) => {

  // Handle request and rgitstsutsespond with data
  res.json({ message: 'Data from MongoDB!!!!!!!!!!!!!!!!!!' });
});

// Define Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/anames', require('./routes/anames'));
//app.use('/api/userss', require('./routes/users'));

// Define your route to fetch all customers
/*
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
star 3 */

// Start Server
//app.listen(PORT, () => {
  //app.listen(3000,'0.0.0.0', () => {   //om jag sätter dit denn 0000 så kommer wéxren daror att kunna ta emot data med curl http://1.1.1:300/api/customrs !!!!!
               
  const port = 5000;
  app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});




//EMAIL START ////////////
//EMAIL START ////////////
//EMAIL START ////////////
// Create transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  
  service: 'gmail',
  auth: {
   // user:  process.env.EMAIL_USER, // "steffo2024@gmail.com"
  //  pass:  process.env.EMAIL_PASS //"Sommar2018!Sommar2018!"
           
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

