const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const container = document.querySelector('#container')
const form = document.querySelector('form');
const themeBtn = document.querySelectorAll('.theme');

const url = `http://localhost:4000/api/dreamers`;

const getCompliment = () => {
    axios.
        get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios
    .get("http://localhost:4000/api/fortune")
    .then(res => {
        const data = res.data;
        alert(data);
    })
    .catch(err => {
        console.log(err)
    })
}

const getAllDreamers = () => {
    axios
    .get(url)
    .then(({data: dreamers}) => displayDreamers(dreamers))
    .catch((err) => {
        console.log(err)
    })
}

const createDreamer = (body) => {
    axios
    .post(url, body)
    .then(({data:dreamers}) => displayDreamers(dreamers))
    .catch((err) => {
        console.log(err)
    })
}

const deleteDreamer = (id) => {
    axios.delete(`${url}/${id}`)
    .then(({data:dreamers}) => displayDreamers(dreamers))
    .catch((err) => {
        console.log(err)
    })
}

const updateDreamer = (id,type) => {
    axios
    .put(`${url}/${id}`, {type})
    .then(({data:dreamers}) => displayDreamers(dreamers))
    .catch((err) => {
        console.log(err)
    })
}

const submitHandler = (evt) => {
    evt.preventDefault();

    let name = document.querySelector('#name')
    let goals = document.querySelector('#goals')
    let ratings = document.querySelector('input[name="ratings"]:checked')

    let bodyObj = {
        name : name.value,
        goals : goals.value,
        rating : ratings.value
    }

    createDreamer(bodyObj)

    name.value = ''
    goals.value = ''
    ratings.checked = false

}

const createDreamerCard = (dreamer) => {
    const dreamerCard = document.createElement('div');
    dreamerCard.classList.add('card');

    dreamerCard.innerHTML = `<p class='name'>${dreamer.name}</p>
    <p class='goals'>Goal : ${dreamer.goals}</p>
    <div class='btns-container'>
        <button onclick="updateDreamer(${dreamer.id}, 'minus')">-</button>
        <p class='rating'>My Day : ${dreamer.ratings} Stars</p>
        <button onclick="updateDreamer(${dreamer.id}, 'plus')">+</button>
    </div> 
    <button id='delete' onclick='deleteDreamer(${dreamer.id})'>DELETE</button>`

    container.appendChild(dreamerCard);
}

const displayDreamers = (arr) => {
    container.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDreamerCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)



getAllDreamers();

const selectTheme = (evt) => {
    const theme = evt.target.textContent;
    const allBtns = document.querySelectorAll('button');

    document.querySelector('body').className = theme;
    document.querySelector('main').className = theme;
    

    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].className = theme;
    }
}

for (let i = 0; i < themeBtn.length; i++) {
     themeBtn[i].addEventListener('click', selectTheme)
}



