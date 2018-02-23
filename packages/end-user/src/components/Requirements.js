import React from "react";
import noIcon from "../icons/error.svg";
import yesIcon from "../icons/success.svg";

const Requirement = ({status, name}) => (
    <div className="requirement">
        {status === "no" && <img className="requirement__icon" src={noIcon} alt="No"/>}
        {status === "yes" && <img className="requirement__icon" src={yesIcon} alt="Yes"/>}
        <span className="requirement__name">{name}</span>
    </div>
);

const Requirements = ({requirements, children}) => (
    <div className="requirements">
        {requirements.map((requirement, i) => <Requirement key={requirement.name+i} {...requirement}/>)}
        {children}
    </div>
);

export default Requirements;
