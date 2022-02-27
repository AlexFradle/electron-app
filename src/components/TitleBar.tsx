import React from "react";
const {ipcRenderer} = window.require("electron");

const TitleBar = () => {
    return (
        <div className="title-bar">
            <div className="title-bar-item" onClick={() => {ipcRenderer.send("minimize")}}>-</div>
            <div className="title-bar-item" onClick={() => {ipcRenderer.send("maximize")}}>o</div>
            <div className="title-bar-item" onClick={() => {ipcRenderer.send("close")}}>x</div>
        </div>
    );
};

export default TitleBar;
