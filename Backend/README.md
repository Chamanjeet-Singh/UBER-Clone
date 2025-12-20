**Users Register Endpoint**

- **Path:** `POST /users/register`
- **Description:** Register a new user. Validates the incoming data, hashes the password, creates the user in the database, and returns an auth token with the created user object.

**Request**
- **Content-Type:** `application/json`
- **Body (JSON):**

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

**Validation / Required fields**
- **`fullname.firstname`**: required, string, minimum length 3.
- **`fullname.lastname`**: optional, string (recommended minimum length 3).
- **`email`**: required, must be a valid email address, minimum length 5, must be unique.
- **`password`**: required, string, minimum length 6.

The route uses `express-validator` to validate inputs and will return validation errors if any rule fails.

**Responses**
- **201 Created:** Registration successful. Response body contains a JWT `token` and the created `user` object (password is not returned).

Example success response (201):

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

- **400 Bad Request:** Validation failed. Response includes `errors` array with details.

Example validation error (400):

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **500 Internal Server Error:** Unexpected server/database error.

**Notes & Implementation details**
- The server hashes passwords using bcrypt via `userModel.hashPassword` before storing.
- JWT is created by `user.generateAuthToken()` using `process.env.JWT_SECRET`.
- The `password` field is marked `select: false` in the schema, so it should not be returned in queries by default.
- Ensure MongoDB is running and `JWT_SECRET` is set in your environment when testing.

**Quick curl examples**

Register a user (success expected):

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname":"Jane","lastname":"Doe"},
    "email":"jane.doe@example.com",
    "password":"securePassword123"
  }'
```

Register a user (capture validation errors):

```bash
curl -i -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{ "fullname": { "firstname": "Ja" }, "email": "not-an-email", "password": "123" }'
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

Example success response (200):

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

- **400 Bad Request:** Validation failed. Response includes `errors` array with details.
- **401 Unauthorized:** Invalid credentials (email not found or password mismatch).
- **500 Internal Server Error:** Unexpected server/database error.

**Quick curl example (login)**

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{ "email":"jane.doe@example.com", "password":"securePassword123" }'
```

**Users Profile Endpoint**

- **Path:** `GET /users/profile`
- **Description:** Returns the authenticated user's profile. Requires a valid JWT (sent via `Authorization: Bearer <token>` header or `token` cookie).

**Request**
- **Headers:** `Authorization: Bearer <token>` or send cookie `token=<jwt>`

**Responses**
- **200 OK:** Returns the authenticated user object.
- **401 Unauthorized:** Missing or invalid token. The `authUser` middleware protects this route.
- **500 Internal Server Error:** Unexpected server/database error.

Example success response (200):

```json
{
  "_id": "64...",
  "fullname": { "firstname": "Jane", "lastname": "Doe" },
  "email": "jane.doe@example.com",
  "socketId": null
}
```

Quick curl example (profile):

```bash
curl -H "Authorization: Bearer <jwt_token_here>" http://localhost:3000/users/profile
```

**Users Logout Endpoint**

- **Path:** `GET /users/logout`
- **Description:** Logs out the authenticated user by clearing the `token` cookie and blacklisting the JWT so it cannot be reused. Requires authentication.

**Request**
- **Headers:** `Authorization: Bearer <token>` or cookie `token=<jwt>`

**Responses**
- **200 OK:** Logout successful. The server clears the cookie and stores the token in the blacklist (expires after 24 hours).
- **401 Unauthorized:** Missing or invalid token.
- **500 Internal Server Error:** Unexpected server/database error.

Quick curl example (logout):

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <jwt_token_here>"
```

Notes
- The logout implementation uses a `BlacklistToken` model to store blacklisted JWTs. Blacklisted entries expire automatically after 24 hours via a TTL index, preventing reuse of recently-logged-out tokens.
- Ensure your auth middleware checks the blacklist when validating tokens.


**File**: `Backend/README.md`

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

 ## '/user/logout' Endpoint

 ### Description

Logout the current user and blacklist the token provided in cookies or the headers

 ### HTTP Method

 `GET`


 ### Authentication

 Requires a valid JWT Token in the authentication header:

