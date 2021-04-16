import React, { useEffect, useState } from 'react';
import { Desktop, Link } from '@pingux/icons';
import { Box, Chip, Icon as PingIcon, Image, Separator, Popover, Text, TextField } from '@pingux/astro';
import {
    mdiArrowCollapseLeft,
    mdiArrowCollapseRight,
    mdiDragVertical,
    mdiText,
    mdiTools,
    mdiFormSelect,
    mdiFlag,
    mdiMenuDown,
    mdiMenuUp,
    mdiMinusBoxOutline,
    mdiPlusBoxOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { TreeItem, TreeView } from '@material-ui/lab';
import { v4 as uuidV4 } from 'uuid';
import '../css/main.css';

import {
    diagramGroupTemplate,
    nodeTemplateStart,
    stepTemplate,
    svgComponentToBase64,
} from '../utils/templates';
import { COLORS } from '../utils/constants';

import Body from '../components/Body';
import ConfigPanel from '../components/ConfigPanel';
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';
import OuterContainer from '../components/OuterContainer';
import Panel from '../components/Panel';
import PanelContainer from '../components/PanelContainer';
import Connections from '../components/Connections';

function IOItem({ label, id }) {
    return (
        <Box
            isRow
            my="xs"
            sx={{
                alignItems: 'center',
            }}
            id={id}
        >
            <Box
                isRow
                pl={0}
                pr="xs"
                sx={{
                    borderRadius: 5,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: 'neutral.60',
                    justifyContent: 'center',
                }}
            >
                <Icon path={mdiDragVertical} height="15px" width="15px" />
                <Text fontSize={13}>{label}</Text>
            </Box>
        </Box>
    );
}

function Outputs() {
    function label(text, id) {
        return (
            <IOItem
                id={id}
                label={text}
            />
        );
    }

    return (
        <TreeView
            defaultExpanded={['1', '3', '6']}
            defaultCollapseIcon={<Icon path={mdiMinusBoxOutline} height="20px" width="20px" />}
            defaultExpandIcon={<Icon path={mdiPlusBoxOutline} height="20px" width="20px" />}
            defaultEndIcon={<Icon path={mdiText} height="20px" width="20px" />}
        >
            <TreeItem nodeId="1" label={label('Submit')}>
                <TreeItem nodeId="3" label={label('formData')}>
                    <TreeItem nodeId="6" label={label('user', 'userInput')}>
                        <TreeItem nodeId="9" label={label('username')} />
                        <TreeItem nodeId="10" label={label('firstName')} />
                        <TreeItem nodeId="11" label={label('lastName')} />
                        <TreeItem nodeId="11" label={label('email', 'emailInput')} />
                    </TreeItem>
                    <TreeItem nodeId="4" label={label('priority')} />
                </TreeItem>
            </TreeItem>
        </TreeView>
    );
}

function CollapsibleSection({ defaultExpanded, title, children, status, onClick, ...props }) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    return (
        <Box {...props}>
            <Box
                isRow
                gap={5}
                px={15}
                bg="accent.99"
                sx={{
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Box flex="1 1 0" sx={{ minWidth: 0, alignItems: 'center' }} isRow onClick={() => setIsExpanded(flag => !flag)}>
                    {title}
                    <Box flex="0 0 auto" ml={5}>
                        {isExpanded && <Icon path={mdiMenuUp} height="20px" width="20px" />}
                        {!isExpanded && <Icon path={mdiMenuDown} height="20px" width="20px" />}
                    </Box>
                </Box>
                <Box flex="0 0 auto" onClick={onClick}>
                    <Icon
                        path={mdiArrowCollapseRight}
                        size={1}
                        color="#253746"
                    />
                </Box>
            </Box>
            <Box
                pt={15}
                sx={{
                    overflowY: 'hidden',
                    height: isExpanded ? 'auto' : 0,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

function ChipInputTall({ label, text, id }) {
    return (
        <Box>
            <Text variant="bodyWeak" mb={5}>{label}</Text>
            <Box variant="forms.input.container" width="337px">
                <Box variant="forms.input" height="40px" p="0" justifyContent="center" id={id}>
                    <Popover content="steps.registration.formData.user" placement="bottom">
                        <Chip
                            ml="md"
                            bg="#E5E9F8"
                            width={70}
                            label={
                                <Box isRow justifyContent="center">
                                    <PingIcon icon={Link} color="#253746" size={10} alignSelf="center" mr="xs" />
                                    <Text color="#253746" sx={{ textTransform: 'lowercase' }}>{text}</Text>
                                </Box>
                            }
                        />
                    </Popover>
                </Box>
            </Box>
        </Box>
    );
}

function ChipInputShort({ label, text, border, chipWidth, color, id }) {
    return (
        <Box isRow alignItems="center" mt={10}>
            <Text variant="bodyWeak" mb={5} width={70}>{label}</Text>
            <Box variant="forms.input.container" width="267px">
                <Box variant="forms.input" height="28px" p="0" justifyContent="center" id={id}>
                    <Popover content="steps.registration.formData.user" placement="bottom">
                        <Chip
                            ml="md"
                            bg={color}
                            width={chipWidth}
                            sx={{
                                border,
                            }}
                            label={
                                <Box isRow justifyContent="center">
                                    <PingIcon icon={Link} color="#253746" size={10} alignSelf="center" mr="xs" />
                                    <Text color="#253746" sx={{ textTransform: 'lowercase' }}>{text}</Text>
                                </Box>
                            }
                        />
                    </Popover>
                </Box>
            </Box>
        </Box>
    );
}

function TextInputShort({ label, id }) {
    return (
        <Box isRow alignItems="center" mt={10}>
            <Text variant="bodyWeak" mb={5} width={70}>{label}</Text>
            <Box variant="forms.input.container" width="267px" id={id}>
                <Box variant="forms.input" height="28px" p="0" justifyContent="center">
                    <Popover content="steps.registration.formData.user" placement="bottom">
                        <Text ml="md">"Denver"</Text>
                    </Popover>
                </Box>
            </Box>
        </Box>
    );
}

function Inputs() {
    return (
        <Box>
            <ChipInputTall label="User" text="user" id="userOutput" />
            <ChipInputShort label="Username:" text="email" chipWidth={75} color="#E5E9F8" id="usernameOutput" />
            <TextInputShort label="location: " id="locationOutput" />
            <ChipInputShort label="firstName:" text="user.firstName" border="1px solid #CACED3" chipWidth={135} color="transparent" id="firstNameOutput" />
            <ChipInputShort label="lastName:" text="user.lastName" border="1px solid #CACED3" chipWidth={135} color="transparent" id="lastNameOutput" />
        </Box>
    )
}

export const InputsOutputs = () => {
    const [selectedNode, setSelectedNode] = useState();
    const [isScrolling, setIsScrolling] = useState(false);
    const [outputsDocked, setOutputsDocked] = useState(true);
    const [inputsDocked, setInputsDocked] = useState(true);
    const [linksVisible, setLinksVisible] = useState(false);

    const [diagramNodes, setDiagramNodes] = useState([
        {
            isGroup: 'true',
            'key': 'group',
        },
        {
            'key': 'registration',
            'category': 'step',
            'text': 'Standard Registration',
            'stepId': 'registration',
            'group': 'group',
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
        {
            isGroup: 'true',
            'key': 'execute_group',
        },
        {
            'key': 'create',
            'category': 'step',
            'stepId': 'create_user',
            'text': 'Create User',
            'group': 'execute_group',
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#228C22',
        },
        { 'key': 'START', 'category': 'START', 'text': 'Start', 'loc': '0 60', 'id': 'START' }]);

    const [diagramLinks, setDiagramLinks] = useState([
        { 'from': 'START', 'to': 'registration', 'key': 'START_registration' },
        { 'from': 'registration', 'to': 'create', 'key': 'registration_create' },
        { 'from': 'registration', 'to': 'create', 'key': 'registration_create_io', 'category': 'io', 'visible': false },
    ]);

    const selectNodeOrLink = (obj) => {
        if (Object.keys(obj).length) {
            if (obj.linksConnected) {
                const ioLinksVisible = diagramLinks.map((link) => {
                    if (link.category === 'io') {
                        if (link.to === obj.data.key || link.from === obj.data.key) {
                            return { ...link, visible: true };
                        }
                        return { ...link, visible: false };
                    }
                    return link;
                });
                setDiagramLinks(ioLinksVisible);
                setSelectedNode(obj.data);
            } else if (!obj.linksConnected && obj.data.category === 'io') {
                setOutputsDocked(false);
                setInputsDocked(false);
            }
        } else {
            const ioLinksInvisible = diagramLinks.map((link) => {
                if (link.category === 'io') {
                    return { ...link, visible: false };
                }
                return link;
            });
            setDiagramLinks(ioLinksInvisible);
            setSelectedNode(null);
        }
    };

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
            ['START', nodeTemplateStart()],
        ],
        onModelChange: ({
            insertedLinkKeys,
            modifiedLinkData,
            selectedData,
        }) => {
            if (insertedLinkKeys?.length > 1) {
                return;
            }
            if (insertedLinkKeys) {
                setDiagramLinks([
                    ...diagramLinks,
                    ...modifiedLinkData.filter(link => insertedLinkKeys.includes(link.key)),
                ]);
            }
            if (selectedData) {
                selectNodeOrLink(selectedData);
            }
        },
    });

    const { paletteProps, paletteObject } = usePalette({
        groupTemplates: [],
        nodeTemplates: [],
        nodeDataArray: [],
        linkDataArray: [],
    });

    useEffect(() => {
        if (!outputsDocked && !inputsDocked) {
            setLinksVisible(true);
        } else {
            setLinksVisible(false);
        }
    }, [outputsDocked, inputsDocked]);

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    const updateStepId = (selected, id, field) => {
        const currentNode = diagramNodes.find(node => node.key === selected.key);
        setSelectedNode({ ...currentNode, [field]: id });
        setDiagramNodes(diagramNodes.map(node => (node.key === selected.key ? { ...currentNode, [field]: id } : node)));
    };
    function onScroll() {
        setIsScrolling(true);
        setTimeout(() => {
            setIsScrolling(false);
        }, 500);
    }

    return (
        <OuterContainer>
            <Body>
                <LeftContainer styles={{ minWidth: 360 }}>
                    {selectedNode ? (
                        <ConfigPanel
                            onClose={onPanelClose}
                            topPanel={
                                <Box>
                                    <Box m="35px 0px 6px 5%" justifyContent="space-between" alignItems="center" isRow>
                                        <Box isRow>
                                            <Image src={selectedNode.key === 'START' ? svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />) : selectedNode.getIconSrc(selectedNode.color)} />
                                            <Text ml="12px" variant="bodyStrong">{selectedNode.text}</Text>
                                        </Box>
                                    </Box>
                                    <Box alignItems="center">
                                        <Separator width="90%" mb={15} />
                                    </Box>
                                </Box>
                            }
                        >
                            <Box alignItems="center">
                                <TextField label="Step name" controlProps={{ value: selectedNode.stepId }} onChange={e => updateStepId(selectedNode, e.target.value, 'stepId')} width="90%" />
                                <TextField mt={20} label="Description" value={selectedNode.description || ''} onChange={e => updateStepId(selectedNode, e.target.value, 'description')} width="90%" />
                                {outputsDocked && selectedNode.key === 'registration' ? (
                                    <CollapsibleSection
                                        title={<Text variant="sectionTitle" my="sm">Outputs</Text>}
                                        my="sm"
                                        defaultExpanded
                                        width="100%"
                                        onClick={() => setOutputsDocked(false)}
                                    >
                                        <Box px={15}>
                                            <Outputs />
                                        </Box>
                                    </CollapsibleSection>
                                ) : null}
                                {inputsDocked && selectedNode.key === 'create' ? (
                                    <CollapsibleSection
                                        title={<Text variant="sectionTitle" my="sm">Inputs</Text>}
                                        my="sm"
                                        defaultExpanded
                                        width="100%"
                                        onClick={() => setInputsDocked(false)}
                                    >
                                        <Box px={15}>
                                            <Inputs />
                                        </Box>
                                    </CollapsibleSection>
                                ) : null}
                            </Box>
                        </ConfigPanel>
                    ) : (
                        <React.Fragment>
                            <Box
                                isRow
                                sx={{
                                    borderBottom: '1px solid #E1DDFD',
                                    justifyContent: 'center',
                                    margin: '30px 15px 20px 15px',
                                }}
                            >
                                <Box sx={{
                                    alignItems: 'center',
                                    borderBottom: '2px solid transparent',
                                    paddingBottom: 5,
                                }}
                                >
                                    <Icon
                                        path={mdiFormSelect}
                                        size={1}
                                        color="#68747F"
                                    />
                                    <Text color="#68747F" fontSize={13} fontFamily="Helvetica" mt="5px">PROPERTIES</Text>
                                </Box>
                                <Box width={25} />
                                <Box sx={{
                                    alignItems: 'center',
                                    borderBottom: '2px solid #4462ED',
                                    paddingBottom: 5,
                                }}
                                >
                                    <Icon
                                        path={mdiTools}
                                        size={1}
                                        color="#526BDB"
                                    />
                                    <Text color="#526BDB" fontSize={13} fontFamily="Helvetica" mt="5px">TOOLBOX</Text>
                                </Box>
                            </Box>
                            <PaletteWrapper>
                                <Palette {...paletteProps} />
                            </PaletteWrapper>
                        </React.Fragment>
                    )}
                </LeftContainer>
                <DiagramWrapper>
                    <Diagram {...diagramProps} />
                    <PanelContainer>
                        {!isScrolling && linksVisible ? (
                            <Connections
                                links={[{ from: 'userInput', to: 'userOutput' }, { from: 'emailInput', to: 'usernameOutput' }]}
                                panels={['outputsPanel', 'inputsPanel']}
                            />
                        ) : null}
                        {!outputsDocked ? (
                            <Panel
                                title="Standard Registration"
                                subtitle="Outputs"
                                id="outputsPanel"
                                onScroll={() => onScroll()}
                                icon={<Icon
                                    path={mdiArrowCollapseLeft}
                                    size={1}
                                    color="#253746"
                                    onClick={() => setOutputsDocked(true)}
                                    style={{ cursor: 'pointer' }}
                                />}
                            >
                                <Outputs />
                            </Panel>
                        ) : null}
                        {!inputsDocked ? (
                            <Panel
                                title="Create User"
                                subtitle="Inputs"
                                id="inputsPanel"
                                onScroll={() => onScroll()}
                                onClick={() => setInputsDocked(true)}
                                icon={<Icon
                                    path={mdiArrowCollapseLeft}
                                    size={1}
                                    color="#253746"
                                    style={{ cursor: 'pointer' }}
                                />}
                            >
                                <Inputs />
                            </Panel>
                        ) : null}
                    </PanelContainer>
                </DiagramWrapper>
            </Body>
        </OuterContainer>
    );
};

export default {
    title: 'Inputs & Outputs',
    component: InputsOutputs,
};
