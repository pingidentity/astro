import React, { Component } from "react";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import Text from "ui-library/lib/components/general/Text";
import ExpandableCard, { ExpandableCardRow, statusTypes } from "ui-library/lib/components/rows/ExpandableCard";
import Link, { linkTypes } from "ui-library/lib/components/general/Link";

/**
* @name ExpandableCardDemo
* @memberof ExpandableCard
* @desc A demo for ExpandableCard
*/
export default class ExpandableCardDemo extends Component {
    render() {

        return (
            <ExpandableCardRow>
                <ExpandableCard
                    title="First Expandable Card"
                    subtitle="Expandable Card"
                    description="Some Text"
                    status={statusTypes.ERROR}
                    statusText="Error Status"
                    cardAccessories={(
                        <Toggle toggled={true} />
                    )}
                    cardControls={(
                        <Link type={linkTypes.PAGE_RETURN}>Return to Page</Link>
                    )}
                >
                    <Text>This is content in the ExpandableCard.</Text>

                </ExpandableCard>
                <ExpandableCard
                    title="Second Expandable Card"
                    subtitle="Expandable Card"
                    description="Some Text"
                    status={statusTypes.ERROR}
                    statusText="Error Status"
                    cardAccessories={(
                        <Toggle toggled={true} />
                    )}
                >
                    <Text>This is content in the ExpandableCard.</Text>
                </ExpandableCard>
            </ExpandableCardRow>
        );
    }
}

