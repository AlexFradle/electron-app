import React from "react";
import ReactDOM from "react-dom";
import TitleBar from "./components/TitleBar";
import "./sass/main.scss";

ReactDOM.render(
    <React.StrictMode>
        <TitleBar />
    </React.StrictMode>,
    document.getElementById("root")
);
