let api_key = "api_key=9b702a6b89b0278738dab62417267c49";
let searchUrl = `https://api.themoviedb.org/3/search/movie?${api_key}&query=`;
let innp = document.getElementById("search");
let root = document.getElementById('root');
let generes_api = 'https://api.themoviedb.org/3/genre/movie/list?'+ api_key
innp.addEventListener("input", () => {
  fetch(searchUrl + innp.value)
    .then((res) => res.json())
    .then((res) => {
      root.innerHTML = "";
      res.results.forEach((movie) => {
        createCard(movie);
      });
    })
    .catch((err) => console.error(err));
});

fetch("https://api.themoviedb.org/3/movie/popular?" + api_key)
  .then((response) => response.json())
  .then((response) =>
    response.results.forEach((movie) => {
      createCard(movie);
    })
  )
  .catch((err) => console.error(err));

function createCard(movie) {
  let div = document.createElement("div");
  div.classList = 'movie_card'
  let image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  let title = document.createElement("h3");
  title.innerHTML = `${movie.title}`; 
  div.appendChild(image);
  div.appendChild(title);
  root.appendChild(div);
    div.addEventListener('click',()=>{
    location.href = 'index2.html?' +movie.id
  })

}
let genersBox =  document.getElementById('geners')
let genArr = []
fetch(generes_api)
.then((res)=>res.json())
.then(res=>{
  res.genres.forEach((e)=>{
    let btn = document.createElement('button')
    btn.classList='getBtn'
    btn.innerHTML = e.name
    btn.addEventListener('click',()=>{
      if (!genArr.includes(e.id)) {
        genArr.push(e.id)
      }else{
        genArr= genArr.filter(b=>b!==e.id)
      }
      btn.classList.toggle('seleGen')
      root.innerHTML = ""
      showMoviesGeners(genArr)
    })
    genersBox.append(btn)
  })
})
let serchinp = document.getElementById('serchinp')
function showMoviesGeners(arr) { 
  let c = arr.join(",")
  fetch(`https://api.themoviedb.org/3/discover/movie?${api_key}&language=pt-BR&page=1&with_genres=${c}`)
  .then(response => response.json())
  .then(response => response.results.forEach(e=>createCard(e)))
  serchinp.addEventListener('click',()=>{
    let sty = arr.filter(e=>toLowerCase().replaceAll(" ","").includes(serchinp.value.toUpperCase().replaceAll(" ","")))
    showMoviesGeners(sty)
  })
}