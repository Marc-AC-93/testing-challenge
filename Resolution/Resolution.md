## Hello Idoven team!

Let me introduce myself, I am Marc Aroca Cervigón and I love being a QA.

Before explaining the exercise, I would like to tell you why I chose the technologies I used.

The test project is in TypeScript with Playwright as the test framework for both API and web. The reason is that I don't have much time these days as I am in the process of a release, and currently, my knowledge of TypeScript is fresher than Python. However, if you would like me to redo the test in Python, I could do it starting from June 17th.

The entire exercise is in the Resolution folder. Let me explain the project structure:

For more details about technical information, how to setup the project and launch the test cases, please read the [README.MD](README.md) file.

Next, I'll explain the resolution of the two exercises:

### Exercise1-API:
I've added conditions to the API to return an error if the title or author fields exceed 99 characters to create tests related to this requirement (both in the POST and PUT methods).

The API tests are located in the following path:

I've created 3 groups of tests:

- CRUD
- Error conditions
- E2E data-driven

In each request I make, I use faker-js to generate random data, and this is initialized in the fixture so that random data is always preloaded in all requests automatically.

#### CRUD:

- **POST:** A POST request is sent, and the error code is verified. This test also checks that random fields included in the body are present in the response.
- **GET:** A POST request is executed to create new data. Then, the test conducts two validations: one with all books for a generic GET request and searches inside the response to ensure that the new book is present. The second GET request involves appending the book_id to the URL to verify that only the data for the new book is retrieved.
- **Update:** Data creation is initiated with a POST request, followed by modification using a PUT request. Both the status code and the response content are validated to ensure that the update contains the new values.
- **Delete:** Data creation is initiated with a POST request, followed by a DELETE request. The status code is verified to ensure it is 204, indicating success, and confirmation is made that the response is empty.

#### Error Conditions:

I'm going to group the error conditions to explain the tests since many of them are sharing the same objective:

- **POST:** Error when sending a POST without the mandatory fields.
- **GET-PUT-DELETE:** Error when sending a GET with an incorrect book_id.
- **POST-UPDATE:** Error when sending the title and author fields with more than 99 characters.


#### E2E:

An end-to-end test that creates a book, retrieves that book, edits it, and deletes it, managing this test using the data-driven-test technique to repeat it iteratively with different data.

### BUGS found in the API:

- **BUG-1:** Allows long strings (fixed to create some related tests).
- **BUG2-2:** Allows the use of dates in multiple formats; the requirement asked only for yyyy-mm-dd.
- **BUG-3:** Negative price.
- **BUG-4:** The price was supposed to be in float format but allows sending it as a string.

### Test result report:

- **Recording executing the tests with docker**: [Google Drive video url](https://drive.google.com/file/d/1ihHF9BdirivWyjJi2lm30zGzoYegA6SP/view?usp=sharing)
- **Test results with allure reporter image:** [api_tests_report.png](evidences%2Fapi_tests_report.png)

### Exercise2-UI:

To conduct the UI exercise tests, I have devised the following scenarios:

- **Data-driven tests:** You can pass an array of URLs where it will check the report it generates.
- **URL with correct format but does not exist:** Input a URL and generate a report with an error message as it failed to generate the report for that website.
- **URL with incorrect format:** Does not generate the report and returns an error notification.
Challenges:

- It takes a long time to generate the report, and I had to set very long wait times to avoid test failures due to timeouts.
- When making many requests, it blocks you and prevents you from sending more report requests with the free plan, so I couldn't upload evidence since I can't continue running the tests right now, but luckily, I managed to finish them.

Attached is evidence of the error that appears when requesting a new report.

[debugBear.png](evidences%2FdebugBear.png)