import React from "react";

const Checkbox = ({label}) => {
    return(
        <label className="checkbox">
          <input type="checkbox" className="checkbox__input"/>
          <span className="checkbox__standin"></span>
          <span className="checkbox__label">{label}</span>
        </label>
    )
};

export default Checkbox;
