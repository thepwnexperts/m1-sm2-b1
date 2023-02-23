baseurl =>  http://localhost:3000/verify/

/ - This endpoint generates a 6-digit OTP (one-time password), sends it via email to the specified recipient, and saves the OTP and recipient's email address to a MongoDB database.

Request body parameters:

to (required) - The email address to send the OTP to.
Response:

200 OK with a message of "success" if the OTP was successfully sent and saved.
400 Bad Request with an error message if there was a problem saving the OTP to the database.
500 Internal Server Error with an error message if there was a problem checking the database for an existing email.



/otp - This endpoint retrieves the OTP that was generated and sent to the specified email address.

Request body parameters:

from (required) - The email address that the OTP was sent to.
Response:

200 OK with the OTP as the response body if the OTP was found in the database.
400 OK with a message of "otp not found, try to resend" if the OTP was not found in the database.
500 Internal Server Error with an error message if there was a problem deleting the OTP from the database.
