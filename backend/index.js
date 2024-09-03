const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rout = require('./routes/router')
const app = express();


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'build')));
app.use(rout)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(3050, ()=>{
    console.log('server is started');
});