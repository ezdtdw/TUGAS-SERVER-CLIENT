const express = require('express');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.route');
const postRoutes = require('./routes/post.route');
const cors = require("cors");
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

app.listen(3000, () => console.log("Server berjalan di http://localhost:3000"));