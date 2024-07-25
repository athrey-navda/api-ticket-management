const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Support System API",
      version: "1.0.0",
      description: "API documentation for the Customer Support System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "605c72ef6d4f3b001f6e7a29",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "johndoe@example.com",
            },
            role: {
              type: "string",
              enum: ["customer", "support", "admin"],
              example: "customer",
            },
            token: {
              type: "string",
              example: "605c72ef6d4f3b001f6e7a29605c72ef6d4f3b001f6e7a29",
            },
          },
        },
        Ticket: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "605c72ef6d4f3b001f6e7a30",
            },
            title: {
              type: "string",
              example: "Issue with login",
            },
            description: {
              type: "string",
              example: "User unable to login with valid credentials",
            },
            status: {
              type: "string",
              enum: ["open", "in progress", "closed"],
              example: "open",
            },
            assignedTo: {
              type: "string",
              example: "605c72ef6d4f3b001f6e7a29",
            },
            createdBy: {
              type: "string",
              example: "605c72ef6d4f3b001f6e7a29",
            },
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
