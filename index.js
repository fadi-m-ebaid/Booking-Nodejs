const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const mongoose = require('mongoose');
var authRoute = require('./routes/auth');
var usersRoute = require('./routes/users');

var tourRoute = require('./routes/Tours')
var cityRoute = require('./routes/Cities')
var hotelsRoute = require('./routes/Hotels');
var roomsRoute = require('./routes/rooms');

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO);
}
mongoose.connection.on('connected', () => {
  console.log(`connected to mongoDB`);
});
app.use(cors());
mongoose.connection.on('disconnected', () => {
  console.log(`disconnected to mongoDB!`);
});
//

app.get('/', (req, res) => {
  res.send('first request');
});

// app.listen(6006,()=>{
//     console.log("OK");
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`connected to backend....on port ${PORT}`);
});

app.use(express.json());

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/Cities', cityRoute);
app.use('/Hotels', hotelsRoute);
app.use('/rooms', roomsRoute);


app.use('*', (req, res, next) => {
  res.status(404).end('not found');
});
app.use((req, res, next) => {
  console.log('not foundddd');
});
