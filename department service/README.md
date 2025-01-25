# course-management-service

This microservice manages the creation, modification, and administration of courses within the school portal.

## Features

- Course creation and editing
- Assignment of teachers to courses
- Student enrollment management
- Course scheduling
- Notifications and alerts for course updates

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Besufqad-Mesfin/school-portal-server.git
    ```
2. Navigate to the course-management-service directory:
    ```bash
    cd course-management-service
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a .env file with required environment variables:
    ```env
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```
5. Start the service:
    ```bash
    npm start
    ```

## Contributing

Open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
