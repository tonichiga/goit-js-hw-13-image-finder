import debounce from "lodash.debounce";
import template from "./template.hbs";
import * as basicLightbox from "basiclightbox";
import templateImage from "./template-image.hbs";
// import { getImage } from "./loader.js";

// console.log(getImage);

const key = `19788052-12e74352d9c3069c5841e3f0b`;

const refs = {
  search: document.querySelector(".search-form"),
  imageList: document.querySelector(".image__list"),
  imageElement: document.querySelector(".image__item"),
  clearBtn: document.querySelector(".btn-clear"),
  searchForm: document.querySelector(".search-input"),
  container: document.querySelector(".container-main"),
  showMore: document.querySelector(".show-more"),
  // id: document.querySelector(".id"),
};

let pageCount = 1;

refs.search.addEventListener(
  "input",
  debounce((e) => {
    let searchInput = e.target.value.replace(/ /g, "+");

    fetch(
      `https://pixabay.com/api/?key=${key}&q=${searchInput}&per_page=12&page=${pageCount}`
    )
      .then((response) => response.json())
      .then((data) => {
        dataId(data.hits);
        refs.search.classList.add("move-top");
        refs.container.classList.add("move-top-bci");
        refs.showMore.style.display = "block";

        refs.imageList.innerHTML = "";

        const markup = template(data);

        refs.imageList.insertAdjacentHTML("beforeend", markup);

        // Observer

        const imageLink = document.querySelector(".image__link-item");

        const io = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            console.log(entry);
            if (entry.isIntersecting === true) {
              pageCount += 1;

              // fetch(
              //   `https://pixabay.com/api/?key=${key}&q=${searchInput}&per_page=12&page=${pageCount}`
              // )
              //   .then((response) => response.json())
              //   .then((data) => {
              //     dataId(data.hits);

              //   });
              const markup = template(data);
              refs.imageList.insertAdjacentHTML("beforeend", markup);

              // window.scrollBy({ top: innerHeight, behavior: "smooth" });
            }
          });
        });

        io.observe(refs.showMore);

        // Реализация кнопки show more

        refs.showMore.addEventListener("click", (e) => {});

        refs.clearBtn.addEventListener("click", (e) => {
          refs.showMore.style.display = "none";

          refs.search.classList.remove("move-top");
          refs.container.classList.remove("move-top-bci");

          // console.dir(refs.searchForm);
          refs.searchForm.value = "";
          refs.imageList.innerHTML = "";
        });
      });
  }, 1000)
);

let id = [];
let largeURL = "";
// fetch(`https://pixabay.com/api/?key=${key}&q=flowers&per_page=12&page=1`)
//   .then((response) => response.json())
//   .then((data) => {

//     const markup = template(data);

//     refs.imageList.insertAdjacentHTML("beforeend", markup);
//   });

let arrayData = [];

const dataId = (data) => {
  arrayData.push(...data);
  return arrayData;
};

const imageElement = document
  .querySelector(".image__list")
  .addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG") {
      const dataId = e.target.dataset.id;
      arrayData.forEach(
        ({
          largeImageURL,
          id,
          views,
          comments,
          likes,
          downloads,
          fullHDURL,
        }) => {
          if (id === Number(dataId)) {
            console.log("yes");
            // const markupLightbox = templateImage(arrayData)
            basicLightbox
              .create(
                `<img width="768" height="480" src="${largeImageURL}">

                <div class="info-wrap">
                <p class="image__item-about">
                <i class="material-icons">thumb_up</i>
                ${likes}
              </p>
              <p class="image__item-about">
                <i class="material-icons">visibility</i>
                ${views}
              </p>
              <p class="image__item-about">
                <i class="material-icons">comment</i>
                ${comments}
              </p>
              <p class="image__item-about">
              
              <i class="material-icons">cloud_download</i>
              ${downloads}
              
              </p>
              <span class="id">${id}</span>
                </div>
      `
              )
              .show();
          }
        }
      );
    }
  });
//
