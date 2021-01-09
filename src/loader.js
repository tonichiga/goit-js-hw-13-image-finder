export const getImage = (key, pageCount) => {
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
};
