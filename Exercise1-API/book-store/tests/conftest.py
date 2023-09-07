""" This module contains the fixtures for the tests. """

import pytest
from api.bookstore_api import app, initialize_database 

# NOTES:
# To run tests we don't need to run Flask app in parallel (What I thought first).
# The client fixture is used to make requests to the Flask app.
# To run tests, we actually don't touch the Flask app directly. 
# Instead, we use the client fixture to make requests to the Flask app.
# DB in client is different as in bookstore_api.py. 
# Therefore we need to initialize the DB in client.

@pytest.fixture
def client():
    """
    This function is a fixture that returns a test client for the Flask.

    Yields:
        FlaskClient: A test client for the Flask app.
    """
    app.config['TESTING'] = True
    with app.test_client() as client:
        initialize_database() # Initialize the database inside of the client
        yield client

    # client = app.test_client()
    # yield client