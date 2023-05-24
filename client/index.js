 

const dropDwn = document.getElementById('dropdown');
const output = document.getElementById('output')


const createCard = (chord) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.textContent = chord
    output.appendChild(card)
    
}
function getScales (e) {
    e.preventDefault()
    output.textContent =''
    let selected = document.getElementById('scales').value 
    
    axios.get(`http://localhost:4000/api/getScales/${selected}`)
    .then(res => {
        let result = res.data.forEach(element => {
            createCard(element)
        })

        return result
    })

}


dropDwn.addEventListener('submit', getScales)



