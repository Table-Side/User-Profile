# Tableside: User Profiles Service

A microservice for managing user profiles within the Tableside app.

Powered by [Express.js](https://expressjs.com) and [Prisma](https://www.prisma.io)

## Purpose

Provides authentication and session mechanisms via JWT.

## API Endpoints

### POST /register
Registers a new user.

#### Request Body
```json
{
    "email": "string",
    "name": "string",
    "role": "string"
}
```

#### Response Body
```json
{
    "id": "string",
    "name": "string",
    "role": "string"
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
DATABASE_URL="postgres://<POSTGRES_USER>:<POSTGRES_PASSWORD>@database:5432/<POSTGRES_DB>?schema=public"
JWT_SECRET="<GENERATE_THIS>"

```