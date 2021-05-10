import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FlexRow, {
    justifyOptions,
    alignments,
    flexDirectionOptions,
    spacingOptions,
    wrapOptions,
//eslint-disable-next-line import/no-extraneous-dependencies
} from "ui-library/lib/components/layout/FlexRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import FlexItem from "ui-library/lib/components/layout/FlexItem";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextField from "ui-library/lib/components/forms/FormTextField";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputWidths from "ui-library/lib/components/forms/InputWidths";
//eslint-disable-next-line import/no-extraneous-dependencies
import TileButton, { TileGrid, TopContent, Badge } from "ui-library/lib/components/buttons/TileButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import PageHeader from "ui-library/lib/components/general/PageHeader";
//eslint-disable-next-line import/no-extraneous-dependencies
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
//eslint-disable-next-line import/no-extraneous-dependencies
import Modal from "ui-library/lib/components/general/Modal";
//eslint-disable-next-line import/no-extraneous-dependencies
import ColorPicker, { pickerTypes } from "ui-library/lib/components/general/ColorPicker";
//eslint-disable-next-line import/no-extraneous-dependencies
import Padding from "ui-library/lib/components/layout/Padding";
//eslint-disable-next-line import/no-extraneous-dependencies
import FileUpload from "ui-library/lib/components/forms/FileUpload";
//eslint-disable-next-line import/no-extraneous-dependencies
import Text, { textTypes } from "ui-library/lib/components/general/Text";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormTextArea from "ui-library/lib/components/forms/form-text-area";
//eslint-disable-next-line import/no-extraneous-dependencies
import PopoverMenu from "ui-library/lib/components/tooltips/PopoverMenu";
//eslint-disable-next-line import/no-extraneous-dependencies
import RockerButton from "ui-library/lib/components/forms/RockerButton";
//eslint-disable-next-line import/no-extraneous-dependencies
import InputRow from "ui-library/lib/components/layout/InputRow";
//eslint-disable-next-line import/no-extraneous-dependencies
import ConfirmTooltip from "ui-library/lib/components/tooltips/ConfirmTooltip";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
//eslint-disable-next-line import/no-extraneous-dependencies
import ScrollBox from "ui-library/lib/components/layout/ScrollBox";
import FormLabel from "../components/forms/FormLabel";

/**
 * Example themes
 */
const THEMES = [
    {
        title: "Ping Default",
        id: "theme1",
        description: "This is the description text...",
        active: true,
        customized: false,
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#354453", title: "Text", id: "text" },
            { color: "#0a0b10", title: "Error", id: "error" },
            { color: "#edf4e0", title: "Color 1", id: "color1" },
            { color: "#d73e87", title: "Color 2", id: "color2" },
            { color: "#fdffff", title: "Color 3", id: "color3" }
        ],
    },
    {
        title: "Theme Two",
        id: "theme2",
        customized: true,
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        background: "https://assets.pingone.com/ux/branding-themes/0.10.0/mural/bg.jpg",
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#354453", title: "Text", id: "text" },
            { color: "#0a0b10", title: "Error", id: "error" },
            { color: "#edf4e0", title: "Color 1", id: "color1" },
            { color: "#d73e87", title: "Color 2", id: "color2" },
            { color: "#fdffff", title: "Color 3", id: "color3" }
        ],
    },
    {
        title: "Theme Three",
        id: "theme3",
        customized: true,
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        background: "https://assets.pingone.com/ux/branding-themes/0.10.0/mural/bg.jpg",
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#354453", title: "Text", id: "text" },
            { color: "#0a0b10", title: "Error", id: "error" },
            { color: "#edf4e0", title: "Color 1", id: "color1" },
            { color: "#d73e87", title: "Color 2", id: "color2" },
            { color: "#fdffff", title: "Color 3", id: "color3" }
        ],
    },
    {
        title: "Theme Four",
        id: "theme4",
        customized: true,
        description: "This is the description text...",
        component: (
            <img
                src="src/demo/images/theme-preview.png"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        background: "https://assets.pingone.com/ux/branding-themes/0.10.0/mural/bg.jpg",
        colors: [
            { color: "#44a19d", title: "Button", id: "button" },
            { color: "#66fcf0", title: "Link", id: "link" },
            { color: "#354453", title: "Text", id: "text" },
            { color: "#0a0b10", title: "Error", id: "error" },
            { color: "#edf4e0", title: "Color 1", id: "color1" },
            { color: "#d73e87", title: "Color 2", id: "color2" },
            { color: "#fdffff", title: "Color 3", id: "color3" }
        ],
    },
];

