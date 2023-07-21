const express = require('express')
// const cors = require("cors");
const app = express()
const port = 5000
const mongoDB = require("./db")
mongoDB();

// Start  (Below code is to connect Backend to Frontend)   [Process other than cors]
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
// End

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.use(cors());
app.use(express.json())
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/LoginUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}) 