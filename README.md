# ListWebApp
Using Your list webapp you can store personal list item in your personal account. <br>
Implemented Login Module, Register Module, Add Item Module.

 Setup
1) clone this repo
2) create .env file 
3) intialize MONGO_URI and KEY <br>
MONGO_URI=mongodb+srv://username:password@cluster0.utylj.mongodb.net/dbname
SECRET_KEY=123456
4) npm run dev <br>
this will start <br> 
frontend client side <br>
npm start clients and <br>
backend server <br>
nodemon server.js <br>


"scripts": { <br>
    "start": "node server.js", <br>
    "server": "nodemon server.js", <br>
    "client": "npm start --prefix clients", <br>
    "dev": "concurrently \"npm run server\" \"npm run client \"", <br>
  },


