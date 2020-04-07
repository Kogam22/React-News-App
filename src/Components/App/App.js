import React from "react";
import { get, set, keys} from "idb-keyval";

import Card from "../Card/Card";
import Error from "../Error/Error";
import Popup from "../Popup/Popup";
import Header from "../Header/Header";
import { useState, useEffect } from "react";

import "./App.css";

async function fetchNews(params, query, pageSize, api) {
  const url = `https://newsapi.org/v2/top-headlines?country=${params.country}&category=${params.category}&q=${query}&pageSize=${pageSize}&apiKey=${api}`;

  let res = await fetch(url);
  let result = await res.json();

  if (result.status === "ok")
    return { status: "ok", articles: result.articles };
  else
    return {
      status: "error",
      err: { code: result.code, message: result.message },
    };
}

export default function App() {
  const [params, setParams] = useState({ country: "in", category: "business" });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(get("firstTime").then(x => x));
  console.log("1 firstTime", firstTime);
  const [news, setNews] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});

  const pageSize = "100";
  const api = process.env.REACT_APP_NEWSAPI;
  const countries = [
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
    ["ve", "Venezula"],
  ];
  const categories = [
    "business",
    "general",
    "entertainment",
    "science",
    "technology",
    "sports",
    "health",
  ];

    if (firstTime === undefined || firstTime === false) {
      set("firstTime", "true");
      keys().then((keys) => console.log(keys));
      get("firstTime").then(d => console.log(d));
    }

  useEffect(() => {
    setLoading(true);
    setNews([]);
    setErrorStatus(false);
    setErrorInfo({});

    (async () => {
      const news = await fetchNews(params, query, pageSize, api);

      if (news.status === "ok") {
        setNews(news.articles);
        setLoading(false);
      } else {
        console.log(news.err.message, news.err.code);

        setErrorStatus(true);
        setErrorInfo(news.err);
        setLoading(false);
      }
    })();

    
  }, [params, api, query]);

  useEffect(() => {
    set("firstTime", false);
  }, [firstTime]);

  return (
    <div>
      {firstTime && (
        <Popup
          setFirstTime={setFirstTime}
          countries={countries}
          categories={categories}
          params={params}
          setParams={setParams}
        />
      )}
      <Header
        params={params}
        query={query}
        setQuery={setQuery}
        setParams={setParams}
        countries={countries}
        categories={categories}
      />
      {!firstTime && 
        <div className="News-Wrapper">
          <div className="News-Articles">
            {loading ? (
              <h1>Loading ... </h1>
            ) : errorStatus ? (
              <Error {...errorInfo} />
            ) : (
              news.map((item, index) => {
                return <Card key={index} data={item} />;
              })
            )}
          </div>
        </div>
      }
    </div>
  );
}
