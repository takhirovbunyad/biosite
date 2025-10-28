document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    const resultBox = document.getElementById("resultBox");
    const scoreText = document.getElementById("scoreText");
    const retryBtn = document.getElementById("retryBtn");

    let questions = [];
    let currentIndex = 0;
    let score = 0;

    const bookId = window.location.pathname.split("/")[2];

    // === TESTLARNI YUKLASH ===
    fetch(`/books/${bookId}/test/api/`)
        .then(res => res.json())
        .then(data => {
            questions = data.questions;
            if (questions && questions.length > 0) {
                showQuestion();
            } else {
                questionContainer.innerHTML = "<p>Bu kitob uchun test mavjud emas.</p>";
                nextBtn.style.display = "none";
            }
        })
        .catch(err => {
            console.error("Xato:", err);
            questionContainer.innerHTML = "<p>Testlarni yuklashda xato yuz berdi.</p>";
            nextBtn.style.display = "none";
        });

    // === SAVOLNI KO‘RSATISH ===
    function showQuestion() {
        if (currentIndex >= questions.length) {
            showResult();
            return;
        }

        const q = questions[currentIndex];
        questionContainer.innerHTML = `<h3>${currentIndex + 1}. ${q.question}</h3>`;

        // Variantlar
        let variants = [
            { key: "A", text: q.option_a },
            { key: "B", text: q.option_b },
            { key: "C", text: q.option_c },
            { key: "D", text: q.option_d },
        ];

        // 🔀 Tasodifiy tartibda aralashtiramiz
        variants = shuffleArray(variants);

        // Variantlarni chiqaramiz
        optionsContainer.innerHTML = "";
        variants.forEach(opt => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = opt.text; // Harf yo‘q
            btn.dataset.value = opt.key;
            btn.addEventListener("click", () => handleAnswer(btn, q.correct_answer));
            optionsContainer.appendChild(btn);
        });

        document.getElementById("progress").textContent =
            `${currentIndex + 1} / ${questions.length}`;
    }

    // === TASODIFIY ARALASHTIRISH FUNKSIYASI ===
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // === JAVOBNI TEKSHIRISH ===
    function handleAnswer(selectedBtn, correctAnswer) {
        const buttons = document.querySelectorAll(".option-btn");

        // Barcha variantlarni bosishdan to‘xtatamiz
        buttons.forEach(btn => btn.disabled = true);

        if (selectedBtn.dataset.value === correctAnswer) {
            selectedBtn.style.background = "#22c55e"; // ✅ Yashil
            selectedBtn.style.color = "#fff";
            score++;
        } else {
            selectedBtn.style.background = "#ef4444"; // ❌ Qizil
            selectedBtn.style.color = "#fff";

            // To‘g‘ri javobni ham yashilga bo‘yamiz
            buttons.forEach(btn => {
                if (btn.dataset.value === correctAnswer) {
                    btn.style.background = "#22c55e";
                    btn.style.color = "#fff";
                }
            });
        }
    }

    // === KEYINGI SAVOL ===
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        showQuestion();
    });

    // === NATIJA ===
    function showResult() {
        questionContainer.style.display = "none";
        optionsContainer.style.display = "none";
        nextBtn.style.display = "none";
        document.querySelector(".btn-area").style.display = "none";

        const total = questions.length;
        const percent = Math.round((score / total) * 100); // 🔢 Foiz hisoblash

        scoreText.innerHTML = `
            Siz ${total} ta savoldan ${score} tasiga to‘g‘ri javob berdingiz! 🎯<br>
            <strong>${percent}% natija</strong> 🧾
        `;
        resultBox.style.display = "block";
    }

    // === QAYTA BOSHLASH ===
    retryBtn.addEventListener("click", () => {
        location.reload();
    });
});
