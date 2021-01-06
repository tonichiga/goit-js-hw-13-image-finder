import debounce from "lodash.debounce";
import template from "./template.hbs";
// import * as basicLightbox from "basiclightbox";

const key = `19788052-12e74352d9c3069c5841e3f0b`;

const refs = {
  search: document.querySelector(".search-form"),
  imageList: document.querySelector(".image__list"),
  imageElement: document.querySelector(".image__item"),
};

// refs.search.addEventListener(
//   "input",
//   debounce((e) => {
//     let searchInput = e.target.value.replace(/ /g, "+");
//     console.log(searchInput);
//     fetch(
//       `https://pixabay.com/api/?key=${key}&q=${searchInput}&per_page=12&page=1`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const markup = template(data);
//         refs.imageList.insertAdjacentHTML("beforeend", markup);
//       });
//   }, 1000)
// );

fetch(`https://pixabay.com/api/?key=${key}&q=flowers&per_page=12&page=1`)
  .then((response) => response.json())
  .then((data) => {
    const markup = template(data);
    refs.imageList.insertAdjacentHTML("beforeend", markup);

    // imageElement.addEventListener("click", (e) => {
    //   console.log(e);
    //   basicLightbox
    //     .create(
    //       `<img width="1400" height="900" src="https://placehold.it/1400x900">`
    //     )
    //     .show();
    // });
  });
const imageElement = document
  .querySelector(".image__list")
  .addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG") {
    }
  });
