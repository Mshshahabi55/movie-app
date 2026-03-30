export const store = {
    page: 1,
    total: 1,
    filter: "popular",
    query: "",
    loading: false,
    more: true,
    movies: [],
    favs: [],
    theme: "dark",
    searchHistory:[]
};

export const dom = {};
export function cacheDom() {
    dom.grid = document.getElementById("grid");
    dom.searchInp = document.getElementById("searchInput");
    dom.searchBtn = document.getElementById("searchBtn");
    dom.themeBtn = document.getElementById("themeBtn");
    dom.favsBtn = document.getElementById("favsBtn");
    dom.sidebar = document.getElementById("sidebar");
    dom.closeSide = document.getElementById("closeSidebar");
    dom.favList = document.getElementById("favList");
    dom.favBadge = document.getElementById("favBadge");    
    dom.modal = document.getElementById("modal");
    dom.modalBody = document.getElementById("modalBody");
    dom.loader = document.getElementById("loader");
    dom.endMsg = document.getElementById("end");
    dom.filters = document.querySelectorAll(".filter");
    // ***  history Elements
    dom.historyBtn = document.getElementById("historyBtn");
    dom.historyBadge = document.getElementById("history-badge");
    dom.historyDropdown = document.getElementById("historyDropdown");
    dom.historyList = document.getElementById("historyList");
    dom.clearHistoryBtn = document.getElementById("clearHistoryBtn");
    dom.historySidebar = document.getElementById("historySidebar");
    dom.historySidebarList = document.getElementById("historySidebarList");
}