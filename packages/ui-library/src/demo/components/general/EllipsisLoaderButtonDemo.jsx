var React = require("react");
var EllipsisLoaderButton = require("./../../../components/general/EllipsisLoaderButton");

/**
* @name EllipsisLoaderButtonDemo
* @memberof EllipsisLoaderButton
* @desc A demo for EllipsisLoaderButton
*/
class EllipsisLoaderDemo extends React.Component {

    state = {
        loading1: false,
        loading2: false
    };

    numDemos = 3;

    _toggleLoadingButton = i => () => {
        var newState = {};

        newState["loading" + i] = !this.state["loading" + i];

        this.setState(newState);
    };

    render() {
        return (
            <div>
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-primary"
                    loading={this.state.loading1}
                    text="Primary Loader Button"
                    onClick={this._toggleLoadingButton(1)}
                    className="primary"
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-secondary"
                    loading={this.state.loading2}
                    text="Secondary Loader Button"
                    onClick={this._toggleLoadingButton(2)}
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-inline"
                    loading={this.state.loading3}
                    text="Inline / Pill-style Loader Button"
                    onClick={this._toggleLoadingButton(3)}
                    className="inline"
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-inline"
                    loading={this.state.loading4}
                    text="Disabled with Help Hint"
                    onClick={this._toggleLoadingButton(4)}
                    disabled={true}
                    disabledText="hello"
                />
            </div>
        );
    }
}

module.exports = EllipsisLoaderDemo;
