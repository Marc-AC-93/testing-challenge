""" Test cases for boundary conditions on the bookstore API """

import json

from tests.helper import HTTPResponse, SampleBook


MAX_TITLE_LENGTH = 100


def test_long_title(client):
    # Generate a book with a very long title
    sample_book = SampleBook()
    long_title_book = sample_book
    long_title_book.title = 'A' * 1000  # Create a title with 1000 characters

    response = client.post('/books', json=long_title_book)
    assert response.status_code == HTTPResponse.BAD_REQUEST.value
    error_response = json.loads(response.data) # Parse JSON response to get the error message
    assert 'error' in error_response
    assert error_response['error'] == 'Title is too long'


def test_negative_price(client):
    # Generate a book with a negative price
    sample_book = SampleBook()
    negative_price_book = sample_book
    negative_price_book['price'] = -10.99

    response = client.post('/books', json=negative_price_book)
    assert response.status_code == HTTPResponse.BAD_REQUEST.value
    error_response = json.loads(response.data) # Parse JSON response to get the error message
    assert 'error' in error_response
    assert error_response['error'] == 'Price cannot be negative'  


def test_empty_title(client):
    # Generate a book with an empty title
    sample_book = SampleBook()
    empty_title_book = sample_book
    empty_title_book['title'] = ''

    response = client.post('/books', json=empty_title_book)
    assert response.status_code == HTTPResponse.BAD_REQUEST.value
    error_response = json.loads(response.data)
    assert 'error' in error_response
    assert error_response['error'] == 'Empty title'