import React from "react";
import Modal from "./../../../components/general/Modal";

import Button from "../../../components/buttons/Button";
import InputRow from "../../../components/layout/InputRow";
import ButtonGroup from "../../../components/layout/ButtonGroup";

/**
* @name ModalDemo
* @memberof Modal
* @desc A demo for Modal
*/
class ModalDemo extends React.Component {
    static flags = [ "use-portal" ];

    state = {};

    numDemos = 7;

    _makeToggle = index => () => this.setState(state => ({ [`expanded${index}`]: !state[`expanded${index}`] }));

    _openTooltip = () => {
        this.setState({ showCancelTooltip: true });
    };

    _closeTooltip = () => {
        this.setState({ showCancelTooltip: false });
    };

    _resetModal = () => {

        console.log("_resetModal");

        this._closeTooltip();
        this._makeToggle(6)();
    };

    render() {
        return (
            <div>
                <InputRow>
                    <a onClick={this._makeToggle(1)}>Open Default Modal</a>

                    <Modal
                        data-id="default-example"
                        modalTitle="Default Modal"
                        expanded={this.state.expanded1}
                        onOpen={this._makeToggle(1)}
                        onClose={this._makeToggle(1)}>

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
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(2)}>Open Maximized Modal</a>

                    <Modal
                        modalTitle="Maximized Modal"
                        maximize={true}
                        expanded={this.state.expanded2}
                        onOpen={this._makeToggle(2)}
                        onClose={this._makeToggle(2)}>

                        <div>
                            A maximized modal always occupies the full width that a modal may have, regardless of
                            its content.  As with the regular modal, the height of a maximized modal grows with its
                            content until it reaches a specified distance from the bottom of the browser window.
                        </div>
                    </Modal>
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(3)}>Open BG Click Enabled Modal</a>

                    <Modal
                        modalTitle="Closing a Modal with a Background Click"
                        closeOnBgClick={true}
                        expanded={this.state.expanded3}
                        onOpen={this._makeToggle(3)}
                        onClose={this._makeToggle(3)}>

                        <div>
                            When you set the "closeOnBgClick" prop to "true", clicking the modal background will trigger
                            the onClose callback. If you are using the stateless version, you will
                            need to pass the onClose callback as well. For the stateful version the onClose callback
                            is not required.
                        </div>
                    </Modal>
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(7)}>Open Modal with Developer Controlled Close</a>

                    <Modal
                        modalTitle="Dev Controlled Close"
                        maximize={false}
                        expanded={this.state.expanded7}
                        onOpen={this._makeToggle(7)}>
                        <InputRow>
                            This modal has no onClose prop, so it is up to the developer to
                             provide the closing behavior as with the buttons below. <br/>
                             This also removes the close button at the top of the modal, and centers the header.
                        </InputRow>
                        <ButtonGroup onCancel={this._makeToggle(7)}>
                            <Button type="primary" onClick={this._makeToggle(7)}>Save</Button>
                        </ButtonGroup>
                    </Modal>
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(4)}>Open Dialog Modal</a>

                    <Modal
                        modalTitle="Dialog Modal"
                        type="dialog"
                        ref="dialogModal"
                        expanded={this.state.expanded4}
                        onOpen={this._makeToggle(4)}>

                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <Button onClick={this._makeToggle(4)}>Nope</Button>
                                <Button type="primary" onClick={this._makeToggle(4)}>Yup</Button>
                            </div>
                        </div>
                    </Modal>
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(5)}>Open Alert Modal</a>

                    <Modal
                        type="alert"
                        ref="alertModal"
                        expanded={this.state.expanded5}
                        onOpen={this._makeToggle(5)}>

                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <ButtonGroup onCancel={this._makeToggle(5)}>
                            <Button type="cancel" onClick={this._makeToggle(5)}>Discard Changes</Button>
                            <Button type="primary" onClick={this._makeToggle(5)}>Save</Button>
                        </ButtonGroup>
                    </Modal>
                </InputRow>
                <InputRow>
                    <a onClick={this._makeToggle(6)}>Open Modal with Close Confirmation</a>

                    <Modal
                        modalTitle="Modal with Close Confirmation"
                        maximize={true}
                        expanded={this.state.expanded6}
                        onOpen={this._makeToggle(6)}
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
                </InputRow>
            </div>
        );
    }
}

module.exports = ModalDemo;
