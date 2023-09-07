""" Test cases for CRUD operations on the bookstore API """

import json

from tests.helper import HTTPResponse, SampleBook


def test_get_existing_books(client):
    books = client.get('/books').get_json()
    print(books)
    assert len(books) == 2
    assert books[0]['title'] == 'Book 1'
    assert books[1]['title'] == 'Book 2'


# Validate correct HTTP status codes.
def test_create_book_HTTP_status_code(client):
    response = client.post('/books', json=SampleBook())
    assert response.status_code == HTTPResponse.CREATED.value


def test_get_books_HTTP_status_code(client):
    response = client.get('/books')
    assert response.status_code == HTTPResponse.OK.value


def test_get_single_book_HTTP_status_code(client):
    response = client.get('/books/1')
    assert response.status_code == HTTPResponse.OK.value


def test_update_book_HTTP_status_code(client):
    response = client.put('/books/1', json=SampleBook())
    assert response.status_code == HTTPResponse.OK.value


def test_delete_book_HTTP_status_code(client):
    response = client.delete('/books/1')
    assert response.status_code == HTTPResponse.NO_CONTENT.value
    books = client.get('/books').get_json()
    print(books)


# Validate response payload, headers and fault conditions
def test_create_book(client):
    sample_book = SampleBook()
    response = client.post('/books', json=sample_book)
    assert response.content_type == 'application/json'

    created_book = json.loads(response.data)
    assert 'book_id' in created_book
    assert created_book['title'] == sample_book.title
    assert created_book['author'] == sample_book.author
    assert created_book['published_date'] == sample_book.published_date
    assert created_book['isbn'] == sample_book.isbn
    assert created_book['price'] == sample_book.price


def test_get_books(client):
    response = client.get('/books')
    assert response.content_type == 'application/json'


def test_get_single_book(client):
    response = client.post('/books', json=SampleBook())
    created_book = json.loads(response.data)
    book_id = created_book['book_id']

    response = client.get(f'/books/{book_id}')
    assert response.content_type == 'application/json'


def test_update_book(client):
    response = client.post('/books', json=SampleBook())
    created_book = json.loads(response.data)
    book_id = created_book['book_id']

    updated_data = {'title': 'New Updated Title'}

    response = client.put(f'/books/{book_id}', json=updated_data)
    assert response.content_type == 'application/json'

    updated_book = json.loads(response.data)
    assert updated_book['title'] == updated_data['title']


def test_delete_book(client):
    response = client.post('/books', json=SampleBook())
    created_book = json.loads(response.data)
    deleted_book_id = created_book['book_id']
    response = client.delete(f'/books/{deleted_book_id}')
    books = client.get('/books').get_json()

    for book in books:
        actual_book_id = book['book_id']
        assert actual_book_id != deleted_book_id


def test_get_nonexistent_book(client):
    response = client.get('/books/3')
    assert response.status_code == HTTPResponse.NOT_FOUND.value
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response


def test_update_nonexistent_book(client):
    response = client.put('/books/nonexistent_book_id', json={'title': 'Updated Title'})
    assert response.status_code == HTTPResponse.NOT_FOUND.value
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response


def test_delete_nonexistent_book(client):
    response = client.delete('/books/nonexistent_book_id')
    assert response.status_code == HTTPResponse.NOT_FOUND.value
    assert response.content_type == 'application/json'
    error_response = json.loads(response.data)
    assert 'error' in error_response








