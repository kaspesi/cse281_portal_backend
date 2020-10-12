# CSE281 Capstone Project Investigator Portal Backend


## Routes:

### POST /login
* **Body**: 
  * email: String
  * password:  String

* **Response**:  
  * sucess: Boolean
  * jwtToken:  Authentication

### POST /register
* **Body**
  *name:  String
  *email: String
  *password:  String
  
* **Response** 
  *sucess: Boolean
