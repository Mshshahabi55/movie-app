import { store, dom } from "../state/store.js";
import { renderSidebar } from "../ui/sidebar.js";

export function loadFavs() {
    const stored = localStorage.getItem("favs");
    // console.table(JSON.parse(stored));
    store.favs = stored ? JSON.parse(stored) : [];
    updateBadge();
}

function saveFavs() {
    localStorage.setItem("favs", JSON.stringify(store.favs));
    updateBadge();
}

function updateBadge() {
    if (dom.favBadge) dom.favBadge.textContent = store.favs.length;
}

export function toggleFav(movie, btn) {
    const exists = store.favs.some(f => f.id === movie.id);
    if (exists) {
        store.favs = store.favs.filter(f => f.id !== movie.id);
    } else {
        store.favs.push(movie);
    }
    saveFavs();
    btn.classList.toggle("active", !exists);
    btn.textContent = !exists ? "❤️" : "🤍";
    renderSidebar();
}

export function removeFav(id) {
    store.favs = store.favs.filter(f => f.id !== Number(id));
    saveFavs();
    renderSidebar();
}