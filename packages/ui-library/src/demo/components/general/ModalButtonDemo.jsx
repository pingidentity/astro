var React = require("react");
var ModalButton = require("./../../../components/general/ModalButton.jsx");

/**
* @name ModalButtonDemo
* @memberof ModalButton
* @desc A demo for ModalButton
*/
var ModalButtonDemo = React.createClass({

    _handleOpen: function (index) {
        var newState = {};

        newState["modal" + index + "Expanded"] = true;

        this.setState(newState);
    },

    _handleClose: function (index) {
        var newState = {};

        newState["modal" + index + "Expanded"] = false;

        this.setState(newState);
    },

    componentWillMount: function () {
        for (var i=2; i<=4; i+=1) {
            this["_handleOpen" + i] = this._handleOpen.bind(null, i);
            this["_handleClose" + i] = this._handleClose.bind(null, i);
        }
    },

    getInitialState: function () {
        var initialState = {};

        for (var i=2; i<=4; i+=1) {
            initialState["modal" + i + "Expanded"] = false;
        }

        return initialState;
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ModalButton data-id="default-example"
                            activatorButtonLabel="Open Default Modal"
                            modalTitle="Default Modal">
                        <div>
                            Default modals size both vertically and horizontally with the content. The modal has a
                            maximum width of 960px.  The height will grow until it is 40px from the bottom of the users
                            screen.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton data-id="controlled-example"
                            activatorButtonLabel="Open Controlled Modal"
                            modalTitle="Controlled Modal"
                            controlled={true}
                            onOpen={this._handleOpen2}
                            onClose={this._handleClose2}
                            initiallyExpanded={false}
                            expanded={this.state.modal2Expanded}>
                        <div>
                            Default modals size both vertically and horizontally with the content. The modal has a
                            maximum width of 960px.  The height will grow until it is 40px from the bottom of the users
                            screen.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Maximized Modal"
                            modalTitle="Maximized Modal"
                            maximize={true}>
                        <div>
                            A maximized modal always occupy the full maximum height and width that a modal may have.
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Dialog Modal"
                            modalTitle="Dialog Modal"
                            type={ModalButton.Modal.Type.DIALOG}
                            ref="dialogModal"
                            controlled={true}
                            onOpen={this._handleOpen3}
                            onClose={this._handleClose3}
                            expanded={this.state.modal3Expanded}>
                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <input type="button" value="Nope" onClick={this._handleClose3} />
                                <input type="button" className="primary" value="Yup" onClick={this._handleClose3} />
                            </div>
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton activatorButtonLabel="Open Alert Modal"
                            modalTitle=""
                            type={ModalButton.Modal.Type.ALERT}
                            ref="dialogModal2"
                            controlled={true}
                            onOpen={this._handleOpen4}
                            onClose={this._handleClose4}
                            expanded={this.state.modal4Expanded}>
                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <div className="buttons">
                            <input type="button" className="cancel" value="Disgard Changes"
                                    onClick={this._handleClose4}/>
                            <input type="button" className="primary" value="Save" onClick={this._handleClose4}/>
                            <br />
                            <a className="cancel" onClick={this._handleClose4}>Cancel</a>
                        </div>
                    </ModalButton>
                </div>
            </div>
        );
    }
});

module.exports = ModalButtonDemo;
