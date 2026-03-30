import { searchHistoryManager } from "../services/SearchHistoryManager.js";
import { cacheDom, store, dom } from "../state/store.js";
import { bindEvents } from "../events/events.js";

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function renderHistoryDropdown() {
    const history = searchHistoryManager.getRecentHistory(10);
    if (!dom.historyList) return;

    if (!history.length) {
        dom.historyList.innerHTML = `<div class="history-empty">No history</div>`;
        dom.historyDropdown?.classList.remove("hidden");
        return;
    }

    dom.historyList.innerHTML = history.map(item => `
        <div class="history-item" data-term="${escapeHtml(item.term)}">
            <span>🔍 ${escapeHtml(item.term)}</span>
            <span>${searchHistoryManager.formatTime(item.timestamp)}</span>
        </div>
    `).join("");

    dom.historyDropdown?.classList.remove("hidden");
    cacheDom();     
    bindEvents();   
}