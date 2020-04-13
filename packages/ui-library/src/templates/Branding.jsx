import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FlexRow, {
    justifyOptions,
    alignments,
    flexDirectionOptions,
    spacingOptions,
    wrapOptions,
} from "ui-library/lib/components/layout/FlexRow";
import FlexItem from "ui-library/lib/components/layout/FlexItem";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import TileButton, { TileGrid, TopContent, Badge } from "ui-library/lib/components/buttons/TileButton";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import Modal from "ui-library/lib/components/general/Modal";
import ColorPicker, { pickerTypes } from "ui-library/lib/components/general/ColorPicker";
import Padding from "ui-library/lib/components/layout/Padding";
import FileUpload from "ui-library/lib/components/forms/FileUpload";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import HR from "ui-library/lib/components/general/HR";
import FormTextArea from "ui-library/lib/components/forms/form-text-area";
import PopoverMenu from "ui-library/lib/components/tooltips/PopoverMenu";
import RockerButton from "ui-library/lib/components/forms/RockerButton";
import InputRow from "ui-library/lib/components/layout/InputRow";
import FormLabel from "../components/forms/FormLabel";

/**
 * Example themes
 */
const THEMES = [
    {
        title: "Ping Default",
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#c4c6c7", title: "Background Color", id: "background" },
            { color: "#354453", title: "Text", id: "text" },
            { color: "#0a0b10", title: "Error", id: "error" },
            { color: "#edf4e0", title: "Color 1", id: "color1" },
            { color: "#d73e87", title: "Color 2", id: "color2" },
            { color: "#fdffff", title: "Color 3", id: "color3" }
        ],
    },
    {
        title: "Theme Two",
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#c4c6c7", title: "Background", id: "background" },
            { color: "#354453", title: "Text", id: "text" },
        ],
    },
    {
        title: "Theme Three",
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#c4c6c7", title: "Background", id: "background" },
            { color: "#354453", title: "Text", id: "text" },
        ],
    },
    {
        title: "Theme Four",
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#c4c6c7", title: "Background", id: "background" },
            { color: "#354453", title: "Text", id: "text" },
        ],
    }
];

const ColorPickerGroup = ({
    colors,
    onValueChange
}) => {
    const [openColor, setOpenColor] = useState(null);
    const [hoveredColor, setHoveredColor] = useState(null);

    const toggleOpenColor = (id) => {
        if (!openColor) {
            setOpenColor(id);
        } else {
            setOpenColor(null);
        }
    };

    return (
        <FlexRow
            flexDirection={flexDirectionOptions.ROW}
            wrap={wrapOptions.WRAP}
            alignment={alignments.TOP}
        >
            {
                colors.map((color) => (
                    <ColorPicker
                        key={color.id}
                        type={pickerTypes.SIMPLE}
                        color={color.color}
                        onValueChange={(newColor, e) => onValueChange(newColor, e, { id: color.id })}
                        onMouseEnter={() => setHoveredColor(color.id)}
                        onMouseLeave={() => setHoveredColor(null)}
                        labelText={color.title}
                        showLabel={!!openColor || !!hoveredColor}
                        onToggle={() => toggleOpenColor(color.id)}
                    />
                ))
            }
        </FlexRow>
    );
};

/**
 * Theme tile (title, component)
 */
const BrandingTile = ({
    title,
    component,
    onClick,
    active,
    showTop,
}) => {
    const [topVisible, setTopVisible] = useState(false);

    const buttons = [
        {
            label: "Customize"
        },
        {
            label: "Preview"
        },
        {
            label: "Delete"
        }
    ];

    return (
        <TileButton
            onClick={onClick}
            onMouseEnter={() => setTopVisible(true)}
            onMouseLeave={() => setTopVisible(false)}
        >
            { showTop &&
                <TopContent
                    left={
                        <Badge
                            icon={active ? "star" : "star-outline"}
                            label="Active"
                            active={active}
                            expanded={topVisible}
                        />
                    }
                    right={
                        topVisible &&
                        <PopoverMenu
                            label={
                                <Text type={textTypes.SECTIONTITLE}>
                                    <Icon iconName="kebab" iconSize={Icon.iconSizes.MD} />
                                </Text>
                            }
                            noHoverEffect
                            buttons={buttons}
                        />
                    }
                />
            }
            {component}
            <Padding top={Padding.sizes.LG} bottom={Padding.sizes.MD}>
                <Text type={textTypes.PAGETITLE}>{title}</Text>
            </Padding>
        </TileButton>
    );
};

