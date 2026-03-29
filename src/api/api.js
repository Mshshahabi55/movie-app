const api = {
    key: "de9aa58a79ae4759596b9159d7630760",
    base: "https://api.themoviedb.org/3",
    images: "https://image.tmdb.org/t/p/w500",
    placeholder: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'500'%20height%3D'750'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23cccccc'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23666666'%20font-size%3D'28'%20font-family%3D'Arial'%3ENo%20Poster%3C%2Ftext%3E%3C%2Fsvg%3E",
    actorFallback: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23cccccc'/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20dominant-baseline%3D'middle'%20text-anchor%3D'middle'%20fill%3D'%23666666'%20font-size%3D'18'%20font-family%3D'Arial'%3ENo%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E"
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