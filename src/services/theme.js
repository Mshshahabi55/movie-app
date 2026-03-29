import {store} from "../state/store.js";

export function loadTheme(){

store.theme=localStorage.getItem("theme")||"dark";

applyTheme();

}

export function toggleTheme(){

store.theme=store.theme==="dark"?"light":"dark";

applyTheme();

localStorage.setItem("theme",store.theme);

}

function applyTheme(){

document.documentElement.setAttribute("data-theme",store.theme);

}