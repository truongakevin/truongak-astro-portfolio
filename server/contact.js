const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 33322;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST route for sending emails
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // res.status(200).send('Message sent successfully');
    console.log(`Received contact request: Name - ${name}, Email - ${email}, Message - ${message}`);

    // Create a transporter using your email service
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'truongakevin@gmail.com',
            pass: 'kjdj hlzb opps wgna',
        },
    });

    // Define email options
    const mailOptions = {
        replyTo: email,
        from: email,
        to: 'truongakevin@gmail.com',
        subject: `Message from ${name} at ${email}`,
        text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending message: ${error.message}`);
            console.error('Full error details:', error);
            return res.status(500).send('Error sending message');
        }
        console.log(`Message sent successfully: ${info.response}`);
        res.status(200).send('Message sent successfully');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});