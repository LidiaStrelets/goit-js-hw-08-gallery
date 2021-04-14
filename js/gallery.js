import images from "./gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const closeBtnRef = document.querySelector(".close__btn");
const bigImgRef = document.querySelector(".big__picture");
const backdropRef = document.querySelector(".backdrop");

const sources = images.map((img) => img.original);

const createListMarkup = (images) =>
  images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item"><img class="gallery__picture" data-source=${original} src=${preview} alt="${description}"/></li>`
    )
    .join("");

const handleModalOpening = () => {
  document.body.classList.add("modal-open");
  bigImgRef.src = event.target.dataset.source;
};
const handleModalClosing = () => {
  document.body.classList.remove("modal-open");
  bigImgRef.src = "";
  window.removeEventListener("keydown", handleKeyPress);
  closeBtnRef.removeEventListener("click", handleModalClosing);
  backdropRef.removeEventListener("click", handleBackdropClick);
};

const showNextPic = () => {
  let currentPic = sources.indexOf(bigImgRef.src);
  if (currentPic === sources.length - 1) {
    currentPic = -1;
  }
  bigImgRef.src = sources[currentPic + 1];
};
const showPreviousPicture = () => {
  let currentPic = sources.indexOf(bigImgRef.src);
  if (currentPic === 0) {
    currentPic = sources.length - 1;
  }
  bigImgRef.src = sources[currentPic - 1];
};

const handleKeyPress = (event) => {
  if (event.code === "ArrowRight") {
    showNextPic();
  }
  if (event.code === "ArrowLeft") {
    showPreviousPicture();
  }
  if (event.code === "Escape") {
    handleModalClosing();
  }
};
const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    handleModalClosing();
  }
};

const listMarkup = createListMarkup(images);
listRef.innerHTML = listMarkup;

listRef.addEventListener("click", (event) => {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  handleModalOpening();

  window.addEventListener("keydown", handleKeyPress);

  closeBtnRef.addEventListener("click", handleModalClosing);

  backdropRef.addEventListener("click", handleBackdropClick);
});
