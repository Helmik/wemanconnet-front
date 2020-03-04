const axios = require('axios');

const API_URL = 'http://127.0.0.1:3300'

export const getMovies = async (filter, orderBy) => {
    // Regresa una promesa
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/getMovies`, {
            params: {
                filter,
                orderBy
            }
        }).then(function (response) {
            let data = response.data.data.map(movie => {
                let img = movie.poster_path;
            
                if (movie.poster_path.charAt(0) === '/') {
                    img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                }
                movie.poster_path = img;
            
                return movie;
            });
            resolve(data);
        }).catch(function (error) {
            resolve([]);
            console.log(error);
        }).finally(function () {
            // always executed
        });
    });
};

export const updateMovie = async (movie) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/updateMovie`, {
            body: { movie }
        },
        {
            method: 'put',
            'Content-Type': 'application/json'
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            resolve([]);
            console.err(error);
        }).finally(function () {
            // always executed
        });
    });
};
