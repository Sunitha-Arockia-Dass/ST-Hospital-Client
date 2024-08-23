# Ironhack-Project-3-S.T. Hospital - MERN App (MongoDB, Express, React, Node)

<h1>Links</h1>

<h3>Follow the Trello Board : <a href="https://trello.com/invite/b/LJqzCzCl/ATTI2457db54afb77558ab662601bc60a286E6926B91/ironhack-project3-st-hospital" target="_blank">Here</a></h3>

<h3>Slides presentation : <a href="https://slides.com/thomaslebas/sthospital#/presentation/1" target="_blank">Here</a></h3>

<h3>Github Server repository : <a href="https://github.com/Thomas-LBS/ST-Hospital-Server.git" target="_blank" >Here</a></h3>

<h3>Github Client repository : <a href="https://github.com/Sunitha-Arockia-Dass/ST-Hospital-Client.git" target="_blank" >Here</a></h3>

<h3>App Server deployed with adaptabe : <a href="https://st-hospital-server.adaptable.app/" target="_blank">Here</a></h3>

<h3>App Client deployed with Netlify : <a href="https://musical-buttercream-e1a1d2.netlify.app/" target="_blank">Here</a></h3>


<h1>Introduction</h1>
This project is an hospital website that allow patient to book and manage appointments and see their past records, doctor can manage their appointments ,create and view patient records and admin can create another admin,departments, doctors ,doctor credentials.

<h2>Technical Accomplishments</h2>

- Have a SPA frontend, built with React, consisting of multiple views and implementing CRUD actions.
- Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that your React app will communicate with.
- Have 6 database models . 
- Have a REST API backend with routes that perform all CRUD actions for3 models (excluding the user model).
- Included sign-up, log-in and log-out functionality with encrypted passwords (or social login) and authorization (logged-in users can do additional things).
- Have two separate repos on GitHub. One repo is for your frontend React application and the other is for your backend REST API.
-  Secure JWT authentication for user protection.

- a backend validation and centralized error handling in your REST API.


<h2>Tools</h2>

- Ironlauncher
- React Vite
- Full calendar
- Gsap
- Mailjet
- axios


## UX/UI Choices

<h2>Fonts</h2>

  --ft-Headings: "Sofia Sans", sans-serif;
  --ft-Texte: "Poppins", sans-serif;

<h2>Color Palette</h2>

  --clr-light: hsl(220, 10%, 95%);
  --clr-medium: hsl(220, 10%, 30%);
  --clr-dark: hsl(220, 10%, 12%);
 
Light blue is a peaceful, calming color. According to color psychology, blue is associated with trustworthiness and reliability. Blue is also said to promote feelings of tranquility; light blue’s gentle appearance means it is particularly likely to make that impression.
  --clr-blue: hsl(193, 90%, 53%);
  --clr-blue-medium: hsl(193, 90%, 25%);

Green is the result of mixing blue and yellow. Green has two paradoxical meanings—one being nature and the environment and the other being money. When it comes to nature, green represents renewal and growth. It is also associated with wealth, prestige, and greed.
  --clr-green: hsl(157, 95%, 53%);
  --clr-green-medium: hsl(157, 95%, 25%);

message to the user colors :
  --info-msg: hsl(290, 55%, 53%);
  --ok-msg: hsl(70, 55%, 53%);
  --careful-msg: hsl(35, 55%, 53%);
  --danger-msg: hsl(0, 55%, 53%);


## DARKMODE
using JS DOMmanipulation to change the mode of the browser, the css, register user choice to the localstorage.
Colors : 
  --foreground: var(--clr-light);
  --background: var(--clr-dark);
  --clr-medium: hsl(220, 10%, 77%);
  --clr-blue-medium: hsl(193, 90%, 77%);
  --clr-green-medium: hsl(157, 95%, 77%);


## LANGUAGES
using react usecontext did langauge translation for french and english, just to show how it works on the navbar.


## CRUD

<h2>User</h2>
User can sign up to create an account, they can access their data and update them.

<h2>Appointments</h2>
User can create an appointment, edit their appointement and delete it.

<h2>Departements</h2>
Admin can create, update, delete departements.

<h2>Doctors</h2>
Admin can create, update, delete doctors.

<h2>Patient Record</h2>
doctor can create and view patient records.



## Departements

All members can access Departments, only admin car Create, Update, Delete.

## General Practices

All members can access General Practices.

## Account Page

All members can access Account Page.

Patient : 
  - see his user data, edit them.
  - see his GP info, edit them.
  - create his appointments, edit/delete them.
  - see patient records.

Doctor : 
  - see his appointments.
  - see his patient's records.

Admin : 
  - CRUD Departments.
  - CRUD Doctors.
  - Create doctor or admin rights.


## Tools used

<h2>MongoDB & Mongo Atlas</h2> for the DB.

<h2>Mongoose</h2> for models.

<h2>jwt</h2> to create secure token for auth.

<h2>Bcrypt</h2> to encrypt password and authenticate them.

<h2>Axios</h2> to handle and fetch datas from API.

<h2>Mailjet</h2> to send appointments data by email.

<h2>Fullcalendar</h2> to book appointments

<h2>GSAP</h2> to animate.

## Installation
1. Clone the repository:
https://github.com/Thomas-LBS/ST-Hospital-Server.git
https://github.com/Sunitha-Arockia-Dass/ST-Hospital-Client.git

# Install dependencies for the client and server:
cd ST-Hospital-Server
npm install
cd ST-Hospital-Client
npm install
1. Set up MongoDB Atlas:
Create a MongoDB Atlas account.
Configure a new cluster and obtain the connection string.
Replace the MongoDB connection string in server/config/default.json with your own connection string.
2. Start the application:
# Start the server (from the server directory)
npm start
# Start the client (from the client directory)
npm start
