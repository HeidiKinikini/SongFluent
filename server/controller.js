


const Scales = require('./data')

module.exports = {



     randomizeChords: (req, res) => {
    
        const {scale} = req.params
          let pickedScale = Scales[scale]
        
        
        let counter = 0
        let chordProgression = []
        while(counter < 4) {
            let randomIndex = Math.floor(Math.random() * pickedScale.length)
            let randomArr = pickedScale[randomIndex]
            let randomChord = Math.floor(Math.random() * randomArr.length)
            chordProgression.push(randomArr[randomChord])
            counter++
        }
        res.status(200).send(chordProgression)
    },
    
     chooseGenre: (req, res) => {
        if(genre === 'pop'){
            return 'Suggested keys: C major scale, G major Scale, or F major'
        } else if(genre === 'jazz'){
            return 'Suggested keys: F Major Scale, Bb Scale, Eb Scale, or Ab major Scale'
        } else if(genre === 'funk'){
            return 'Suggested keys: A Major Scale, E Major Scale, G Major Scale, or D Major Scale'
        } else if (genre === 'r&b'){
            return 'Suggested keys: '
        }
    }
}




