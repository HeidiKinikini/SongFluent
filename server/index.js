const express = require('express')
const cors = require('cors')

const {PORT} = require('dotenv').config()

const app = express()


app.use(express.json())
app.use(cors())






const port = PORT || 4000

app.listen(port, () => {
    console.log(`app listening on ${port}`)

})