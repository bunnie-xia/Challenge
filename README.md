# Challenge

Run Commands

`npm install`

`npm run start-server`

API List:

Image:

* All images
  GET http://localhost:8080/api/product
* Search images
  GET http://localhost:8080/api/search/{keyword}
* Get an image
  GET http://localhost:8080/api/product/{id}
* Update
  PUT http://localhost:8080/api/product/{id}
* Delete
  DELETE http://localhost:8080/api/product/{id}

User Features:

* Login
  POST http://localhost:8080/auth/login
* Signup
  POST http://localhost:8080/auth/signup
* Logout
  POST http://localhost:8080/auth/logout
* Update
  PUT http://localhost:8080/api/user/{id}
