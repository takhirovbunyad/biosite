from django.utils import timezone


from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    cover_image = models.ImageField(upload_to='books/covers/', blank=True, null=True)
    file = models.FileField(upload_to='books/files/', blank=True, null=True)

    def __str__(self):
        return self.title


class BookTest(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='tests')
    question = models.TextField()
    option_a = models.CharField(max_length=255, default="", blank=True)
    option_b = models.CharField(max_length=255, default="", blank=True)
    option_c = models.CharField(max_length=255, default="", blank=True)
    option_d = models.CharField(max_length=255, default="", blank=True)
    correct_answer = models.CharField(
        max_length=1,
        choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')],
        default='A'
    )
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.book.title} — {self.question[:30]}"


class Highlight(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='highlights')
    text = models.TextField()
    page_number = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Highlight in {self.book.title}"
