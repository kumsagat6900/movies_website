document.addEventListener("DOMContentLoaded", () => {
    const favoritesSection = document.querySelector(".favorites-cards");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (favorites.length === 0) {
      favoritesSection.innerHTML = "<p>У вас пока нет избранных фильмов.</p>";
      return;
    }
  
    favorites.forEach(film => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${film.img}" class="card-img" alt="${film.title}">
        <h3>${film.title}</h3>
        <p class="card-desc">${film.desc}</p>
      `;
      favoritesSection.appendChild(card);
    });
  });
  