BrandingTile.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

BrandingTile.defaultProps = {
    colors: [],
};

/**
 * Tile with a "+" to add a new theme
 */
const NewBrandingTile = ({
    onClick
}) => (
    <TileButton onClick={onClick}>
        <div style={
            {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // Have to do this for Safari to fix 100% height
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }
        }>
            <Icon iconName="plus-rounded" iconSize={iconSizes.XL}/>
        </div>
    </TileButton>

);

/**
 * New Theme Modal
 */
const NewThemeModal = ({
    expanded,
    onModalClose,
    onClickTheme,
    themes,
}) => (
    <Modal
        modalTitle="New Theme"
        maximize={true}
        expanded={expanded}
        onClose={onModalClose}
    >
        <TileGrid>
            {themes.map((theme, key) => (
                <BrandingTile
                    key={theme.title}
                    title={theme.title}
                    component={theme.component}
                    description={theme.description}
                    colors={theme.colors}
                    showTop={false}
                    onClick={onClickTheme(key)}
                />
            ))}
        </TileGrid>
    </Modal>
);

/**
 * Preview Modal
 */
const PreviewModal = ({
    onModalClose,
    isExpanded,
    onClickAddTheme,
    theme,
}) => {
    const [selectedPreviewOption, setSelectedPreviewOption] = useState(
        { label: "Registration", value: "registration" }
    );

    const [isCustomizing, setisCustomizing] = useState(false);

    const handleCustomize = () => {
        setisCustomizing(true);
    };

    const handleAddTheme = () => {
        setisCustomizing(false);
        onClickAddTheme();
    };

    const handleModalClose = (e) => {
        setisCustomizing(false);
        onModalClose(e);
    };

    return (
        <Modal
            modalTitle="Preview"
            maximize={true}
            expanded={isExpanded}
            onClose={handleModalClose}
        >
            <FlexRow
                justify={justifyOptions.SPACEBETWEEN}
                alignment={alignments.BOTTOM}
            >
                <FormTextField
                    labelText="Name"
                    width={InputWidths.XL}
                    value={theme.title}
                />
                <InputRow>
                    <Padding right={Padding.sizes.SM}>
                        <RockerButton
                            type={RockerButton.rockerTypes.ICON}
                            noMargin
                            labels={[
                                {
                                    id: "desktop",
                                    icon: "desktop",
                                },
                                {
                                    id: "mobile",
                                    icon: "mobile",
                                }
                            ]}
                        />
                    </Padding>
                </InputRow>
                <FormDropDownList
                    options={[
                        { label: "Registration", value: "registration" },
                        { label: "Signup", value: "signup" },
                        { label: "Error", value: "error" },
                        { label: "Login", value: "login" },
                    ]}
                    label="Preview"
                    selectedOption={selectedPreviewOption}
                    onValueChange={(option) => setSelectedPreviewOption(option)}
                    width={InputWidths.MD}
                />
            </FlexRow>

            {theme.component}

            { isCustomizing && <CustomizeControls theme={theme} /> }

            { !isCustomizing ? (
                <Padding top={Padding.sizes.XL}>
                    <FlexRow
                        spacing={spacingOptions.SM}
                        justify={justifyOptions.CENTER}
                        alignment={alignments.CENTER}
                    >
                        <Button
                            label="Customize"
                            submit
                            onClick={handleCustomize}
                        />
                        <Button
                            label="Add Theme"
                            onClick={handleAddTheme}
                        />
                    </FlexRow>
                </Padding>
            ) : (
                <FlexRow
                    justify={justifyOptions.CENTER}
                >
                    <Button
                        label="Save Changes"
                        type={buttonTypes.PRIMARY}
                        onClick={handleAddTheme}
                    />
                </FlexRow>
            ) }
        </Modal>
    );
};

