const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
 const userRoute= require('./signuproute/signuproute');
const bodyParser = require("body-parser");

const PORT = 5000 || process.env.PORT;

//allow cross-origin  requests
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello world');
});



mongoose.connect('mongodb://rafae:meh169222@ds057528.mlab.com:57528/retroapp');
mongoose.connection.once('open', () => {
    console.log('connected to database');
})  

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))


//body parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }))
 app.use("/user",userRoute);


app.listen(PORT, function () {
    console.log(`Your app is running on port ${PORT}`);
})
