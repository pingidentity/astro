import React from "react";
import classnames from "classnames";
import { getIconClassName } from "../../../util/PropUtils";

class MultiDragRow extends React.Component {
    _handleRemove = () => {
        this.props.onRemove({ column: this.props.column, index: this.props.index });
    };

    _handleAdd = () => {
        this.props.onAdd({ column: this.props.column, index: this.props.index });
    };

    _getButton = () => {
        if (this.props.column === 0) {
            return (
                <button
                    key="button"
                    className="inline plus"
                    data-id="row-button-add"
                    onClick={this._handleAdd}
                    type="button"
                />
            );
        } else {
            return (
                <button
                    key="button"
                    className="inline remove"
                    data-id="row-button-remove"
                    onClick={this._handleRemove}
                    type="button"
                />
            );
        }
    };

    render() {
        const iconClass = getIconClassName(this.props);

        const rowContent = [
            <span key="grip" className="selector-row__grip icon-grip" />,
            this.props.iconSrc &&
                <div key="image" className="selector-row__image" data-id="row-image"
                    style={{ backgroundImage: "url(" + this.props.iconSrc + ")" }} />,
            iconClass &&
                <span key="icon" className={classnames("selector-row__icon", iconClass)} data-id="row-icon" />,
            this.props.count !== undefined &&
                <span key="count" className="selector-row__count" data-id="row-count">
                    {this.props.count}
                </span>,
            <div key="labels" className="selector-row__labels">
                <div className="selector-row__name" data-id="row-name">{this.props.name}</div>
                <div className="selector-row__category" data-id="row-category">{this.props.category}</div>
            </div>,
            this._getButton()
        ];

        return (
            <div
                className={classnames(
                    "selector-row",
                    { "selector-row--preview": this.props.preview }
                )} data-id={this.props["data-id"]}>
                {this.props.preview ? null : rowContent}
            </div>);
    }
}

export default MultiDragRow;
