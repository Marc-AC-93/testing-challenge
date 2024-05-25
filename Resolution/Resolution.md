## Hello Idoven team!

Let me introduce myself, I am Marc Aroca Cervigón and I love being a QA.

Before explaining the exercise, I would like to tell you why I chose the technologies I used.

The test project is in TypeScript with Playwright as the test framework for both API and web. The reason is that I don't have much time these days as I am in the process of a release, and currently, my knowledge of TypeScript is fresher than Python. However, if you would like me to redo the test in Python, I could do it starting from June 17th.

The entire exercise is in the Resolution folder. Let me explain the project structure:

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

- **Post:** I send a POST request and validate the error code and that the random fields I send in the body are in the response.
- **Get:** First, I make a new POST request and then validate that with the GET request without using a book ID, all the requested data is in the response of all books. Then, I validate individually that the book exists by adding the book ID in the URL with the fields sent in the POST request (status codes are also validated).
- **Update:** I make a POST request and modify the data with the PUT request, validating the status code and that the response of the update contains the new values.
- **Delete:* I make a POST request and then a DELETE request, validating the 204 status code and that the response is empty.

#### Error Conditions:

I'm going to group the errors to explain them since many share the same objective:

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

### Evidences:

I want to add evidence of the API test execution so that you can see the execution in Docker, locally, and the report without having to install the repository.

- **Test in local**

[api-local.mov](evidences%2Fapi-local.mov)

- **Allure report**

[api_tests_report.png](evidences%2Fapi_tests_report.png)

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