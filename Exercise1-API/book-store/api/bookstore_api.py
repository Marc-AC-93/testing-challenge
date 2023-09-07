from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# In-memory database
books = []


# Utility function to find a book by ID
def find_book(book_id):
    print (books)
    return next((book for book in books if book['book_id'] == book_id), None)


# Utility function to initialize the database (add some initial books)
def initialize_database():
    # Add some initial books to the database
    books.append({'book_id': '1', 'title': 'Book 1', 'author': 'Author 1', 'published_date': '2022-01-01', 'isbn': '1111111111', 'price': 19.99})
    books.append({'book_id': '2', 'title': 'Book 2', 'author': 'Author 2', 'published_date': '2021-12-31', 'isbn': '2222222222', 'price': 29.99})


@app.route('/books', methods=['POST'])
def create_book():
    data = request.get_json()

    required_fields = ['title', 'author', 'published_date', 'isbn', 'price']
    if not all(field in data for field in required_fields):
        return make_response(
            jsonify({'error': 'Missing required fields'}), 400)

    new_book = {
        'book_id': str(len(books) + 1),
        'title': data['title'],
        'author': data['author'],
        'published_date': data['published_date'],
        'isbn': data['isbn'],
        'price': data['price']
    }

    books.append(new_book)
    return make_response(jsonify(new_book), 201)


@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)


@app.route('/books/<string:book_id>', methods=['GET'])
def get_single_book(book_id):
    book = find_book(book_id)
    if book is None:
        return make_response(jsonify({'error': 'Book not found'}), 404)
    return jsonify(book)


@app.route('/books/<string:book_id>', methods=['PUT'])
def update_book(book_id):
    book = find_book(book_id)
    if book is None:
        return make_response(jsonify({'error': 'Book not found'}), 404)

    data = request.get_json()
    for field in ['title', 'author', 'published_date', 'isbn', 'price']:
        if field in data:
            book[field] = data[field]
    return jsonify(book)


@app.route('/books/<string:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = find_book(book_id)
    if book is None:
        return make_response(jsonify({'error': 'Book not found'}), 404)

    books.remove(book)
    return make_response(
        jsonify({'message': 'Book deleted successfully'}), 204)


if __name__ == '__main__':
    # initialize_database()
    # print (books)
    app.run(debug=True)
