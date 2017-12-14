var React = require("react"),
    Spinner = require("../../../components/general/Spinner");

/**
* @name SpinnerDemo
* @memberof Spinner
* @desc A demo for Spinner
*/
class SpinnerDemo extends React.Component {
    state = {
        showSpinner: true
    };

    _toggleSpinner = () => {
        this.setState({
            showSpinner: !this.state.showSpinner
        });
    };

    render() {
        return (
            <div>
                <p>
                    <Spinner
                        show={this.state.showSpinner}
                        defaultText="Loading...">
                        <div className="spinner-content">
                            Content shown after spinner/loading is complete goes here.
                        </div>
                    </Spinner>
                </p>
                <a onClick={this._toggleSpinner}>
                    Toggle Spinner
                </a>
            </div>
        );
    }
}


module.exports = SpinnerDemo;
