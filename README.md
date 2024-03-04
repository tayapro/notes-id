# Notes ID

Very basis auth API for issuing JWT tokens for Notes application. It uses `Nodejs` and `express` for HTTP API and `Mongodb` as storage.  
It provides assymenric algorithm for token verification.
It uses port 3001 upon start.

# Environment variables

| Name                 | Description                     |
| -------------------- | ------------------------------- |
| MONGO_URL            | Mongodb URL                     |
| CORS_ALLOWED_ORIGINS | Allow CORS origins for browsers |

# API

Endpoints

| Method | Path                   | Description                                                                    | Protected |
| ------ | ---------------------- | ------------------------------------------------------------------------------ | --------- |
| GET    | /ping                  | [health check](https://github.com/tayapro/notes-id/tree/main#health-check)     | no        |
| GET    | /.well-known/jwks.json | [get public key](https://github.com/tayapro/notes-id/tree/main#get-public-key) | no        |
| POST   | /api/register          | [register user](https://github.com/tayapro/notes-id/tree/main#register-user)   | no        |
| POST   | /api/login             | [login user](https://github.com/tayapro/notes-id/tree/main#login-user)         | no        |
| POST   | /api/refresh           | [refresh token](https://github.com/tayapro/notes-id/tree/main#refresh-token)   | no        |
| POST   | /api/logout            | [logout user](https://github.com/tayapro/notes-id/tree/main#logout-user)       | no        |

## Health check

Example request

```http
GET /ping HTTP/1.1
```

Example response

```http
HTTP/1.1 200 OK
```

## Get public key

Example request

```http
GET /.well-known/jwks.json HTTP/1.1
```

Example response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"keys":
  [{
    "e":"AQAB",
    "kid":"XooolbD0BPGABjHzSDRfQ4YBg8H87zwTJVmmP8I81OA",
    "kty":"RSA",
    "n":"tRX...QCcw",
    "alg":"RS256",
    "use":"sig"
}]}
```

## Register user

Example request

```http
POST /api/register HTTP/1.1
Content-Type: application/json

{
  "username": "test_user",
  "password": "strongpassword"
}
```

Example response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "username": "test_user",
  "user_id": "652c2702a185fb859ec88d2c",
  "refreshToken": "eyJ...TagQ",
  "accessToken": "eyJ...dG3Q"
}
```

## Login user

Example request

```http
POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": "test_user",
  "password": "strongpassword"
}
```

Example response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "username": "test_user",
  "user_id": "652c2702a185fb859ec88d2c",
  "refreshToken": "eyJ...TagQ",
  "accessToken": "eyJ...dG3Q"
}
```

## Refresh token

Example request

```http
POST /api/refresh HTTP/1.1
Content-Type: application/json

{
  "refreshToken": "eyJ...TagQ"
}
```

Example response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "username": "test_user",
  "user_id": "652c2702a185fb859ec88d2c",
  "refreshToken": "eyJ...ar8g",
  "accessToken": "eyJ...PStQ"
}
```

## Logout user

User logout is currently not implemented.

Example request

```http
GET /logout HTTP/1.1
```

Example response

```http
HTTP/1.1 200 OK
```

# CHANGELOG

## v0.0.1-alpha

-   [x] No changes, compatibility tag

## v0.0.2-alpha

-   [x] APIs which do not have any content in response should return HTTP 204 upon success
-   [x] Migrate to `ES6` modules

# Known issues

-   [ ] Certificate is not rotating
-   [ ] Currently register returns tokens the same as login
