const express = require('express');
const app = express();

app.listen(3000, () => console.log(`listening at 3000`));
app.use(express.static('public'))

app.on('connected', ()=> console.log('connected'));


