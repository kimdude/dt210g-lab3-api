# DT210G - lab 3, API

Repot innehåller källkod för ett API som hanterar användare och blogginlägg. API:et använder Hapi och JWT-tokens. Det använder även Mongoose är kopplat till en MongoDB databas.

Grundlänken för API:et är [https://dt210g-lab3-api.onrender.com](https://dt210g-lab3-api.onrender.com).

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
|POST   |/blog             |Skapa nytt inlägg       |Ja     |
|PUT    |/blog/{_id}       |Uppdatera inlägg        |Ja     |
|DELETE |/blog/{_id}       |Ta bort inlägg          |Ja     |

### Queries vid GET-anrop
[https://dt210g-lab3-api.onrender.com/blog](https://dt210g-lab3-api.onrender.com/blog)**?limit=5**
Med __limit__ kan antalet resultat som returneras begränsas. I ovan exempel kommer alltså endast fem poster att returneras.

[https://dt210g-lab3-api.onrender.com/blog](https://dt210g-lab3-api.onrender.com/blog)**?skip=10**
Med __skip__ kan anges hur många inlägg som ska hoppas över vid hämtning. I ovan exempel skippas alltså de första tio posterna. Nedan exempel hämtar alla tre poster som följer efter de första tre.

[https://dt210g-lab3-api.onrender.com/blog](https://dt210g-lab3-api.onrender.com/blog)**?skip=3&limit=3**

__Kim Dudenhöfer, 2026-03-02__
