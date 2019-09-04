import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
* @class ScrollBox
* @desc ScrollBox adds a shadow to the top or bottom of the container when there's content to scroll to that way.
*
* @param {string} [data-id="scroll-box"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {number} [height]
*     Sets the maximum height for the container.
* @param {boolean} [fixHeight=false]
*     When true, the height prop will set the height rather than just the maximum height.
* @example
*
*   <ScrollBox>
*       Spicy jalapeno bacon ipsum dolor amet tenderloin sirloin bacon biltong pork belly
*       ribeye cow capicola tri-tip flank chuck tail ham venison.
*       Meatloaf ground round turkey corned beef pork belly boudin.
*       Pancetta ball tip meatloaf venison doner, landjaeger turkey pork bacon
*       ribeye prosciutto chicken turducken.
*       Pork loin shoulder salami frankfurter chicken.
*   </ScrollBox>
*/

class ScrollBoxShadow extends React.PureComponent {
    state = {
        show: false,
    }

    static propTypes = {
        className: PropTypes.string,
    };

    setShow = value => this.setState({ show: value });

    render() {
        const { className, children } = this.props;

        return (
            <div
                className={classnames(className, {
                    [`${className}--show`]: this.state.show,
                })}
            >{children}</div>
        );
    }
}

class ScrollBox extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        height: PropTypes.number,
        fixHeight: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "scroll-box",
        fixHeight: false,
    };

    _handleScroll = () => {
        const inner = ReactDOM.findDOMNode(this.inner);
        const outer = ReactDOM.findDOMNode(this.outer);
        const innerHeight = inner.scrollHeight;
        const outerHeight = outer.clientHeight;
        const scrollTop = inner.scrollTop;

        this.topShadow.setShow(scrollTop > 0);
        this.bottomShadow.setShow(innerHeight > outerHeight + scrollTop);
    }

    componentDidUpdate = () => this._handleScroll();

    render() {
        const {
            children,
            className,
            "data-id": dataId,
            height,
            fixHeight,
            ...props
        } = this.props;

        return (
            <div
                className={classnames("scroll-box", className)}
                data-id={dataId}
                ref={el => this.outer = el}
            >
                <div
                    className="scroll-box__content"
                    onScroll={this._handleScroll}
                    ref={el => this.inner = el}
                    style={height !== undefined ? { [fixHeight ? "height" : "maxHeight"]: height } : {}}
                    {...props}
                >
                    {children}
                </div>
                <ScrollBoxShadow className="scroll-box__top-shadow" ref={el => this.topShadow = el} />
                <ScrollBoxShadow className="scroll-box__bottom-shadow" ref={el => this.bottomShadow = el} />
            </div>
        );
    }
}

export default ScrollBox;