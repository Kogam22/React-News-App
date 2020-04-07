import React from "react";
import "./Error.css";

function Error(props) {
    return (
        <div className="Error">
            <h1 className="Error-Code">Error: {props.code}</h1>
            <h2 className="Error-Message">Message: {props.message}</h2>
        </div>
    );
}

export default Error;