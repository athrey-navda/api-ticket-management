# rayca-backend

An customer ticket monitoring application as assessment for internship hiring

# API Documentation

Base URL

# 1. Get All Tickets

Endpoint: /api/tickets

Method: GET
Description: Retrieve a list of all tickets.

Headers:
Authorization: Bearer <token>
Responses:

200 OK

Description: Returns a list of tickets.
Content Type: application/json
Response Body:
json

[
{
"_id": "605c72ef6d4f3b001f6e7a30",
"title": "Sample Ticket",
"description": "This is a sample ticket.",
"status": "open",
"createdBy": "user_id",
"createdAt": "2024-07-25T21:23:57.237Z",
"updatedAt": "2024-07-25T21:23:57.237Z"
},
...
]
401 Unauthorized

Description: Authentication failed or user does not have permission.
403 Forbidden

Description: User does not have the required role to access this endpoint.

# 2. Get Ticket by ID

Endpoint: /api/tickets/{id}

Method: GET

Description: Retrieve details of a specific ticket by ID.

Parameters:

Path Parameter:
id (string) - The unique identifier of the ticket.
Headers:

Authorization: Bearer <token>
Responses:

200 OK

Description: Returns the details of the specified ticket.
Content Type: application/json
Response Body:
json

{
"\_id": "605c72ef6d4f3b001f6e7a30",
"title": "Sample Ticket",
"description": "This is a sample ticket.",
"status": "open",
"createdBy": "user_id",
"createdAt": "2024-07-25T21:23:57.237Z",
"updatedAt": "2024-07-25T21:23:57.237Z"
}
400 Bad Request

Description: The provided ID is not valid or is missing.
401 Unauthorized

Description: Authentication failed or user does not have permission.
403 Forbidden

Description: User does not have the required role to access this endpoint.
404 Not Found

Description: The ticket with the specified ID was not found.
