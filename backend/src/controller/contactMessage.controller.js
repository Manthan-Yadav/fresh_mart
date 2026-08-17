const ContactMessage = require("../model/contact_Message");


async function CreateContactMessage(req, res) {
    try {
        const { fullName, email, phone, subject , message } = req.body;

        if (!fullName || !email || !phone || !message || !subject) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const contactMessage = await ContactMessage.create({ fullName, email, phone, message ,subject });
        return res.status(201).json({ message: 'Contact message created successfully', contactMessage });
    }
    catch (error) {
        console.error('Error creating contact message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}




module.exports = {
     CreateContactMessage,
   
}