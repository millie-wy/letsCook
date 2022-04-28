# User Based Content - LetsCook

This is a mocked recipe website called LetsCook, a user-based platform where a visitor can sign up an account, sign in, create recipe and edit/remove it. The user is also able to edit or even remove his/her own profile. An admin can perform all CRUD actions on recipes and promote/demote or delete an user. 

This project is created with React JS and MUI in frontend, and Express, MongoDB and Mongoose in backend. 

[To repo](https://github.com/millie-wy/letsCook "User Based Content - LetsCook")

### Developers

William Saar (https://github.com/Willen17) </br>
Millie Cheung (https://github.com/millie-wy)

### Getting started

Download the ZIP, open 2 terminals in your code editor and write the below commands separately:

1. Run the **server** on [http://localhost:3002](http://localhost:3002)

   ```
   cd server
   npm i
   npm start
   ```

2. Run the **client** on [http://localhost:3000](http://localhost:3000)
   ```
   cd client
   npm i
   npm start
   ```

3. Import the dummy data (found in server/data folder) in your mongoDB compass respectively. 

---

(This is a group assignment from my school)

Krav för godkänt:

- [x] 1. Git & GitHub har använts.
- [x] 2. Projektmappen innehåller en README.md fil.
- [x] 3. Uppgiften lämnas in i tid!
- [x] 4. Det ska finnas minst två stycken resurser med CRUD-Endpoints.
- [x] 5. Det ska gå att registrera sig, logga in och skapa innehåll som är kopplat till inloggad användare.
- [x] 6. Endast den inloggade användaren får lov att utföra C_UD actions på sitt innehåll.
- [x] 7. Allt innehåll ska sparas i en MongoDB databas.

Krav för väl godkänt:

- [x] 1. Alla punkter för godkänt är uppfyllda.
- [x] 2. Det ska finnas en adminroll i systemet där man som inloggad admin har rättigheten att utföra CRUD operationer på allt innehåll.
- [x] 3. Admins ska ha tillgång till ett gränssnitt som listar alla användare och deras roller. En admin ska från gränssnittet kunna ta bort användare eller ändra dess roll.
