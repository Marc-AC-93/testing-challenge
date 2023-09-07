.PHONY: run_tests


lint_tests:
	pylint tests/test_bookstore_api_boundary.py
	pylint tests/test_bookstore_api_CRUD.py
	pylint tests/test_bookstore_api_ddt.py


run_tests_all:
	poetry run pytest tests/


run_tests_boundary:
	poetry run pytest tests/test_bookstore_api_boundary.py


run_tests_crud:
	poetry run pytest tests/test_bookstore_api_crud.py


run_tests_ddt:
	poetry run pytest tests/test_bookstore_api_ddt.py
	
