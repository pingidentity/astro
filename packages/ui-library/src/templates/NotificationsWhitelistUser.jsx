import React from "react";

//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import InlineMessage, { MessageTypes } from "ui-library/lib/components/general/InlineMessage";
//eslint-disable-next-line import/no-extraneous-dependencies
import Link from "ui-library/lib/components/general/Link";
import { noop } from "underscore";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageSection from "ui-library/lib/components/layout/PageSection";
//eslint-disable-next-line import/no-extraneous-dependencies
import RockerButton from "ui-library/lib/components/forms/RockerButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import Toggle from "ui-library/lib/components/forms/form-toggle/v2";
//eslint-disable-next-line import/no-extraneous-dependencies
import Table from "ui-library/lib/components/tables/Table";
//eslint-disable-next-line import/no-extraneous-dependencies
import ValueItem from "ui-library/lib/components/layout/ValueItem";

/**
 * @class Notifications Whitelist
 * @desc This is a template to demonstrate how to build a Notifications Whitelist screen.
 */

export default function NotificationsWhitelistUser() {
    return (
        <ExpandableRow
            initialState={{ expanded: true }}
            rowAccessories={[
                <Button
                    inline
                    key="button"
                    label="Reset Password"
                />,
                <Toggle
                    key="toggle"
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
                                icon={<Toggle initialState={{ toggled: true }}/>}
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
