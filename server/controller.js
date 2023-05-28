


const Scales = require('./data')

module.exports = {



        getScale: (req, res) => {
    
        const {scale} = req.params
            let pickedScale = Scales[scale]

        res.status(200).send(pickedScale)
    },
    
        chooseGenre: (req, res) => {
            const {genre} = req.params
        if(genre === 'Pop'){
            res.send('Suggested keys: C major scale, G major Scale, or F major. Suggested BPM: 100-130. Suggested Instrumentation Set-Up: Drums, bass, electric guitar, synth, strings, vocals/backing vocals')
        } else if(genre === 'R&B'){
            res.send('Suggested keys: C minor or major. Suggested BPM: 60-80. Suggested Insturmentation Set-Up: drum, bass, piano or organ, guitar. Others include trumpet, saxophone, and trombone.')
        } else if(genre === 'Country'){
            res.send('Suggested keys: C major, G major, & F major. Suggested BPM: 120-140. Suggested Instrumentation Set-up: guitar(acoustic), bass, drums, accordion, banjo, fiddle.')
        } else if (genre === 'Hip-Hop'){
            res.send('Suggested keys:C major, F major, G major. Suggested BPM: 80-100. Suggested Instrumentation Set-Up:(technology) Drum machines, keyboard, pianos, turntables, samplers.')
        } 
    },


}




