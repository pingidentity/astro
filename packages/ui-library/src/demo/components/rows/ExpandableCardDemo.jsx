import React, { Component } from "react";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import ExpandableCard, { ExpandableCardRow } from "ui-library/lib/components/rows/ExpandableCard";
import Button from "ui-library/lib/components/buttons/Button";
import Chip, { chipTypes, chipColors } from "ui-library/lib/components/layout/Chip";

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
                    title={(
                        <>
                            <Text type={textTypes.PAGETITLE}>
                                Card Title
                            </Text>
                            <Text type={textTypes.BODY}>
                                Card Subtitle
                            </Text>
                        </>
                    )}
                    collapsedContent={(
                        <Chip type={chipTypes.OUTLINE} color={chipColors.RED}>
                            Error Status
                        </Chip>
                    )}
                    cardAccessories={(
                        <Toggle toggled={true} />
                    )}
                    cardControls={(
                        <>
                            <Button
                                iconName="delete"
                                data-id="delete-btn"
                                inline
                            />
                            <Button
                                iconName="edit"
                                data-id="edit-btn"
                                inline
                            />
                        </>
                    )}
                >
                    <Text>This is content in the ExpandableCard.</Text>

                </ExpandableCard>

                <ExpandableCard
                    title={(
                        <>
                            <Text type={textTypes.PAGETITLE}>
                                Card Title
                            </Text>
                            <Text type={textTypes.BODY}>
                                Card Subtitle
                            </Text>
                        </>
                    )}
                    collapsedContent={(
                        <Chip type={chipTypes.OUTLINE} color={chipColors.RED}>
                            Error Status
                        </Chip>
                    )}
                    cardAccessories={(
                        <Toggle toggled={true} />
                    )}
                    cardControls={(
                        <>
                            <Button
                                iconName="delete"
                                data-id="delete-btn"
                                inline
                            />
                            <Button
                                iconName="edit"
                                data-id="edit-btn"
                                inline
                            />
                        </>
                    )}
                    renderToggle={(props) => <Button {...props} iconName={null}>Expand</Button>}
                >
                    <Text>This is content in the ExpandableCard.</Text>

                </ExpandableCard>
            </ExpandableCardRow>
        );
    }
}

