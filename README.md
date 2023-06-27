Certainly! Here's the updated README file with the modified license and repository information:

# m1-sm2-b1(validation at client side not secure )

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

Short project description goes here.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thepwnexperts/m1-sm2-b1.git
   ```

2. Change into the project directory:

   ```bash
   cd m1-sm2-b1
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the required environment variables:

   - Create a `.env` file in the root directory.
   - Add the following content to the `.env` file:

     ```dotenv
     # Example .env file

     # Mail info
     # Set the hostname for the mail server
     host=mail.example.com

     # Set the port number for the mail server
     port=465

     # Set the user or email address for authentication
     user=your_email@example.com

     # Set the password for authentication
     pass=your_mail_password

     # Database
     # Set the MongoDB URI for connecting to the database
     dburi=mongodb+srv://username:password@cluster.example.com/database_name

     # Rate limit
     # Enable or disable the Web Application Firewall (WAF)
     waf=true

     # Set the optimal rate for rate limiting
     optrate=1
     ```

     Replace `username`, `password`, `cluster.example.com`, and `database_name` with the actual values corresponding to your MongoDB configuration.

5. Start the server:

   ```bash
   npm start
   ```

## Usage

Describe how to use the project here. Provide examples, code snippets, and any additional details that can help users understand how to use your project effectively.

**Note: Validating at the client-side alone is not secure and can be easily bypassed. Always perform server-side validation to ensure the security and integrity of your data.**

## API Endpoints

This section provides details about the API endpoints and their usage.

### Verify Email and Generate OTP

- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Generate a 6-digit OTP and send it to the provided email address.
- **Request Body:**

  ```json
  {
    "to": "email@example.com"
  }
  ```

- **Response:** Success message indicating that the OTP has been sent.

### Verify OTP

- **Endpoint:** `/verify`
- **Method:** `POST`
- **Description:** Verify the OTP sent to the specified email address.
- **Request Body:**

  ```json
  {
    "from": "email@example.com"
  }
  ```

- **Response:** The verified OTP.

Include details of all your API endpoints in a similar manner.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow the steps below:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request.

Please provide a detailed description of your changes and why you think they should be

 merged.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
```
