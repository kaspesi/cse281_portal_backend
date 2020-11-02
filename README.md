# CSE281 Capstone Project Investigator Portal Backend


## Routes:
***
### POST /login
*** 
#### /admin
 * **Body**: 
   * email: String
   * password:  String
 * **Response**:  
  * sucess: Boolean
  * jwtToken:  Authentication
#### /investigator
 * **Body**: 
   * email: String
   * password:  String
* **Response**:  
  * sucess: Boolean
  * jwtToken:  Authentication
  
***
### POST /register
*** 
#### /admin
* **Body**
  * name:  String
  * email: String
  * password:  String
* **Response** 
  * sucess: Boolean
 
#### /investigator
* **Body**
  * name:  String
  * email: String
  * password:  String
* **Response** 
  * sucess: Boolean

***
 ### POST /investigate
*** 
* **Headers**
  * Content-Type:  multipart/form-data
* **Body**
  * photos:  Array of up to 12 images
* **Response** 
  * results:  Array of model results of size photos 

## Authentication
* Once sucessful login, must pass jwtToken when attempting to access protected requests
* Usage:  Pass jwtToken as request.headers.authorization
