import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { isFunction, isString, noop } from "underscore";
import Button from "../../buttons/Button";
import FlexRow, { alignments } from "../../layout/FlexRow";
import Icon from "../../general/Icon";

export const buttonTypes = {
    ADD: "add",
    REMOVE: "remove"
};

const baseClassName = "column-selector__row";

export const RowButton = ({
    buttonType,
    dataId = `${baseClassName}-button`,
    expandable,
    onClick
}) => (
    <Button
        className={classnames(
            `${baseClassName}-button`,
            `${baseClassName}-button${expandable ? "--expandable" : ""}`
        )}
        data-id={`${dataId}-button`}
        iconName={buttonType === buttonTypes.ADD ? "plus" : "minus"}
        inline
        onClick={onClick}
    />
);

export const RowTitle = ({
    children
}) => (
    <div className={`${baseClassName}-title`}>
        {children}
    </div>
);

RowButton.propTypes = {
    buttonType: PropTypes.oneOf([
        buttonTypes.ADD,
        buttonTypes.REMOVE
    ]),
    "data-id": PropTypes.string,
    expandable: PropTypes.bool,
    onClick: PropTypes.func
};

RowButton.defaultProps = {
    "data-id": `column-selector-row-button`
};

export default class ColumnSelectorRow extends Component {
    static propTypes = {
        bottomPanel: PropTypes.node,
        buttonType: PropTypes.oneOf([
            buttonTypes.ADD,
            buttonTypes.REMOVE
        ]),
        className: PropTypes.string,
        customButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        expandable: PropTypes.bool,
        id: PropTypes.string,
        onButtonClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.oneOf([
            true,
            false,
            "initial"
        ]),
        subtitle: PropTypes.string,
        title: PropTypes.node
    }

    static defaultProps = {
        children: noop,
        className: "",
        "data-id": "column-selector-row",
        disabled: false,
        expandable: false,
        onButtonClick: noop,
        onToggle: noop
    }

    state = {
        open: (this.props.open === true || this.props.open === "initial") || false
    }

    _handleButtonClick = e => {
        // Stop propagation to avoid triggering click on parent components. May be null based
        // on custom button implementation
        if (e) {
            e.stopPropagation();
            e.persist();
        }

        this.props.onButtonClick({
            id: this.props.id,
            event: e
        });
    }

    _handleToggleOpen = e => {
        e.persist();

        const {
            id,
            onToggle
        } = this.props;

        const payload = {
            event: e,
            id,
            open: this.state.open
        };

        if (this.props.open === undefined || this.props.open === "initial") {
            this.setState(({ open }) => ({ open: !open }), () => onToggle(payload));
        } else {
            onToggle(payload);
        }
    }

    _renderButton = ({
        buttonType,
        customButton,
        disabled,
        draggable,
        expandable
    }) => {
        const button = this._renderCustomButton(customButton);
        if (button) {
            return button;
        }

        return (
            disabled || draggable
                ? <div />
                : <RowButton
                    buttonType={buttonType}
                    expandable={expandable}
                    onClick={this._handleButtonClick}
                />
        );
    }

    _renderCustomButton = button =>
        isFunction(button)
            ? button({
                handleOnButtonClick: this._handleButtonClick,
                ...this.props
            }, RowButton)
            : button

    render() {
        const {
            bottomPanel,
            children,
            className,
            "data-id": dataId,
            expandable,
            subtitle,
            title,
            titleIcon
        } = this.props;

        const renderedChildren = children(this.state);

        const expandableOpen = expandable && this.state.open;

        return (
            <div className={`${baseClassName}-container`} data-id={dataId}>
                <FlexRow
                    className={
                        classnames(
                            baseClassName,
                            className,
                            {
                                [`${baseClassName}--open`]: expandableOpen,
                                [`${baseClassName}--closed`]: expandable && !this.state.open,
                                [`${baseClassName}--disabled`]: this.props.disabled
                            }
                        )}
                    inline
                    alignment={alignments.STRETCH}
                >
                    {expandable
                        ? <div
                            className={`${baseClassName}-toggle-container`}
                            data-id="row-toggle"
                            onClick={this._handleToggleOpen}
                        >
                            <Icon
                                className={`${baseClassName}-toggle`}
                                data-id={`${dataId}-toggle-icon`}
                                iconName={this.state.open ? "close-arrow" : "dropdown-arrow"}
                                type="inline"
                            />
                        </div>
                        : <div className={`${baseClassName}-title-icon`}>
                            {titleIcon &&
                                <Icon
                                    iconName={titleIcon}
                                    type="inline"
                                />
                            }
                        </div>
                    }
                    <div
                        className={
                            classnames(
                                `${baseClassName}-content`,
                                {
                                    [`${baseClassName}-content--open`]: expandableOpen
                                }
                            )
                        }
                    >
                        <div className={`${baseClassName}-titles`}>
                            {isString(title) ? <RowTitle>{title}</RowTitle> : title}
                            {subtitle &&
                            <div className={`${baseClassName}-subtitle`}>
                                {subtitle}
                            </div>
                            }
                            {bottomPanel &&
                            <div className={`${baseClassName}-titles-panel`}>
                                {bottomPanel}
                            </div>
                            }
                        </div>
                        {this._renderButton(this.props)}
                    </div>
                </FlexRow>
                {renderedChildren && <div className={`${baseClassName}-options`}>
                    {renderedChildren}
                </div>}
            </div>
        );
    }
}