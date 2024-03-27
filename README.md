# MobypayTask

This repository contains an end-to-end testing script written in Cypress for automating the testing of a comment section on a website called [TechInsightsBlog](https://techinsightsblog.com/) and a JSON postman collection for testing a weather API. This README will guide you through the setup and execution of the cypress test script as well as how to import and run test in postman using the provided collection.

## Running the Cypress Comment Section Testing

## Prerequisites

Before running the test script, ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

## Installation

1. Clone this repository to your local machine:

    ```
    git clone https://github.com/Mithila-Mehedi/MobypayTask.git
    ```

2. Navigate into the cloned repository:

    ```
    cd MobypayTask
    ```

3. Install the dependencies:

    ```
    npm install
    ```

## Running the Tests

To execute the Cypress end-to-end test script, follow these steps:

1. Open Cypress test runner:

    ```
    npx cypress open
    ```

2. Once Cypress Test Runner is open, click on the test file named `comment.cy.js`.

3. Cypress will launch a browser window and run the tests automatically.

4. You can view the test execution in the Cypress Test Runner interface.

## Import and run postman collection

## Prerequisites

Before running the test script, ensure you have the following installed:

-   [Postman](https://www.postman.com/)

## Running API tests in Postman

To run Weather API testing in posting, follow these steps:

1. Download the Postman Collection from [this url](https://github.com/Mithila-Mehedi/MobypayTask/blob/main/MobypayTaskCollection.postman_collection.json) to your machine

2. Open Postman in your machine and click on import

3. Navigate and choose the postman collection json file

4. Head over to the overview section of the collection to find more details about the collection and how to run the tests
