import requests from "./data.js";

const contentDiv = document.querySelector(".content");
const keys = Object.keys(requests);
const updatedKeys = keys.map((key) => key.slice(5).toLowerCase());
// console.log(updateKeys);

const base_url = "https://api.themoviedb.org/3";
const img_base_path = "https://image.tmdb.org/t/p/original";
const data = [];

for (let x in requests) {
    const promise = getDataFromURL(base_url + requests[x]);
    data.push(promise);
}

const finalData = await Promise.all(data);
displayData(finalData);

function displayData(data) {
    data.forEach((object, index) => {
        const movieWrapper = document.createElement("div");
        movieWrapper.classList.add("movieWrapper");
        object.results.forEach((movie) => {
            const parent = document.createElement("div");
            parent.classList.add("parent");
            const image = document.createElement("img");
            image.src = img_base_path + movie.poster_path;
            parent.append(image);
            movieWrapper.append(parent);
        });
        document.querySelector("#" + updatedKeys[index]).append(movieWrapper);
    });
}
async function getDataFromURL(url){
    const response = await fetch(url);
    console.log(response);
    const result = await response.json();
    return result;
}