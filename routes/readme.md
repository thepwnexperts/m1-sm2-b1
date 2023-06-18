# This Vulnerable From Response Manipulation Vulnerability
# API Endpoints

This repository contains the implementation of API endpoints using Node.js and Express.js. These endpoints provide functionality related to email verification and OTP (One-Time Password) generation.

## Prerequisites

Before running the API, make sure you have the following prerequisites installed:

- Node.js

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

   - `host`: SMTP host for sending emails
   - `port`: SMTP port
   - `user`: SMTP username
   - `pass`: SMTP password
   - `waf`: Enable/disable Web Application Firewall (true/false)

5. Start the server:

   ```bash
   npm start
   ```

## Endpoints

### Generate OTP and Send Email

**URL:** `/`

**Method:** `POST`

**Description:** Generates a 6-digit OTP and sends it to the provided email address.

**Request Body:**

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| `to`      | String | Recipient email address  |

**Example Request:**

```json
{
  "to": "recipient@example.com"
}
```

**Example Response:**

```text
success
```

### Verify OTP

**URL:** `/verify`

**Method:** `POST`

**Description:** Verifies the OTP sent to the specified email address.

**Request Body:**

| Parameter | Type   | Description              |
|-----------|--------|--------------------------|
| `from`    | String | Sender email address     |

**Example Request:**

```json
{
  "from": "sender@example.com"
}
```

**Example Response:**

```text
123456
```

## Error Handling

In case of errors, the API will return an appropriate HTTP status code along with an error message.

- `400 Bad Request`: Invalid request parameters or OTP not found.
- `500 Internal Server Error`: Internal server error occurred.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the functionality of the API, feel free to open a pull request.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).
```
