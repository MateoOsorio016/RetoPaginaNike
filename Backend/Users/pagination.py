from rest_framework.pagination import PageNumberPagination
# Custom Pagination for the User List
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100