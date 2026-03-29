import { dom, store } from "../state/store.js";
import { toggleFav } from "../services/favorites.js";
import { openSidebar, closeSidebar } from "../ui/sidebar.js";
import { openModal, closeModal } from "../ui/modal.js";
import { cacheDom } from "../state/store.js";
import { renderHistoryDropdown } from "../ui/historyUI.js";
import { searchHistoryManager } from "../services/SearchHistoryManager.js";

export function bindEvents() {

    dom.searchInp.addEventListener("keyup", e=>{
        if(e.key==="Enter") window.handleSearch();
    });

    dom.searchBtn.addEventListener("click", ()=>window.handleSearch());

    dom.filters.forEach(btn=>{
        btn.addEventListener("click", ()=>{
            dom.filters.forEach(b=>b.classList.remove("filter-active"));
            btn.classList.add("filter-active");
            window.resetAndLoad(btn.dataset.type);
        });
    });

    dom.themeBtn.addEventListener("click", ()=>{
        store.theme = store.theme==="dark"?"light":"dark";
        document.documentElement.setAttribute("data-theme",store.theme);
        localStorage.setItem("theme",store.theme);
    });

    dom.favsBtn.addEventListener("click", ()=>openSidebar());
    dom.closeSide.addEventListener("click", ()=>closeSidebar());

    dom.modal.addEventListener("click", e=>{
        if(e.target===dom.modal) closeModal();
    });

    document.addEventListener("keydown", e=>{
        if(e.key==="Escape") { closeModal(); closeSidebar(); }
    });

    window.addEventListener("scroll", ()=>{
        if(store.filter==="favorites") return;
        if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-300){
            if(!store.loading && store.hasMorePages) window.loadMoviesPages();
        }
    });


    dom.searchInp.addEventListener("focus", () => {
        renderHistoryDropdown();
    });

    dom.historyBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const wasHidden = dom.historyDropdown?.classList.contains("hidden");
        renderHistoryDropdown();
        // suppress the next document click to avoid immediate close
        dom._suppressHistoryDocClick = true;
        setTimeout(() => { dom._suppressHistoryDocClick = false; }, 150);
        if (wasHidden) dom.historyDropdown?.classList.remove("hidden");
        else dom.historyDropdown?.classList.add("hidden");
    });

    // close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!dom.historyDropdown) return;
        if (dom._suppressHistoryDocClick) { dom._suppressHistoryDocClick = false; return; }
        if (dom.historyDropdown.classList.contains("hidden")) return;
        if (!e.target.closest("#historyDropdown") && !e.target.closest("#historyBtn")) {
            dom.historyDropdown.classList.add("hidden");
        }
    });

    dom.historyList?.addEventListener("click", e => {
        const item = e.target.closest(".history-item");
        if (!item) return;

        const term = item.dataset.term;

        dom.searchInp.value = term;
        window.handleSearch();
        dom.historyDropdown?.classList.add("hidden");
    });

    dom.clearHistoryBtn?.addEventListener("click", () => {
        searchHistoryManager.clearHistory();
        renderHistoryDropdown();
        dom.historyDropdown?.classList.add("hidden");
    });
}