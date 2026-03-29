import { store, dom } from "../state/store.js";
import { fetchMovies, searchMovies } from "../api/api.js";
import { showMovies } from "../ui/movies.js";

export async function loadMoviesPages(reset = false) {

    if (store.loading) return;

    if (reset) {

        store.page = 1;
        store.hasMorePages = true;
        dom.endMsg?.classList.add("hidden");

    }

    store.loading = true;
    dom.loader?.classList.remove("hidden");

    try {

        let data;

        if (store.query) {

            data = await searchMovies(store.query, store.page);

        } else {

            data = await fetchMovies(`/movie/${store.filter}`, store.page);

        }

        store.total = data.total_pages;
        store.hasMorePages = store.page < data.total_pages;

        if (reset) {
            store.movies = data.results;
        } else {
            store.movies = [...store.movies, ...data.results];
        }

        showMovies(data.results, !reset);

        store.page++;

    } catch (e) {

        dom.grid.innerHTML = '<div class="error">failed to load</div>';

    }

    store.loading = false;
    dom.loader?.classList.add("hidden");

}