var React = require("react");
var Modal = require("./../../../components/general/Modal.jsx");

/**
* @name ModalDemo
* @memberof Modal
* @desc A demo for Modal
*/
class ModalDemo extends React.Component {
    constructor(props) {
        super(props);
        var initState = {};

        for (var i=1; i<=this.numDemos; i+=1) {
            initState["expanded" + i] = false;
        }

        initState["showCloseTooltip"] = false;

        this.state = initState;
    }

    numDemos = 7;

    _toggle = (index) => {
        var newState = {};

        newState["expanded" + index] = !this.state["expanded" + index];

        this.setState(newState);
    };

    _openTooltip = () => {
        this.setState({ showCancelTooltip: true });
    };

    _closeTooltip = () => {
        this.setState({ showCancelTooltip: false });
    };

    _resetModal = () => {

        console.log("_resetModal");

        this._closeTooltip();
        this._toggle(6);
    };

    componentDidMount() {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_toggle" + i] = this._toggle.bind(null, i);
        }
    }

    render() {
        return (
            <div>
                <div className="input-row">
                    <a onClick={this._toggle1}>Open Default Modal</a>

                    <Modal
                        data-id="default-example"
                        modalTitle="Default Modal"
                        expanded={this.state.expanded1}
                        onOpen={this._toggle1}
                        onClose={this._toggle1}>

                        <div>
                            <p>
                                Default modals size both vertically and horizontally with the content.
                            </p>
                            <p>
                                The modal has a maximum width of 960px.
                            </p>
                            <p>
                                The height will grow until it is 40px from the bottom of the users screen.
                            </p>
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle2}>Open Maximized Modal</a>

                    <Modal
                        modalTitle="Maximized Modal"
                        maximize={true}
                        expanded={this.state.expanded2}
                        onOpen={this._toggle2}
                        onClose={this._toggle2}>

                        <div>
                            A maximized modal always occupies the full width that a modal may have, regardless of
                            its content.  As with the regular modal, the height of a maximized modal grows with its
                            content until it reaches a specified distance from the bottom of the browser window.
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle3}>Open BG Click Enabled Modal</a>

                    <Modal
                        modalTitle="Closing a Modal with a Background Click"
                        closeOnBgClick={true}
                        expanded={this.state.expanded3}
                        onOpen={this._toggle3}
                        onClose={this._toggle3}>

                        <div>
                            When you set the "closeOnBgClick" prop to "true", clicking the modal background will trigger
                            the onClose callback. If you are using the stateless version, you will
                            need to pass the onClose callback as well. For the stateful version the onClose callback
                            is not required.
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle7}>Open Modal with Developer Controlled Close</a>

                    <Modal
                        modalTitle="Dev Controlled Close"
                        maximize={false}
                        expanded={this.state.expanded7}
                        onOpen={this._toggle7}>
                        <div className="input-row">
                            This modal has no onClose prop, so it is up to the developer to
                             provide the closing behavior as with the buttons below. <br/>
                             This also removes the close button at the top of the modal, and centers the header.
                        </div>
                        <div className="button-group">
                            <button className="primary" onClick={this._toggle7}>Save</button><br/>
                            <a className="cancel" onClick={this._toggle7}>Cancel</a>
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle4}>Open Dialog Modal</a>

                    <Modal
                        modalTitle="Dialog Modal"
                        type="dialog"
                        ref="dialogModal"
                        expanded={this.state.expanded4}
                        onOpen={this._toggle4}>

                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <button type="button" onClick={this._toggle4}>Nope</button>
                                <button type="button" className="primary" onClick={this._toggle4}>Yup</button>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle5}>Open Alert Modal</a>

                    <Modal
                        type="alert"
                        ref="alertModal"
                        expanded={this.state.expanded5}
                        onOpen={this._toggle5}>

                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <div className="buttons">
                            <button type="button" className="cancel" onClick={this._toggle5}>Disgard Changes</button>
                            <button type="button" className="primary" onClick={this._toggle5}>Save</button>
                            <br />
                            <a className="cancel" onClick={this._toggle5}>Cancel</a>
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle6}>Open Modal with Close Confirmation</a>

                    <Modal
                        modalTitle="Modal with Close Confirmation"
                        maximize={true}
                        expanded={this.state.expanded6}
                        onOpen={this._toggle6}
                        onClose={this._openTooltip}
                        cancelTooltip={{
                            title: "Close Modal Confirmation",
                            open: this.state.showCancelTooltip,
                            onConfirm: this._resetModal,
                            onCancel: this._closeTooltip,
                            messageText: "Are you sure you want to close this modal?",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No"
                        }}>

                        <div>
                            A maximized modal always occupies the full width that a modal may have, regardless of
                            its content.  As with the regular modal, the height of a maximized modal grows with its
                            content until it reaches a specified distance from the bottom of the browser window.
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

module.exports = ModalDemo;
