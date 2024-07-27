/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: [customer, support, admin]
 *                 example: "customer"
 *     responses:
 *       201:
 *         description: The user was created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "success"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8b4567"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "customer"
 *                     token:
 *                       type: string
 *                       example: "jwt-token"
 *       400:
 *         description: Invalid user data or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "failed"
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User already exists"
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "success"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8b4567"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "customer"
 *                     token:
 *                       type: string
 *                       example: "jwt-token"
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "failed"
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid email or password"
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update user token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "60c72b2f5f1b2c001c8b4567"
 *               generatedToken:
 *                 type: string
 *                 example: "new-jwt-token"
 *     responses:
 *       200:
 *         description: User token updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "success"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f5f1b2c001c8b4567"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     role:
 *                       type: string
 *                       example: "customer"
 *                     token:
 *                       type: string
 *                       example: "new-jwt-token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "failed"
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "User not found"
 */

/**
 * @swagger
 * /api/users/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "success"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f5f1b2c001c8b4567"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       role:
 *                         type: string
 *                         example: "customer"
 *       403:
 *         description: Access denied for users without the 'staff' role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "failed"
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Access denied"
 */

/**
 * @swagger
 * /api/users/staff:
 *   get:
 *     summary: Get staff users with roles 'staff'
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users with roles 'staff'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "success"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f5f1b2c001c8b4567"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       role:
 *                         type: string
 *                         example: "staff"
 *       403:
 *         description: Access denied for users without the 'admin' role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "failed"
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Access denied"
 */

const express = require("express");
const {
  registerUser,
  authUser,
  updateTokenUser,
  getCustomers,
  getStaffUsers,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.put("/update", updateTokenUser);
router.get(
  "/customers",
  protect,
  roleMiddleware(["support", "admin"]),
  getCustomers
);
router.get("/staff", protect, roleMiddleware(["admin"]), getStaffUsers);

module.exports = router;
