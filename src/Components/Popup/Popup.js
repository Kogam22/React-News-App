import React from "react";
// import { get, set } from "idb-keyval";

import "./Popup.css";

function Popup(props) {
  let country = props.params.country;
  let category = props.params.category;

  const getCountry = (e) => {
    country = e.target.value;
  };
  const getCategory = (e) => {
    category = e.target.value;
  };

  const Ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const submit = () => {
    if (
      category === props.params.category &&
      country === props.params.country
    ) {
      props.setFirstTime(false);
      return null;
    } else {
      props.setFirstTime(false);
      props.setParams({ country: country, category: category });
    }
  };

  console.log("came into Popup");
  return (
    <div className="Popup" onClick={submit}>
      <div className="Popup-Content">
        <h3 className="Popup-Main">We'd like you to set some preferences.</h3>
        <div className="Popup-Select">
          <label className="Popup-Select-Text">Country</label>
          <select
            className="Popup-Select-Drop"
            name="country"
            onChange={getCountry}
            required
            defaultValue={props.params.country}
          >
            {props.countries.map((item, index) => {
              return (
                <option value={item[0]} key={index}>
                  {" "}
                  {item[1]}{" "}
                </option>
              );
            })}
          </select>
        </div>
        <div className="Popup-Select">
          <label className="Popup-Select-Text">Category</label>
          <select
            className="Popup-Select-Drop"
            name="category"
            onChange={getCategory}
            required
            defaultValue={props.params.category}
          >
            {props.categories.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {Ucfirst(item)}
                </option>
              );
            })}
          </select>
        </div>
        <div className="Popup-Close">
          <span className="Popup-Close-Button" onClick={submit}>
            Done
          </span>
        </div>
      </div>
    </div>
  );
}

export default Popup;
