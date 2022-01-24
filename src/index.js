import React from "react";
import ReactDOM from "react-dom"
import minifiedConstants from './Constants/MinifiableConstants/actionTypes'
import constants from './Constants/NonMinifiableConstants/actionTypes'

function newComponent(){
    let ele = document.createElement("div")
    ele.id="reactRoot"
    return ele
}
document.body.appendChild(newComponent());
ReactDOM.render(<div>
    <div>This is a demo project of minifing values from constants file</div>
    <div>Constant value : {constants.SHOW_UPDATE_POPUP_0}</div>
    <div>Minified Constant value : {minifiedConstants.SHOW_UPDATE_POPUP_0}</div>

</div>,document.getElementById("reactRoot"))