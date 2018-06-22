import axios from "axios";

const api= {
  // Gets all articles from the database
  getArticles: function() {
    return axios.get("/api/articles");
  },

  // // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/article/" + id);
  },
  // // Saves a article to the database
  saveArticle: function(articleObj) {
    return axios.post("/api/articles", articleObj);
  },

   //Gets articles from the API
  getRecipes: function(topic, startYear, endYear) {
    const authKey = "987a6b86ec174fc9acebed6162976797";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "&end_date=" + endYear + "?page=5";
    console.log(queryURL);
    return axios.get(queryURL);
  },  
 
};

export default api;
