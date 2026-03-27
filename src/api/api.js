const api = {
    key: "de9aa58a79ae4759596b9159d7630760",
    base: "https://api.themoviedb.org/3",
    images: "https://image.tmdb.org/t/p/w500",
    placeholder: "https://via.placeholder.com/500x750?text=No+Poster",
    actorFallback: "https://via.placeholder.com/200x200?text=No+Photo"
};

export async function fetchMovies(endpoint, page = 1) {
    // const url = `${api.base}${endpoint}?api_key=${api.key}&page=${page}`;
    // console.log('Fetching URL:', url); 
    const res = await fetch(`${api.base}${endpoint}?api_key=${api.key}&page=${page}`);  
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

export async function searchMovies(query, page = 1) {
    const res = await fetch(`${api.base}/search/movie?api_key=${api.key}&query=${query}&page=${page}`);
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

export async function getDetails(id) {
    const res = await fetch(`${api.base}/movie/${id}?api_key=${api.key}&append_to_response=credits`);
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

export default api;