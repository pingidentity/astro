var React = require("react");
var ModalButton = require("./../../../components/general/ModalButton.jsx");

var ModalButtonDemo = React.createClass({

    _closeModal: function () {
        this.refs.dialogModal._close();
        this.refs.dialogModal2._close();
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <ModalButton
                        id="default-example"
                        value="Open Default Modal"
                        modalTitle="Default Modal">

                        <div>
                            Default modal content here!
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton
                        value="Open Maximized Modal"
                        modalTitle="Maximized Modal"
                        maximize={true}>

                        <div>
                            Maximized modal content here!
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton
                        value="Open Dialog Modal"
                        modalTitle="Dialog Modal"
                        type="dialog"
                        ref="dialogModal">
                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <input type="button" value="Nope" onClick={this._closeModal} />
                                <input type="button" className="primary" value="Yup" onClick={this._closeModal} />
                            </div>
                        </div>
                    </ModalButton>
                </div>
                <div className="input-row">
                    <ModalButton
                        value="Open Alert Modal"
                        modalTitle=""
                        type="alert"
                        ref="dialogModal2">
                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <div className="buttons">
                            <input
                                type="button"
                                className="secondary confirm"
                                value="Confirm"
                                onClick={this._closeModal}
                            />
                            <br />
                            <a onClick={this._closeModal}> Cancel </a>
                        </div>
                    </ModalButton>
                </div>
            </div>
        );
    }
});

module.exports = ModalButtonDemo;
