// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()

// const applianceRoutes = require('./routes/applianceRoutes')
// const bookingRoutes = require('./routes/bookingRoutes')
// const authRoutes = require('./routes/authRoutes')

// const app = express()

// app.use(cors())
// app.use(express.json())

// app.get('/', (req, res) => {
//   res.json({
//     message: 'CAMTISH Catering Services API is running'
//   })
// })

// app.use('/api/appliances', applianceRoutes)
// app.use('/api/bookings', bookingRoutes)
// app.use('/api/auth', authRoutes)

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`CAMTISH API running on http://localhost:${PORT}`)
// })

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Camtish Catering API running on http://localhost:${PORT}`);
});