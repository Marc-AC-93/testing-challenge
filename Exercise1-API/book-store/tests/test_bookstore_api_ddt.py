""" Test cases for data-driven tests on the bookstore API """

import pytest
import json

@pytest.mark.parametrize('book_data', [
    {'title': 'Book 1', 'author': 'Author 1', 'published_date': '2022-01-01', 'isbn': '1111111111', 'price': 10.99},
    {'title': 'Book 2', 'author': 'Author 2', 'published_date': '2021-12-31', 'isbn': '2222222222', 'price': 11.99},
    {'title': 'Book 3', 'author': 'Author 3', 'published_date': '2023-03-15', 'isbn': '3333333333', 'price': 12.99},
])
def test_create_book_with_data(client, book_data):
    response = client.post('/books', json=book_data)
    assert response.status_code == 201
    assert response.content_type == 'application/json'

    created_book = json.loads(response.data)
    assert 'book_id' in created_book
    assert created_book['title'] == book_data['title']