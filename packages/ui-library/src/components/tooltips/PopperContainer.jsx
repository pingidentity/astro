import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Popper from "popper.js";
import { Portal } from "react-portal";
import classnames from "classnames";

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
 **/

class PopperContainer extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        getReference: PropTypes.func.isRequired,
        config: PropTypes.object,
        pointerClassName: PropTypes.string,
        role: PropTypes.string,
        onClick: PropTypes.func,
        placement: PropTypes.string,
    }

    static defaultProps = {
        "data-id": "popper-container",
        placement: "bottom",
    }

    componentDidMount() {
        const reference = this.props.getReference();
        const config = this.props.config || {
            placement: this.props.placement,
            computeStyle: {
                gpuAcceleration: false,
            },
        };


        if (reference) {
            const popper = new Popper(
                ReactDOM.findDOMNode(reference),
                ReactDOM.findDOMNode(this.popper),
                config
            );

            window.requestAnimationFrame(popper.update);
        }
    }

    render() {
        const classes = classnames("popper-container", this.props.className);
        const {
            children,
            pointerClassName,
            role,
            onClick,
        } = this.props;

        const rendered = (
            <div
                data-id={this.props["data-id"]}
                className={classes}
                ref={el => this.popper = el}
                role={role}
                onClick={onClick}
            >
                {children}
                {pointerClassName &&
                    <div
                        className={classnames("popper-container__pointer", pointerClassName)}
                        x-arrow=""
                    />
                }
            </div>
        );

        return <Portal>{rendered}</Portal>;
    }
}

export default PopperContainer;