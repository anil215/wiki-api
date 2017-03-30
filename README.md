# wiki-api

A REST api created using node and express which is basicaly used to maintain the wiki records of a person. The wiki in this context
refers to the name of the entity being searched by the person. The api automatically saves that entity , searching for its details 
using the wikipedia api and stores it in a MongoDb database. Each entity stored has five parameters , a name the person searched
for , its details automatically fetched , a noted variable being true signifies that its completedAt property is assigned the time
at which the record was done. Other than this user authentication was implemented with a username and password so that the one user
may not be able to see the wikis of another person. The passwords were hashed and stored in a separate mongodb collection and the 
concept of tokens was used to provide a way to identify users.
The Routes created were as follows:

For the user:
POST /users => to sign up a new user
POST /users/login => to login an existing user
GET /users/me => This performs the duty of sending the respective user back , _id and email to grab the x-auth token
DELETE /users/token/me => loggin out the user by removing the x-auth from the tokens array.

For the wiki(applicable only for users already logged in):
POST /wikis => to create a new entry
GET /wikis => to get all the wikis for that particular user
GET /wikis/:id => to get the records for a particular wiki of the user
DELETE /wikis/:id => to delete the wiki with the particular id of the current user
PATCH /wikis/:id => to update the records of an individual wiki ,if noted is set to true the completedAt timstamp is updated


This api is flexible enough to adapt to changes like this api can also be used as a mailing agent where the person logs in using the 
user routes provided and a mere change of replacing the wikipedia api with the mailgun api would perform the role of sending the email
automatically.
