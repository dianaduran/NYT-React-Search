const Article = require("../models/Article");

// Defining methods for the articlesController
module.exports=(app) => {

app.get("/api/articles",function (req, res){
  Article
  .find()
  .sort({ date: -1 })
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
});
 
app.post("/api/articles", function (req, res){
 
  console.log("Adding saved article to the db");
  console.log("req.body: ", req.body); 
  Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

 app.delete("/api/article/:id",function(req, res) {
  Article
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}); 

};
