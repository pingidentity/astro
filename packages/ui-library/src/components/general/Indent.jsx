import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";

/**
 * @class Indent
 * @desc A stateless component for displaying indented data
 *
 * @param {string} [data-id="indent"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [title]
 *     Title for indented section.
 * @param {string} [className]
 *     CSS class name for Indent.
 * @param {boolean} [border=true]
 *     Boolean value to determine whether to display a border.
 * @param {boolean} [colors=false]
 *     If true, the indent border will have a set color. Nesting
 *     indents results in different colors.
 * @param {boolean} [detached=false]
 *     Used to display a standalone item with no indentation
 *     but with correct spacing.
 * @param {boolean} [grouped=false]
 *     Set to true for spacing between groups
 *
 * @example
 * <Indent title="all">
 *    <Link icon="stacks" title="HR Apps Base Policy" url="#" />
 *    <Indent title="any">
 *        <Link icon="gear" title="Rule.. truncates" url="#" />
 *        <Link icon="hand" title="HR Group" url="#" />
 *    </Indent>
 * </Indent>
 *
 */

function Indent ({
    border,
    children,
    className,
    colors,
    "data-id": dataId,
    detached,
    grouped,
    title
}) {
    const contentClass = classnames(
        "indent-content",
        {
            "no-border": !border,
        }
    );
    return (
        <div
            className={
                classnames(
                    "indent",
                    className,
                    {
                        "indent--with-colors": colors,
                        "indent--detached": detached,
                        grouped,
                    }
                )}
            data-id={dataId}
        >
            {!detached &&
                <div className="indent-title-container">
                    {border && (
                        title
                            ? <div
                                className={classnames(
                                    "title",
                                    {
                                        "indent--with-colors__title": colors
                                    }
                                )}
                                data-id="title"
                            >
                                <span className={classnames(
                                    "indent__title-content",
                                    {
                                        "indent--with-colors__title-content": colors
                                    }
                                )}>
                                    {title}
                                </span>
                            </div>
                            : <div className="border" data-id="border"/>
                    )}
                </div>
            }
            <div className={contentClass}>
                {children}
            </div>
        </div>
    );
}

Indent.propTypes = {
    border: PropTypes.bool,
    className: PropTypes.string,
    colors: PropTypes.bool,
    "data-id": PropTypes.string,
    detached: PropTypes.bool,
    grouped: PropTypes.bool,
    title: PropTypes.string,
};

Indent.defaultProps = {
    border: true,
    colors: false,
    "data-id": "indent",
    detached: false,
    grouped: false,
};

module.exports = Indent;
