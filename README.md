**UBER-Clone (Backend Overview)**

- **Backend folder:** `Backend/`
- **Main purpose:** Simple backend providing user registration and authentication for the UBER-Clone project.

**Users Register Endpoint**

- **Path:** `POST /users/register`
- **Description:** Register a new user. Validates the incoming data, hashes the password, creates a user record in MongoDB, and returns an auth token with the created user object.

Request
- **Content-Type:** `application/json`
- **Body (JSON):**

```json
{
  "fullname": {"firstname": "Jane", "lastname": "Doe"},
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

Validation / Required fields
- **`fullname.firstname`**: required, string, minimum length 3.
- **`fullname.lastname`**: optional, string (recommended minimum length 3).
- **`email`**: required, must be a valid email address, minimum length 5, must be unique.
- **`password`**: required, string, minimum length 6.

Responses
- **201 Created:** Registration successful. Response body contains a JWT `token` and the created `user` object (password is not returned).
- **400 Bad Request:** Validation failed. Response includes `errors` array with details.
- **500 Internal Server Error:** Unexpected server/database error.

Quick example success response (201):

```json
{
  "token": "<jwt_token_here>",
  "user": {
    "_id": "64...",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

**Users Login Endpoint**

- **Path:** `POST /users/login`
- **Description:** Authenticate an existing user. Validates credentials and returns a JWT `token` and the authenticated `user` object on success.

**Request**
- **Content-Type:** `application/json`
- **Body (JSON):**

```json
{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

**Validation / Required fields**
- **`email`**: required, must be a valid email address.
- **`password`**: required, string, minimum length 6.

**Responses**
- **200 OK:** Authentication successful. Response body contains a JWT `token` and the authenticated `user` object.
- **400 Bad Request:** Validation failed. Response includes `errors` array with details.
- **401 Unauthorized:** Invalid credentials (email not found or password mismatch).
- **500 Internal Server Error:** Unexpected server/database error.

Quick curl example (login):

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"jane.doe@example.com", "password":"securePassword123" }'
```

Quick start (backend)
- Change to the backend folder: `cd Backend`
- Install dependencies: `npm install`
- Ensure MongoDB is running and set environment variables:
  - `MONGO_URI` — your MongoDB connection string
  - `JWT_SECRET` — secret used to sign JWTs
- Start the server: `node server.js` (or `npm start` if a start script exists)

Notes
- Passwords are hashed with bcrypt before storing.
- JWTs are created using `process.env.JWT_SECRET`.
- The `password` field in the user model is `select: false`, so it will not be returned by default when querying users.

Files of interest
- `Backend/routes/user.routes.js`
- `Backend/controllers/user.controller.js`
- `Backend/services/user.service.js`
- `Backend/models/user.model.js`
