# Tableside: User Service

A microservice component for user authentication and management.

Powered by [Passport.js](https://www.passportjs.org/) and [Prisma](https://www.prisma.io)

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
  "token": "string",
  "profile": {
    "id": "string",
    "email": "string"
  }
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
  "token": "string",
  "profile": {
    "id": "string",
    "email": "string"
  }
}
```

### GET /me
Returns the current user's profile.

#### Response Body
```json
{
  "token": "string",
  "profile": {
    "id": "string",
    "email": "string"
  }
}
```