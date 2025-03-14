
const express =  require('express')
const  cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user.route.js')
const assetRoutes = require('./routes/assets.route.js')
const dotenv = require('dotenv')


const PORT = process.env.PORT
const app = express()

dotenv.config()
app.use(cors())
// app.use(bodyParser.json())
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/assets', assetRoutes)



app.listen(PORT, async () => {
    console.log("Server running")
}
)
