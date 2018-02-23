import React from "react";

const Heading = ({children, level}) => {
    if (level == 4) {
        return <h4 className="heading heading--4">{children}</h4>
    }
    return <h1 className="heading">{children}</h1>
}

export default Heading;
