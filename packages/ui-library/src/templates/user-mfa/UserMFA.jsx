import React from "react";
import RockerButton from "ui-library/lib/components/forms/RockerButton";
import PageSection from "ui-library/lib/components/layout/PageSection";
import Button from "ui-library/lib/components/buttons/Button";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import Table from "ui-library/lib/components/tables/Table";
import Anchor from "ui-library/lib/components/general/Anchor";
import Popover from "ui-library/lib/components/tooltips/Popover";
import ConfirmTooltip from "ui-library/lib/components/tooltips/ConfirmTooltip";
import ValueItem from "ui-library/lib/components/layout/ValueItem";
import PageHeader from "../../components/general/PageHeader";

/**
 * @class UserMFA
 * @desc This is a template to demonstrate how to build the User MFA section
 */
export default () => (
    <div>
        <PageHeader title="User MFA" />
        <RockerButton
            labels={[
                "Profile",
                "Roles",
                "MFA"
            ]}
            selectedIndex={2}
        />
        <PageSection title="Status">
            <Table
                lines={false}
                rowLabels={true}
                bodyData={[[
                    "MFA",
                    <ValueItem
                        icon={
                            <ConfirmTooltip
                                label={<Toggle toggled={true}/>}
                                title="Disable MFA"
                                buttonLabel="Disable"
                            >
                                <p>Are you sure you want to disable MFA for this user?</p>
                            </ConfirmTooltip>
                        }
                    >Enabled</ValueItem>,
                ]]}
            />
        </PageSection>
        <PageSection title="Methods and Devices">
            <Table
                lines={false}
                rowLabels={true}
                bodyData={[
                    [
                        "Email",
                        "kaddleman@company.com",
                        [
                            [
                                "Nickname",
                                "Work Email"
                            ],
                            [
                                "Last Sign-on",
                                "2018-04-25 16:35:23 UTC",
                            ],
                            [
                                "Paired",
                                "2018-01-25 12:18:23 UTC",
                            ],
                        ],
                        "Unpair"
                    ],
                    [
                        "Email",
                        "karie.addlemant@gmail.com",
                        [
                            [
                                "Nickname",
                                "Personal Email"
                            ],
                            [
                                "Last Sign-on",
                                "2018-04-25 16:35:23 UTC",
                            ],
                            [
                                "Paired",
                                "2018-01-25 12:18:23 UTC",
                            ],
                        ],
                        "Unpair"
                    ],
                    [
                        "SMS",
                        "+720 888 8787",
                        [
                            [
                                "Nickname",
                                "Phone"
                            ],
                            [
                                "Last Sign-on",
                                "2018-04-25 16:35:23 UTC",
                            ],
                            [
                                "Paired",
                                "2018-01-25 12:18:23 UTC",
                            ],
                        ],
                        "Unpair"
                    ],
                ]}
                cellRenderers={[
                    null, null,
                    entry => (
                        <Popover label={<Anchor>Details</Anchor>} padded>
                            <Table
                                lines={false}
                                rowLabels={true}
                                bodyData={entry}
                            />
                        </Popover>
                    ),
                    entry => (
                        <ConfirmTooltip
                            label={<Button inline>{entry}</Button>}
                            title="Unpair"
                            buttonLabel="Unpair"
                        >
                            <p>Are you sure you want to unpair this authentication method for this user?</p>
                        </ConfirmTooltip>
                    )
                ]}
            />
        </PageSection>
        <Anchor className="forward-link">View All MFA Activity</Anchor>
    </div>
);
