import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import DeleteBtn from "../../components/DeleteBtn";
import "./article.css";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    start: "",
    end: ""
  };


//function is working when the page is loaded
  componentDidMount() {
    this.loadArticles();
  }

  //get articles from the DB
  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ saved: res.data, topic:"", start:"", end:""}),
      )
      .catch(err => console.log(err));
  };

  //save article into the DB firt check if it already exist in the DB
  saveArticle = (id, url) => {  
    this.loadArticles();
    const findArticleByUrl = this.state.saved.find((art) => art.url === url);
   
   //find article by url in the DB
    if(findArticleByUrl===undefined){
      const findArticleByID = this.state.articles.find((art) => art._id === id);
      //console.log("findArticleByID: ", findArticleByID);
      const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
      console.log("newSave: "+newSave.url);
      API.saveArticle(newSave)
         .then(this.loadArticles());
    }
    //is already in the DB
    else{
      alert("This Article is already saved!!");
    }   
  };

  //work with the input 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Get data from the API
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.start && this.state.end) {     
      API.getRecipes(this.state.topic, this.state.start, this.state.end)
      //slice is because is supouse get just 5 elements
      .then(res =>this.setState({ articles: res.data.response.docs.slice(0,5) }),
       console.log("articles saved in articles array"))
      .catch(err => console.log(err));
    }
  };

  //delete article from the DB
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>---Search---</h1>
            <form>
              Topic
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              Start Year
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start Year (required)"
                type="date"
              />
              End Year
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End Year (required)"
                type="date"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
            </div>
          </Col>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>---Results---</h1>
          {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <p>{article.snippet}</p>                   
                    <button className="btn btn-secondary" onClick={() => this.saveArticle(article._id , article.web_url)}>
                      Save
                    </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </div>
          </Col>
          <Col size="md-12">
          <div className="ColDiv">
          <h1>---Saved Articles---</h1>
          {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/article/" + article._id}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
           </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
