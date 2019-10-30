import React, { Component } from "react";
import Button from "ui-library/lib/components/buttons/Button";
import FlexRow, { alignments, justifyOptions, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import PageSection from "ui-library/lib/components/layout/PageSection";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import Link from "ui-library/lib/components/general/Link";
import { v4 as uuidV4 } from "uuid";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import Table, {
    columnAlignments,
    Divider,
    tableWidths,
    verticalAlignments
} from "ui-library/lib/components/tables/Table";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import InputRow from "ui-library/lib/components/layout/InputRow";

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
                <ExpandableRow.SimpleWrapper data-id="idp-row">
                    <ExpandableRow.RowSection title="Example Heading">
                        <ExpandableRow
                            title="North American Users"
                            subtitle="LDAP/PROXY Gateway"
                            onEditButtonClick={this.toggleAddResource}
                            rowAccessories={<Toggle />}
                        >
                            <InputRow>
                                <PageSection title="Instances" underlined= {false}>
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
                                                    <Text inline type={textTypes.VALUE}>13%</Text><br/>
                                                    <Text type={textTypes.LABEL}>% BUSY</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                </div>,
                                                <Divider/>,
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
                                                    <Text inline type={textTypes.VALUE}>13%</Text><br/>
                                                    <Text type={textTypes.LABEL}>% BUSY</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                </div>,
                                                <Divider/>,
                                                <Text type={textTypes.ERROR}>
                                                    <Icon iconName="alert-solid" iconSize={iconSizes.MD}/>
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
                                                    <Text inline type={textTypes.VALUE}>13%</Text><br/>
                                                    <Text type={textTypes.LABEL}>% BUSY</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>.045 Seconds</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>Transaction Time</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>39-4949p3p394</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>TOKEN ID</Text>
                                                </div>,
                                                <Divider/>,
                                                <Text type={textTypes.SUCCESS}>Healthy</Text>,
                                            ],
                                        ]}
                                    />
                                </PageSection>
                            </InputRow>
                            <br/>
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
                                    underlined= {false}>
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
                                        bodyData={ [
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
                                                    <Text inline type={textTypes.VALUE}>2018-09-09</Text><br/>
                                                    <Text type={textTypes.LABEL}>Date Created</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>Now</Text><br/>
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
                                                    <Text inline type={textTypes.VALUE}>2018-09-09</Text><br/>
                                                    <Text type={textTypes.LABEL}>Date Created</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>Now</Text><br/>
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
                                                    <Text inline type={textTypes.VALUE}>2018-09-09</Text><br/>
                                                    <Text type={textTypes.LABEL}>Date Created</Text>
                                                </div>,
                                                <div>
                                                    <Text inline type={textTypes.VALUE}>Now</Text><br/>
                                                    <Text inline type={textTypes.LABEL}>Last Used</Text>
                                                </div>,
                                                <Button inline>Revoke</Button>,
                                            ],
                                        ]}
                                    />
                                </PageSection>
                            </InputRow>
                        </ExpandableRow>
                    </ExpandableRow.RowSection>
                </ExpandableRow.SimpleWrapper>
            </div>
        );
    }
}

