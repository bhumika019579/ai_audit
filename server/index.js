const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const auditRoutes = require('./routes/Routes')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', auditRoutes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})