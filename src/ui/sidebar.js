import { dom, store } from "../state/store.js";
import api from "../api/api.js";
import { removeFav } from "../services/favorites.js";
import { openModal } from "./modal.js";

export function openSidebar() {
    dom.sidebar.classList.remove("hidden");
    dom.sidebar.classList.add("open");
    renderSidebar();
}

export function closeSidebar() {
    dom.sidebar.classList.remove("open");
    dom.sidebar.classList.add("hidden");
}

export function renderSidebar() {
    if(!store.favs.length){
        dom.favList.innerHTML = '<p class="no-favs">no favorites yet 🤍</p>';
        return;
    }
    dom.favList.innerHTML = store.favs.map(m=>`
        <div class="fav-item" data-id="${m.id}">
            <img src="${m.poster_path?api.images+m.poster_path:api.placeholder}">
            <div class="fav-item-info">
                <h4>${m.title}</h4>
                <p>⭐ ${m.vote_average}</p>
            </div>
            <button class="remove-fav" data-id="${m.id}">✖</button>
        </div>
    `).join("");

    dom.favList.querySelectorAll(".fav-item").forEach(item=>{
        item.addEventListener("click", ()=>openModal(item.dataset.id));
    });

    dom.favList.querySelectorAll(".remove-fav").forEach(btn=>{
        btn.onclick = e=>{
            e.stopPropagation();
            removeFav(btn.dataset.id);
        };
    });
}