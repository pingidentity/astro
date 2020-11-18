import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Popper from "popper.js";
import { Portal } from "react-portal";
import classnames from "classnames";
import PopperContainerContext, { isNested } from "./PopperContainerContext";

/**
 * @class PopperContainer
 * @desc A container that uses the popper.js positioning engine and react-portal to render
 *       and position an element that's attached to but above another element
 *
 * @param {string} [data-id="popper-container"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {function} [getReference]
 *     Provide a function that returns the ref for the element that this will be attached to.
 * @param {object} [config]
 *     The config object that popper.js uses. A good default is used when this is not supplied.
 * @param {string} [pointerClassName]
 *     CSS classes to set on the arrow element.
 * @param {string} [role]
 *     The role attribute for the container.
 * @param {function} [onClick]
 *     Click event for the container
 * @param {string} [placement]
 *     Where we'll try to put the container. Passed to popper.js
 * @param {boolean} [matchWidth=false]
 *     Should the popper match the width of its reference? (Like a dropdown does)
  * @param {boolean} [matchMinWidth=false]
 *     Should the popper match the the min width of the reference.
 * @param {boolean} [noGPUacceleration=false]
 *     Turns off a popper.js feature that conflicts with rendering helphint inside dropdowns
 * @param {boolean} [positionFixed=false]
 *     Turns on a popper.js feature
 */

/**
 * @enum {string}
 * @desc Enum for the different position options.
 */
const positions = {
    /** Left */
    LEFT: "left",
    /** Right */
    RIGHT: "right",
    /** Top */
    TOP: "top",
    /** Bottom */
    BOTTOM: "bottom"
};

class PopperContainer extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        getReference: PropTypes.func.isRequired,
        config: PropTypes.object,
        pointerClassName: PropTypes.string,
        role: PropTypes.string,
        hasPopperParent: PropTypes.bool,
        onClick: PropTypes.func,
        placement: PropTypes.string,
        matchWidth: PropTypes.bool,
        matchMinWidth: PropTypes.bool,
        noGPUAcceleration: PropTypes.bool,
        positionFixed: PropTypes.bool,
        scrollTo: PropTypes.bool,
        isDetachable: PropTypes.bool,
    }

    static defaultProps = {
        "data-id": "popper-container",
        placement: "bottom",
        matchMinWidth: false,
        matchWidth: false,
        noGPUAcceleration: false,
        positionFixed: false,
        hasPopperParent: false,
        isDetachable: false,
    }

    _popperAPI = null;

    _getComputedZIndex = node => {
        if (node && window.getComputedStyle) {
            let parentZIndex = "auto";
            if (node.parentNode && node.parentNode !== document.body) {
                parentZIndex = this._getComputedZIndex(node.parentNode);
            }
            if (parentZIndex === "auto") {
                return window.getComputedStyle(node).zIndex;
            }
            return parentZIndex;
        }
        return "auto";
    }

    _matchReferenceWidth = data => {
        data.styles.minWidth = data.offsets.reference.width + "px";
        data.styles.maxWidth = data.offsets.reference.width + "px";
        data.styles.left = data.offsets.reference.left + "px";
        return data;
    }

    _matchReferenceMinWidth = data => {
        data.styles.minWidth = data.offsets.reference.width + "px";
        data.styles.left = data.offsets.reference.left + "px";
        return data;
    }

    _setZIndex = zIndex => data => ({
        ...data,
        styles: {
            ...data.styles,
            zIndex,
        },
    });

    componentDidMount() {
        const { placement, isDetachable } = this.props;
        const flipBehavior = placement.search(/top/) >= 0
            ? [positions.TOP, positions.BOTTOM, positions.TOP]
            : [positions.BOTTOM,positions.TOP, positions.BOTTOM,];
        const reference = this.props.getReference();
        const zIndex = this._getComputedZIndex(ReactDOM.findDOMNode(reference));

        const priorityOverflow = isDetachable
            ? [positions.RIGHT, positions.LEFT, positions.TOP, positions.BOTTOM] //revert to default behavior
            : [positions.RIGHT, positions.LEFT];

        if (reference && this.props.scrollTo) {
            reference.scrollIntoView();
        }

        const config = this.props.config || {
            placement,
            isDetachable,
            computeStyle: {
                gpuAcceleration: false,
            },
            modifiers: {
                //Let tooltip escape scrolling container, but not app frame
                preventOverflow: {
                    boundariesElement: "scrollParent",
                    padding: 40,
                    priority: priorityOverflow,
                },
                addZIndex: {
                    enabled: (zIndex !== "auto"),
                    order: 810,
                    fn: this._setZIndex(zIndex),
                },
                flip: {
                    behavior: flipBehavior,
                },
                autoWidth: {
                    enabled: this.props.matchWidth,
                    order: 650,
                    fn: this._matchReferenceWidth,
                },
                autoMinWidth: {
                    enabled: this.props.matchMinWidth,
                    order: 650,
                    fn: this._matchReferenceMinWidth
                },
                computeStyle: {
                    gpuAcceleration: !this.props.noGPUAcceleration,
                },
                positionFixed: this.props.positionFixed,
                arrow: {
                    element: "[data-x-arrow]",
                },
            }
        };

        if (reference) {
            this.popperAPI = new Popper(
                ReactDOM.findDOMNode(reference),
                ReactDOM.findDOMNode(this.popper),
                config
            );

            window.requestAnimationFrame(this.popperAPI.update);

            // Run this so that popper repositions itself in case something makes the
            // children have a different height than the last children - https://jira.pingidentity.com/browse/UIP-3005
            if (global.MutationObserver) {
                this.observer = new MutationObserver(() => {
                    if (this.popperAPI && this.popperAPI.scheduleUpdate) {
                        this.popperAPI.scheduleUpdate();
                    }
                });

                this.observer.observe(this.popper, {
                    attributes: true,
                    subtree: true,
                    childList: true,
                    attributeFilter: ["class", "value"],
                });
            }
        }
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    render() {
        const classes = classnames("popper-container", this.props.className);
        const {
            "data-id": dataId,
            "data-parent": dataParent,
            children,
            pointerClassName,
            role,
            onClick,
            hasPopperParent
        } = this.props;

        const rendered = (
            <div
                data-id={dataId}
                data-parent={dataParent}
                className={classes}
                ref={el => this.popper = el}
                role={role}
                onClick={onClick}
            >
                {children}
                {pointerClassName &&
                    <div
                        className={classnames("popper-container__pointer", pointerClassName)}
                        data-x-arrow=""
                    />
                }
            </div>
        );

        return (
            <PopperContainerContext.Provider value={isNested}>
                {!hasPopperParent ? <Portal>{rendered}</Portal> : rendered}
            </PopperContainerContext.Provider>
        );
    }
}

export default PopperContainer;
