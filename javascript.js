// ==== 1. Элементы ====
const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const modalText = document.querySelector(".modal-text");
const closeBtn = document.querySelector(".close-btn");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-bar a");

const searchInput = document.querySelector(".search-input");
const searchResultsSection = document.querySelector(".search-results .cards");

// ==== 2. Функция открытия модалки ====
function openModal(card) {
  const img = card.querySelector("img").src;
  const title = card.querySelector("h3").textContent;
  const descEl = card.querySelector(".card-desc");
  const desc = descEl ? descEl.textContent : "Описание отсутствует";

  modalImg.src = img;
  modalText.innerHTML = `<h2>${title}</h2><p>${desc}</p>`;
  modal.classList.remove("hidden");
}

// ==== 3. Навешиваем на все карточки открытие модалки ====
function attachModalListeners(cardsNodeList) {
  cardsNodeList.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });
}
attachModalListeners(cards);

// ==== 4. Закрытие модалки ====
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// ==== 5. Подсветка активного пункта меню при скролле ====
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 80) { // 80 — высота шапки
        current = section.getAttribute("id");
      }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ==== 6. Поиск фильмов ====
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  searchResultsSection.innerHTML = ""; // очищаем результаты поиска

  if (query.trim() === "") return;

  const allCards = document.querySelectorAll("main .card");

  allCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    const descEl = card.querySelector(".card-desc");
    const desc = descEl ? descEl.textContent.toLowerCase() : "";

    if (title.includes(query) || desc.includes(query)) {
      const clone = card.cloneNode(true);
      clone.style.border = "2px solid var(--accent)";
      clone.style.backgroundColor = "rgba(79, 172, 254, 0.1)";
      searchResultsSection.appendChild(clone);
    }
  });

  // Навешиваем на новые карточки открытие модалки
  const newCards = searchResultsSection.querySelectorAll(".card");
  attachModalListeners(newCards);
});
