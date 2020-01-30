import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FlexRow, { justifyOptions, alignments } from "ui-library/lib/components/layout/FlexRow";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormTextField from "ui-library/lib/components/forms/FormTextField";
import InputWidths from "ui-library/lib/components/forms/InputWidths";
import TileButton from "ui-library/lib/components/buttons/TileButton";
import TileSelector from "ui-library/lib/components/buttons/TileSelector";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import Icon, { iconSizes } from "ui-library/lib/components/general/Icon";
import Modal from "ui-library/lib/components/general/Modal";
import ColorPicker from "ui-library/lib/components/general/ColorPicker";
import Padding from "ui-library/lib/components/layout/Padding";
import FileUpload from "ui-library/lib/components/forms/FileUpload";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import Text, { textTypes } from "ui-library/lib/components/general/Text";

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
 * Theme tile (title, description, component, colors)
 */
const BrandingTile = ({
    title,
    description,
    component,
    colors,
    onClick
}) => (
    <TileButton onClick={onClick}>
        {component}
        <Padding top={Padding.sizes.MD} bottom={Padding.sizes.SM}>
            <Text type={textTypes.PAGETITLE}>{title}</Text>
        </Padding>
        <Text type={textTypes.BODY}>{description}</Text>
        <div>
            {colors.map(color => <Color key={color.title} color={color.color}/>)}
        </div>
    </TileButton>
);

BrandingTile.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        color: PropTypes.string,
    })),
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
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
                alignment={alignments.CENTER}
            >
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
                <div>
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
                </div>
            </FlexRow>

            {theme.component}

            <div>
                <h1>{theme.title}</h1>
                <p>{theme.description}</p>
                <Padding vertical={Padding.sizes.MD}>
                    {
                        theme.colors &&
                        theme.colors.map(({ color, title }) =>
                            <Color key={title} color={color} title={title} />
                        )
                    }
                </Padding>
            </div>
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
                        width={InputWidths.MD}
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
                <div>
                    {
                        customColors &&
                        customColors.map(({ color, title, helpText }, key) =>
                            <ColorPicker
                                key={title}
                                color={color}
                                onValueChange={(newColor) => updateColor(newColor, key)}
                                labelText={title}
                                hintText={helpText ? helpText : null}
                            />
                        )
                    }
                </div>
            </Padding>

            <FlexRow
                justify={justifyOptions.SPACEBETWEEN}
                alignment={alignments.CENTER}
            >
                <FileUpload
                    accept="image/png"
                    label={<div>Organization Logo<HelpHint hintText="Help Hint" /></div>}
                    showThumbnail={true}
                    labelSelect="Choose a File"
                    labelRemove="Remove"
                />
                <FileUpload
                    accept="image/png"
                    label={<div>Background Image<HelpHint hintText="Help Hint" /></div>}
                    showThumbnail={true}
                    labelSelect="Choose a File"
                    labelRemove="Remove"
                />
            </FlexRow>

            <div>
                <Button
                    label="Add Theme"
                    type={buttonTypes.PRIMARY}
                    onClick={onClickAddTheme}
                />
                <Button
                    label="Cancel"
                    type={buttonTypes.LINK}
                    onClick={onModalClose}
                />
            </div>
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
            <PageHeader title="Theme Library" />

            <TileSelector>
                {THEMES.map(theme => (
                    <BrandingTile
                        key={theme.title}
                        title={theme.title}
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