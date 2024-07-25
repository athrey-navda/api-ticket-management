const Ticket = require("../models/ticket");
const User = require("../models/user");
const { sendNotification } = require("../utils/notifications");

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user._id,
    });
    const createdTicket = await ticket.save();

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: createdTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (user) {
        ticket.assignedTo = user._id;
        sendNotification(
          user.email,
          "Ticket Assigned",
          `You have been assigned ticket ${ticket.title}`
        );
      }
    }
    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    await ticket.remove();
    res.json({ message: "Ticket removed" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
};

const getTickets = async (req, res) => {
  const tickets = await Ticket.find({});
  res.json(tickets);
};

module.exports = { createTicket, updateTicket, deleteTicket, getTickets };
