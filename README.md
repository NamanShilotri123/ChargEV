# Project Name - ChargEV

ChargEV is a web application that displays the location of charging stations in the surrounding
area. The app provides information such as the charging station's name, charging price, and 
address, as well as reviews about that specific charging station. This app provides users with 
real-time charging station availability, photos, ratings, and descriptions.
Aside from that, the app enables users to locate and add EV charging stations. ChargEV shows 
charging stations for various stations in your area. You can get information about the app, such 
as the port types supported by the station. Aside from that, there are numerous other advantages 
to using ChargEV.

Aside from searching for a charging station, users can also reserve a time slot of their choice. 
This will save them a spot for that instance. This will save them time because we all know that 
charging an EV takes at least 20-30 minutes, which can be inconvenient when people are in a 
hurry. This feature will save the user's time.

ChargEV also has a booking history for the user, which allows them to keep track of previously 
booked stations. In this system, the user can manage all appointments as well as search for and 
reserve a charging station slot in advance. The user can also search for an EV station by stationId 
or city name. After booking a slot, the user will receive an email with slot confirmation 
information. All of the stations and slots will be managed by the administrator.


## Installation
threr are two folder in application 
1. cars -> backend
2. frontend 

backend is fully written in python with django rest framework and frontend is made by using react.
Step 1 : Run Cars backend

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install cars requirement.txt.
```bash
cd cars
pip install -r requirements.txt
python manage.py runserver
```
Step 2 : Run frontend 

Use the package manager npm to run react .
```bash
cd frontend
npm install
npm run dev
```
after 2nd step go to http://localhost:3000/ to view application.
