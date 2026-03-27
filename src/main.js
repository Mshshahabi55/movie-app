import { cacheDom, store, dom } from "./state/store.js";
import { loadFavs } from "./services/favorites.js";
import { bindEvents } from "./events/events.js";
import { showMovies } from "./ui/movies.js";
import { openModal, closeModal } from "./ui/modal.js";
import { openSidebar, closeSidebar, renderSidebar } from "./ui/sidebar.js";
import { fetchMovies, searchMovies } from "./api/api.js";

async function loadMovies(reset=false){
    if(store.loading) return;
    if(reset){ store.page=1; store.more=true; if(dom.endMsg) dom.endMsg.classList.add("hidden"); }
    if(!store.more){ if(dom.endMsg) dom.endMsg.classList.remove("hidden"); return; }

    store.loading=true;
    if(dom.loader) dom.loader.classList.remove("hidden");

    try{
        let moviesData;
        if(store.query) moviesData = await searchMovies(store.query, store.page);
        else if(store.filter==="favorites"){
            store.movies = store.favs;
            store.more = false;
            showMovies(store.favs,false);
            store.loading=false;
            if(dom.loader) dom.loader.classList.add("hidden");
            if(dom.endMsg) dom.endMsg.classList.toggle("hidden", store.favs.length !== 0);
            return;
        }
        else moviesData = await fetchMovies(`/movie/${store.filter}`,store.page);
        // console.log(moviesData);
        store.total=moviesData.total_pages;
        store.more=store.page<store.total;

        if(reset) store.movies=moviesData.results;
        else store.movies=[...store.movies,...moviesData.results];

        showMovies(moviesData.results,!reset);
        if(!store.more && dom.endMsg) dom.endMsg.classList.remove("hidden");

        store.page++;
    }catch(e){
        console.error(e);
        if(dom.grid) dom.grid.innerHTML='<div class="error">failed to load</div>';
    }finally{
        store.loading=false;
        if(dom.loader) dom.loader.classList.add("hidden");
    }
}

function resetAndLoad(filter){
    store.filter=filter;
    store.query="";
    dom.searchInp.value="";
    loadMovies(true);
}

function handleSearch(){
    const q = dom.searchInp.value.trim();
    store.query = q;
    if(!q){
        resetAndLoad(store.filter === "favorites" ? "favorites" : (store.filter || "popular"));
        return;
    }
    dom.filters.forEach(b=>b.classList.remove("filter-active"));
    store.filter = "";
    loadMovies(true);
}

window.loadMovies = loadMovies;
window.resetAndLoad = resetAndLoad;
window.handleSearch = handleSearch;
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener("DOMContentLoaded", ()=>{
    cacheDom(); 
    loadFavs();
    //  console.table(store.favs);
    if(localStorage.getItem("theme")) store.theme=localStorage.getItem("theme");
    document.documentElement.setAttribute("data-theme", store.theme);
    bindEvents();    
    loadMovies(true);    
});