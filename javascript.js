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

const suggestionsBox = document.querySelector(".suggestions");// создание переменной для блока с подсказками

const favoritesSection = document.querySelector(".favorites-cards");
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

//событие при вводе текста
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim(); //query = текст в инпуте, переведённый в нижний регистр и обрезанный от пробелов.
  suggestionsBox.innerHTML = ""; //очищаем список подсказок перед новым поиском
//проверка на пустую строку

  if (!query) {//если поле пустое
    suggestionsBox.style.display = "none";//то скрываем подсказки и прекращаем выполнение
    return;
  }

//получение всех карточек фильмов
  const allCards = document.querySelectorAll("main .card");//берем все карточки фильмов (card) внутри main.
  const matches = [];// создаем массив matches куда будем добавлять совпадение 
// поиск совпадение 
  allCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();//Для каждой карточки берём заголовок (<h3>).
    if (title.includes(query)) {//Если введённый текст (query) содержится в названии фильма
      matches.push({
        title: card.querySelector("h3").textContent,//(title.includes(query)), то добавляем этот фильм в массив matches.
        card//В matches кладём объект с title (название фильма) и самой карточкой card.
      });
    }
  });
//Если нет совпадений
  if (matches.length === 0) {
    suggestionsBox.style.display = "none";//Если фильмов по запросу нет — скрываем список подсказок.
    return;
  }

//Генерация списка подсказок
  matches.slice(0, 7).forEach(match => {//Берём первые 7 совпадений (чтобы список не был слишком длинным).
    const li = document.createElement("li");//Создаём новый <li> для каждой подсказки.
    li.textContent = match.title;//Вставляем в него название фильма.

//Клик по подсказке
    li.addEventListener("click", () => {//Если кликнули на подсказку:
      searchInput.value = match.title;//Заполняем input названием фильма.
      suggestionsBox.style.display = "none";//Скрываем список подсказок.
      openModal(match.card); // открываем модалку фильма
    });

//Добавляем подсказку в список
    suggestionsBox.appendChild(li);//Каждое li вставляем внутрь ul.suggestions.
  });

//Показываем подсказки
  suggestionsBox.style.display = "block";//Делаем список видимым.
});

// Скрывать подсказки при клике вне
document.addEventListener("click", (e) => {//Вешаем обработчик клика на весь документ.
  if (!e.target.closest(".search-input") && !e.target.closest(".suggestions")) {//Если клик был не по input и не по списку подсказок — скрываем подсказки.
    suggestionsBox.style.display = "none";
  }


});

// ==== Избранное ====
function addToFavorites(card) {
  const title = card.querySelector("h3").textContent;
  const img = card.querySelector("img").src;
  const desc = card.querySelector(".card-desc")?.textContent || "Описание отсутствует";

  const film = { title, img, desc };

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // проверка, чтобы не дублировать
  if (!favorites.some(f => f.title === film.title)) {
    favorites.push(film);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Фильм добавлен в избранное!");
  } else {
    alert("Этот фильм уже в избранном!");
  }
}

// ==== Навешиваем слушатели на кнопки в карточках ====
document.querySelectorAll(".btn-add-fav").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // чтобы не открывалась модалка при клике
    const card = e.target.closest(".card");
    addToFavorites(card);
  });
});
