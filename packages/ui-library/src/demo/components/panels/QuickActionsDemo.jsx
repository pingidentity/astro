import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import * as QuickActions from "ui-library/lib/components/panels/QuickActions";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexRow, {
    alignments,
    spacingOptions ,
    //eslint-disable-next-line import/no-extraneous-dependencies
} from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import NavCard from "ui-library/lib/components/layout/NavCard";

/**
 * @class Quick Actions Demo
 * @desc A demo of the Quick Actions component.
 */

export default function QuickActionsDemo() {
    return (
        <NavCard>
            <FlexRow
                alignment={alignments.STRETCH}
                spacing={spacingOptions.MD}
            >
                <QuickActions.Section
                    title={
                        <>
                        Shortcuts
                            <QuickActions.EditButton
                                onClick={() => console.log("Edit button clicked")}
                            />
                        </>
                    }
                >
                    <QuickActions.Action
                        label="IdP Connection"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="SP Connections"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="Signing Certificates"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="OAuth Authorization Server Settings"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="Metadata Settings"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="SMS Provider Settings"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="SMS Provider Settings"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                </QuickActions.Section>
                <QuickActions.Divider />
                <QuickActions.Section
                    title={
                        <>
                        Shortcuts
                            <QuickActions.EditButton
                                onClick={() => console.log("Edit button clicked")}
                            />
                        </>
                    }
                >
                    <QuickActions.Action
                        label="IdP Connection"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                    <QuickActions.Action
                        label="SP Connections"
                        iconName="globe"
                        onClick={() => console.log("Action clicked")}
                    />
                </QuickActions.Section>
            </FlexRow>
        </NavCard>
    );
}
