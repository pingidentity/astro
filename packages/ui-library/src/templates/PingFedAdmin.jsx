import React, { useState } from "react";
import FlexRow, {
    alignments,
    flexDirectionOptions,
    spacingOptions,
    justifyOptions,
} from "ui-library/lib/components/layout/FlexRow";
import NavFrame, { Logo, NavLink, NavMenu, NavSearch } from "ui-library/lib/components/panels/NavFrame";
import ContentArea from "ui-library/lib/components/layout/ContentArea";
import * as QuickActions from "ui-library/lib/components/panels/QuickActions";
import Spacing from "ui-library/lib/components/layout/Spacing";
import NavCard, { Title } from "ui-library/lib/components/layout/NavCard";
import NodeGroup from "ui-library/lib/components/general/NodeGroup";

import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import Chip, { chipTypes } from "ui-library/lib/components/layout/Chip";
import Link from "ui-library/lib/components/general/Link";
import Modal from "ui-library/lib/components/general/Modal";
import Section from "ui-library/lib/components/general/Section";
import Text, { textTypes } from "ui-library/lib/components/general/Text";

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
        id: "root1",
        label: "Header 1",
        children: [
            {
                id: "section4",
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

const makeNodes = (count, idPrefix) => new Array(count).fill({
    values: [
        {
            label: "Node Index",
            value: 121413
        },
        {
            label: "IP Address",
            value: "10.1.232.123"
        },
        {
            label: "Version",
            value: "1.0.3"
        },
        {
            label: "Node Index",
            value: 121413
        },
        {
            label: "Tags",
            value: [
                "EastDataCenter",
                "WestDataCenter",
                "NorthDataCenter",
                "SouthDataCenter",
                "GalaxyDataCenter",
                "UniverseDataCenter"
            ]
        }
    ]
}).map((node, index) => ({ ...node, id: `${idPrefix}-${index}`, label: `Node ${index}` }));

/**
 * @class Ping Fed Admin Template
 * @desc This is a template for the redesigned Ping Fed admin screen.
 */
export default function PingFedAdminTemplate() {
    const [modalOpen, setModalOpen] = useState(false);

    const [selected, setSelected] = useState(["idp"]);
    const [recent, setRecent] = useState([]);

    const draggableActions = QuickActions.useRecentAndSelected(
        cb => {
            setRecent(cb.recent);
            setSelected(cb.selected);
        },
        {
            "applications": [
                {
                    id: "idp",
                    label: "IdP Connection",
                    iconName: "pf-authentication-integration",
                },
                {
                    id: "spc",
                    label: "SP Connections",
                    iconName: "globe",
                },
                {
                    id: "sc",
                    label: "Signing Certificates",
                    iconName: "globe",
                },
                {
                    id: "oauth",
                    label: "OAuth Authorization Server Settings",
                    iconName: "globe",
                },
                {
                    id: "meta",
                    label: "Metadata Settings",
                    iconName: "globe",
                },
                {
                    id: "sms",
                    label: "SMS Provider Settings",
                    iconName: "globe",
                },
                {
                    id: "sms2",
                    label: "SMS Provider Settings",
                    iconName: "globe",
                },
            ],
            "authentication": [
                {
                    id: "idp1",
                    label: "IdP Connection",
                    iconName: "pf-authentication-integration",
                },
                {
                    id: "spc1",
                    label: "SP Connections",
                    iconName: "globe",
                },
                {
                    id: "sc1",
                    label: "Signing Certificates",
                    iconName: "globe",
                },
                {
                    id: "oauth1",
                    label: "OAuth Authorization Server Settings",
                    iconName: "globe",
                },
                {
                    id: "meta1",
                    label: "Metadata Settings",
                    iconName: "globe",
                },
                {
                    id: "sms1",
                    label: "SMS Provider Settings",
                    iconName: "globe",
                },
                {
                    id: "sms21",
                    label: "SMS Provider Settings",
                    iconName: "globe",
                },
            ]
        },
        selected,
        recent
    );

    return (
        <NavFrame
            headerLeft={<Logo id="pingfed" />}
            headerRight={[
                <FlexRow alignment={alignments.CENTER}>
                    <NavSearch
                        initialTitle="Previous searches"
                        initialResults={[145, 1545]}
                        navTree={tree}
                        onClose={e => console.log("Closed", e)}
                        onOpen={e => console.log("Opened", e)}
                        onSearchClick={result => console.log(result)}
                        sort={({ startsWith, contains }) => [...startsWith, ...contains]}
                        title="Results"
                    />
                    <Spacing left={Spacing.sizes.SM}>
                        <NavLink key="nav-link" iconName="help" href="whatevertheheck" target="_blank" />
                    </Spacing>
                </FlexRow>,
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
            isFullscreen
            navTree={tree}
        >
            <ContentArea className="my-custom-navframe-content">
                <FlexRow
                    alignment={alignments.STRETCH}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <NavCard className="my-custom-navcard">
                        <FlexRow
                            alignment={alignments.STRETCH}
                            spacing={spacingOptions.MD}
                        >
                            <QuickActions.Section
                                title={
                                    <>
                                Shortcuts
                                        <QuickActions.EditButton
                                            onClick={() => setModalOpen(true)}
                                        />
                                    </>
                                }
                            >
                                <QuickActions.Action
                                    label="IdP Connection"
                                    iconName="pf-authentication-integration"
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
                        </FlexRow>
                    </NavCard>
                    <NavCard>
                        <FlexRow
                            alignment={alignments.STRETCH}
                            flexDirection={flexDirectionOptions.COLUMN}
                            spacing={spacingOptions.XL}
                        >
                            <Title align="center">Cluster Node Groups</Title>
                            <NodeGroup
                                clusterWidth={300}
                                data-id="demo-node-group"
                                nodeClusters={[
                                    {
                                        label: "",
                                        nodes: makeNodes(3, "first-")
                                    },
                                    {
                                        label: "MilkyWay",
                                        nodes: makeNodes(2, "-second")
                                    },
                                    {
                                        label: "Mars",
                                        nodes: makeNodes(15, "-third")
                                    }
                                ]}
                                // Controls how many nodes are shown when hovering over a small cluster
                                fieldsOnHover={2}
                                onNodeClick={(id, e, node) => console.log("Node clicked!", id, e, node)}
                            />
                        </FlexRow>
                    </NavCard>
                </FlexRow>
            </ContentArea>
            <Modal
                // Probably need to change the Modal to get this working; right now it shows the "x"
                // whenever onClose gets passed in
                className="my-custom-modal"
                closeOnBgClick
                expanded={modalOpen}
                maximize
                showHeader={false}
            >
                <FlexRow
                    alignment={alignments.STRETCH}
                    flexDirection={flexDirectionOptions.COLUMN}
                    spacing={spacingOptions.MD}
                >
                    <FlexRow
                        alignment={alignments.CENTER}
                        justify={justifyOptions.SPACEBETWEEN}
                    >
                        <Text inline>
                            Drag and Drop to customize your Shortcuts bar.
                        </Text>
                        <FlexRow alignment={alignments.CENTER} spacing={spacingOptions.MD}>
                            <Link onClick={() => setModalOpen(false)}>
                                Cancel
                            </Link>
                            <Button
                                onClick={() => setModalOpen(false)}
                                inline type={buttonTypes.PRIMARY}
                                disabled={draggableActions.selected.length === 0 ? true : false}>
                                Save Changes
                            </Button>
                        </FlexRow>
                    </FlexRow>
                    <FlexRow spacing={spacingOptions.LG}>
                        <Text inline type={textTypes.SECTIONTITLE}>
                            Shortcuts
                        </Text>
                        <Link onClick={() => {
                            setRecent(selected.filter(id => id !== "idp"));
                            setSelected(["idp"]);
                        }}>
                            Restore Default
                        </Link>
                    </FlexRow>
                    <NavCard className="my-custom-modal-navcard">
                        {draggableActions.selected.length === 0 && (
                            <QuickActions.PlaceholderLabel
                                label="You need at least 1 shortcut to save customization"
                            />
                        )}
                        {draggableActions.selected.length > 0 &&
                            <QuickActions.Section invertColors>
                                {draggableActions.selected}
                            </QuickActions.Section>
                        }
                    </NavCard>
                    <div>
                        <FlexRow spacing={spacingOptions.LG}>
                            <Text inline type={textTypes.SECTIONTITLE}>
                            Recently Used
                            </Text>
                            <Link onClick={() => setRecent([])}>
                            Clear All
                            </Link>
                        </FlexRow>
                        <QuickActions.Section invertColors>
                            {draggableActions.recent}
                        </QuickActions.Section>
                    </div>
                    <div>
                        <Section
                            title="Applications"
                            accessories={
                                <Chip
                                    type={chipTypes.COUNT}
                                >{draggableActions.applications.length}</Chip>
                            }
                        >
                            <QuickActions.Section invertColors>
                                {draggableActions.applications}
                            </QuickActions.Section>
                        </Section>
                        <Section
                            title="Authentication"
                            accessories={
                                <Chip
                                    type={chipTypes.COUNT}
                                >{draggableActions.authentication.length}</Chip>
                            }
                        >
                            <QuickActions.Section invertColors>
                                {draggableActions.authentication}
                            </QuickActions.Section>
                        </Section>
                    </div>
                </FlexRow>
            </Modal>
        </NavFrame>
    );
}
