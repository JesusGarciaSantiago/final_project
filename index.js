const express = require('express');
const morgan = require ('morgan');
const app = express();

//routes
const admin = require ('./routes/admin');


//middleware

const auth = require('./middleware/auth');
const index =  require('./middleware/index');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');


app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', index);
app.use('/admin', admin);
app.use (auth);

app.use(notFound);


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running...");
});