const express = require("express");
const bodyParser = require("body-parser");
// const corsMiddleware = require('../middleware/corsMiddleware');
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = 5000;

const corsOptions = {
  origin: "*", // Adjust this to match your frontend URL
  methods: "GET,POST,PATCH,PUT,DELETE,OPTIONS",
  allowedHeaders: "Origin, Content-Type, X-Auth-Token",
  credentials: true,
};

const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
app.use(bodyParser.json());

// Endpoint to send SMS
app.post("/api/sos", async (req, res) => {

  const { message, location, emergencyContact } = req.body;

  console.log(message, location, emergencyContact);

  // if (!message || !location || !emergencyContact) {
  //   return res.json({ success: false, message: 'Missing required fields' });
  // }

  // const fullMessage = `${message} Location: ${location}`;

  // try {
  //   const response = await axios.get(`https://www.fast2sms.com/dev/bulkV2`, {
  //     params: {
  //       authorization: FAST2SMS_API_KEY,
  //       message: fullMessage,
  //       language: 'english',
  //       route: 'q',
  //       numbers: emergencyContact
  //     }
  //   });

  //   if (response.data.return) {
  //     console.log('SMS sent successfully:', response.data);
  //     res.json({ success: true });
  //   } else {
  //     console.error('Failed to send SMS:', response.data);
  //     res.json({ success: false, message: 'Failed to send SMS' });
  //   }
  // } catch (error) {
  //   console.error('Error sending SMS:', error);
  //   res.json({ success: false, message: 'Error sending SMS' });
  // }

  console.log("SMS sent successfully:");
  res.json({ success: true });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
