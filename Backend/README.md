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

**File**: `Backend/README.md`
