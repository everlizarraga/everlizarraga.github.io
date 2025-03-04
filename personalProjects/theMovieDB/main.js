import * as menu from "./modules/menu.js";
import * as homeSection from "./modules/sectionHome.js";
import * as navigation from "./modules/navigation.js";
import * as detailsSection from "./modules/sectionDetails.js";
import * as categorySection from "./modules/sectionCategories.js";
import * as genericSection from "./modules/sectionGeneric.js";
import * as searchMovie from "./modules/searchMovie.js";
// import * as apiTMDB from "./modules/apiTMDB.js";
// import { MovieXd } from "./modules/movieClass.js"

// document.addEventListener('click', (event) => {console.log(event.target)});
const observerCardImg = new IntersectionObserver((entries, observer) => {
  entries.forEach(function(entry) {
    if(entry.isIntersecting) {
      const img = entry.target.querySelector('.card__img');
      const url = img.getAttribute('data-src')?? '';
      img.setAttribute('src', url);
      observer.unobserve(entry.target);
      if(url.slice(-4) == 'null'){
        // img.setAttribute('src', 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
        // img.setAttribute('src', 'https://st2.depositphotos.com/2068621/5948/v/450/depositphotos_59480387-stock-illustration-movie-camera-simple-icon-on.jpg');
        // img.setAttribute('src', 'https://ih1.redbubble.net/image.533910704.5853/flat,750x,075,f-pad,750x1000,f8f8f8.u3.jpg');
        // img.setAttribute('src', 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg');
        img.setAttribute('src', 'https://s3.gifyu.com/images/bbTkk.png');
      }
    }
  });
}, {rootMargin: '100px'});

const sharedObject = {
  observerCardImg,
};

document.addEventListener('DOMContentLoaded', ()=> {
  menu.init();
  homeSection.init(sharedObject);
  navigation.init();
  detailsSection.init(sharedObject);
  categorySection.init(sharedObject);
  genericSection.init(sharedObject);
  searchMovie.init(sharedObject);
  // console.log('axios', window.axios);
  // apiTMDB.API.getSearchMovies('doc', 2);
  // apiTMDB.API.getPopularMoviesPreview(1);
  // apiTMDB.API.getTrenndingMoviesPreview(1);
  // apiTMDB.API.getUpcommingMoviesPreview(1);
  // apiTMDB.API.getGenres();

});
