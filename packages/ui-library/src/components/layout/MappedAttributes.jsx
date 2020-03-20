import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Chip, { chipColors } from "./Chip";
import Icon from "../general/Icon";
import Table from "../tables/Table";

/**
* @class MappedAttributes
* @desc A display component to show attribute mappings and their properties.
*
* @param {string} [data-id=mapped-attributes]
*     The data-id of the component.
* @param {string} [className]
*     Class name(s) to add to the top-level container/div.
*
* @param {Object[]} [attributes]
*     The attributes to be mapped.
* @param {string} [attributes.from]
*     The attribute to be mapped from.
* @param {string} [attributes.to]
*     The attribute to be mapped to.
* @param {string} [attributes.type]
*     The type of attribute.
* @param {boolean} [attributes.required]
*     Whether or not the attribute is required.
* @param {boolean} [fullWidth=false]
*     Whether the component takes up the full width of the container.
*
* @param {Object[]} [labels]
*     The labels that will appear above the attributes.
* @param {string} [labels.from]
*     Label for the attribute to be mapped from.
* @param {string} [labels.to]
*     Label for the attribute to be mapped to.
* @param {string} [labels.type]
*     Label for the type of attribute.
* @param {boolean} [labels.required]
*     Label for whether or not the attribute is required.
* @param {boolean} [lines=true]
*     Show/hide lines inbetween rows
*/

// Always have five labels so that label line extends for the correct length
const getLabels = ({
    from = "",
    to = "",
    type = "",
    required = ""
}) => [
    from,
    "",
    to,
    type,
    required
];

function MappedAttributes({
    attributes,
    className,
    "data-id": dataId,
    labels,
    lines,
}) {
    return (
        <Table
            className={
                classnames(
                    "mapped-attributes",
                    className
                )
            }
            lines={lines}
            data-id={dataId}
            bodyData={
                attributes.map(({
                    from,
                    to,
                    type,
                    required
                }) => ([
                    <Chip
                        className="mapped-attributes__from"
                        color={chipColors.CYAN}
                        fullWidth
                        key="from"
                    >
                        <Icon
                            iconName="user"
                            type="leading"
                        >
                            {from}
                        </Icon>
                    </Chip>,
                    "=",
                    <Chip
                        className="mapped-attributes__to"
                        color={chipColors.LIGHTGREY}
                        fullWidth
                        key="to"
                    >
                        <Icon
                            iconName="apps"
                            type="leading"
                        >
                            {to}
                        </Icon>
                    </Chip>,
                    type,
                    required && <span className="mapped-attributes__required" key="required">Required</span>
                ]))
            }
            // Add a minWidth here in case one column is very wide; the other columns will get extremely
            // squished otherwise.
            columnStyling={[
                { minWidth: "100px" },
                {},
                { minWidth: "100px" },
                { minWidth: "80px" },
                { minWidth: "80px" }
            ]}
            headData={
                // Always have four labels so that label line extends for the correct length
                getLabels(labels)
            }
        />
    );
}

MappedAttributes.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    attributes: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.string,
            to: PropTypes.string,
            type: PropTypes.string,
            required: PropTypes.bool
        })
    ),
    labels: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
        type: PropTypes.string,
        required: PropTypes.bool
    }),
    lines: PropTypes.bool,
};

MappedAttributes.defaultProps = {
    attributes: [],
    "data-id": "mapped-attributes",
    labels: {},
    lines: true,
};

export default MappedAttributes;
