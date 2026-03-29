import { dom } from "../state/store.js";
import { getDetails } from "../api/api.js";
import api from "../api/api.js";

export async function openModal(id) {
    dom.modal.classList.remove("hidden");
    dom.modalBody.innerHTML = "<div class='loader' style='padding:40px'>loading...</div>";
    try {
        const movie = await getDetails(id);
        console.log(movie);
        const poster = movie.poster_path ? api.images + movie.poster_path : api.placeholder;
        const cast = movie.credits?.cast?.slice(0,8) || [];
        // console.log(cast);
        const director = movie.credits?.crew?.find(c => c.job === "Director");
        console.log(director);
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "";
        let castHtml = "";
        if(cast.length){
            castHtml = `<h3>🎭 cast</h3><div class="cast-grid">${cast.map(a=>`<div class="cast-item"><img src="${a.profile_path?api.images+a.profile_path:api.actorFallback}"><p>${a.name}</p></div>`).join("")}</div>`;
        }
        dom.modalBody.innerHTML = `
            <div class="modal-card">
                <img src="${poster}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                ${movie.tagline?`<p><em>${movie.tagline}</em></p>`:""}
                <p>${movie.overview||"no overview"}</p>
                <div class="detail-row">
                    <span class="detail-item">⭐ ${movie.vote_average} (${movie.vote_count})</span>
                    ${movie.runtime?`<span class="detail-item">⏱️ ${movie.runtime} min</span>`:""}
                    ${year?`<span class="detail-item">📅 ${year}</span>`:""}
                </div>
                ${director?`<h3>🎬 director: ${director.name}</h3>`:""}
                ${castHtml}
                <button class="close-modal" onclick="closeModal()">close</button>
            </div>
        `;
    } catch(e){
        dom.modalBody.innerHTML = `<div class="error">something went wrong</div><button class="close-modal" onclick="closeModal()">close</button>`;
    }
}

export function closeModal() {
    dom.modal.classList.add("hidden");
}