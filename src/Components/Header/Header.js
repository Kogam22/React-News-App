import React from "react";
import "./Header.css";

function Header(props) {
  // let category = props.params.category;
  let currentCategoryIndex = props.categories.findIndex(
    (i) => i === props.params.category
  );
  let currentCountryIndex = props.countries.findIndex(
    (i) => i[0] === props.params.country
  );

  let Ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  let changeCategory = (category) => {
    props.setParams({ country: props.params.country, category: category });
  };
  let changeCountry = (country) => {
    props.setParams({ country: country, category: props.params.category });
  };

  return (
    <div className="Navbar">
      <a href="#home">Home</a>
      {/* <a href="#news">News</a> */}
      <div className="Dropdown">
        <button className="dropbtn">
          Category
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="Dropdown-Content">
          {props.categories.map((i, index) => {
            return (
              <label key={index}>
                <input
                  key={index}
                  type="radio"
                  name="category"
                  checked={index === currentCategoryIndex}
                  onChange={() => changeCategory(i)}
                  val={i}
                />{" "}
                {Ucfirst(i)}
              </label>
            );
          })}
        </div>
      </div>
      <div className="Dropdown">
        <button className="dropbtn">
          Country
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="Dropdown-Content">
          {props.countries.map((i, index) => {
            return (
              <label key={index}>
                <input
                  key={index}
                  type="radio"
                  name="country"
                  checked={index === currentCountryIndex}
                  onChange={() => changeCountry(i[0])}
                  val={i[0]}
                />{" "}
                {i[1]}
              </label>
            );
          })}
        </div>
      </div>
    </div>

    // <div className="Header">
    //     <ul>
    //         <li className="Navbar-Item"><span>React News App</span></li>
    //         <li className="Navbar-Item">
    //             <div className="Dropdown-Main">
    //                 <span>Category ▼<i class="fa fa-caret-down"></i></span>
    //                 <div className="Dropdown-Wrapper Category">
    //                     {categories.map((i, index) => {
    //                         return (<label
    //                             key={index}
    //                             className="DropdownItem">
    //                             <input
    //                                 key={index}
    //                                 type="radio"
    //                                 name="category"
    //                                 value={i}
    //                                 checked={index === currentCategoryIndex}
    //                                 onChange={() => props.changeCategory(i)}
    //                             /> {Ucfirst(i)}
    //                             </label>)
    //                     })}

    //                 </div>
    //             </div>
    //         </li>
    //         <li className="Navbar-Item"><a href="/">Country</a></li>
    //         <li className="Navbar-Item"><a href="/">Language</a></li>
    //     </ul>
    // </div>
  );
}

export default Header;
