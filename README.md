# rayca-backend

An customer ticket monitoring application as assessment for internship hiring

# API Documentation

# 1. Users

# 1.1 Register User

Endpoint: /api/users/register

Method: POST

Description: Registers a new user.

Request Body:

{
"name": "John Doe",
"email": "johndoe@example.com",
"password": "password123",
"role": "customer"
}
Responses:

201 Created

{
"\_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer",
"token": "jwt_token"
}
400 Bad Request

{
"message": "User already exists"
}

# 1.2 Authenticate User

Endpoint: /api/users/login

Method: POST

Description: Authenticates a user and returns a JWT token.

Request Body:

{
"email": "johndoe@example.com",
"password": "password123"
}
Responses:

200 OK

{
"\_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer",
"token": "jwt_token"
}
401 Unauthorized

{
"message": "Invalid email or password"
}

# 2. Tickets

# 2.1 Create Ticket

Endpoint: /api/tickets

Method: POST

Description: Creates a new ticket.

Request Body:

{
"title": "Issue with login",
"description": "User unable to login with valid credentials"
}
Responses:

201 Created

{
"message": "Ticket created successfully",
"ticket": {
"\_id": "ticket_id",
"title": "Issue with login",
"description": "User unable to login with valid credentials",
"status": "open",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}
}
400 Bad Request

{
"message": "Title and description are required"
}

# 2.2 Update Ticket

Endpoint: /api/tickets/{id}

Method: PUT

Description: Updates a ticket by ID.

Parameters:

id (path parameter): The ID of the ticket to update.
Request Body:

{
"title": "Updated Issue with login",
"description": "Updated description of the issue",
"status": "in progress",
"assignedTo": "user_id"
}
Responses:

200 OK

{
"\_id": "ticket_id",
"title": "Updated Issue with login",
"description": "Updated description of the issue",
"status": "in progress",
"assignedTo": "user_id",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}
404 Not Found

{
"message": "Ticket not found"
}

# 2.3 Delete Ticket

Endpoint: /api/tickets/{id}

Method: DELETE

Description: Deletes a ticket by ID.

Parameters:

id (path parameter): The ID of the ticket to delete.
Responses:

200 OK

{
"message": "Ticket removed"
}
404 Not Found

{
"message": "Ticket not found"
}

# 2.4 Get All Tickets

Endpoint: /api/tickets

Method: GET

Description: Retrieves all tickets.

Responses:

200 OK

[
{
"_id": "ticket_id",
"title": "Issue with login",
"description": "User unable to login with valid credentials",
"status": "open",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
},
...
]

# 2.5 Get Ticket By Id

Endpoint: /api/tickets/{id}

Method: GET

Description: Retrieves all tickets.

Responses:

200 OK

[
{
"_id": "ticket_id",
"title": "Issue with login",
"description": "User unable to login with valid credentials",
"status": "open",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}
]
