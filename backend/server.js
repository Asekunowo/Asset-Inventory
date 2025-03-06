
const express =  require('express')
const  cors = require('cors')
const bodyParser = require('body-parser')
const customerRoutes = require('./routes/customer.route.js')
const assetRoutes = require('./routes/assets.route.js')

const app = express()

app.use(cors())
// app.use(bodyParser.json())
app.use(express.json())


app.use('/api/customers', customerRoutes)
app.use('/api/assets', assetRoutes)


app.listen(3000, async () => {

    console.log("Server running")
}
)
