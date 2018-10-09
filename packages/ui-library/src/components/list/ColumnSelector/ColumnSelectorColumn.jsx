import React, { Component } from "react";
import PropTypes from "prop-types";

const baseClassName = "column-selector__column";

export const ColumnTitle = ({
    subtitle,
    title
}) => (
    <div className={`${baseClassName}-title`}>
        {title}
        {subtitle && <div className={`${baseClassName}-subtitle`}>{subtitle}</div>}
    </div>
);

ColumnTitle.propTypes = {
    subtitle: PropTypes.node,
    title: PropTypes.node,
};

export default class ColumnSelectorColumn extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        subtitle: PropTypes.node,
        title: PropTypes.node,
    }

    static defaultProps = {
        "data-id": "column-selector-column",
    }

    render () {
        const {
            children,
            "data-id": dataId,
            title,
        } = this.props;

        return (
            <div className={baseClassName} data-id={dataId}>
                {title}
                <div className={`${baseClassName}-children`}>
                    {children}
                </div>
            </div>
        );
    }
}