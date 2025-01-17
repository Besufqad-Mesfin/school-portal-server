# report-service

This microservice manages the generation and distribution of school reports.

## Features

- Report generation for students
- Grading summaries
- Attendance-related reports
- Notifications and alerts for completed reports

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- RESTful API

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Besufqad-Mesfin/school-portal-server.git
    ```
2. Navigate to the report-service directory:
    ```bash
    cd report-service
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
