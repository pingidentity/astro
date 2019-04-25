import React from "react";
import PropTypes from "prop-types";
import { flagsPropType } from "../../util/FlagUtils";

/**
 * @class FlagsProvider
 * @desc Component that provides a list of flags that is passed to all of its children components
 *
 * @param {array} [flags=[]]
 *     The list of flags that is passed.
 */

class FlagsProvider extends React.Component {
    static childContextTypes = {
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static propTypes = {
        flags: flagsPropType
    }

    static defaultProps = {
        flags: [],
    }

    getChildContext() {
        return {
            flags: this.props.flags,
        };
    }

    render() {
        const { children } = this.props;

        if (React.Children.count(children) === 1) {
            return React.Children.only(children);
        }

        return React.Fragment
            ? <React.Fragment>{children}</React.Fragment>
            /* istanbul ignore next  */
            : <div>{children}</div>;
    }
}

export default FlagsProvider;