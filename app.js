//jshint esversion:6

/*const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const bcrypt = require("bcrypt");
//const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/todolistDb" , {useNewUrlParser : true, useUnifiedTopology: true});


const itemsSchema = mongoose.Schema( {
  name : {
    type: String
  }
});


//const Item = module.exports = mongoose.model('Item', itemsSchema);




// USER SCHEMA
/*var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
*/

/*const Item =  mongoose.model("Item" , itemsSchema);
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

const item1 = new Item({
  name : "Welcome to your toDoList"
});

const item2 = new Item({
  name : "Hit + button to add new item"
});

const item3 = new Item({
  name : "-- Hit this to delete an item"
});

//{ name: 'Gourav', age: 20},
  //  { name: 'Kartik', age: 20},
    //{ name: 'Niharika', age: 20}

/*Item.insertMany([
  {item1},
  { item2},
  { item3}
]).then(function(){
  console.log("Data inserted")  // Success
}).catch(function(error){
  console.log(error)      // Failure
});
*/
/*async function getItems(){

  const Items = await Item.find({});
  return Items;

}

      
app.get("/", function(req, res) {

  var today = new Date();
  var options = { weekday: "long", day: "numeric", year: "numeric" , 
  month: "numeric" };

  var day = today.toLocaleDateString("en-GB", options);

  async function getItems() {
    try {
      const foundItems = await Item.find({});
      console.log(foundItems);

      if(foundItems.length === 0)
      {
        Item.insertMany([
          {item1},
          { item2},
          { item3}
        ]).then(function(){
          console.log("Data inserted")  // Success
        }).catch(function(error){
          console.log(error)      // Failure
        });
        
      res.redirect("/");     
      }
      else{
        res.render("list", {listTitle:day, newListItems: items});
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  getItems();

  

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});*/


//jshint esversion:6
 
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
 
app.set("view engine", "ejs");
 
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));
 
mongoose.connect("mongodb+srv://John:Brit0IVtfFLnv9Sd@cluster0.ugyrdoc.mongodb.net/todolistDB");
 
// mongoose (Schema)
const itemsSchema = {
  name: String,
};
// mongooes (model)
const Item = mongoose.model("Item", itemsSchema);
 
const item1 = new Item({
  name: "Welcome to your TO do list",
});
const item2 = new Item({
  name: "Hit the + to your ToDoList",
});
const item3 = new Item({
  name: "<-- hit this to delete an item",
});
 
const defaultItems = [item1, item2, item3];
 
const listSchema = {
  name : String,
  items : [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  //printing all store values in terminal (In my case Hyper Terminal)
  Item.find({})
    .then(foundItem => {
      if (foundItem.length === 0) {
        return Item.insertMany(defaultItems);
      } else {
        return foundItem;
      }
    })
    .then(savedItem => {
      res.render("list", {
        listTitle: "Today",
        newListItems: savedItem
      });
    })
    .catch(err => console.log(err));
 
});

app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
 
  List.findOne({ name: customListName })
    .then(function (foundList) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});
 
// error MongooseError: Model.find() no longer accepts a callback error
//   Item.find()
//     .then(function (foundItem) {
//       if (foundItem === 0) {
//         // inserting all item into todolistDB using mongoose
//         Item.insertMany([item1, item2, item3])
//           .then(function (items) {
//             console.log("SuccessFully save all the items to todolistDB");
//           })
//           .catch(function (err) {
//             console.log(err);
//           });
//           res.redirect("/");
//       } else {
//         res.render("list", {
//           listTitle: "Today",
//           newListItems: foundItem,
//         });
//       }
 
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });
 
app.post("/", function (req, res) {
  /*const item = req.body.newItem;
 
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    foundItem.push(item);
    res.redirect("/");
  }*/
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({
    name : itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
   .then(function (foundList)
     {
       foundList.items.push(item);
       foundList.save();
       res.redirect("/" + listName);
     });
  }
});

app.post("/delete" ,async function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today")
  {
    await Item.findByIdAndRemove(checkedItemId)
    .then(()=>console.log(`Deleted ${checkedItemId} Successfully`))
    .catch((err) => console.log("Deletion Error: " + err));
    res.redirect("/");
  }

  else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(function (foundList)
      {
        res.redirect("/" + listName);
      });
  }
  //if(checkedItemId != undefined){
   
});
 
app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});
 
app.get("/about", function (req, res) {
  res.render("about");
});
 
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
 