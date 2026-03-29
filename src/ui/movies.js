import { dom, store } from "../state/store.js";
import api from "../api/api.js";
import { toggleFav } from "../services/favorites.js";
import { openModal } from "./modal.js";

export function showMovies(movies, append=false){
    if(!append) dom.grid.innerHTML="";
    if(!movies || !movies.length){
        dom.grid.innerHTML = '<div class="empty">no movies found</div>';
        return;
    }
    movies.forEach(m=>buildCard(m));
}

function buildCard(m){
    const { id,title,poster_path,vote_average } = m;
    const card = document.createElement("div");
    card.className = "movie-card";
    const poster = poster_path? api.images+poster_path : api.placeholder;
    const isFav = store.favs.some(f=>f.id===id);
    card.innerHTML = `
        <img src="${poster}" class="movie-poster">
        <div class="movie-info">
            <h3>${title}</h3>
            <div class="movie-meta">
                <span class="rating">⭐ ${vote_average.toFixed(1)}</span>
                <button class="fav-icon ${isFav?"active":""}" data-id="${id}">${isFav?"❤️":"🤍"}</button>
            </div>
        </div>
    `;
    card.addEventListener("click", e=>{
        if(!e.target.classList.contains("fav-icon")) openModal(id);
    });
    const favBtn = card.querySelector(".fav-icon");
    favBtn.addEventListener("click", e=>{
        e.stopPropagation();
        toggleFav(m,favBtn);
    });
    dom.grid.appendChild(card);
}