import React from "react";
import PropTypes from "prop-types";
import LinkDropDownList from "../../forms/LinkDropDownList";
import Anchor from "../../general/Anchor";

import _ from "underscore";
import { getIconClassName } from "../../../util/PropUtils";

class EnvironmentSelector extends React.Component {
    state = { open: false };

    static propTypes = {
        "data-id": PropTypes.string,
        onEnvironmentChange: PropTypes.func,
        onNewEnvironment: PropTypes.func,
        options: PropTypes.array,
        environment: PropTypes.string,
        newEnvironmentLabel: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "environment-selector",
        onEnvironmentChange: _.noop,
        options: [],
        environment: "",
        newEnvironmentLabel: "+ New environment",
    };

    _handleToggle = () => this.setState({ open: !this.state.open });

    // The LinkDropDownList uses labels & values. We want to use labels & ids
    _getDDLOption = option => _.extend(option, { label: option.label, value: option.id })

    _getSelectedOption = () => {
        const selectedList = this.props.options.filter(
            option => option.id === this.props.environment
        );
        if (selectedList.length > 0) {
            return this._getDDLOption(selectedList[0]);
        } else {
            return {};
        }
    };

    _getOptions = () => this.props.options.map(this._getDDLOption);

    _getIcon = option => {
        const iconClassName = getIconClassName(option);
        if (iconClassName) {
            return (
                <span
                    className={`${iconClassName} environment-selector__icon`}
                />
            );
        } else {
            return <span className="icon-earth environment-selector__icon" />;
        }
    };

    _handleClick = selected => this.props.onEnvironmentChange(selected.value);

    render = () => {
        const selectedOption = this._getSelectedOption();
        const bottomLinks = this.props.onNewEnvironment
            ? <Anchor
                onClick={this.props.onNewEnvironment}
                data-id="new-environment"
            >{this.props.newEnvironmentLabel}</Anchor>
            : null;

        return (
            <LinkDropDownList
                stateless={true}
                closeOnClick={true}
                data-id={this.props["data-id"]}
                label={
                    <span>
                        {this._getIcon(selectedOption)}
                        {selectedOption.label}
                    </span>
                }
                onClick={this._handleClick}
                onToggle={this._handleToggle}
                open={this.state.open}
                options={this._getOptions()}
                selectedOption={selectedOption}
                className="environment-selector left"
                bottomLinks={bottomLinks}
            />
        );
    };
}

export default EnvironmentSelector;
