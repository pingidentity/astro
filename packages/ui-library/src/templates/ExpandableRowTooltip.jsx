import React from "react";
import ExpandableRow from "../components/rows/ExpandableRow";
import HelpHint from "../components/tooltips/HelpHint";
import Toggle from "../components/forms/form-toggle";

/**
 * @class Section with Columns
 * @desc This is a template to demonstrate how to build a collapsible section with columns. Use
 *     it as a starting poing for an edit page of this type.
 */
const SectionColumns = () => {
    const rowAccessories = [
        <Toggle stateless={false} toggled />
    ];

    return (
        <div className="result-set">
            <ExpandableRow
                title={
                    <div className="hover-tooltip">
                        Resource #1
                        <HelpHint
                            placement="top"
                            hintText="Tooltip"
                            iconName="tag"
                        />
                    </div>
                }
                subtitle="Lorem ipsum"
                stateless={false}
                rowAccessories={rowAccessories}
            >
                Lorem ipsum
            </ExpandableRow>
            <ExpandableRow
                title={
                    <div className="hover-tooltip">
                        Resource #2
                        <HelpHint
                            placement="top"
                            hintText="Tooltip"
                            iconName="tag"
                        />
                    </div>
                }
                stateless={false}
                rowAccessories={rowAccessories}
            >
                Lorem ipsum
            </ExpandableRow>
            <ExpandableRow
                title="Resource #3"
                subtitle="Lorem ipsum"
                stateless={false}
                rowAccessories={rowAccessories}
            >
                Lorem ipsum
            </ExpandableRow>
        </div>
    );
};

SectionColumns.defaultProps = {
    columns: []
};

export default SectionColumns;
