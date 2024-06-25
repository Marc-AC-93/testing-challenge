# PLAYWRIGHT


## Objective

Automate end-to-end test scenarios.


## Technical details

- **Language:** Typescript
- **Framework:** Playwright
    - **Test runner:** managed internally by config files in playwright
    - **Browsers:** Chrome, Safari, mobile chrome, mobile safari.
    - **Reporter:** Playwright / Allure

## Project structure

### app

- **bookstore_api:** contains the Python file with the Flask app (I made some modifications to return an error in case of passing very long strings in the author and title fields).
- **requirements.txt:** I listed the necessary libraries to install the project and run it in Docker or locally.

### Typescript files
- **tsconfig.json:** the rules applied for this project in TypeScript.
- **package.json:** the packages used in the project with some custom commands to facilitate its use.


### libs:

- **commands:** it has a series of commands to use bash both on macOS and Linux.

### src:

- **common:** contains common utilities among all projects for reuse.
- **configs:** contains data about test execution to be configurable by environment (I've set up 3 environments: local, stage, prod, which are currently the same, but it gives an idea of how it would be in a project where the app is deployed in all 3).
- **features:** here we find everything related to the exercise tests.
   - **Exercise1-API:**
      - **Helpers:** to preload everything necessary in the tests.
      - **Steps:** Definition and implementation of actions used in the tests.
      - **Tests:** API tests calling steps and helpers combining with different data inputs both randomized and personalized in the tests.
   - **Exercise2-UI:**
      - **Helpers:** to preload everything necessary in the tests.
      - **Pages:** Definition and implementation of the pages used for the UI test.
      - **Tests:** Web tests against debugBear using the pages and helpers defined in this domain.

### Docker
- **docker-compose:** contains the details about the image, adding volumes to map the test results to local folders
- **dockerfile:** All the steps to build the application in docker


### runTest.sh

- Script that uses a series of input parameters to understand which tests to run and executes them in the corresponding environment by internally configuring the project. Currently, the commands implemented to launch all scripts automatically would only be supported on macOS and Linux. 


## Setup

### Preconditions
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [python](https://www.python.org/downloads/)
- [docker desktop](https://www.docker.com/products/docker-desktop/)


### Steps to install the repository

1. Open the terminal
2. `cd <your_desired_folder>`
3. `git clone https://github.com/Marc-AC-93/testing-challenge-idoven.git`
4. Create your local env files:
   - src/configs/local.config.ts
   - src/configs/env/local/local.env
5. Install dependencies in local:
   - `npm run updatePlaywright`
   - `npm run updateProject`
6. Install allure (optional):
   - Install [java](https://www.java.com/en/download/help/download_options.html) 
   - `npm install -g allure-commandline --save-dev`

## Test runners

### Command
```
./runTests.sh [env] [config] -t [tag] -p [project] -i [User Interface] -h [headed] -r [reporter]
```

#### Env
```
env: Environment where tests are launched
   · local: launched directly in your local machine.
   · docker: build test repository in docker + launch the tests in docker container.
```

#### Config
```
config: Used config file to setup the test run
   · local: using local application
   · stage: using staging enviroenment
   · prod: using production enviroenment
```

#### Project
```
project: Optional parameter to select a project for current browser, by default if project is not defined will use all the browsers.
   · chrome
   · safari
   · mobileChrome
   · mobileSafari
   · worker (whithout browser)
```

#### Tag
```
tag: Optional parameter to filter test run, use any tag to select the filter desired.
```

#### Interface
```
Interface: Optional parameter to open the tests in UI mode with the traces alive during the test execution. 
```

#### Headed
```
headed: Optional parameter to open the tests with the browser to see the execution (just for web test runs). 
```

#### Reporter
```
reporter: Optional parameter to open a reporter once the test run finish, if reporter is not selected won't be opened at the end of test run. 
   · allure
   · playwright
```

### Example
```
./runTests.sh docker local
./runTests.sh docker stage -p worker -t api -r allure
./runTests.sh docker stage -p worker -t web -r playwright -i
```

## Test reports

- **Playwright:** Technical report for QA/DEVs
```
npm run report_playwright
```

- **Allure:** Business report for PO/PM or any project stakeholder
```
npm run report_allure
```

## References

- Playwright: [Documentation](https://playwright.dev/docs/intro)
