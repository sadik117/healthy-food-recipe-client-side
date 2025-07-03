🥗 Healthy Food Recipe Book
🌐 Live Site:
https://healthy-food-recipe-book.netlify.app

🎯 Project Purpose
Healthy Food Recipe Book is a dynamic and interactive recipe web app where users can explore, share, and discover a variety of healthy recipes. It encourages mindful eating by providing structured information about recipes, ingredients, cooking steps, and user reviews — all wrapped in a modern, mobile-friendly interface.

This platform is ideal for:

Home cooks, fitness enthusiasts, or anyone interested in healthy meals.

Exploring detailed recipe cards with ratings and cooking steps.

Interacting with community-driven reviews and feedback.

✨ Key Features
Feature	Description
🍽️ Recipe Cards	Visually appealing cards displaying dish name, image, category, and cooking time.
🧑‍🍳 Recipe Details	Dedicated page with ingredients, preparation steps, likes, and reviews.
👍 Like System	Users can like their favorite recipes.
🗣️ User Reviews	Authenticated users can write, edit, and delete reviews (1 per user per recipe).
🔍 Search & Filter	Quickly find recipes by name, category, or prep time.
📈 Top Recipes	View most-liked recipes to discover popular dishes.
✅ Authentication	Firebase-based email/password and Google login.
🧾 My Recipes	Users can view, update, or delete only their own submitted recipes.
📱 Responsive Design	Works smoothly on desktop, tablet, and mobile screens.

🛠️ Tech Stack
🔹 Front-End
React 18 – Component-based UI

Tailwind CSS – Utility-first CSS framework

React Router DOM v6 – Navigation and protected routes

Framer Motion – Smooth transitions and hover effects

React Toastify – Non-blocking toast notifications

SweetAlert2 – Elegant modal confirmations

Lucide-react – Lightweight icon set

🔸 Back-End
Node.js 20

Express 5

MongoDB Atlas with Mongoose 8

JWT (jsonwebtoken) – Authentication and route protection

CORS, dotenv, cookie-parser – Server config and security

🔑 Notable NPM Packages
Package	Why it's used
react-router-dom	Page routing, protected/private routes
axios	HTTP client with interceptors for JWT
framer-motion	Page transitions and hover animations
react-toastify	Toast messages for actions (add, delete, errors)
sweetalert2	Confirmation prompts (e.g., deleting recipes/reviews)
lucide-react	Clean icons for UI enhancement
firebase	Authentication and user state management
jsonwebtoken	Secure JWT tokens for server-side auth

⚙️ How to Set Up and Run Locally
1. Clone the Repository
bash
Copy
Edit
git clone (https://github.com/sadik117/healthy-food-recipe-client-side)
cd healthy-food-recipe-book
2. Install Frontend Dependencies
bash
Copy
Edit
npm install
If this is a Vite project:

bash
Copy
Edit
npm run dev
Otherwise (for CRA):

bash
Copy
Edit
npm start
3. Install Backend Dependencies (if backend code is separate)
bash
Copy
Edit
cd server
npm install
npm run dev
Make sure to add a .env file with:

ini
Copy
Edit
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
📁 Folder Structure (if full stack)
bash
Copy
Edit
/client     → React Frontend
/server     → Express Backend
🧪 Authentication Features
🔐 Register/Login via Firebase

🔒 JWT protected API routes

🔓 Route guards on dashboard and “My Recipes” pages

🚀 Deployment
This project is live on Netlify for frontend. The backend can be hosted on Render, Railway, or Vercel (if needed).

📱 Responsive Design
The app layout is optimized for:

Mobile phones

Tablets

Desktop monitors
