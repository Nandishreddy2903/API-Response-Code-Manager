API Response Code Manager 🐶

This project is a simple web application to explore, filter, save, and manage lists of HTTP response codes with corresponding dog images from http.dog.

📌 Features

Authentication

Login / Signup for users.

Only logged-in users can save lists.

Search Page

Filter response codes:

Examples:

203 → shows only 203 response code dog image.

2xx → shows all codes starting with 2 (200–299).

20x → shows all codes starting with 20 (200–209).

3xx → shows all codes starting with 3 (300–399).

21x → shows codes starting with 21 (210–219).

Displays dog images based on filter.

Save filter results as a list.

Lists Page

View all saved lists (with name, creation date, response codes, and image links).

Select a list to view images.

Edit or delete lists.

📂 Pages Overview

Login/Signup Page

User authentication.

Search Page

Input filter (e.g., 2xx, 20x, 203).

Display corresponding dog images.

Save the filtered list.

Lists Page

Display saved lists with metadata.

Select list → show images.

Edit or delete a list.

🛠️ Tech Stack (Suggested)

Frontend: React / HTML + CSS + JS

Backend: Node.js + Express

Database: MongoDB (to store users & lists)

API Source: http.dog

⚙️ Environment Variables (.env)

Create a .env file in the backend folder with the following variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/api_response_code_manager
JWT_SECRET=your-secret-key


PORT → The port for your backend server.

MONGO_URI → MongoDB connection string (local or Atlas).

JWT_SECRET → Secret key for signing JWT tokens (change in production).

📖 Example Workflow

User signs up and logs in.

On the Search Page, user filters by 2xx.

All HTTP status codes from 200–299 are displayed with dog images.

User clicks Save List → enters a name → list is saved with:

Name

Creation Date

Response Codes (200–299)

Image links

On the Lists Page, user sees all their lists and can view, edit, or delete them.

🚀 Getting Started

Clone repo and install dependencies:

git clone <repo-url>
cd project-folder
npm install


Start backend:

npm run server


Start frontend:

npm start
