var React = require("react");
var EllipsisLoaderButton = require("./../../../components/general/EllipsisLoaderButton.jsx");

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

    componentWillMount() {
        var i;

        for (i=1; i<=this.numDemos; i+=1) {
            this["_toggleLoadingButton" + i] = this._toggleLoadingButton.bind(null, i);
        }
    }

    _toggleLoadingButton = (i) => {
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
                    onClick={this._toggleLoadingButton1}
                    className="primary"
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-secondary"
                    loading={this.state.loading2}
                    text="Secondary Loader Button"
                    onClick={this._toggleLoadingButton2}
                />
                <EllipsisLoaderButton
                    data-id="demo-ellipsis-loader-button-inline"
                    loading={this.state.loading3}
                    text="Inline / Pill-style Loader Button"
                    onClick={this._toggleLoadingButton3}
                    className="inline"
                />
            </div>
        );
    }
}

module.exports = EllipsisLoaderDemo;
