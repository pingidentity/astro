import React, { Component } from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexRow, { alignments, justifyOptions, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageHeader from "ui-library/lib/components/general/PageHeader";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageSection from "ui-library/lib/components/layout/PageSection";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link from "ui-library/lib/components/general/Link";
import { v4 as uuidV4 } from "uuid";
//eslint-disable-next-line import/no-extraneous-dependencies
import Toggle from "ui-library/lib/components/forms/form-toggle";
//eslint-disable-next-line import/no-extraneous-dependencies
import Table, {
    columnAlignments,
    Divider,
    tableWidths,
    verticalAlignments
//eslint-disable-next-line import/no-extraneous-dependencies
} from "ui-library/lib/components/tables/Table";
//eslint-disable-next-line import/no-extraneous-dependencies
import Text, { textTypes } from "ui-library/lib/components/general/Text";
//eslint-disable-next-line import/no-extraneous-dependencies
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import ExpandableCard, { ExpandableCardRow } from "ui-library/lib/components/rows/ExpandableCard";
//eslint-disable-next-line import/no-extraneous-dependencies
import Chip, { chipTypes, chipColors } from "ui-library/lib/components/layout/Chip";

/**
 * @class Gateway Template
 * @desc Gateway Template
 */

export default class GatewayTemplate extends Component {

    state = {
        showingAddResource: false,
        selectedIndex: 2,
        selectedIndexExpandableRow: 2,
        data: [{
            isP1: false,
            input1: "",
            input2: "",
            id: uuidV4(),
        }],
    }

    toggleAddResource = () => this.setState((prevState) => ({ showingAddResource: !prevState.showingAddResource }));

    render() {

        return (
            <div>
                <FlexRow
                    alignment={alignments.TOP}
                    justify={justifyOptions.SPACEBETWEEN}
                >
                    <PageHeader
                        title="Gateways"
                        iconName="resource"
                    />
                    <Button
                        iconName="add"
                        label="Gateway"
                        noSpacing
                    />
                </FlexRow>
                <ExpandableCardRow>
                    {
                        Array.from({ length: 16 }, () => (
                            <ExpandableCard
                                title={(
                                    <>
                                        <Text type={textTypes.PAGETITLE}>
                                            North America Users
                                        </Text>
                                        <Text type={textTypes.BODY}>
                                            2 Instances
                                        </Text>
                                    </>
                                )}
                                collapsedContent={(
                                    <>
                                        <div>
                                            <Text type={textTypes.BODY}>
                                                LDAP/PROXY Gateway
                                            </Text>
                                        </div>
                                        <Chip type={chipTypes.OUTLINE} color={chipColors.RED}>
                                            Update Required
                                        </Chip>
                                    </>
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
                                <InputRow>
                                    <PageSection title="Instances" underlined={false}>
                                        <Table
                                            verticalAlignment={verticalAlignments.MIDDLE}
                                            width={tableWidths.FULL_FIXED}
                                            columnStyling={[
                                                {
                                                    width: "40%",
                                                },
                                                {
                                                    width: "10%"
                                                },
                                                {
                                                    width: "17.5%"
                                                },
                                                {
                                                    width: "17.5%"
                                                },
                                                {
                                                    width: "1%"
                                                },
                                                {
                                                    width: "15%",
                                                    alignment: columnAlignments.CENTER,
                                                }
                                            ]}
                                            bodyData={[
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>
                                                        394SDFA3939
                                                        </Text>

                                                        <Text >Version 1.3  <Link>Update Available</Link> </Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>13%</Text><br />
                                                        <Text type={textTypes.LABEL}>% BUSY</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br />
                                                        <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                    </div>,
                                                    <Divider />,
                                                    <Text type={textTypes.SUCCESS}>Healthy</Text>,
                                                ],
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>306d8a3d1e7
                                                        </Text>
                                                        <Text type={textTypes.VALUE}>Version 1.3</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>13%</Text><br />
                                                        <Text type={textTypes.LABEL}>% BUSY</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                    </div>,
                                                    <div>0
                                                        <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br />
                                                        <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                    </div>,
                                                    <Divider />,
                                                    <Text type={textTypes.ERROR}>
                                                        <Icon
                                                            iconName="alert-solid"
                                                            iconSize={iconSizes.MD}
                                                            type="inline"
                                                        />
                                                    </Text>,
                                                ],
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>
                                                        3d1e7aa06d8a3d
                                                        </Text>
                                                        <Text type={textTypes.VALUE}>Version 1.3</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>13%</Text><br />
                                                        <Text type={textTypes.LABEL}>% BUSY</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br />
                                                        <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                    </div>,
                                                    <Divider />,
                                                    <Text type={textTypes.SUCCESS}>Healthy</Text>,
                                                ],
                                            ]}
                                        />
                                    </PageSection>
                                </InputRow>
                                <br />
                                <InputRow>
                                    <PageSection
                                        title={
                                            <FlexRow spacing={spacingOptions.SM} alignment={alignments.CENTER}>
                                                <Text inline type={textTypes.SECTIONTITLE}>
                                                Gateway Authentication Tokens
                                                </Text>
                                                <Button inline>+ Token</Button>
                                            </FlexRow>
                                        }
                                        underlined={false}>
                                        <Table
                                            verticalAlignment={verticalAlignments.MIDDLE}
                                            width={tableWidths.FULL_FIXED}
                                            columnStyling={[
                                                {
                                                    width: "40%",
                                                },
                                                {
                                                    width: "20%"
                                                },
                                                {
                                                    width: "20%"
                                                },
                                                {
                                                    alignment: columnAlignments.RIGHT,
                                                    width: "20%"
                                                }
                                            ]}
                                            bodyData={[
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>
                                                        39-49499p3p390
                                                        </Text>
                                                        <Text type={textTypes.LABEL}>Token ID</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>2018-09-09</Text><br />
                                                        <Text type={textTypes.LABEL}>Date Created</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>Now</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Last Used</Text>
                                                    </div>,
                                                    <Button inline>Revoke</Button>,
                                                ],
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>
                                                        39-49499p3p390
                                                        </Text>
                                                        <Text type={textTypes.LABEL}>Token ID</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>2018-09-09</Text><br />
                                                        <Text type={textTypes.LABEL}>Date Created</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>Now</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Last Used</Text>
                                                    </div>,
                                                    <Button inline>Revoke</Button>,
                                                ],
                                                [
                                                    <div>
                                                        <Text
                                                            inline
                                                            type={textTypes.PRIMARY}>39-49499p3p390
                                                        </Text>
                                                        <Text type={textTypes.LABEL}>Token ID</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>2018-09-09</Text><br />
                                                        <Text type={textTypes.LABEL}>Date Created</Text>
                                                    </div>,
                                                    <div>
                                                        <Text inline type={textTypes.VALUE}>Now</Text><br />
                                                        <Text inline type={textTypes.LABEL}>Last Used</Text>
                                                    </div>,
                                                    <Button inline>Revoke</Button>,
                                                ],
                                            ]}
                                        />
                                    </PageSection>
                                </InputRow>
                            </ExpandableCard>
                        ))
                    }
                </ExpandableCardRow>
            </div>
        );
    }
}

