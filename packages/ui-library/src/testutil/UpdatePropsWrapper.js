var React = require("react");
var assign = require("object-assign");

/**
 * @class UpdatePropsWrapper
 *
 * @desc
 * A simple wrapper to be used for unit testing, when you need to update
 * a property on a rendered component. Starting with React 0.14.x,
 * directly setting or replacing a prop on a rendered component is deprecated.
 * Instead, use this wrapper and call _setProps(newProps) on it
 * to have the wrapped component re-render with the new property(ies).
 * The ref attribute on the wrapper is set to "wrapper".
 *
 * @Example
 *  // initial render
 *  var component = ReactTestUtils.renderIntoDocument(
 *      <UpdatePropsWrapper type={If} test={true} />
 *  );
 *  // update the property through re-render
 *  component._setProps({test: false});
 *
 * @Example
 *  var component = ReactTestUtils.renderIntoDocument(
 *      <UpdatePropsWrapper type={TabbedSections}
 *              onSectionChange={jest.genMockFunction()}
 *              selectedIndex={-1}>
 *          <div data-id="section1" title="section 1">section 1</div>
 *          <div data-id="section2" title="section 2">section 2</div>
 *      </UpdatePropsWrapper>
 *  );
 *  component._setProps({ selectedIndex: 0 });
 *
 */
var UpdatePropsWrapper = React.createClass({
    /**
     * Re-render the wrapped component using the new property.
     * Use this function to avoid setting the props directly on the component (anti pattern).
     * @param {object} props - new property(ies) to set
     */
    _setProps: function (props) {
        this.setState(props);
    },
    getInitialState: function () {
        return assign({ ref: "wrapper" }, this.props);
    },
    render: function () {
        return React.createElement(
            this.props.type, // this is the type of element to create, provided as prop
            this.state // this is the rest of props to set on the element
        );
    }
});

module.exports = UpdatePropsWrapper;
