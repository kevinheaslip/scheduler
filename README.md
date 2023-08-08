# Interview Scheduler

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors. Appointments can be between the hours of 12 PM and 5 PM, Monday to Friday. Each appointment has one student and one interviewer. When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list. The user can save the appointment and view the entire schedule of appointments on any day of the week. Appointments can also be edited or deleted. The front end of this project is built with React and makes requests to an API to fetch and store appointment data from a database.

## Screenshots

!["Main interface"](https://github.com/kevinheaslip/scheduler/blob/master/docs/application.png?raw=true)

!["Adding an appointment"](https://github.com/kevinheaslip/scheduler/blob/master/docs/appointment-form.png?raw=true)

!["Deleting an appointment"](https://github.com/kevinheaslip/scheduler/blob/master/docs/delete-confirmation.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
