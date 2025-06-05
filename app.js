const express = require('express');
const app = express();
const sequelize = require('./config/db');


const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use('/api/users', userRoutes);


sequelize.sync({ alter: true }) 
  .then(() => {
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.log(err));
