import React, { Component } from "react";

import InputRow from "ui-library/lib/components/layout/InputRow";
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import FlexRow, { alignments, justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import PageSection from "ui-library/lib/components/layout/PageSection";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import PasswordStrengthMeter from "ui-library/lib/components/general/PasswordStrengthMeter";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import Text from "ui-library/lib/components/general/Text";

class PasswordStrength extends Component {
    render() {
        return (
            <div style={{
                position: "sticky",
                top: "-1px",
                backgroundColor: "white",
                width: "300px",
                zIndex: 100,
                padding: "15px",
                marginLeft: "auto",
                border: "1px solid #e8ebed"
            }}>
                Password requirement strength:
                <PasswordStrengthMeter
                    score={3}
                />
            </div>
        );
    }
}

/**
 * @class PasswordPolicy
 * @desc This is a template for Password Policy.
 */

export default class PasswordPolicy extends Component {
    state = {
        policyType: "1",
        checkboxes: []
    };

    _handleRadioChange = id => value => this.setState({ [id]: value });

    _handleCheckboxChange = id => () => {
        let selected = this.state.checkboxes;

        selected[id] = selected[id] ? !selected[id] : true;

        this.setState({ checkboxes: selected });
    }

    render() {
        const policyTypeItems = [
            { id: "1", name: "Standard" },
            { id: "2", name: "Passphrase" },
        ];

        const requirementItems = [
            {
                value: "1",
                label: (
                    <span>
                        The password will be checked to make sure
                        it doesn't contain substrings that appear in the user's identity data.
                    </span>
                )
            }, {
                value: "2",
                label: (
                    <span>
                        The password will be checked to make sure it is not too similar to the user's current password.
                    </span>
                ),
                labelHelpHint: `Require password expiration rule must be turned
                        on in order to check password against previous passwords.`
            }, {
                value: "3",
                label: (
                    <span>
                        The password will be checked against a list of most commonly-used passwords.
                    </span>
                )
            }, {
                value: "4",
                label: (
                    <span>
                        The password cannot have more than&nbsp;
                        <FormTextField inline size={5} errorMessage="Example Error Message"/>&nbsp;
                        repeated characters.
                    </span>
                )
            }, {
                value: "5",
                label: (
                    <span>
                        The password must have a minimum of&nbsp;
                        <FormTextField inline size={5} /> unique characters.
                    </span>
                )
            }, {
                value: "6",
                label: (
                    <span>
                        The password must be between <FormTextField inline size={5} />
                        and <FormTextField inline size={5} /> characters.
                    </span>
                )
            }, {
                value: "7",
                label: (
                    <span>
                        The password must have at least&nbsp;
                        <FormTextField inline={true} size={5} /> number(s).
                    </span>
                )
            }, {
                value: "8",
                label: (
                    <span>
                        The password must have at least <FormTextField inline={true} size={5} />
                        &nbsp;
                        lower case letter(s): abcdefghijklmnopqrstuvwxyz.
                    </span>
                )
            }, {
                value: "10",
                label: (
                    <span>
                        The password must have at least <FormTextField inline={true} size={5} />
                        &nbsp;
                        upper case letter(s): ABCDEFGHIJKLMNOPQRSTUVWXYZ.
                    </span>
                )
            }, {
                value: "11",
                label: (
                    <span>
                        The password must have at least&nbsp;
                        <FormTextField inline={true} size={5} />
                        &nbsp;
                        special characters: {`~!@#$%^&*()-_=+[]{}|;:,.<>/?`}
                    </span>
                )
            }
        ];

        const policyItems = [
            {
                value: "12",
                label: (
                    <span>
                        Limit password change frequency. Passwords can be changed every&nbsp;
                        <FormTextField inline={true} size={5} /> hours.
                    </span>
                )
            }, {
                value: "13",
                label: (
                    <span>
                        Require password expiration. Password expires every&nbsp;
                        <FormTextField inline={true} size={5} /> days.
                    </span>
                )
            },
            {
                value: "14",
                label: (
                    <span>
                        Restrict password reuse. <FormTextField inline={true} size={5}/>
                        prior passwords will be maintained in the password history vault for a maximum of&nbsp;
                        <FormTextField inline={true} size={5}/> days.
                    </span>
                )
            },
            {
                value: "15",
                label: (
                    <span>
                        Lockout users after repeated failed login attempts.
                        The user's account will lockout after&nbsp;
                        <FormTextField inline={true} size={5} />&nbsp;
                        failed attempts for <FormTextField inline={true} size={5} /> minutes.
                        Repeated attempts of the same password will not be counted as failed attempts.
                    </span>
                )
            }
        ];

        return (
            <div>
                <PageHeader title="Password Policy" />

                <PageSection>
                    Create a custom password policy by choosing from the options below.&nbsp;
                    <strong>You must have at least X boxes checked in order to save your policy.</strong>
                </PageSection>

                <PageSection>
                    <FormRadioGroup
                        groupName="policy-type"
                        selected={this.state.policyType}
                        onValueChange={this._handleRadioChange("policyType")}
                        items={policyTypeItems}
                        labelText="Choose Your Password Policy Type"
                        stacked={false}
                    />
                </PageSection>

                <PageSection
                    title="Password Requirements"
                >

                    <Layout.Row data-id="columns-2" autoWidth>
                        <Layout.Column>
                            {requirementItems.map((o, key) => (
                                <InputRow key={key}>
                                    <FlexRow alignment={alignments.CENTER}>
                                        <FormCheckbox
                                            onChange={this._handleCheckboxChange(o.value)}
                                            checked={this.state.checkboxes[o.value]}
                                        />
                                        <Text inline>
                                            {o.label}
                                        </Text>
                                    </FlexRow>
                                </InputRow>
                            ))}
                        </Layout.Column>
                        <Layout.Column>
                            <PasswordStrength />
                        </Layout.Column>
                    </Layout.Row>
                </PageSection>

                <PageSection
                    title="Password Policy Rules"
                >
                    {policyItems.map((o, key) => (
                        <InputRow key={key}>
                            <FlexRow alignment={alignments.CENTER}>
                                <FormCheckbox
                                    onChange={this._handleCheckboxChange(o.value)}
                                    checked={this.state.checkboxes[o.value]}
                                />
                                <Text inline>
                                    {o.label}
                                </Text>
                            </FlexRow>
                        </InputRow>
                    ))}
                </PageSection>

                <PageSection>
                    <HR solid />
                    <FlexRow justify={justifyOptions.END}>
                        <Button
                            label="Discard Changes"
                            type={buttonTypes.CANCEL}
                        />
                        <Button
                            label="Save"
                            type={buttonTypes.PRIMARY}
                        />
                    </FlexRow>
                </PageSection>
            </div>
        );
    }
}
