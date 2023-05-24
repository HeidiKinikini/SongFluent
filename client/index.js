
const addChord = document.getElementById('addChord')
const dropDwn = document.getElementById('dropdown');
const output = document.getElementById('output')


const createCard = (chord) => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.textContent = chord
    output.appendChild(card)
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'X'
    deleteBtn.addEventListener('click', deleteChord)
    card.appendChild(deleteBtn)
    deleteBtn.classList.add('delete-button')
}

const deleteChord = (e) => {
    e.preventDefault();
    e.target.parentNode.remove()
}
function randomizeChords (e) {
    e.preventDefault()
    output.textContent =''
    addChord.textContent=''
    let selected = document.getElementById('scales').value 
    console.log(addChord)
    
    axios.get(`http://localhost:4000/api/getScales/${selected}`)
    .then(res => {
        res.data.forEach(elem => {
         for(let i = 0; i < elem.length; i++) {
            let newOption = document.createElement('option')
            newOption.setAttribute('value', elem[i])
            newOption.setAttribute('name', elem[i])
            newOption.textContent = elem[i]
            addChord.appendChild(newOption)
        
         }
        })

        let counter = 0
        let chordProgression = []
        while(counter < 4) {
            let randomIndex = Math.floor(Math.random() * res.data.length)
            let randomArr = res.data[randomIndex]
            let randomChord = Math.floor(Math.random() * randomArr.length)
            chordProgression.push(randomArr[randomChord])
            counter++
        }
        let result = chordProgression.forEach(element => {
            createCard(element)
        })

        return result
    })
    .catch(err => console.log(err))

}


dropDwn.addEventListener('submit', randomizeChords)



