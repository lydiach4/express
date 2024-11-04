const express = require('express');
const path = require('path');

const app = express();

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;

const checkWorkingHours = (req, res, next) => {
    const now = new Date()
  const hour = now.getHours(); // getting the current hour
  if ( hour >= WORK_START_HOUR && hour < WORK_END_HOUR) {
    // if all are true continue and do what is after the middleware 
    return next();
  }
  // if all are false show this instead
  return  res.sendFile(path.join(__dirname, 'notopen.html'));
  // this is a page that shows up when the site is closed.
};


app.use(checkWorkingHours);

app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  'acceuil.html'));
});
app.get('/contacts', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/sign-in', (req,res) => {
    console.log(req.body);
    res.redirect('/');
});


app.listen(3000);