/**
 * Customize Controls
 */
const CustomizeControls = ({
    theme,
}) => {
    const [customColors, setCustomColors] = useState([]);


    // Watch for prop changes
    useEffect(() => {
        setCustomColors(theme.colors);
    }, [theme]);

    const updateColor = (color, id) => {
        setCustomColors(
            customColors.map((customColor) => {
                if (customColor.id === id) {
                    return {
                        ...customColor,
                        color
                    };
                }
                return customColor;
            })
        );
    };

    return (
        <Padding vertical={Padding.sizes.MD}>
            <FlexRow
                justify={justifyOptions.SPACEBETWEEN}
                alignment={alignments.TOP}
            >
                <FlexItem basis="100%">
                    <ColorPickerGroup
                        colors={customColors}
                        onValueChange={(color, e, details) => updateColor(color, details.id)}
                    />
                </FlexItem>
                <FlexItem basis="100%">
                    <FlexRow
                        alignment={alignments.TOP}
                        flexDirection={flexDirectionOptions.ROW}
                    >
                        <FlexItem>
                            <FileUpload
                                accept=""
                                label={<div>Theme Logo</div>}
                                showThumbnail={true}
                            />
                        </FlexItem>
                        <FlexItem>
                            <FileUpload
                                accept=""
                                label={<div>Background</div>}
                                showThumbnail={true}
                            />
                        </FlexItem>
                    </FlexRow>
                    <FormTextArea
                        labelText="Footer"
                        width={InputWidths.MAX}
                    />
                </FlexItem>
            </FlexRow>
        </Padding>
    );
};

const Branding = () => {
    const [selectedTheme, setSelectedTheme] = useState({});
    const [newThemeOpen, setNewThemeOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const _handleThemePreview = (index) => () => {
        // Close new theme modal if open
        setNewThemeOpen(false);

        // Set currently selected theme
        setSelectedTheme(THEMES[index]);

        // Open preview modal
        setPreviewOpen(true);
    };

    const _handleThemeCustomize = () => {
        // Close new theme modal if open
        setPreviewOpen(false);
    };

    return (
        <>
            <PageHeader title="Branding & Themes" />

            <Padding bottom={Padding.sizes.LG}>
                <FormLabel>Brand Settings</FormLabel>
            </Padding>

            <FlexRow
                justify={justifyOptions.START}
                alignment={alignments.CENTER}
                spacing={spacingOptions.LG}
            >
                <div>
                    <FileUpload
                        accept="image/png"
                        showThumbnail={true}
                    />
                </div>
                <div>
                    <PageHeader title="Logo Corp." />
                </div>
            </FlexRow>

            <HR />

            <Padding bottom={Padding.sizes.LG} top={Padding.sizes.LG}>
                <FormLabel>My Themes</FormLabel>
            </Padding>

            <TileGrid>
                {THEMES.map((theme, key) => (
                    <BrandingTile
                        key={theme.title}
                        title={theme.title}
                        active={key === 0}
                        component={theme.component}
                        description={theme.description}
                        colors={theme.colors}
                        showTop={true}
                    />
                ))}
                <NewBrandingTile onClick={() => setNewThemeOpen(true)}/>
            </TileGrid>

            <NewThemeModal
                expanded={newThemeOpen}
                onModalClose={() => setNewThemeOpen(false)}
                themes={THEMES}
                onClickTheme={(key) => _handleThemePreview(key)}
            />

            <PreviewModal
                isExpanded={previewOpen}
                onModalClose={() => setPreviewOpen(false)}
                onClickAddTheme={() => setPreviewOpen(false)}
                onClickCustomize={() => _handleThemeCustomize()}
                theme={selectedTheme}
            />
        </>
    );
};

export default Branding;