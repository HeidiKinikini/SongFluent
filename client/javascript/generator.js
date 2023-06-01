const dropDwn2 = document.getElementById('second-form')
const addChord = document.getElementById('addChord')
const dropDwn = document.getElementById('dropdown');
const output = document.getElementById('output');
const clearAll = document.getElementById('clear-all')
const saveButton = document.getElementById('save-button')
let selected = document.getElementById('scales').value 








const deleteChord = (e) => {
    e.preventDefault();
    e.target.parentNode.remove()
    if(output.textContent === '') {
        saveButton.style.visibility = 'hidden'
        clearAll.style.visibility = 'hidden'
    }
}


function randomizeChords (e) {
    e.preventDefault()
    output.textContent =''
    addChord.textContent=''
    
    
    axios.get(`http://localhost:4000/api/getScales/${selected}`)
    .then(res => {
        
        res.data[0].forEach(elem => {
             let newOption = document.createElement('option')
             newOption.setAttribute('value', elem.chord)
             newOption.setAttribute('name', elem.chord)
             newOption.textContent = elem.chord
             addChord.appendChild(newOption)      
        })

        
             saveButton.style.visibility = 'visible'
             clearAll.style.visibility = 'visible'
        


         let counter = 0
         let chordProgression = []
         while(counter < 4) {
             let randomIndex = Math.floor(Math.random() * res.data[0].length)
             let randomChord = res.data[0][randomIndex].chord
             chordProgression.push(randomChord)
             counter++
          }
         let result = chordProgression.forEach(element => {
             createCard(element)
         })

         return result
     })
    .catch(err => console.log(err))

}

function addNewChord(e) {
    e.preventDefault()
    createCard(addChord.value) 
}

function clearAllChords() {
    output.textContent = ''
    saveButton.style.visibility = 'hidden'
    clearAll.style.visibility = 'hidden'
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

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}





const saveChordProg = (e) => {
    e.preventDefault()
    
    const card = document.getElementsByClassName('card')
    
    let contentStr = ''

    Array.from(card).forEach(elem => {
        contentStr += ` ${elem.firstChild.textContent} `

    })
    
    let obj = {
        name: `${makeid(20)}`,
        content: contentStr,
        key: selected

    }

     axios.post(`http://localhost:4000/api/saveProg`, obj)
     .then(res => alert('Chord Saved'))
     .catch(err => console.log(err))

    
    
} 







saveButton.addEventListener('click', saveChordProg)
clearAll.addEventListener('click', clearAllChords)
dropDwn2.addEventListener('submit', addNewChord)
dropDwn.addEventListener('submit', randomizeChords)


