document.addEventListener("DOMContentLoaded", () => {
  const highlightContainer = document.getElementById("highlight-container");
  const reloadBtn = document.getElementById("reloadBtn");

  // URL’dan book ID olish — masalan: /books/1/highlights/
  const bookId = window.location.pathname.split("/")[2];

  // Iqtiboslarni olish
  fetch(`/books/${bookId}/highlights/api/`)
    .then((res) => res.json())
    .then((data) => {
      highlightContainer.innerHTML = "";

      if (data.highlights && data.highlights.length > 0) {
        data.highlights.forEach((h) => {
          const div = document.createElement("div");
          div.className = "highlight";
          div.innerHTML = `
            <p>${h.text}</p>
            <small>📚 ${h.page ? `Sahifa ${h.page}` : "Sahifa ko‘rsatilmagan"} ${
              h.author ? `| ✍️ ${h.author}` : ""
            }</small>
          `;
          highlightContainer.appendChild(div);
        });
      } else {
        highlightContainer.innerHTML =
          "<p>📭 Hozircha bu kitob uchun iqtibos mavjud emas.</p>";
      }
    })
    .catch((err) => {
      console.error("Xatolik:", err);
      highlightContainer.innerHTML =
        "<p style='color:red;'>Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.</p>";
    });

  // Qayta yuklash tugmasi
  reloadBtn.addEventListener("click", () => {
    location.reload();
  });
});
