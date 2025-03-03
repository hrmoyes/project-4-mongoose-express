# SEIR Project  `Project hub` - API
 
This is the backend app, designed to work with the client app.
Repo to the client app is here:
https://github.com/tylly/project-4-react
 
## About `Project hub`
 
## Technology
We will be using a Node server, with Mongoose and Express for our back end app, that will support full CRUD actions.
The app will utilize AWS to store the uploaded images and MongoDB Atlas as the cloud database.
Dependencies are all managed by NPM with emphasis on AWS-SDK package and Multer package to handle the upload to AWS.
Links to all technologies will be provided at the end of this document.
 
### Installation instructions
To use this app you will need to install all dependencies needed, and you can do that by running these commands in your command line:
 
```
$ npm install
```
```
$ npm start
```
 
This app will require an AWS account and an AWS bucket to be set up (see link to AWS below).
You will also need to set up an environment file (.env) with the following items:
TBD
- AWS key ID
- AWS secret key ID
- AWS bucket name
 
AWS_ACCESS_KEY_ID=" "
AWS_SECRET_ACCESS_KEY=" "
BUCKET=" "
 

### Stretch Goals
- likes
- comments
- project rating system
&nbsp;
&nbsp;
## Route Table
- ### User Authentication
   | Verb   | URI Pattern         | Controller#Action |
   | ------ | ------------------- | ----------------- |
   | POST   | `/sign-up`          | `users # signup`    |
   | POST   | `/sign-in`          | `users # signin`    |
   | PATCH  | `/change-password/` | `users # changepw`  |
   | DELETE | `/sign-out/`        | `users # signout `  |

- ### Projects
   | Verb   | URI Pattern | Controller#Action    |
   | ------ | ----------- | -------------------- |
   | GET    | `/projects` | `projects # index` |
   | GET    | `/projects/:projectId` | `projects # show` |
   | GET    | `/myProjects`| `projects # personal show` |
   | POST   | `/projects` | `project # add` |
   | PATCH  | `/projects/:projectId`  | `projects # update`|
   | DELETE | `/projects/:projectId`  | `projects # destroy`|

- ### Developer routes
   | Verb   | URI Pattern         | Controller#Action |
   | ------ | ------------------- | ----------------- |
   | GET   | `/developers` | `developers # index`    |
    | GET   | `/developers/:devId`| `developers # show`    |
   | POST   | `/developers` | `add # add`    |
   | PATCH  | `/developers/:devId` | `developers # update`  |
   | DELETE | `/developers/:devId` | `developers # destroy `  |

&nbsp;
&nbsp;    
### ERD
![](app/images/ERD%203.48.59%20PM.png)
&nbsp;
&nbsp;
## Schema
- ### User
   - email: string
       - required
       - unique
   - username: string
       - required
       - unique
   - hashedPassword: string
       - required
   - token: string
   - timestamps
  
- ### Project
   - title: String
   - description: String
   - tags: [ ]
   - image: url(?) w aws
   - deployment: String
   - frontEndRepo: String
   - backEndRepo: String
   - developers: [ ]
   - owner: User ref Object Id
       - required
 
- ### Developers
   - name: String
   - github: String (url)
   - linkedIn: String (url)
&nbsp;
 
## Development Roles
- Project Overlord: James Adams
- Front-End SME: Amanda Corral
- Back-End SME: Hayden Moyes
- General Dev: Shai Aloni
 
### Technology Links:
TBD
###### AWS - https://aws.amazon.com/
###### Mongoose JS - https://mongoosejs.com/
###### MongoDB - https://www.mongodb.com/
###### NPM JS - https://www.npmjs.com/


