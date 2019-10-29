import React, { Component } from "react";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import FlexRow, { alignments, justifyOptions } from "../components/layout/FlexRow";
import InputRow from "ui-library/lib/components/layout/InputRow";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Text from "ui-library/lib/components/general/Text";
import InlineMessage from "ui-library/lib/components/general/InlineMessage";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import Padding, { sizes } from "ui-library/lib/components/layout/Padding";
import Chip, { chipTypes, chipColors } from "ui-library/lib/components/layout/Chip";

/**
* @name Certificate Management
* @desc This is a template to demonstrate how to build a Cert Management template.
*/
export default class CertificateManagement extends Component {

    _onSearchType = () => {}

    render() {
        return (
            <div>
                <PageHeader title="Certificate Management" />
                <PageSection border={false}>
                    <InputRow>
                        As a safeguard, only users added to this whitelist will receive
                        notifications from this environment.
                    </InputRow>
                    <FlexRow
                        alignment={alignments.TOP}
                        justify={justifyOptions.SPACEBETWEEN}
                    >
                        <SearchBar onValueChange={this._onSearchType}>
                            <FormCheckbox label="Filter 1" inline key="uno" />
                            <FormCheckbox label="Filter 2" inline key="dos" />
                            <FormCheckbox label="Filter 3" inline key="tres" />
                        </SearchBar>
                    </FlexRow>
                    <InlineMessage type={InlineMessage.MessageTypes.ERROR}>
                        You have <a href="#">1 expired certificate</a> and <a href="#">1 expiring certificate</a>
                    </InlineMessage>

                    <ExpandableRow.SimpleWrapper data-id="idp-row">
                        <ExpandableRow
                            title="Dan's Cert Which Will Expire"
                            subtitle="Default for None"
                            icon="icon-info"
                            rowAccessories={[
                                <Text type="error" key="1" inline>
                                    <Padding right={sizes.SM} inline>
                                        <Icon iconName="alert" iconSize={iconSizes.SM} type="inline" />
                                    </Padding>
                                    Expiring: 2019-06-01T116:17:04.449Z
                                </Text>
                            ]}
                        >
                            <LabelValuePairs dataPairs={[
                                {
                                    label: "ACS URLS",
                                    value: <Text>https://www.example.com</Text>
                                }, {
                                    label: "ENTITY ID",
                                    value: <Text>1</Text>
                                }, {
                                    label: "SIGNING CERTIFICATE",
                                    value: <Text>Certificate Name<br/>Sign Assertion, Sign Response</Text>
                                }, {
                                    label: "SLO ENDPOINT",
                                    value: <Text>https://www.example.com</Text>
                                }, {
                                    label: "SLO RESPONSE ENDPOINT",
                                    value: <Text/>
                                }, {
                                    label: "SLO BINDING",
                                    value: <Text>HTTP POST</Text>
                                }, {
                                    label: "VERFICIATION CERTIFICATE",
                                    value: <Text>
                                        <Icon
                                            className="text-error"
                                            iconName="alert"
                                            data-id="myicon"
                                            iconSize={iconSizes.SM}
                                            type="leading"
                                        />
                                        testName.xml
                                        <br />Valid 04-15 to 09-17
                                    </Text>
                                }
                            ]} />
                        </ExpandableRow>

                        <ExpandableRow
                            title="dk-litterbox"
                            subtitle="Encryption"
                            icon="icon-cert-connection"
                            rowAccessories={[
                                <Text type="warning" key="1" inline>
                                    <Padding right={sizes.SM} inline>
                                        <Icon iconName="alert" iconSize={iconSizes.SM} type="inline" />
                                    </Padding>
                                    Expiring: 2019-06-01T116:17:04.449Z
                                </Text>,
                                <Text type="warning" key="2" inline>
                                    <Padding left={sizes.SM} inline>
                                        <Chip type={chipTypes.CONDENSED} color={chipColors.DARKGREY}>DEFAULT</Chip>
                                    </Padding>
                                </Text>
                            ]}
                        />

                        <ExpandableRow
                            title="dk-litterbox"
                            subtitle="Signing"
                            icon="icon-cert-connection"
                            rowAccessories={[
                                <Text key="1" inline>
                                    Expiring: 2019-06-01T116:17:04.449Z
                                </Text>,
                                <Text key="2" inline>
                                    <Padding left={sizes.SM} inline>
                                        <Chip type={chipTypes.CONDENSED} color={chipColors.DARKGREY}>DEFAULT</Chip>
                                    </Padding>
                                </Text>
                            ]}
                        />

                        <ExpandableRow
                            title="test"
                            subtitle="Verification"
                            icon="icon-cert-connection"
                            rowAccessories={[
                                <Text key="1" inline>
                                    Expiring: 2019-06-01T116:17:04.449Z
                                </Text>,
                                <Text key="2" inline>
                                    <Padding left={sizes.SM} inline>
                                        <Chip type={chipTypes.CONDENSED} color={chipColors.DARKGREY}>DEFAULT</Chip>
                                    </Padding>
                                </Text>
                            ]}
                        />
                    </ExpandableRow.SimpleWrapper>
                </PageSection>
            </div>
        );
    }
}