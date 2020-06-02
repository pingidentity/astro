import React from "react";
import NavFrame, { Logo, NavLink, NavMenu, NavSearch } from "ui-library/lib/components/panels/NavFrame";
import ContentArea from "ui-library/lib/components/layout/ContentArea";
import * as QuickActions from "ui-library/lib/components/panels/QuickActions";
import NavCard from "ui-library/lib/components/layout/NavCard";

// Custom class style applied to the ContentArea component used in the demo
// .my-custom-navframe-content {
//     background: url(https://images.pexels.com/photos/1054201/pexels-photo-1054201.jpeg?cs=srgb&dl=brown-snowy-mountain-1054201.jpg&fm=jpg) no-repeat center center fixed;
//     background-size: cover;
// }

// Custom class style applied to the NavCard component used in the demo
// .my-custom-navcard .dashboard-card__front {
//     background-color: rgba($color-white, 0.5);
//     border: none;
// }

const tree = [
    {
        id: "SNAAAARF1",
        label: "Header 1",
        children: [
            {
                id: "4evenworse",
                icon: "globe",
                label: "Section without children",
                children: [
                    {
                        id: 44,
                        label: "Group",
                        children: [
                            {
                                id: 645,
                                label: "really really really really really long node"
                            },
                            {
                                id: 445,
                                label: "End node"
                            },
                            {
                                id: 4545,
                                label: "End node"
                            },
                            {
                                id: 454,
                                label: "End node"
                            }
                        ]
                    }
                ]
            },
            {
                id: "evenworse5",
                icon: "globe",
                label: "Section without children",
                children: [
                    {
                        id: 45,
                        label: "Group",
                        children: [
                            {
                                id: 55,
                                label: "really really really really really long node"
                            },
                            {
                                id: 455,
                                label: "End node"
                            },
                            {
                                id: 5455,
                                label: "End node"
                            },
                            {
                                id: 545,
                                label: "End node"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "1",
        label: "Header 2",
        children: [
            {
                icon: "globe",
                id: 12,
                label: "Connections",
                children: [
                    {
                        id: 14,
                        label: "Group",
                        children: [
                            {
                                id: 15,
                                label: "really really really really really long node"
                            },
                            {
                                id: 145,
                                label: "End node"
                            },
                            {
                                id: 1545,
                                label: "End node"
                            },
                            {
                                id: 154,
                                label: "End node"
                            }
                        ]
                    }
                ]
            },
            {
                id: 23,
                icon: "link",
                label: "Applications",
                children: [
                    {
                        id: 24,
                        label: "Group",
                        children: [
                            {
                                id: 25,
                                label: "really really really really really long node"
                            },
                            {
                                id: 245,
                                label: "End node"
                            },
                            {
                                id: 2545,
                                label: "End node"
                            },
                            {
                                id: 254,
                                label: "End node"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

/**
 * @class Ping Fed Admin Template
 * @desc This is a template for the redesigned Ping Fed admin screen.
 */
export default function PingFedAdminTemplate() {
    return (
        <NavFrame
            headerLeft={<Logo id="pingfed" />}
            headerRight={[
                <NavSearch
                    initialTitle="Previous searches"
                    initialResults={[145, 1545]}
                    navTree={tree}
                    onClose={e => console.log("Closed", e)}
                    onOpen={e => console.log("Opened", e)}
                    onSearchClick={result => console.log(result)}
                    sort={({ startsWith, contains }) => [...startsWith, ...contains]}
                    title="Results"
                />,
                <NavLink key="nav-link" iconName="help" href="whatevertheheck" target="_blank" />,
                <NavMenu
                    iconName="account"
                    items={[
                        {
                            icon: "globe",
                            id: "id",
                            label: "About"
                        },
                        {
                            icon: "on-off",
                            id: "signout",
                            label: "Sign Out"
                        },
                    ]}
                    key="nav-menu"
                    onItemClick={(item) => console.log(item)}
                />,
            ]}
            navTree={tree}
        >
            <ContentArea className="my-custom-navframe-content">
                <NavCard className="my-custom-navcard" invertColor>
                    <QuickActions.Section
                        title={
                            <>
                                Shortcuts
                                <QuickActions.EditButton
                                    invertColor
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
                                Helpful Links
                                <QuickActions.EditButton
                                    invertColor
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
                            label="IdP Connection"
                            iconName="globe"
                            onClick={() => console.log("Action clicked")}
                        />
                        <QuickActions.Action
                            label="IdP Connection"
                            iconName="globe"
                            onClick={() => console.log("Action clicked")}
                        />
                    </QuickActions.Section>
                </NavCard>
            </ContentArea>
        </NavFrame>
    );
}
