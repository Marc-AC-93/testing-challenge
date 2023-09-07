import json
import pytest
from your_flask_app import app  # Replace 'your_flask_app' with the actual name of your Flask app

# A sample book data for testing
sample_book = {
    'title': 'Test Book',
    'author': 'Test Author',
    'published_date': '2022-01-01',
    'isbn': '1234567890',
    'price': 19.99
}

@pytest.fixture
def client():
    app.config['TESTING'] = True
    client = app.test_client()
    yield client

# Test Cases for Create, Read, Update, and Delete Operations

def test_create_book(client):
    response = client.post('/books', json=sample_book)
    assert response.status_code == 201
    assert response.content_type == 'application/json'

    created_book = json.loads(response.data)
    assert 'book_id' in created_book
    assert created_book['title'] == sample_book['title']

def test_get_books(client):
    response = client.get('/books')
    assert response.status_code == 200
    assert response.content_type == 'application/json'

def test_get_single_book(client):
    response = client.post('/books', json=sample_book)
    created_book = json.loads(response.data)
    book_id = created_book['book_id']

    response = client.get(f'/books/{book_id}')
    assert response.status_code == 200
    assert response.content_type == 'application/json'

def test_update_book(client):
    response = client.post('/books', json=sample_book)
    created_book = json.loads(response.data)
    book_id = created_book['book_id']

    updated_data = {'title': 'Updated Title'}

    response = client.put(f'/books/{book_id}', json=updated_data)
    assert response.status_code == 200
    assert response.content_type == 'application/json'

    updated_book = json.loads(response.data)
    assert updated_book['title'] == updated_data['title']

def test_delete_book(client):
    response = client.post('/books', json=sample_book)
    created_book = json.loads(response.data)
    book_id = created_book['book_id']

    response = client.delete(f'/books/{book_id}')
    assert response.status_code == 204

# Test Scenarios for Fault Conditions

def test_get_nonexistent_book(client):
    response = client.get('/books/nonexistent_book_id')
    assert response.status_code == 404
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response

def test_update_nonexistent_book(client):
    response = client.put('/books/nonexistent_book_id', json={'title': 'Updated Title'})
    assert response.status_code == 404
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response

def test_delete_nonexistent_book(client):
    response = client.delete('/books/nonexistent_book_id')
    assert response.status_code == 404
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response

# Boundary Tests

def test_long_title(client):
    # Generate a book with a very long title
    long_title_book = sample_book.copy()
    long_title_book['title'] = 'A' * 1000  # Create a title with 1000 characters

    response = client.post('/books', json=long_title_book)
    assert response.status_code == 201

def test_negative_price(client):
    # Generate a book with a negative price
    negative_price_book = sample_book.copy()
    negative_price_book['price'] = -10.99

    response = client.post('/books', json=negative_price_book)
    assert response.status_code == 201

# Data-Driven Tests with Multiple Sets of Data

@pytest.mark.parametrize('book_data', [
    {'title': 'Book 1', 'author': 'Author 1', 'published_date': '2022-01-01', 'isbn': '1111111111', 'price': 19.99},
    {'title': 'Book 2', 'author': 'Author 2', 'published_date': '2021-12-31', 'isbn': '2222222222', 'price': 29.99},
    {'title': 'Book 3', 'author': 'Author 3', 'published_date': '2023-03-15', 'isbn': '3333333333', 'price': 39.99},
])
def test_create_book_with_data(client, book_data):
    response = client.post('/books', json=book_data)
    assert response.status_code == 201
    assert response.content_type == 'application/json'

    created_book = json.loads(response.data)
    assert 'book_id' in created_book
    assert created_book['title'] == book_data['title']