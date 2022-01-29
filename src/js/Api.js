export default class Api {
  constructor(url) {
    this.baseURL = url;
  }

  saveImage(file, callback) {
    this.file = file;
    const formData = new FormData();
    formData.append('image', this.file);
    const options = {
      method: 'POST',
      query: 'method=saveImage',
      body: formData,
    };
    return this.creatRequest(options, callback);
  }

  allImages(callback) {
    const options = {
      method: 'GET',
      query: 'method=allImages',
      body: null,
    };
    return this.creatRequest(options, callback);
  }

  removeImage(id, callback) {
    const formData = new FormData();
    formData.append('id', id);
    const options = {
      method: 'POST',
      query: 'method=removeImage',
      body: formData,
    };
    return this.creatRequest(options, callback);
  }

  creatRequest(options, callback) {
    const xhr = new XMLHttpRequest();
    const url = `${this.baseURL}?${options.query}`;
    xhr.open(options.method, url);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(data);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    });
    xhr.send(options.body);
  }
}
