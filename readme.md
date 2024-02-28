# Tableside: User Service

A microservice component for user authentication and management.

Powered by [Express.js](), [Passport.js](https://www.passportjs.org/) and [Prisma](https://www.prisma.io)

## Purpose

Provides authentication and session mechanisms via JWT.

## API Endpoints

### POST /register
Registers a new user.

#### Request Body
```json
{
    "email": "string",
    "password": "string",
    "role": "string"
}
```

#### Response Body
```json
{
    "id": "string",
    "email": "string",
    "role": "string"
}
```

### POST /authenticate
Authenticates a user.
#### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

#### Response Body
```json
{
  "token": "string"
}
```

### GET /me
Returns the current user's profile.

#### Response Body
```json
{
  "profile": {
    "id": "string",
    "email": "string"
  }
}
```

## .env Configuration
```dotenv
# -- DB -- #
POSTGRES_USER="<GENERATE_THIS>"
POSTGRES_PASSWORD="<GENERATE_THIS>"
POSTGRES_DB="tableside_users"

# -- PG ADMIN -- #
PGADMIN_DEFAULT_EMAIL="admin@surrey.ac.uk"
PGADMIN_DEFAULT_PASSWORD="password"

# -- APP -- #
DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public"
JWT_SECRET="<GENERATE_THIS>"

```