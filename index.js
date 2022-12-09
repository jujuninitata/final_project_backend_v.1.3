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

app.use(cors());
app.use(express.json());
// app.use("/api/v1/users", userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/master', masterRoutes);
app.use('/api/v1/trxcuti', trxcutiRoutes);
app.use('/api/v1/jeniscuti', jenisCutiRoutes);
app.use('/api/v1/jatahcuti', jatahcutiRoutes);

app.listen(8000, () => {
  console.log(`Server runnning on port 8000`);
});
