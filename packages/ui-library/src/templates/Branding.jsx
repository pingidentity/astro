import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FlexRow, {
    justifyOptions,
    alignments,
    flexDirectionOptions,
    wrapOptions,
    spacingOptions,
} from "ui-library/lib/components/layout/FlexRow";
import FlexItem from "ui-library/lib/components/layout/FlexItem";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import TileButton, { TopContent, Badge } from "ui-library/lib/components/buttons/TileButton";
import TileSelector from "ui-library/lib/components/buttons/TileSelector";
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
                src="https://placebear.com/500/280"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [{
            color: "#44a19d",
            title: "Some Thing",
            helpText: "Some help text...",
        }, {
            color: "#66fcf0",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#c4c6c7",
            title: "Last Thing",
            helpText: "Some help text...",
        }, {
            color: "#354453",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#0a0b10",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#edf4e0",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#d73e87",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#fdffff",
            title: "Another Thing",
            helpText: "Some help text...",
        }],
    },
    {
        title: "Anotha' One",
        description: "This is the description text...",
        component: (
            <img
                src="https://placebear.com/500/280"
                style={{ width: "100%", height: "auto" }}
            />
        ),
        colors: [{
            color: "#504136",
            title: "Some Thing",
            helpText: "Some help text...",
        }, {
            color: "#689689",
            title: "Another Thing",
            helpText: "Some help text...",
        }, {
            color: "#A49E8D",
            title: "Last Thing",
            helpText: "Some help text...",
        }],
    }
];

/**
 * Color circle to be used in theme previews
 */
const Color = ({
    color,
    title,
}) => (
    <div style={{
        display: "inline-block"
    }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginRight: title ? "25px" : null,
        }}>
            <div style={{
                width: "16px",
                height: "16px",
                background: color,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#c2c6ca",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "4px",
            }}></div>
            <p style={{
                display: "inline-block",
            }}>
                {title}
            </p>
        </div>
    </div>
);

Color.propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
};

/**
 * Theme tile (title, component)
 */
const BrandingTile = ({
    title,
    component,
    onClick,
    active,
}) => {
    const [open, setOpen] = useState(false);

    const clickToggle = () => {
        setOpen(!open);
    };

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
        >
            <TopContent
                left={
                    active && <Badge text="⭑ Active" />
                }
                right={
                    <PopoverMenu
                        label={<Text type={textTypes.PAGETITLE}>⋮</Text>}
                        buttons={buttons}
                        open={open}
                        noHoverEffect
                        onToggle={clickToggle}
                    />
                }
            />
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
        <TileSelector>
            {themes.map((theme, key) => (
                <BrandingTile
                    key={theme.title}
                    title={theme.title}
                    component={theme.component}
                    description={theme.description}
                    colors={theme.colors}
                    onClick={onClickTheme(key)}
                />
            ))}
        </TileSelector>
    </Modal>
);

/**
 * Preview Modal
 */
const PreviewModal = ({
    onModalClose,
    isExpanded,
    onClickAddTheme,
    onClickCustomize,
    theme,
}) => {
    const [selectedPreviewOption, setSelectedPreviewOption] = useState(
        { label: "Registration", value: "registration" }
    );

    return (
        <Modal
            modalTitle="Preview"
            maximize={true}
            expanded={isExpanded}
            onClose={onModalClose}
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

            <Padding top={Padding.sizes.XL}>
                <FlexRow
                    spacing={spacingOptions.SM}
                    justify={justifyOptions.CENTER}
                    alignment={alignments.CENTER}
                >
                    <Button
                        label="Customize"
                        submit
                        onClick={onClickCustomize}
                    />
                    <Button
                        label="Add Theme"
                        type={buttonTypes.PRIMARY}
                        onClick={onClickAddTheme}
                    />
                </FlexRow>
            </Padding>
        </Modal>
    );
};

/**
 * Customize Modal
 */
const CustomizeModal = ({
    onModalClose,
    isExpanded,
    onClickAddTheme,
    theme,
}) => {
    const [selectedPreviewOption, setSelectedPreviewOption] = useState(
        { label: "Registration", value: "registration" }
    );

    const [customColors, setCustomColors] = useState([]);

    const [themeName, setThemeName] = useState("");

    // Watch for prop changes
    useEffect(() => {
        setThemeName(theme.title);
        setCustomColors(theme.colors);
    }, [theme]);

    const updateColor = (color, key) => {
        setCustomColors(
            customColors.map((customColor, i) => {
                if (i === key) {
                    return {
                        ...customColor,
                        color: color
                    };
                }
                return customColor;
            })
        );
    };

    return (
        <Modal
            modalTitle="Customize"
            maximize={true}
            expanded={isExpanded}
            onClose={onModalClose}
        >
            <FlexRow
                justify={justifyOptions.SPACEBETWEEN}
                alignment={alignments.CENTER}
            >
                <div>
                    <FormTextField
                        labelText="Name"
                        value={themeName}
                        onValueChange={(value) => setThemeName(value)}
                        width={InputWidths.XL}
                    />
                </div>
                <div>
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
                </div>
            </FlexRow>

            {theme.component}

            <Padding vertical={Padding.sizes.MD}>
                <FlexRow
                    justify={justifyOptions.SPACEBETWEEN}
                    alignment={alignments.TOP}
                >
                    <FlexItem basis="100%">
                        <FlexRow
                            alignment={alignments.CENTER}
                            flexDirection={flexDirectionOptions.ROW}
                            wrap={wrapOptions.WRAP}
                        >
                            {
                                customColors &&
                                customColors.map(({ color, title, helpText }, key) =>
                                    <FlexItem key={title}>
                                        <ColorPicker
                                            type={pickerTypes.SIMPLE}
                                            color={color}
                                            onValueChange={(newColor) => updateColor(newColor, key)}
                                            labelText={title}
                                            hintText={helpText ? helpText : null}
                                        />
                                    </FlexItem>
                                )
                            }
                        </FlexRow>
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
                            width={InputWidths.XL}
                        />
                    </FlexItem>
                </FlexRow>
            </Padding>

            <FlexRow
                justify={justifyOptions.CENTER}
            >
                <Button
                    label="Save Changes"
                    type={buttonTypes.PRIMARY}
                    onClick={onClickAddTheme}
                />
            </FlexRow>
        </Modal>
    );
};

const Branding = () => {
    const [selectedTheme, setSelectedTheme] = useState({});
    const [newThemeOpen, setNewThemeOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [customizeOpen, setCustomizeOpen] = useState(false);

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

        // Open customize modal
        setCustomizeOpen(true);
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

            <TileSelector>
                {THEMES.map((theme, key) => (
                    <BrandingTile
                        key={theme.title}
                        title={theme.title}
                        active={key === 0}
                        component={theme.component}
                        description={theme.description}
                        colors={theme.colors}
                    />
                ))}
                <NewBrandingTile onClick={() => setNewThemeOpen(true)}/>
            </TileSelector>

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

            <CustomizeModal
                isExpanded={customizeOpen}
                onModalClose={() => setCustomizeOpen(false)}
                onClickAddTheme={() => setCustomizeOpen(false)}
                theme={selectedTheme}
            />
        </>
    );
};

export default Branding;