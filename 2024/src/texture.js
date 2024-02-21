export default class Texture {
  static FromUrl(url) {
    const img = document.createElement("img");
    img.src = url;
    return img;
  }
}
