



require('dotenv').config()
const {CONNECTION_STRING} = process.env

const { Sequelize } = require('sequelize')



const sequelize = new Sequelize(`${CONNECTION_STRING}`, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

const Scales = require('./data')

module.exports = {

        seed: (req, res) => {
            Scales.aMajScale.forEach(scale => {
                scale.forEach(chord => {
                    sequelize.query(`insert into amajscale(chord)
                                     values('${chord}')`)
                })
            })
        },

        updateProgression: (req, res) => {
            const { id } = req.params
            const { content } = req.body

            console.log(id, content)

            sequelize.query(`update progression
            set content = '${content}'
            where progression_id = ${id}`)

            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(err => console.log(err))

            
        },

        deleteSavedProg: (req, res) => {
            const {saved_id} = req.params
            
            sequelize.query(`delete from progression where progression_id = ${saved_id}`)
            .then(dbRes => {
                res.sendStatus(200)
            })
            .catch(dbErr => console.log(dbErr))
        },

        getSaved: (req, res) => {
            sequelize.query(`select * from progression
            order by progression_id desc`)
            .then(dbRes => {
                res.status(200).send(dbRes[0])
            })
            .catch(dbErr => {console.log(dbErr)})
        },


        saveProg: (req, res) => {
            const {name, content, key} = req.body


            sequelize.query(`insert into progression(name, content, key)
                             values('${name}','${content}', '${key}')`)
                             .then(dbRes => {
                                
                                res.status(200).send('Chord Saved')
                             })
                             .catch(err => console.log(err))

        },

        getScale: async (req, res) => {
    
        const {scale} = req.params

        const editedScale = scale.toLowerCase()
            
        const pickedScale = await sequelize.query(`select * from ${editedScale} `)

        res.status(200).send(pickedScale)
        },
    
        chooseGenre: (req, res) => {
            const {genre} = req.params
        if(genre === 'Pop'){
            res.send('Suggested keys: C major scale, G major Scale, or F major. Suggested BPM: 100-130. Suggested Instrumentation Set-Up: Drums, bass, electric guitar, synth, strings, vocals/backing vocals')
        } else if(genre === 'R&B'){
            res.send('Suggested keys: C minor or major. Suggested BPM: 60-80. Suggested Instrumentation Set-Up: drum, bass, piano or organ, guitar. Others include trumpet, saxophone, and trombone.')
        } else if(genre === 'Country'){
            res.send('Suggested keys: C major, G major, & F major. Suggested BPM: 120-140. Suggested Instrumentation Set-up: guitar(acoustic), bass, drums, accordion, banjo, fiddle.')
        } else if (genre === 'Hip-Hop'){
            res.send('Suggested keys:C major, F major, G major. Suggested BPM: 80-100. Suggested Instrumentation Set-Up:(technology) Drum machines, keyboard, pianos, turntables, samplers.')
        } 
    },


}




