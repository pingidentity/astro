import React from "react";
import { noop } from "underscore";
import Button from "../components/buttons/Button";
import ExpandableRow from "../components/rows/ExpandableRow";
import Toggle from "../components/forms/form-toggle/v2";
import InlineMessage, { MessageTypes } from "../components/general/InlineMessage";
import Link from "../components/general/Link";
import PageSection from "../components/layout/PageSection";
import RockerButton from "../components/forms/RockerButton";
import Table from "../components/tables/Table";
import ValueItem from "../components/layout/ValueItem";

export default function NotificationsWhitelistUser() {
    return (
        <ExpandableRow
            expanded
            flags={[
                "expandable-row-class",
                "use-portal"
            ]}
            rowAccessories={[
                <Button
                    inline
                    key="button"
                    label="Reset Password"
                />,
                <Toggle
                    key="toggle"
                    stateless={false}
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
                stateless={false}
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
                                icon={<Toggle stateless={false} toggled />}
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
