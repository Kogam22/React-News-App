import React from "react";

function Error(props) {
    return (
        <div>
            <h1>Error: {props.code}</h1>
            <h2>Message: {props.message}</h2>
        </div>
    );
}

export default Error;