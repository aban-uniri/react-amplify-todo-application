# ToDo Application on AWS

## Setup

### Prerequisites:

- AWS Account
  - Documentation: https://docs.aws.amazon.com/polly/latest/dg/setting-up.html
- Node and NPM Installed
  - Documentation: https://nodejs.org/en/

### Preparation steps:

- Install AWS Amplify: `npm i -g @aws-amplify/cli`
- Log in to your AWS Account: `amplify configure`

- Bootstrap the React application: npx create-react-app to-do-app
- Move to the created directory: `cd to-do-app`
- Install required packages:

  - `npm i @material-ui/core`
  - `npm i @material-ui/icons`
  - `npm i react-snowfall`
  - `npm i aws-amplify`

  ### Initialize Amplify Project:

- `amplify init`
- Enter a name for the project: **todoapp**
- Enter a name for the project: **Yes**
- Select the authentication method you want to use: **AWS access keys**
  - accessKeyId: **Type in your Access Key ID**
  - secretAccessKey: **Type in your Secret Access Key**
- region: **us-east-1**

### Add backend infrastructure:

#### AWS Amplify wizard will guide you through these choices

- `amplify add api`
- Please select from one of the below mentioned services: **REST**
- Provide a friendly name for your resource to be used as a label for this category in the project: **todoAPI**
- Provide a path (e.g., /book/{isbn}): **/todo**
- Create a new Lambda function
- Provide an AWS Lambda function name: **ToDoManagerFunction**
- Choose the runtime that you want to use: **NodeJS**
- Choose the function template that you want to use: **CRUD function for DynamoDB (Integration with API Gateway)**
- Choose a DynamoDB data source option: **Create a new DynamoDB table**
- Please provide a friendly name for your resource that will be used to label this category in the project: **ToDoTable**
- Please provide table name: **ToDoTable**
- What would you like to name this column: **key**
- Please choose the data type: **string**
- Would you like to add another column? **Yes**
- What would you like to name this column: **todo**
- Please choose the data type: **map**
- Would you like to add another column? **No**
- Please choose partition key for the table: **key**
- Do you want to add a sort key to your table? **No**
- Do you want to add global secondary indexes to your table? **No**
- Do you want to add a Lambda Trigger for your Table? **No**
- Do you want to configure advanced settings? **No**
- Do you want to edit the local lambda function now? **No**
- Restrict API access? **No**
- Do you want to add another path? **No**

### Update backend lambda code

_In this step we update the Lambda code which executes on the API calls. We don't need all the boilerplate code for our simple application so I have cleaned it up a bit._

- Navigate to `/amplify/backend/function/ToDoManagerFunction/src/app.js`
- Update the code with code found in this repo

### Update the frontend code

_In this step we create the UI which the user can see, including the CSS styling._

- Navigate to `to-do-app/src`
- Update index.js to match with code found in this repo
- Add styles.css and update to match with code found in this repo
- Create a `components` directory
- Add files:
  - AddTodoForm.js
  - App.css
  - App.js
  - EditTodo.js
  - List.js
  - logo.png
  - Todo.js
- Update component files to match with code found in this repo

### Deploy backend infrastructure and test the application locally

_In this step we deploy the backend infrastructure to the cloud, including the API, Lambda code, DynamoDB table and IAM roles. Now we can start our application locally and update the list which will be saved in the DynamoDB table._

- `amplify push`
- Are you sure you want to continue? Yes
- `npm start`

### Add hosting to the project

_In the second to last step we create cloud infrastructure to make our application available on the internet._

- `amplify hosting add`
- Select the plugin module to execute: Amazon CloudFront and S3
- Select the environment setup: PROD (S3 with CloudFront using HTTPS)
- hosting bucket name: use the default

### Publish the application to access it from the internet

_In the final step we publish all of our cloud infrastructure and all of the backend and frontend code to the cloud to be publically available._

- `amplify publish`
- Are you sure you want to continue? Yes
- Your application's URL will be in the terminal once the deployment finishes

### Delete the project

_Since we haven't implemented authentication and it is never a good idea to leave cloud infrastructure laying around after being done with this project you should delete the project from the cloud._

- To avoid potential billing you can delete the cloud infrastructure with: `amplify delete`

### Practice feature

- With `amplify add auth` you can add authentication to the application, this will allow you to authenticate users (sign-up/sign-in/forgot-password)
- Frontend code will have to be updated as well
  - One way of implementation: `npm i @aws-amplify/ui-react` Amplify provides components with which you can wrap your App to add an authentication screen
