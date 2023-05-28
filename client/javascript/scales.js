
const genreForm = document.getElementById('dropdown-genre')
const output = document.getElementById('output');


const deleteChord = (e) => {
    e.preventDefault();
    e.target.parentNode.remove()
}

const createCard = (chord) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.textContent = chord
    output.appendChild(card)
    card.setAttribute('id', 'card')
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.addEventListener('click', deleteChord)
    card.appendChild(deleteBtn)
    deleteBtn.classList.add('delete-button')
}



const getItems = () => {
    const savedProgs = document.getElementById('saved')
    const values = Object.values(sessionStorage)
    values.forEach((elem, index) => {
        const splitElem = elem.split(',')
        let elemDiv = document.createElement('div')
        elemDiv.textContent = splitElem
        console.log(elemDiv)
        elemDiv.classList.add('saved-elem')
        savedProgs.appendChild(elemDiv)
    })

}
getItems();




const chooseGenre = (e) => {
    output.textContent = ''

    e.preventDefault()
    const selectedGenre = document.getElementById('choose-genre').value


    axios.get(`http://localhost:4000/api/chooseGenre/${selectedGenre}`)
    .then(res => {
        const {data} = res
        createCard(data)
        
    })
    .catch(err => console.log(err))
}


genreForm.addEventListener('submit', chooseGenre)
