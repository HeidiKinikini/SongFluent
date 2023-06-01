const express = require('express')
const cors = require('cors')
require('dotenv').config()

const {SERVER_PORT} = process.env

const {getScale, chooseGenre, saveProg, getSaved, deleteSavedProg, seed, updateProgression} = require('./controller')
const app = express()


app.use(express.json())
app.use(cors())

app.post(`/api/seed`, seed)
~
app.get(`/api/getScales/:scale`, getScale)
app.get('/api/chooseGenre/:genre', chooseGenre)
app.post(`/api/saveProg`, saveProg)
app.get('/api/getSaved', getSaved)
app.delete('/api/delete/:saved_id', deleteSavedProg)
app.put('/api/updateProgression/:id', updateProgression)








const port = 4000

app.listen(port, () => {
    console.log(`app listening on ${port}`)

})