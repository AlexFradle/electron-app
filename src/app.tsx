import React from "react";
import ReactDOM from "react-dom";
import TitleBar from "./components/TitleBar";
import "./sass/main.scss";
import Widget from "./components/Widget";

ReactDOM.render(
    <React.StrictMode>
        <TitleBar />
        <Widget />
    </React.StrictMode>,
    document.getElementById("root")
);
