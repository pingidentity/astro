import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Text from "../general/Text";

/**
 * @class FileDetails
 * @desc Renders formatted file title, valid to, and valid from dates
 *
 * @param {string} [fileName]
 *       The file name to display
 * @param {string} [validTo]
 *      The date the certificate or selected file expires
 * @param {string} [validFrom]
 *      The certificates validation date
 * @param {string} [className]
 *      Extra CSS class(s) applied to the top-level HTML container.
 * @param {string} [data-id]
 *     The data-id of the component.
 * @example
     <FileDetails fileName="example.pdf" validFrom="1/6/2018" validTo="1/6/2019">
 */


export const FileDetails = ({
    "data-id": dataId,
    className,
    fileName,
    validTo,
    validFrom,

}) => {
    return (
        <div data-id={dataId} className={classnames("file-details__file", className )}>
            <div data-id="file-name" className="file-details__file-name">
                {fileName}
            </div>
            <div data-id="file-data" className="file-details__file-data">
                <span>
                    Valid&nbsp;
                    <Text inline type="value">{validFrom}</Text> to&nbsp;
                    <Text inline type="value">{validTo}</Text>
                </span>
            </div>
        </div>
    );
};

FileDetails.propTypes = {
    className: PropTypes.node,
    fileName: PropTypes.string,
    validTo: PropTypes.string,
    validFrom: PropTypes.string
};

export default FileDetails;
