// backend/controllers/contactController.js
import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields required" });

    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message received" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
