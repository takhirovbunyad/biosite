
from django.shortcuts import render
from .models import Book

def books_view(request):
    books = Book.objects.all()
    return render(request, 'books.html', {'books': books})



from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import BookTest, Book

def tests_page(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, "tests.html", {"book": book})

def tests_api(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    tests = BookTest.objects.filter(book=book).values(
        "id", "question", "option_a", "option_b", "option_c", "option_d", "correct_answer"
    )
    return JsonResponse({"book": book.title, "questions": list(tests)})


from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from .models import Book, Highlight

def highlights_view(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'highlights.html', {'book': book})

def highlights_api(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    highlights = Highlight.objects.filter(book=book).order_by('-created_at')

    data = []
    for h in highlights:
        data.append({
            "text": h.text,
            "page_number": h.page_number,
            "created_at": h.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return JsonResponse({"highlights": data})
