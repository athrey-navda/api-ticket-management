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
"response": "success",
"status": 201,
"data": {
"\_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer",
"token": "jwt_token"
}
}

400 Bad Request
{
"response": "failed",
"status": 400,
"data": {
"message": "User already exists"
}
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
"response": "success",
"status": 200,
"data": {
"\_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer",
"token": "jwt_token"
}
}

401 Unauthorized
{
"response": "failed",
"status": 401,
"data": {
"message": "Invalid email or password"
}
}

# 1.3 Update User

Endpoint: /api/users/update
Method: PUT
Description: Updates user information.
Request Body:
{
"userid": "user_id",
"generatedToken": "new_jwt_token"
}

Responses:
200 OK
{
"response": "success",
"status": 200,
"data": {
"\_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer",
"token": "new_jwt_token"
}
}

404 Not Found
{
"response": "failed",
"status": 404,
"data": {
"message": "User not found"
}
}

# 1.4 Get All Customers

Endpoint: /api/users/customers
Method: GET
Description: Retrieves all customers. Accessible only by staff and admin.
Responses:
200 OK
{
"response": "success",
"status": 200,
"data": [
{
"_id": "user_id",
"name": "John Doe",
"email": "johndoe@example.com",
"role": "customer"
}
]
}

403 Forbidden
{
"response": "failed",
"status": 403,
"data": {
"message": "Access denied"
}
}

# 1.5 Get All Staff

Endpoint: /api/users/staff
Method: GET
Description: Retrieves all staff. Accessible only by admin.
Responses:
200 OK
{
"response": "success",
"status": 200,
"data": [
{
"_id": "user_id",
"name": "Jane Doe",
"email": "janedoe@example.com",
"role": "staff"
}
]
}

403 Forbidden
{
"response": "failed",
"status": 403,
"data": {
"message": "Access denied"
}
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
"response": "success",
"status": 201,
"data": {
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
}

400 Bad Request
{
"response": "failed",
"status": 400,
"data": {
"message": "Title and description are required"
}
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
"response": "success",
"status": 200,
"data": {
"\_id": "ticket_id",
"title": "Updated Issue with login",
"description": "Updated description of the issue",
"status": "in progress",
"assignedTo": "user_id",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}
}

404 Not Found
{
"response": "failed",
"status": 404,
"data": {
"message": "Ticket not found"
}
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
"response": "success",
"status": 200,
"data": {
"message": "Ticket removed"
}
}

404 Not Found
{
"response": "failed",
"status": 404,
"data": {
"message": "Ticket not found"
}
}

# 2.4 Get All Tickets

Endpoint: /api/tickets
Method: GET
Description: Retrieves all tickets.

Responses:
200 OK
{
"response": "success",
"status": 200,
"data": [
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
}

# 2.5 Get Ticket By ID

Endpoint: /api/tickets/{id}
Method: GET
Description: Retrieves a ticket by ID.
Parameters:
id (path parameter): The ID of the ticket.

Responses:
200 OK
{
"response": "success",
"status": 200,
"data": {
"\_id": "ticket_id",
"title": "Issue with login",
"description": "User unable to login with valid credentials",
"status": "open",
"createdBy": "user_id",
"createdAt": "timestamp",
"updatedAt": "timestamp"
}
}
