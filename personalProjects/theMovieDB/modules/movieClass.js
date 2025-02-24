export class MovieXd {
  #posterPath;
  #posterBg;
  constructor({
    id,
    title, 
    type,
    urlImgPathOriginal,
    urlImgPathW500,
    urlImgPathW300,
    urlBgPathOriginal,
    urlBgPathW500,
    urlBgPathW300,
    rate,
    details,
    release,
    categoriesIds = [],
    categoriesFull = [],
    runtime,
    label,
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.imgPathOriginal = urlImgPathOriginal;
    this.imgPathW500 = urlImgPathW500;
    this.imgPathW300 = urlImgPathW300;
    this.imgBgOriginal = urlBgPathOriginal;
    this.imgBgW500 = urlBgPathW500;
    this.imgBgW300 = urlBgPathW300;
    this.rate = rate;
    this.details = details;
    this.release = release;
    this.categoriesIds = categoriesIds;
    this.categoriesFull = categoriesFull;
    this.runtime = runtime;
    this.label = label;
  }

  

}