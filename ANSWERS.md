<!-- Answers to the Short Answer Essay Questions go here -->

1.  Describe Middleware, Sessions (as we know them in express), bcrypt and JWT.

Middleware is a function that can get the request and response object and operate on them.
Sessions allow the server to store information about a client and allows that data to persist across requests.
bcrypt is a way to encrypt passwords that is extremely resistant to hackers
JWT(JSON Web Token) is used to add authentication to a Web API and transfer data between two parties securely.

2.  What does bcrypt do in order to prevent attacks?

bcrypt hashes the password and implements salting to encrypt a password.


3.  What are the three parts of the JSON Web Token?

1) The Header. Contains the algorithm with the token type.
2) The Payload. Contains the information that we want to store in the token.
3) The Signature. Made by encoding the header and payload and signing with a secret.
