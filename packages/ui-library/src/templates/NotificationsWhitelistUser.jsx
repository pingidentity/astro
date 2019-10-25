import React from "react";

import Button from "ui-library/lib/buttons/Button";
import ExpandableRow from "ui-library/lib/rows/ExpandableRow";
import InlineMessage, { MessageTypes } from "ui-library/lib/general/InlineMessage";
import Link from "ui-library/lib/general/Link";
import { noop } from "underscore";
import PageSection from "ui-library/lib/layout/PageSection";
import RockerButton from "ui-library/lib/forms/RockerButton";
import Toggle from "ui-library/lib/forms/form-toggle/v2";
import Table from "ui-library/lib/tables/Table";
import ValueItem from "ui-library/lib/layout/ValueItem";

/**
 * @class Notifications Whitelist
 * @desc This is a template to demonstrate how to build a Notifications Whitelist screen.
 */

export default function NotificationsWhitelistUser() {
    return (
        <ExpandableRow
            initialState={{ expanded: true }}
            flags={[
                "expandable-row-class",
                "use-portal",
                "p-stateful"
            ]}
            rowAccessories={[
                <Button
                    inline
                    key="button"
                    label="Reset Password"
                />,
                <Toggle
                    key="toggle"
                    flags={["p-stateful"]}
                />
            ]}
            subtitle="dtaylor@company.com"
            title="Dana Taylor"
        >
            <RockerButton
                labels={[
                    "Profile",
                    "Roles",
                    "MFA",
                    "API",
                ]}
                flags={["p-stateful"]}
            />
            <InlineMessage
                fullwidth
                label="Manage Whitelist"
                onClick={noop}
                type={MessageTypes.NOTICE}
            >
                This user will not receive notifications because they are not in the whitelist.
            </InlineMessage>
            <PageSection
                title="Status"
            >
                <Table
                    bodyData={[
                        [
                            "MFA",
                            <ValueItem
                                icon={<Toggle flags={["p-stateful"]} initialState={{ toggled: true }}/>}
                            >
                            Enabled
                            </ValueItem>
                        ]
                    ]}
                    rowLabels
                />
            </PageSection>
            <PageSection
                title="Methods and Devices"
            >
                <Table
                    bodyData={[
                        [
                            "Email",
                            "dtaylor@company.com",
                            <Link
                                title="Details"
                                type="block"
                            />,
                            <Button
                                inline
                                label="Unpair"
                            />
                        ],
                        [
                            "SMS",
                            "+720-888-8787",
                            <Link
                                title="Details"
                                type="block"
                            />,
                            <Button
                                inline
                                label="Unpair"
                            />
                        ]
                    ]}
                    lines={false}
                    rowLabels
                />
            </PageSection>
        </ExpandableRow>
    );
}
