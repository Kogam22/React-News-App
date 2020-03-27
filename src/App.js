import React from "react";

import Card from './Card';
import Header from './Header';

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetch: {
        country: "us",
        category: "business",
        query: "",
        pageSize: "100"
      },
      news: [],
      loading: true
    };
  }

  async fetchNews({ country, category, query, pageSize }) {
    let api = process.env.REACT_APP_NEWSAPI;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${query}&pageSize=${pageSize}&apiKey=${api}`;

    let response = await fetch(url);
    let results = await response.json();

    let { articles } = results;
    return articles;
  }

  componentDidMount() {
    this.fetchNews(this.state.fetch).then(articles => {
      this.setState({ news: articles, loading: false });
    })
  }

  render() {
    let cards = this.state.news.map((item, index) => {
      return <Card key={index} data={item} />;
    })
    return (
      <div>
        <Header />
        <div className="News-Wrapper">
          <div className="News-Articles">
            {this.state.loading ? ( <h1>Loading ... </h1> ) : ( cards )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
