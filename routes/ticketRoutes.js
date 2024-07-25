/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: The tickets managing API
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Issue with login"
 *               description:
 *                 type: string
 *                 example: "User unable to login with valid credentials"
 *     responses:
 *       201:
 *         description: The ticket was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ticket id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Issue with login"
 *               description:
 *                 type: string
 *                 example: "Updated description of the issue"
 *               status:
 *                 type: string
 *                 enum: [open, in progress, closed]
 *                 example: "in progress"
 *     responses:
 *       200:
 *         description: The ticket was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ticket id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The ticket was deleted
 *       404:
 *         description: The ticket was not found
 *       401:
 *         description: Unauthorized
 */

const express = require("express");
const {
  createTicket,
  updateTicket,
  deleteTicket,
  getTickets,
} = require("../controllers/ticketController");
const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/", protect, roleMiddleware(["customer", "admin"]), createTicket);

router.get(
  "/",
  protect,
  roleMiddleware(["customer", "support", "admin"]),
  getTickets
);

router.put("/:id", protect, roleMiddleware(["support", "admin"]), updateTicket);

router.delete("/:id", protect, roleMiddleware(["admin"]), deleteTicket);

module.exports = router;
