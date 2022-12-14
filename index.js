require('dotenv').config();
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const masterRoutes = require('./routes/masterRoutes');
const trxcutiRoutes = require('./routes/trxcutiRoutes');
const jenisCutiRoutes = require('./routes/jenisCutiRoutes');
const jatahcutiRoutes = require('./routes/jatahcutiRoutes');
// const userRoutes = require("./routes/userRoutes");
dotenv.config();

var whitelist = ['http://localhost:3000', 'https://final-project-v-1-3.vercel.app'];
var corsOptions ={
  // origin :'https://final-project-v-1-3-njrxj93pi-jujuninitata.vercel.app',
  origin: function (origin, callback) {
    console.log("request downline: " + origin);

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// app.use(cors(corsOptions));
app.use(cors())
app.use(express.json());
// app.use("/api/v1/users", userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/trxcuti', trxcutiRoutes);
app.use('/api/v1/jeniscuti', jenisCutiRoutes);
app.use('/api/v1/jatahcuti', jatahcutiRoutes);

app.listen(process.env.REACT_APP_PORT, () => {
  console.log(`Server runnning on port ` + process.env.REACT_APP_PORT);
});
