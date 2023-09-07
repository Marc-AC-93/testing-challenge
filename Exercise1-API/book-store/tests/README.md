# Testing Strategy

## Overview
This repository contains unit tests for the book-store folder (project). The testing strategy is designed to ensure the correctness and reliability of the API by covering various aspects, including boundary testing, CRUD (Create, Read, Update, Delete) operations, and data-driven testing.

## Testing Categories
### 1. CRUD operations testing
Test Files: test_bookstore_api_crud.py

### 2. Boundary testing
Test Files: test_bookstore_api_boundary.py

### 3. Data-Driven testing
Test Files: test_bookstore_api_ddt.py

## How to run the tests
### Prerequests:
- Python >= 3.10.6
- Poetry package manager

## Setup 
1. Clone repo to your local machine.
2. Open the project in your favorite code editor.
2. Navigate to the directory ```cd Exercice1-API/book-store```.
3. Perform ```poetry shell```.
4. Perform ```poetry install```.


## Running tests
Be sure you are located in directory where is makefile (Exercice1-API/book-store). 

### To run all tests
```make run_tests_all```

### To run boundary tests only
```make run_tests_boundary```

### To run CRUD tests only
```make run_tests_CRUD```

### To run data-drive tests only
```make run_tests_ddt```


## Test results
Test results will be displayed in the terminal, including pass/fail status and any error messages or traceback information.


Balbla