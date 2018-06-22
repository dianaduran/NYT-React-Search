import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./article.css";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    start: "",
    end: ""
  };



  // componentDidMount() {
  //   this.loadArticles();
  // }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ saved: res.data}),
        console.log("saved: "+this.state.saved)
        )
      .catch(err => console.log(err));
  };

  saveArticle = (id) => {
    const findArticleByID = this.state.articles.find((art) => art._id === id);
    //console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    console.log("newSave: "+newSave);
    API.saveArticle(newSave)
       .then(this.loadArticles());
   
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.start && this.state.end) {     
      API.getRecipes(this.state.topic, this.state.start, this.state.end)
      .then(res => this.setState({ articles: res.data.response.docs }),
       console.log("this.state.articles: ", this.state.articles))
      .catch(err => console.log(err));
    }
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
                    <button className="btn btn-secondary" onClick={() => this.saveArticle(article._id )}>
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
           </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
