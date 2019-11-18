import React from "react";
import { connect } from "react-redux";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import Actions from "../../core/Actions.js";


/**
* @name LeftNavBarDemo
* @memberof LeftNavBar
* @desc A demo for LeftNavBar
*/

const LeftNavBarDemoStateless = ({
    lightMode,
    toggleLightMode,
    legacyNav,
    toggleLegacyNav,
    removeTopContent,
    toggleRemoveTopContent,
}) => (
    <div>
        <FormLabel value="Light Mode">
            <Toggle toggled={lightMode} onToggle={toggleLightMode} data-id="light-mode" />
        </FormLabel>
        <FormLabel value="Legacy">
            <Toggle toggled={legacyNav} onToggle={toggleLegacyNav} data-id="legacy" />
        </FormLabel>
        <FormLabel value="Remove Top Content">
            <Toggle toggled={removeTopContent} onToggle={toggleRemoveTopContent} data-id="remove-top-content" />
        </FormLabel>
    </div>
);

const LeftNavBarDemo = connect(
    state => ({
        lightMode: state.app.leftNav.lightMode,
        legacyNav: state.app.leftNav.legacyNav,
        removeTopContent: state.app.leftNav.removeTopContent,
    }),
    dispatch => ({
        toggleLightMode: () => dispatch(Actions.toggleNavMode("lightMode")),
        toggleLegacyNav: () => dispatch(Actions.toggleNavMode("legacyNav")),
        toggleRemoveTopContent: () => dispatch(Actions.toggleNavMode("removeTopContent")),
    })
)(LeftNavBarDemoStateless);

module.exports = LeftNavBarDemo;
