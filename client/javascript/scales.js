
const genreForm = document.getElementById('dropdown-genre')
const output = document.getElementById('output');
const saveChordText = document.getElementById('no-saved-text')
const save = document.getElementById('saved')


const deleteChord = (e) => {

    e.preventDefault();
    
    const {id} = e.target.parentNode

    axios.delete(`http://localhost:4000/api/delete/${id}`)
    .then(res => alert('Chord Progression Deleted'))
    .catch(err => console.log(err))


    e.target.parentNode.remove()

    if(save.children.length > 0) {
        saveChordText.style.visibility = 'hidden'
    } else if (save.children.length === 0) {
        saveChordText.style.visibility = 'visible'
    }

    
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

const editProg = (e) => {
    e.preventDefault()
    const submit = document.createElement('button')
    submit.textContent = 'submit'
    submit.id = 'confirm-button'
    submit.addEventListener('click', updateProgression)
    e.target.parentNode.appendChild(submit)
    submit.previousSibling.style.display = 'none'
    e.target.parentNode.style.resize = 'vertical'
    const key = e.target.parentNode.getAttribute('key')
    const array = e.target.parentNode.children
    const chordProgression = []
    for(let i = 0; i < array.length; i++) {
        if(array[i].classList[0] ==='chord') {
            chordProgression.push(array[i])
        }
    }
    
    axios.get(`http://localhost:4000/api/getScales/${key}`)
    .then(res => {
        
        let boxId = 0
        
        chordProgression.forEach(progress => {
                const chordChanger = document.createElement('select')
                chordChanger.classList.add('chordChange')
                progress.appendChild(chordChanger)
        
                progress.id = boxId
                chordChanger.id = progress.id
                boxId++
                
                
                res.data[0].forEach(chord => {
                    const newOption = document.createElement('option')
                    newOption.textContent = chord.chord


                    if(chordChanger.parentNode.childNodes[0].textContent.trim() === chord.chord.trim()) {
                        newOption.setAttribute('selected', true)
                    }
                    chordChanger.appendChild(newOption)
                    
                    
                    
                    
                })
                
                
                
            })
            
        })
        .catch(err => console.log(err))
        
        
        
    }
    
    
    
    const createSavedProgs = (arr, prog_key ,prog_id) => {
        
    
        const listDiv = document.createElement('div')
        listDiv.classList.add('saved-progs')
        listDiv.setAttribute('key', prog_key)
        const deleteBtn = document.createElement('button')
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
    deleteBtn.textContent = 'X'
    editButton.id = 'edit-button'
    editButton.addEventListener('click', editProg)
    deleteBtn.addEventListener('click', deleteChord)
    deleteBtn.classList.add('delete-button')
    deleteBtn.id = 'delete-button'
    
    
    for(let i = 0; i < arr.length; i++) {
        const listitem = document.createElement('div')
        listitem.textContent = arr[i]
        listitem.classList.add('chord')
        listDiv.appendChild(listitem)
        listDiv.id = prog_id
        listDiv.appendChild(deleteBtn)
        listDiv.appendChild(editButton)
        
        
    }
    
    save.appendChild(listDiv)
    
    
}
const getItems = () => {
    
    
    
    axios.get('http://localhost:4000/api/getSaved')
    .then(res => {
        res.data.forEach(element => {
            const newEl = element.content.split('  ')
            createSavedProgs(newEl, element.key ,element.progression_id)
            if(save.firstChild) {
                saveChordText.style.visibility = 'hidden'
            } else if(!save.firstChild) {
                saveChordText.style.visibility = 'visible'
            }
        });
    })
    .catch(err => console.log(err))
    
    
    
}
getItems();


const updateProgression = (e) => {
    e.preventDefault()
    const children = Array.from(e.target.parentNode.children)

    const {id} = e.target.parentNode
    console.log(id)

    let updatedProg = ''

     children.filter((title, index) => title.classList[0] === 'chord').forEach(divide => {
         updatedProg += ` ${divide.lastChild.value} `
         
     })
    let updateObj = {
        content: updatedProg
    }
    axios.put(`http://localhost:4000/api/updateProgression/${id}`, updateObj)
    .then(res => {
        window.location.reload()
        alert('Chord Updated')
    })
    .catch(err => console.log(err))
    
}




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
