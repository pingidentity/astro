var React = require("react");
var ModalButton = require("./../../../components/general/ModalButton.jsx");

/**
* @name ModalButtonDemo
* @memberof ModalButton
* @desc A demo for ModalButton
*/
var ModalButtonDemo = React.createClass({

    numControlledDemos: 3,

    _handleOpen: function (index) {
        var newState = {};

        newState["modalExpanded" + index] = true;

        this.setState(newState);
    },

    _handleClose: function (index) {
        var newState = {};

        newState["modalExpanded" + index] = false;

        this.setState(newState);
    },

    componentWillMount: function () {
        for (var i=1; i<=this.numControlledDemos; i+=1) {
            this["_handleOpen" + i] = this._handleOpen.bind(null, i);
            this["_handleClose" + i] = this._handleClose.bind(null, i);
        }
    },

    getInitialState: function () {
        var initialState = {};

        for (var i=1; i<=this.numControlledDemos; i+=1) {
            initialState["modalExpanded" + i] = false;
        }

        return initialState;
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ModalButton data-id="default-example"
                            activatorButtonLabel="Open Default Modal"
                            modalTitle="Default Modal"
                            controlled={false}>
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
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton data-id="controlled-example"
                            activatorButtonLabel="Open Controlled Modal"
                            modalTitle="Controlled Modal"
                            controlled={true}
                            onOpen={this._handleOpen1}
                            onClose={this._handleClose1}
                            initiallyExpanded={false}
                            expanded={this.state.modalExpanded1}>
                        <div>
                            A controlled modals expanded state is controlled by the boolean "expanded" prop. When true
                            the modal will display.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Maximized Modal"
                            data-id="maximized-modal"
                            modalTitle="Maximized Modal"
                            maximize={true}>
                        <div>
                            A maximized modal always occupy the full maximum height and width that a modal may have,
                            regardless of content.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open BG Click Enabled Modal"
                            data-id="bgclick-modal"
                            modalTitle="Closing a Modal with a Background Click"
                            closeOnBgClick={true}>
                        <div>
                            When you set the "closeOnBgClick" prop to "true", clicking the modal background will trigger
                            the onClose callback. If you are using the "controlled" or stateless version, you will
                            need to pass the onClose callback as well. For the stateful version the onClose callback
                            is not required.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Dialog Modal"
                            data-id="dialog-modal"
                            modalTitle="Dialog Modal"
                            type={ModalButton.Modal.Type.DIALOG}
                            ref="dialogModal"
                            controlled={true}
                            onOpen={this._handleOpen2}
                            onClose={this._handleClose2}
                            expanded={this.state.modalExpanded2}>
                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <input type="button" data-id="nopeButton" value="Nope" onClick={this._handleClose2} />
                                <input type="button" data-id="yupButton" className="primary" value="Yup"
                                    onClick={this._handleClose2} />
                            </div>
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Alert Modal"
                            data-id="alert-modal"
                            modalTitle=""
                            type={ModalButton.Modal.Type.ALERT}
                            ref="alertModal"
                            controlled={true}
                            onOpen={this._handleOpen3}
                            onClose={this._handleClose3}
                            expanded={this.state.modalExpanded3}
                            closeOnBgClick={true}>
                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <div className="buttons">
                            <input type="button" className="cancel" value="Disgard Changes"
                                    onClick={this._handleClose3} data-id="disgardChangesButton"/>
                            <input type="button" className="primary" value="Save"
                                    onClick={this._handleClose3} data-id="saveButton" />
                            <br />
                            <a className="cancel" data-id="cancelLink" onClick={this._handleClose3}>Cancel</a>
                        </div>
                    </ModalButton>
                </div>
            </div>
        );
    }
});

module.exports = ModalButtonDemo;
