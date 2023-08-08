# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Screenshots

!["Main interface"](https://github.com/kevinheaslip/scheduler/blob/master/docs/application.png?raw=true)

!["Adding an appointment"](https://github.com/kevinheaslip/scheduler/blob/master/docs/appointment-form.png?raw=true)

!["Deleting an appointment"](https://github.com/kevinheaslip/scheduler/blob/master/docs/delete-confirmation.png?raw=true)

## Setup

1. Create a new repository using this repository as a template
2. Clone onto your local device
3. Install dependencies
  ```sh
  npm install
  ```
4. Clone [scheduler-api](https://github.com/kevinheaslip/scheduler-api) to your local device and follow the instructions to create and seed your database
5. Start scheduler-api server side (Interview Scheduler API)
  ```sh
  npm start
  ```
  The server side is available at ```http://localhost:8001/```

6. Start scheduler client side (Webpack Development Server)
  ```sh
  npm start
  ```
  The client side is available at ```http://localhost:8000/```

## Testing

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

### Running Cypress Testing Framework

1. Start scheduler-api server side (Interview Scheduler API) in test mode
  ```sh
  npm run test:server
  ```

2. Start scheduler client side (Webpack Development Server)
  ```sh
  npm start
  ```

3. Start Cypress Testing Framework
```sh
npm run cypress
```


## Dependencies

- node 10.x or above
- npm 5.x or above
- axios
- classnames
- node-sass
- normalize.css
- react
- react-dom
- react-scripts

Install dependencies with ```npm install```.

## Development dependencies

- @babel/core
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- prop-types
- react-test-renderer
- sass
- cypress@9.7.0

Install dependencies with ```npm install --save-dev```.