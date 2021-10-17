const api = {
  key: '3aaf23e1bed3ce2761a53b11fbcb6c6d',
  base: 'https://api.openweathermap.org/data/2.5/weather?q=',
  unsplash_key: 'NcyuLriUdS12nF5AtugW8wTM1jgF4ULfHyw6oMsejo0',
  unsplash_base: 'https://api.unsplash.com/search/photos?query='
}

const form = document.querySelector('.main-form');

const input = document.querySelector('.input-form');

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
  getResults(inputVal);
  unsplash(inputVal);
  removeDescription();
});

function getResults(query) {
  fetch(`${api.base}${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json()
      .then(displayResults);
    })
      .catch(() => {
      document.querySelector('.error').textContent = "Not a City!"
      form.reset();
    });
    document.querySelector('.error').textContent = "";
  };

function removeDescription(){
  document.querySelector('.instruction').textContent = "";
}
function unsplash(data){
  fetch(`${api.unsplash_base}${data}&orientation=landscape&per_page=30&client_id=${api.unsplash_key}`)
    .then(image => {
      return image.json()
      .then(displayImage);
    })
    .catch(() => {
      // Already asking user to search for a valid city.
    })
};

function displayImage(image){
  let randomNumber = Math.floor(Math.random() * 30);
  document.querySelector('.unsplash-img').src = `${image.results[randomNumber].urls.regular}`

  document.querySelector('.unsplash-overlay').style.display = "block";

  let credits = document.querySelector('.credits')
  credits.innerText = "Image Credits: " + `${image.results[randomNumber].user.name}`
}

function displayResults(weather){
  document.querySelector('.img').src = "http://openweathermap.org/img/wn/" + `${weather.weather[0].icon}` + "@2x.png"
  let city = document.querySelector('.city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;


  let description = document.querySelector('.description');
  description.innerText = `${weather.weather[0].description}`;
}