const ColorPickerGroup = ({
    colors,
    onValueChange
}) => {
    const [openColor, setOpenColor] = useState(null);
    const [hoveredColor, setHoveredColor] = useState(null);

    const toggleOpenColor = (id) => {
        if (!openColor && hoveredColor) {
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
                        onMouseLeave={() => {
                            setHoveredColor(null);
                        }}
                        labelText={color.title}
                        open={openColor === color.id}
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
    onDelete,
    customized,
    active,
    showTop,
    id,
}) => {
    const [topVisible, setTopVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const _handleClick = () => {
        setTopVisible(false);
        onClick();
    };

    const buttons = [
        {
            label: "Customize",
            onClick: _handleClick
        },
    ];

    if (!customized) {
        buttons.push({
            label: "Preview",
            onClick: _handleClick
        });
    }

    if (!active) {
        buttons.push({
            label: "Delete",
            onClick: () => setIsDeleting(true)
        });
    }

    return (
        <TileButton
            onClick={_handleClick}
            onMouseEnter={() => setTopVisible(true)}
            onMouseLeave={() => { if (!isDeleting) { setTopVisible(false); } }}
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
                        (topVisible && !isDeleting) ? (
                            <PopoverMenu
                                label={
                                    <Padding left={Padding.sizes.SM} right={Padding.sizes.SM}>
                                        <Text type={textTypes.SECTIONTITLE}>
                                            <Icon iconName="kebab" iconSize={Icon.iconSizes.MD} />
                                        </Text>
                                    </Padding>
                                }
                                noHoverEffect
                                buttons={buttons}
                            />
                        ) : (topVisible && isDeleting) ? (
                            <ConfirmTooltip
                                placement="bottom right"
                                label={
                                    <Padding left={Padding.sizes.SM} right={Padding.sizes.SM}>
                                        <Text type={textTypes.SECTIONTITLE}>
                                            <Icon iconName="kebab" iconSize={Icon.iconSizes.MD} />
                                        </Text>
                                    </Padding>
                                }
                                title="Confirm Delete"
                                open={true}
                                onConfirm={() => {
                                    setIsDeleting(false);
                                    setTopVisible(false);
                                    onDelete(id);
                                }}
                                onCancel={() => {
                                    setTopVisible(false);
                                    setIsDeleting(false);
                                }}
                                buttonLabel="Delete"
                                cancelText="Cancel"
                                disableSave={false}
                            >
                                Are you sure you want to delete this theme?
                            </ConfirmTooltip>
                        ) : null
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
        maximize={false}
        expanded={expanded}
        onClose={onModalClose}
    >
        <ScrollBox height="500px">
            <TileGrid columns={2}>
                {themes.map((theme, key) => (
                    <BrandingTile
                        key={theme.title}
                        title={theme.title}
                        id={theme.id}
                        component={theme.component}
                        description={theme.description}
                        colors={theme.colors}
                        showTop={false}
                        onClick={onClickTheme(key)}
                    />
                ))}
            </TileGrid>
        </ScrollBox>
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
        { label: "Sign On", value: "signon" }
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
            maximize={false}
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
                        { label: "Sign On", value: "signon" },
                        { label: "Registration", value: "registration" },
                        { label: "Forgot Password", value: "forgotpassword" },
                        { label: "Error Message", value: "errormessage" },
                    ]}
                    label="Preview"
                    selectedOption={selectedPreviewOption}
                    onValueChange={(option) => setSelectedPreviewOption(option)}
                    width={InputWidths.MD}
                />
            </FlexRow>

            {theme.component}

            { (isCustomizing || theme.customized) && <CustomizeControls theme={theme} /> }

            { !isCustomizing && !theme.customized ? (
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
        <>
            <FlexRow>
                <FlexItem basis="80%">
                    <Padding vertical={Padding.sizes.MD}>
                        <InputRow>
                            <FormLabel>Theme Colors</FormLabel>
                            <ColorPickerGroup
                                colors={customColors}
                                onValueChange={(color, e, details) => updateColor(color, details.id)}
                            />
                        </InputRow>
                        <InputRow>
                            <FlexRow
                                justify={justifyOptions.SPACEBETWEEN}
                                alignment={alignments.TOP}
                                spacing={spacingOptions.MD}
                                flexDirection={flexDirectionOptions.ROW}
                            >
                                <FlexItem basis="50%">
                                    <Padding bottom={Padding.sizes.MD}>
                                        <FormLabel>Logo</FormLabel>
                                    </Padding>
                                    <FlexRow
                                        justify={justifyOptions.SPACEBETWEEN}
                                        alignment={alignments.TOP}
                                        spacing={spacingOptions.MD}
                                        flexDirection={flexDirectionOptions.ROW}
                                    >
                                        <FlexItem basis="20%">
                                            <FormRadioGroup
                                                groupName="org-logo"
                                                selected={"image"}
                                                onValueChange={() => {}}
                                                items={[
                                                    { id: "none", name: "None" },
                                                    { id: "image", name: "Image" }
                                                ]}
                                            />
                                        </FlexItem>
                                        <FlexItem basis="80%">
                                            <FileUpload
                                                maxFileSizeKb={4096}
                                                showThumbnail={true}
                                                labelMaxFileSize="Max Size 4MB"
                                                accept="image/jpeg, image/jpg, image/png"
                                                labelSelect="Choose a File"
                                                labelRemove="Remove"
                                                defaultImage="src/demo/images/favicon.png"
                                            />
                                        </FlexItem>
                                    </FlexRow>
                                </FlexItem>
                                <FlexItem basis="50%">
                                    <Padding bottom={Padding.sizes.MD}>
                                        <FormLabel>Background Image</FormLabel>
                                    </Padding>
                                    <FlexRow
                                        justify={justifyOptions.SPACEBETWEEN}
                                        alignment={alignments.TOP}
                                        spacing={spacingOptions.MD}
                                        flexDirection={flexDirectionOptions.ROW}
                                    >
                                        <FlexItem basis="20%">
                                            <FormRadioGroup
                                                groupName="bg-image"
                                                selected={"image"}
                                                onValueChange={() => { }}
                                                items={[
                                                    { id: "none", name: "None" },
                                                    { id: "image", name: "Image" },
                                                    { id: "color", name: "Color" }
                                                ]}
                                            />
                                        </FlexItem>
                                        <FlexItem basis="80%">
                                            <FileUpload
                                                maxFileSizeKb={4096}
                                                showThumbnail={true}
                                                labelMaxFileSize="Max Size 4MB"
                                                accept="image/jpeg, image/jpg, image/png"
                                                labelSelect="Choose a File"
                                                labelRemove="Remove"
                                                defaultImage={theme.background}
                                            />
                                        </FlexItem>
                                    </FlexRow>
                                </FlexItem>
                            </FlexRow>
                        </InputRow>
                    </Padding>
                </FlexItem>
            </FlexRow>
            <FlexRow>
                <FlexItem basis="100%">
                    <InputRow>
                        <FormTextArea
                            labelText="Footer"
                            rows={3}
                            noResize={true}
                            width={InputWidths.MAX}
                        />
                    </InputRow>
                </FlexItem>
            </FlexRow>
        </>
    );
};

const Branding = () => {
    const [selectedTheme, setSelectedTheme] = useState({});
    const [newThemeOpen, setNewThemeOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [userThemes, setUserThemes] = useState(THEMES);

    const _handleNewThemePreview = (index) => () => {
        // Close new theme modal if open
        setNewThemeOpen(false);

        // Set currently selected theme
        setSelectedTheme(THEMES[index]);

        // Open preview modal
        setPreviewOpen(true);
    };

    const _handleThemePreview = (theme) => {
        // Close new theme modal if open
        setNewThemeOpen(false);

        // Set currently selected theme
        setSelectedTheme(theme);

        // Open preview modal
        setPreviewOpen(true);
    };

    const _handleThemeDelete = (id) => {
        const filteredThemes = userThemes.filter((theme) => theme.id !== id);

        setUserThemes(filteredThemes);
    };

    const _handleThemeCustomize = () => {
        // Close new theme modal if open
        setPreviewOpen(false);
    };

    return (
        <>
            <PageHeader title="Branding & Themes" />

            <div>
                <FormTextField
                    labelText="Company Name"
                    width={InputWidths.SM}
                />
            </div>

            <Padding bottom={Padding.sizes.SM}>
                <FormLabel>Default Logo</FormLabel>
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
                {userThemes.map((theme) => (
                    <BrandingTile
                        key={theme.title}
                        title={theme.title}
                        id={theme.id}
                        customized={theme.customized}
                        active={theme.active}
                        component={theme.component}
                        description={theme.description}
                        colors={theme.colors}
                        showTop={true}
                        onClick={() => _handleThemePreview(theme)}
                        onDelete={(id) => _handleThemeDelete(id)}
                    />
                ))}
                <NewBrandingTile onClick={() => setNewThemeOpen(true)}/>
            </TileGrid>

            <NewThemeModal
                expanded={newThemeOpen}
                onModalClose={() => setNewThemeOpen(false)}
                themes={THEMES}
                onClickTheme={(key) => _handleNewThemePreview(key)}
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
