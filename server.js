const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
// import from express-handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set handlebars as teh template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`APP LISTENING ON PORT ${PORT}!`);
  });
});
