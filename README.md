# Real-Time Collaborative Event Planning Assistant

A **full-stack web application** built with **React, Node.js, Express, MongoDB, Socket.IO, and JWT authentication** that allows users to collaboratively plan events in real-time.  

---

## 🚀 Features

- **User Authentication & Authorization**
  - Secure registration and login using **JWT**.
  - Middleware-protected routes: users must be authenticated to access events and chat.
  
- **Role-Based Access**
  - **Admin** users can edit/delete **any event**.
  - **Regular** users can only manage events they created.

- **Event Management**
  - Create, view, edit, and delete events.
  - Events display creator details for accountability.

- **Real-Time Collaboration**
  - Integrated **Socket.IO** chat to enable real-time communication between authenticated users.

- **Conditional Navigation**
  - Sidebar options (Events, Create Event, Chat) are only visible once the user logs in.

- **Secure Data Handling**
  - Protected API routes with JWT token validation.
  - **.env** file used for MongoDB connection and JWT secrets.

---

## 👨‍💻 Tech Stack

- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time**: Socket.IO

---

## 📂 Project Structure  

📦 Event-Planner  
├── 📁 client # React frontend code  
├── 📁 server # Express.js backend APIs  
├── 📄 .gitignore  
└── 📄 README.md   

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

git clone https://github.com/Taneesh-S/event-planner  
cd event-planner

### 2️⃣ Setup Environment Variables
You will need to create a `.env` file inside the **server/** directory with the following:

MONGO_URI = your_mongodb_connection_string  
JWT_SECRET = your_secret_key

### 3️⃣ Backend Setup (Express + Socket.IO server + MongoDB):  

    cd .\server\
    npm install
    npm start

### 4️⃣ Frontend Setup (React):  

    cd .\client\  
    npm install
    npm start

#### The app should now be running at [**http://localhost:3000**](http://localhost:3000)

---

## 🔑 Usage

1. Register as a new user or login with existing credentials.
2. Access the **Event dashboard** to:
    - View all events
    - Edit/Delete only your own events (unless you are admin).
3. Open the **Create Event** tab to create new events.
4. Open the **Chat** tab to collaborate in real-time with other logged-in users.
5. Admin users have elevated privileges to manage all event data.

---

## 📌 Notes

- You **must** configure a valid `.env` file for MongoDB and JWT secret.
- Admin account is already created with the following credentials :
  - `username: Admin`
  - `email: admin@admin.com`
  - `password: Admin.00`

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repo
2. Create a new branch
3. Commit changes and push
4. Open a pull request

---

## 🙋‍♂️ Author
Developed by **Taneesh Suthar** – Final year B.Tech CSE student, passionate about **Full-Stack Web Development**.  

✨ Connect with me:  
- [LinkedIn](https://www.linkedin.com/in/taneesh-suthar)  
- [GitHub](https://github.com/Taneesh-S)  
- [Instagram](https://www.instagram.com/taneesh.25)  

---

## ⭐ If you like this project, don’t forget to star ⭐ the repo!
