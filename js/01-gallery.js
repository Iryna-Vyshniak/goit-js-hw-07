import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);
galleryContainer.addEventListener('click', onImgClickCreateModal);

// rendered items
function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    }).join('');
}

// create modal
function onImgClickCreateModal(e) {
    e.preventDefault();
    // if (e.target.nodeName !== "IMG") {return;}

    const isItemImage = e.target.classList.contains("gallery__image");
    if (!isItemImage) {
        return;
    }

    const currentImgUrl = e.target.dataset.source;

    const instance = basicLightbox.create(
        `
		<img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
        {
            onShow: (instance) => {
                window.addEventListener("keydown", onEscKeyPress);
            },
            onClose: (instance) => {
                window.removeEventListener("keydown", onEscKeyPress);
            },
        }
    );
    instance.show();

    function onEscKeyPress(e) {
        const ESC_KEY_CODE = 'Escape';
        const isEscKey = e.code === ESC_KEY_CODE;
        if (isEscKey) {
            instance.close();
        }
    }
}

console.log(galleryItems);

/*
const instance = basicLightbox.create(`
<img width="1280" height="auto" src="">`,{
  onShow: () => {
    galleryContainer.addEventListener("keydown", handlerRemove); 

function handlerRemove (e) {
  if (e.code === "Escape") {
    instance.close(() => galleryContainer.removeEventListener("keydown", handlerRemove))}}
  },
  // onClose: () => console.log('onClose', instance.element())
});

function onGalleryClick (e) {
  e.preventDefault();
  const filterDatasetImg = e.target.dataset.source;
  if (!filterDatasetImg) return;
instance.element().querySelector("img").src = e.target.dataset.source;
instance.show();
};
*/