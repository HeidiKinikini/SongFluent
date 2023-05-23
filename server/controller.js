
const randomizeChords = (arr) => {

    
    let counter = 0
    let chordProgression = []
    while(counter < 4) {
        let randomIndex = Math.floor(Math.random() * arr.length)
        let randomArr = arr[randomIndex]
        let randomChord = Math.floor(Math.random() * randomArr.length)
        chordProgression.push(randomArr[randomChord])
        counter++
    }
    return chordProgression
}

console.log(randomizeChords(cMajScale))

function chooseGenre (genre){
    if(genre === 'pop'){
        return 'Suggested keys: C major scale, G major Scale, or F major'
    } else if(genre === 'jazz'){
        return 'Suggested keys: F Major Scale, Bb Scale, Eb Scale, or Ab major Scale'
    } else if(genre === 'funk'){
        return 'Suggested keys: A Major Scale, E Major Scale, G Major Scale, or D Major Scale'
    } else if (genre === 'r&b'){
        return 'Suggested keys: '
    }
} console.log(chooseGenre('funk'))