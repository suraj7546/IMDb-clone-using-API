// API http://www.omdbapi.com/?i=tt3896198&apikey=afcff662
const key = "afcff662";
const searchInput = document.getElementById("Input");

// Upon keypress - function findMovies is initiated
if (!null) {
  searchInput.addEventListener("input", findMovies);
}

async function addTofavorites(id) {
  // console.log("fav-item", id);

  localStorage.setItem(Math.random().toString(36).slice(2, 7), id); // math.random for the unique key and value pair
  alert("Movie Added to Watchlist!");
}
async function watchListLoader() {
  let output = "";
  for (i in localStorage) {
    var id = localStorage.getItem(i);
    if (id != null) {
      //Fetching the movie through id
      const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${key}`;
      const res = await fetch(`${url}`);
      const data = await res.json();
      // console.log(data);

      let img = "";
      if (data.Poster != "N/A") {
        img = data.Poster;
      } else {
        img =
          "https://img.freepik.com/free-vector/coming-soon-background-with-focus-light-effect-design_1017-27277.jpg?w=740&t=st=1689366847~exp=1689367447~hmac=beaf0c0f2a83b69244c07463c2c46ba34552e7bf378fe460ef3c8ad337d77be4";
      }
      var Id = data.imdbID;
      //Adding all the movie html in the output using interpolition
      output += `
            <div class="movie-poster">
            <div class="poster-img">
            <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
                
                </div>
                <div class="poster">
            <div class="poster-detail">
                <p class="poster-title"><a href="movie.html?id=${id}">${data.Title}</a></p>
                <p class="year"><a href="movie.html?id=${id}">${data.Year}</a></p>        
            </div>
            <div class="watch-list">
    
                <i style="font-size:24px;cursor: pointer; color:maroon" class="fa fa-trash-o" onClick=removeFromfavorites('${id}') ></i>
            </div>
        </div>   
        </div>

       `;
    }
  }
  //Appending the html to the movie-display class in favorites page
  document.querySelector(".movie-container").innerHTML = output;
}
async function displayMovieDetails() {
  var urlQueryParams = new URLSearchParams(window.location.search);
  var id = urlQueryParams.get("id");
  // console.log(id);
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`;
  const res = await fetch(`${url}`);
  const data = await res.json();
  let img = "";
  if (data.Poster != "N/A") {
    img = data.Poster;
  } else {
    img =
      "https://img.freepik.com/free-vector/coming-soon-background-with-focus-light-effect-design_1017-27277.jpg?w=740&t=st=1689366847~exp=1689367447~hmac=beaf0c0f2a83b69244c07463c2c46ba34552e7bf378fe460ef3c8ad337d77be4";
  }
  let output = `
    <div class="movie-detail-container">
                <div class="movie-detail-img">
                <img src=${img} alt="Movie Poster">
                </div>
                <div class="movie-details">
                    <p id="movie-name">${data.Title}</p>
                    <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                    style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
                    <p><span>Actors:</span>${data.Actors}</p> 
                    <p><span>Director:</span>${data.Director}</p> 
                    <p><span>Writer:</span>${data.Writer} </p>
                    <div class="space"> </div> 
                    <p><span>Genre:</span>${data.Genre} </p>
                    <p><span>Release Date:</span> ${data.DVD}</p>  
                    <p><span>Box Office:</span> ${data.BoxOffice}</p>  
                    <p><span>Movie Runtime:</span> ${data.Runtime}</p> 
                    <div class="space"> </div> 
                    <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
                    <div class="space"> </div> 
                    <p style="font-size: 15px; font-style: italic; color: #222; margin-top: 10px;">
                    <i class="fa-solid fa-award"></i>
                    &thinsp; ${data.Awards}
                </p>
                </div>
            </div>
    `;
  document.querySelector(".detail-container").innerHTML = output;
}
function displayMovieList(movies) {
  let output = "";
  for (i of movies) {
    var img = "";
    if (i.Poster != "N/A") {
      img = i.Poster;
    } else {
      img =
        "https://img.freepik.com/free-vector/coming-soon-background-with-focus-light-effect-design_1017-27277.jpg?w=740&t=st=1689366847~exp=1689367447~hmac=beaf0c0f2a83b69244c07463c2c46ba34552e7bf378fe460ef3c8ad337d77be4";
    }
    var id = i.imdbID;
    output += `
        <div class="movie-poster">
        <div class="poster-img">
        <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            
            </div>
            <div class="poster">
        <div class="poster-detail">
            <p class="poster-title"><a href="movie.html?id=${id}">${i.Title}</a></p>
            <p class="year"><a href="movie.html?id=${id}">${i.Year}</a></p>        
        </div>
        <div class="watch-list">

            <i style="font-size:24px;cursor: pointer;" cursor:pointer"="" class="fa" onClick=addTofavorites('${id}') ></i>
        </div>
    </div>   
    </div>

        `;
  }

  document.querySelector(".movie-container").innerHTML = output;
}
async function findMovies() {
  const url = `https://www.omdbapi.com/?s=${searchInput.value.trim()}&page=1&apikey=${key}`;

  const res = await fetch(`${url}`);
  const data = await res.json();
  // console.log(data);

  if (data.Search) {
    //Calling the function to display list of the movies related to the user search
    displayMovieList(data.Search);
  }
}
async function removeFromfavorites(id) {
  for (i in localStorage) {
    if (id == localStorage[i]) {
      localStorage.removeItem(i);
      break;
    }
  }
  alert("Movie Removed from Watchlist");
  window.location.replace("favorite.html");
}
