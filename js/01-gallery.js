import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

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
    ).show();
    // instance.show();

    function onEscKeyPress(event) {
        const ESC_KEY_CODE = 'Escape';
        const isEscKey = event.code === ESC_KEY_CODE;
        if (isEscKey) {
            instance.close();
        }
    }
}
