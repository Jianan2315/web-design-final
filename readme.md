# how to run the code
# open the database to authentication login
you can open the terimcal and cd to bankend
type "npm install" and "node server.js"

# use the api and open the database to manage resume template
cd to the frontend/public/api
type "npm install" and "npx nodemon server.js"

# use react ui to open the frondend
cd to frontend 
type "npm install" and "npm start"

# tips
you need open the three terminals at same time
if you cannot open the website accurately after step three，
you can tpye “lsof -i :3000” to check the ID of the process that occupies the port
and use "kill -9 'process pid'" to kill these processes