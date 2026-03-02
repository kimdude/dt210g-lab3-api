# DT210G - lab 3, API

Repot innehåller källkod för ett API som hanterar användare och blogginlägg. API:et använder Hapi och JWT-tokens. Det använder även Mongoose är kopplat till en MongoDB databas.

## Router för users

|Method |URI               |Action                  |Auth   |
|-------|------------------|------------------------|-------|
|POST   |/user/register    |Registrera användare    |Nej    |
|POST   |/user/login       |Logga in användare      |Nej    |

## Router för blogginlägg

|Method |URI               |Action                  |Auth   |
|-------|------------------|------------------------|-------|
|GET    |/blog             |Hämta alla inlägg       |Nej    |
|GET    |/blog/{_id}       |Hämta specifikt inlägg  |Nej    |
