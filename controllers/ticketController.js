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

    const creator = await User.findById(req.user._id);
    if (creator) {
      await sendNotification(
        creator.email,
        "Ticket Created",
        `Your ticket with title "${createdTicket.title}" has been created successfully.`
      );
    }

    const supportStaff = await User.find({ role: "support" });
    const admins = await User.find({ role: "admin" });
    const allRecipients = [...supportStaff, ...admins];
    allRecipients.forEach(async (user) => {
      await sendNotification(
        user.email,
        "New Ticket Created",
        `A new ticket with title "${createdTicket.title}" has been created. Details: ${createdTicket}`
      );
    });

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
        await sendNotification(
          user.email,
          "Ticket Assigned",
          `You have been assigned ticket "${ticket.title}".`
        );
      }
    }
    const updatedTicket = await ticket.save();

    const creator = await User.findById(ticket.createdBy);
    if (creator) {
      await sendNotification(
        creator.email,
        "Ticket Updated",
        `Your ticket with title "${updatedTicket.title}" has been updated. Detail:${ticket}`
      );
    }

    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
};

const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    const creator = await User.findById(ticket.createdBy);
    if (creator) {
      await sendNotification(
        creator.email,
        "Ticket Deleted",
        `Your ticket with title "${ticket.title}" has been deleted.`
      );
    }

    await ticket.remove();
    res.json({ message: "Ticket removed" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets,
  getTicketById,
};
