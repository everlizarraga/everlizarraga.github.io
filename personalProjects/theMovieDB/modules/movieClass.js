export class MovieXd {
  #posterPath;
  #posterBg;
  constructor({
    id,
    title, 
    type,
    urlImgPathOriginal,
    urlImgPathW500,
    urlBgPathOriginal,
    urlBgPathW500,
    rate,
    details,
    release,
    categoriesIds = []
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.imgPathOriginal = urlImgPathOriginal;
    this.imgPathW500 = urlImgPathW500;
    this.imgBgOriginal = urlBgPathOriginal;
    this.imgBgW500 = urlBgPathW500;
    this.rate = rate;
    this.details = details;
    this.release = release;
    this.categoriesIds = categoriesIds;
  }

  

}