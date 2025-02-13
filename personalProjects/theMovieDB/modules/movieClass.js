export class Movie {
  #posterPath;
  #posterBg;
  constructor({
    id,
    title, 
    type,
    urlImgPath,
    urlBgPath,
    rate,
    details,
    release,
    categories = [],
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.imgPath = urlImgPath;
    this.imgBg = urlBgPath;
    this.rate = rate;
    this.details = details;
    this.release = release;
    this.categories = categories;
  }

  

}