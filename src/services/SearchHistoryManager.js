import { store, dom } from "../state/store.js";

class SearchHistoryManager{
    constructor({ maxSize = 20, key = "reelio_search_history" } = {}){
        this.maxSize=maxSize;
        this.storageKey=key;
        
    }

    loadHistory(){
       const saved = localStorage.getItem(this.storageKey);

        if (saved) {
            try {
                store.searchHistory = JSON.parse(saved);
            } catch {
                store.searchHistory = [];
            }
        } else {
            store.searchHistory = [];
        }
        if (dom.historyBadge) dom.historyBadge.textContent = store.searchHistory.length;
    }

    // updateHistoryBadge() {
    //     const badgeHistory = dom.historyBadge;
    //     if (badgeHistory) {
    //         const count = this.history.length;
    //         badgeHistory.textContent = count;
    //         badgeHistory.style.display = count > 0 ? 'flex' : 'none';
    //     }
    // }

    saveHistory() {
        localStorage.setItem(this.storageKey, JSON.stringify(store.searchHistory));
        if (dom.historyBadge) dom.historyBadge.textContent = store.searchHistory.length;
    }

    addHistory(term) {
          term=term?.trim().toLowerCase();
          if (!term) return false;

          const existingIndex=store.searchHistory.findIndex(
               item=>item.term===term
          );

          const newEntry= {
            term,
            timestamp: new Date().toISOString(),
            date: Date.now()
          };

          if (existingIndex!==-1){
            store.searchHistory.splice(existingIndex,1);
          }

          store.searchHistory.unshift(newEntry);

          if (store.searchHistory.length>this.maxSize){
            store.searchHistory.pop();
          }

          this.saveHistory()
          return true;
    }

    getAllHistory() {
        return [...store.searchHistory];
    }

    getRecentHistory(limit=10) {
        return store.searchHistory.slice(0,limit);
    }

    removeHistory(term) {
        term=term?.trim().toLowerCase();

        store.searchHistory=store.searchHistory.filter(
            item=> item.term !== term
        );
        this.saveHistory();
    }

    clearHistory() {
        store.searchHistory=[];
        this.saveHistory();
    }

     formatTime(timestamp) {
        const now = Date.now();
        const diff = now - new Date(timestamp).getTime();

        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins} min ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days} days ago`;

        return new Date(timestamp).toLocaleDateString();
    }
}

export const searchHistoryManager = new SearchHistoryManager();