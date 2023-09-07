# Book Store REST API

1. `POST /books` - Create a new book
2. `GET /books` - Retrieve a list of all books
3. `GET /books/{book_id}` - Retrieve details of a single book
4. `PUT /books/{book_id}` - Update a book's details
5. `DELETE /books/{book_id}` - Delete a book

### API Schema for Book

```json
{
  "book_id": "string",
  "title": "string",
  "author": "string",
  "published_date": "YYYY-MM-DD",
  "isbn": "string",
  "price": "float"
}
```

## Requirements

Install with poetry:

```shell script
poetry shell
poetry install 
```

## How to run the API

```bash
poetry run python api/bookstore_api.py

```

Your API will start running at **`http://127.0.0.1:5000/`**.

### **API Endpoints:**

- **Create a New Book**: POST request to **`http://127.0.0.1:5000/books`**
- **Retrieve All Books**: GET request to **`http://127.0.0.1:5000/books`**
- **Retrieve a Single Book**: GET request to **`http://127.0.0.1:5000/books/{book_id}`**
- **Update a Book**: PUT request to **`http://127.0.0.1:5000/books/{book_id}`**
- **Delete a Book**: DELETE request to **`http://127.0.0.1:5000/books/{book_id}`**

You can modify the code to add more complexity if desired. After completing the API, testers can begin creating unit tests for these endpoints following the challenge guidelines.

## Run Tests

TO DO by candidate
