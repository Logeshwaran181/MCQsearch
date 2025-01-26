# 🚀 MCQ Search - Backend API

## 🌐 Project Overview

**MCQ Search** is a backend API designed to serve and search multiple-choice questions (MCQs) based on specific queries. The system supports adding new questions, searching existing questions, and viewing solutions. The main features include the ability to filter questions based on various types (MCQs, Anagrams) and a show solution option for each question.

---

## 🚀 Key Features

- **Search Questions**: Search for questions using various query parameters.
- **Show Solutions**: View the solution (correct answer) for each question.
- **Dynamic Data Structure**: Each question is stored with relevant data, including text blocks, options, and the correct answer.
- **MongoDB Database**: The project uses MongoDB for storing questions, answers, and other related data.

---

## 🛠 How the Project Works

### Database Setup

- **MongoDB**: The project uses a MongoDB database where questions, options, and solutions are stored. Each question is saved with a unique ID, text, and options.

### Express.js Backend

- The backend is built using **Express.js** to handle API requests.
- **Endpoints**:
  - **`/status`**: Provides the current status of the application.
  - **`/questions`**: Allows searching for questions based on a query, such as `query=math` and `type=MCQ`.
  - **`/solution`**: Returns the correct answer to a specific question when given the question's ID.

### MongoDB Schema

- **Anagram and MCQ Questions**: The database is designed to store questions in a dynamic format, allowing for multiple blocks of text and options.
- **Solution Field**: Each question can have a solution field to store the correct answer.

### Search Functionality

- When a search query is sent to `/api/questions`, the system queries the database using the given filters (e.g., query type, subject, etc.) and returns a list of relevant questions.
- Example: Search for MCQs related to math by sending a query with parameters like `query=math&type=MCQ`.

---

## 🔧 Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web framework for Node.js, used to handle API routes.
- **MongoDB**: NoSQL database used for storing questions and answers.
- **Mongoose**: ODM library for MongoDB, helps in schema definition and database interactions.

---

## 🔒 Security Considerations

- **Environment Variables**: Sensitive data, such as database credentials, are stored securely using environment variables (`.env` file).
- **Validation**: Data passed in API requests (like query parameters) is validated before querying the database.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to enhance this project.

