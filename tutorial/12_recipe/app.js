const form = document.querySelector('form')
const input = form.querySelector('input')
const foodList = document.querySelector('.food_list')

const APP_ID = '886672d7'
const APP_KEY = '5a53102c1653a22a3726a57ad2edb6aa'

function paintRecipe(items) {
  console.log(items)
  let foods = ''
  items.map((item) => {
    foods += `
    <div class="food">
          <div class="food_img">
            <img src="${item.recipe.image}" alt="" />
          </div>
          <div class="food_info">
            <div class="food__title">
              <h3>${item.recipe.label}</h3>
              <a href="${item.recipe.url}" target="_blank" class="btn">View Recipe</a> 
            </div>
            <p class="food__extra">Caloris : ${item.recipe.calories.toFixed(2)}</p> 
            <p class="food__extra">Diet Labels : ${item.recipe.dietLabels}</p> 
            <p class="food__extra">Health Labels : ${item.recipe.healthLabels}</p> 
          </div>
    </div>
    `
    foodList.innerHTML = foods
  })
}

async function getRecipe(query) {
  const baseURL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`
  const response = await fetch(baseURL)
  const data = await response.json()
  paintRecipe(data.hits)
}

function init() {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const query = input.value
    if (query === '') return //query가 빈문자열이면 실행x
    getRecipe(query)
    input.value = '' //엔터 후 빈문자열로 초기화
  })
}

init()
