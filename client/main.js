const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const dreamersContainer = document.querySelector('#dreamers-container')
const form = document.querySelector('form')
const themeBtn = document.querySelectorAll('.theme');

const baseURL = `http://localhost:4004/api/dreamer`

const getCompliment = () => {
    axios
        .get("http://localhost:4004/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios
    .get("http://localhost:4004/api/fortune")
    .then(res => {
        const data = res.data;
        alert(data);
    })
    .catch(err => {
        console.log(err)
    })
}

form.addEventListener('submit', submitHandler)
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

const getAllDreamers = () => {
    axios
    .get(baseURL)
    .then(({ data: dreamer }) => displayDreamers(dreamer))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const createDreamer = body => {
    axios
    .post(baseURL, body)
    .then(({ data: dreamer }) => displayDreamers(dreamer))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const deleteDreamer = id => {
    axios
    .delete(`${baseURL}/${id}`)
    .then(({ data: dreamer }) => displayDreamers(dreamer))
    .catch((err) => {
        console.log(err.response.data)
    })
}

const updateDreamer = (id, type) => {
    axios
    .put(`${baseURL}/${id}`, {type})
    .then(({ data: dreamer }) => displayDreamers(dreamer))
    .catch((err) => {
        console.log(err.response.data)
    })
}

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let goals = document.querySelector('#goal')
    let ratings = document.querySelector('input[name="ratings"]:checked')
    

    let bodyObj = {
        name: name.value,
        goals: goals.value,
        ratings: ratings.value 
        
    }

    createDreamer(bodyObj)

    name.value = ''
    goals.value = ''
    ratings.checked = false
   
}

function createDreamerCard(dreamer) {
    const dreamerCard = document.createElement('div')
    dreamerCard.classList.add('dreamer-card')

    dreamerCard.innerHTML = `<p class="dreamer-name">${dreamer.name}</p>
    <p class="goal">Goal: ${dreamer.goals}</p>
    <div class="btns-container">
        <button onclick="updateDreamer(${dreamer.id}, 'minus')">-</button>
        <p class="day-rating">My Day: ${dreamer.ratings} Stars</p>
        <button onclick="updateDreamer(${dreamer.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteDreamer(${dreamer.id})">DELETE</button>
    `

    dreamersContainer.appendChild(dreamerCard)
}

function displayDreamers(arr) {
    
    dreamersContainer.innerHTML = ``
    
    for (let i = 0; i < arr.length; i++) {
        createDreamerCard(arr[i])
    }
}

const selectTheme = (evt) => {
    const theme = evt.target.textContent;
    const allBtns = document.querySelectorAll('button');

    document.querySelector('body').className = theme;
    document.querySelector('main').className = theme;
    document.querySelector('header').className = theme;
    

    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].className = theme;
    }
}

for (let i = 0; i < themeBtn.length; i++) {
     themeBtn[i].addEventListener('click', selectTheme)
}

getAllDreamers()
