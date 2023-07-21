const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://root:root@cluster0.tqbpiqm.mongodb.net/gofood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}); //mongoose.connect() used to connect Database to Backend
    console.log('Connected to MongoDB');
    
      // For fetching data from db collection
      const fetched_items = await mongoose.connection.db.collection("food_items").find({}).toArray();
      global.food_items = fetched_items;   //By declaring a global variable, use/update can be done from anywhere in application.
      // console.log(global.food_items)
      const fetched_category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
      global.foodCategory = fetched_category;
      // console.log(global.foodCategory) 

    } catch (error) {
       console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = mongoDB;
