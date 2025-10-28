from django.urls import path
from myapp import views
urlpatterns = [
    path('', views.books_view, name='books'),
    path("books/<int:book_id>/test/", views.tests_page, name="tests_page"),
    path("books/<int:book_id>/test/api/", views.tests_api, name="tests_api"),
    path("books/<int:book_id>/highlights/", views.highlights_view, name="highlights"),
    path("books/<int:book_id>/highlights/api/", views.highlights_api, name="highlights_api"),
]