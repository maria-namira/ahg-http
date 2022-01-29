import Api from './Api';

export default class FormHandler {
  constructor() {
    this.input = document.querySelector('.input');
    this.label = document.querySelector('.label');
    this.gallery = document.querySelector('.gallery__row.row');
    this.api = new Api('https://ahj-7-3-sergius-image-manager.herokuapp.com/');
    this.currentID = null;

    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.creatPreview = this.creatPreview.bind(this);
    this.redrawImages = this.redrawImages.bind(this);
    this.onClick = this.onClick.bind(this);
    this.removePreview = this.removePreview.bind(this);
  }

  init() {
    this.input.addEventListener('change', this.onChange);
    this.label.addEventListener('dragover', (evt) => evt.preventDefault());
    this.label.addEventListener('drop', this.onDrop);
    this.gallery.addEventListener('click', this.onClick);
    this.api.allImages(this.redrawImages);
  }

  onDrop(evt) {
    evt.preventDefault();
    const file = Array.from(evt.dataTransfer.files)[0];
    this.api.saveImage(file, this.creatPreview);
  }

  onChange(evt) {
    evt.preventDefault();
    const file = Array.from(evt.currentTarget.files)[0];
    this.api.saveImage(file, this.creatPreview);
    this.input.value = '';
  }

  onClick(evt) {
    if (evt.target.className === 'row-item__delete') {
      this.currentID = evt.target.nextElementSibling.dataset.id;
      this.api.removeImage(this.currentID, this.removePreview);
    }
    if (evt.target.className === 'row-item__img') {
      evt.target.closest('.absolute').classList.toggle('zoom');
    }
  }

  redrawImages(data) {
    data.forEach((e) => this.creatPreview(e));
  }

  creatPreview(data) {
    const id = data.fileName.slice(0, data.fileName.lastIndexOf('.'));
    this.gallery.insertAdjacentHTML('beforeend',
      `<div class="row__item">
         <div class="absolute">
           <button class="row-item__delete">&#10006;</button>
           <img src="${this.api.baseURL}${data.fileName}" data-id="${id}" class="row-item__img">
         </div>
       </div>`);
  }

  removePreview(data) {
    if (data.success && this.currentID) {
      document.querySelector(`[data-id="${this.currentID}"]`).closest('.row__item').remove();
      this.currentID = null;
    }
  }
}