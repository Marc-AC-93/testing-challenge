from enum import Enum
from dataclasses import dataclass, field


class HTTPResponse(Enum):
    OK = 200
    CREATED = 201
    NO_CONTENT = 204
    BAD_REQUEST = 400
    NOT_FOUND = 404
    INTERNAL_SERVER_ERROR = 500


@dataclass
class SampleBook:
    title: str = field(default='Test Book')
    author: str = field(default='Test Author')
    published_date: str = field(default='2022-01-01')
    isbn: str = field(default='1234567890')
    price: float = field(default=33.99)