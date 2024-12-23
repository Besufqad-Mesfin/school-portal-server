# school-portal-server

This project is a backend server for a school portal application. It provides various functionalities to manage students, teachers, courses, and other school-related activities. 

## Features

- User authentication and authorization
- Student and teacher management
- Course management
- Grade tracking
- Attendance tracking
- Notifications and announcements

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- RESTful API

## Setup

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Besufqad-Mesfin/school-portal-server.git
    ```
2. Navigate to the project directory:
    ```bash
    cd school-portal-server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add the necessary environment variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
5. Start the server:
    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
