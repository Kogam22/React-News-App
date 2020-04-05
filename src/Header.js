import React from 'react';
import './Header.css';

function Header(props) {
    let currentCatIndex = props.categories.findIndex(i => i === props.category);

    let Ucfirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="Navbar">
            <a href="#home">Home</a>
            <a href="#news">News</a>
            <div className="Dropdown">
                <button className="dropbtn">Category 
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
                                    checked={index === currentCatIndex}
                                    onChange={() => props.changeCategory(i)}
                                    val={i}
                                /> {Ucfirst(i)}
                            </label>
                        )
                    })}
                </div>
                <div className="Dropdown-Content">

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
        //                                 checked={index === currentCatIndex}
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