import React from "react";

import Card from "./Card";
import Error from "./Error";
import Popup from "./Popup";
import Header from "./Header";
// import { get, set, keys } from "idb-keyval";

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
      loading: true,
      isFirstTime: true,
      error: {
        status: false,
        message: "",
        code: "",
      }
    };
    this.countriesCodes = [
      ["au", "Australia"],
      ["at", "Austria"],
      ["be", "Belgium"],
      ["br", "Brazil"],
      ["bg", "Bulgaria"],
      ["ca", "Canada"],
      ["cn", "China"],
      ["co", "Colombia"],
      ["cu", "Cuba"],
      ["cz", "Czechia"],
      ["eg", "Egypt"],
      ["fr", "France"],
      ["de", "Germany"],
      ["gr", "Greece"],
      ["hk", "Hong Kong"],
      ["hu", "Hungary"],
      ["in", "India(en)"],
      ["id", "Indonesia"],
      ["ie", "Ireland"],
      ["il", "Israel"],
      ["it", "Italy"],
      ["jp", "Japan"],
      ["lv", "Latvia"],
      ["lt", "Lithuania"],
      ["my", "Malaysia"],
      ["mx", "Mexico"],
      ["ma", "Morocco"],
      ["nl", "Netherlan"],
      ["nz", "New Zealad"],
      ["ng", "Nigeria"],
      ["no", "Norway"],
      ["ph", "Philippine"],
      ["pl", "Poland"],
      ["pt", "Portugal"],
      ["ro", "Romania"],
      ["ru", "Russia"],
      ["sa", "Saudi Arabia"],
      ["rs", "Serbia"],
      ["sg", "Singapore"],
      ["sk", "Slovakia"],
      ["si", "Slovenia"],
      ["za", "South Africa"],
      ["kr", "South Korea"],
      ["ar", "Spain"],
      ["se", "Sweden"],
      ["ch", "Switzerland"],
      ["tw", "Taiwan"],
      ["th", "Thailand"],
      ["tr", "Turkey"],
      ["ae", "UAE"],
      ["gb", "UK"],
      ["us", "US"],
      ["ua", "Ukraine"],
      ["ve", "Venezula"]
    ];
    this.categories = [
      "business",
      "general",
      "entertainment",
      "science",
      "technology",
      "sports",
      "health"
    ];

    this.fetchNews = this.fetchNews.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.firstLaunch = this.firstLaunch.bind(this);
  }

  async fetchNews({ country, category, query, pageSize }) {
    this.setState({
      news: [],
      loading: true,
      err: {
        status: false,
        message: "",
        code: ""
      }
    });

    let api = process.env.REACT_APP_NEWSAPI;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&q=${query}&pageSize=${pageSize}&apiKey=${api}`;

    let response = await fetch(url);
    let results = await response.json();

    if (results.status === "error") {
      console.log(results.message, results.code, results.status);
      this.setState({
        loading: false,
        err: {
          status: true,
          message: results.message,
          code: results.code
        }
      });
    } else {
      let { articles } = results;
      this.setState({ news: articles, loading: false });
    }
  }

  firstLaunch(country, category) {
    console.log(country, category);
    this.setState({
      fetch: { 
        query: "",
        pageSize: "100", 
        category: category, 
        country: country 
      },
      isFirstTime: false
    });

    this.fetchNews(this.state.fetch);
  }

  changeCategory(category) {
    this.setState(prevState => ({
      fetch: { ...prevState.fetch, category: category }
    }));

    this.fetchNews(this.state.fetch);
  }

  componentDidMount() {
    this.fetchNews(this.state.fetch);
  }

  render() {
    let cards = "";

    if (!this.state.error.status) {
      cards = this.state.news.map((item, index) => {
        return <Card key={index} data={item} />;
      });
    }

    return (
      <div>
        {this.state.isFirstTime && <Popup
            firstLaunch={this.firstLaunch}
            countriesCodes={this.countriesCodes}
            categories={this.categories}
            country={this.state.fetch.country}
            category={this.state.fetch.category}
        />}
        <Header {...this.state.fetch} 
          changeCategory={this.changeCategory} 
          countriesCodes={this.countriesCodes}
          categories={this.categories}
        />
        <div className="News-Wrapper">
          <div className="News-Articles">
            {this.state.loading ? (
              <h1>Loading ... </h1>
            ) : this.state.error.status ? (
              <Error {...this.state.error} />
            ) : (
              cards
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
