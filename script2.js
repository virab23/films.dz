let api_key = "api_key=9b702a6b89b0278738dab62417267c49"; 
let root1 = document.getElementById("root1"); 
let x = location.href; 
let y = x.split("?"); 
let searchUrl = `https://api.themoviedb.org/3/movie/${y[1]}?${api_key}`; 
console.log(searchUrl); 
fetch(searchUrl) 
    .then((response) => response.json()) 
    .then((response) => 
            createMovie(response) 
    ) 
    // .then(response => console.log(response)) 
    .catch((err) => console.error(err)); 
 
function createMovie(movie) { 
    let div = document.createElement("div"); 
    div.innerHTML = ` 
    <div class="big"> 
    <div class="back"> 
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="img1"> 
    </div> 
    <div class="back1"> 
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" id="img1"> 
    </div> 
    <div class="div"> 
    <h1 class="title">${movie.title}</h1> 
        <p class="over">${movie.overview}</p> 
        <p>${movie.poster_popularity}</p> 
        </div> 
        </div> 
         
    ` 
    root1.appendChild(div); 
}
let actors = document.getElementById('actors')
let searchUrl1 = `https://api.themoviedb.org/3/movie/${y[1]}/credits?${api_key}`;
fetch(searchUrl1)
    .then((response) => response.json())
    .then((response) =>
        response.cast.forEach((actor) => {
            createActor(actor);
        })
    )
    // .then(response => console.log(response))
    .catch((err) => console.error(err));

function createActor(actor) {
    let div = document.createElement("div");
    div.classList = 'actor_container'
    div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500/${actor.profile_path}">
  `;
  actors.appendChild(div);
}


let searchUrl2 = `https://api.themoviedb.org/3/movie/${y[1]}/videos?${api_key} `
fetch(searchUrl2) 
.then((response) => response.json()) 
.then((response) => 
    response.results.forEach((video) => { 
        videoFilm(video); 
    }) 
) 
// .then(response => console.log(response)) 
.catch((err) => console.error(err));
let popups = document.querySelector(".popup_fon")
let popup = document.querySelector(".popup")
//videoi funkcian
function videoFilm(obj){
    let div = document.createElement('div')
    div.innerHTML=`
   <iframe width="420" height="315" src="https://www.youtube.com/embed/${obj.key}" >
   </iframe>
   <div id="vran"></div>
    `
   div.classList="video"
    root3.append(div)

    div.addEventListener('click', ()=>{    
        popup.innerHTML=`
        <iframe width="420" height="315" src="https://www.youtube.com/embed/${obj.key}" >
        </iframe>
        `
        popups.classList.add('show');
    })
    
    window.onclick = function(e){
        if(e.target == popups){
            popups.classList.remove('show')
           
        }
}
}
