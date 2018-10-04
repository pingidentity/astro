import React from "react";
import PropTypes from "prop-types";

const InputRow = ({
        children,
        "data-id": dataId,
    }) => {

    return (
        <div data-id={dataId} className="input-row">
            {children}
        </div>
    );
};

InputRow.propTypes = {
    "data-id": PropTypes.string,
    children: PropTypes.node,
};

InputRow.defaultProps = {
    "data-id": "input-row"
};

export default InputRow;