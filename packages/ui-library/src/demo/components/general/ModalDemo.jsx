var React = require("react");
var Modal = require("./../../../components/general/Modal.jsx");

var ModalDemo = React.createClass({

    numDemos: 4,

    _toggle: function (index) {
        var newState = {};

        newState["expanded" + index] = !this.state["expanded" + index];

        this.setState(newState);
    },

    getInitialState: function () {
        var initState = {};

        for (var i=1; i<=this.numDemos; i+=1) {
            initState["expanded" + i] = false;
        }

        return initState;
    },

    componentDidMount: function () {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_toggle" + i] = this._toggle.bind(null, i);
        }
    },

    render: function () {
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
                            Default modals size both vertically and horizontally with the content. The modal has a
                            maximum width of 960px.  The height will grow until it is 40px from the bottom of the users
                            screen.
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
                            A maximized modal always occupy the full maximum height and width that a modal may have.
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle3}>Open Dialog Modal</a>

                    <Modal
                        modalTitle="Dialog Modal"
                        type="dialog"
                        ref="dialogModal"
                        expanded={this.state.expanded3}
                        onOpen={this._toggle3}>

                        <div>
                            <div className="modal-title">
                                Dialog modal content here!
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eu eros id
                                euismod. Etiam molestie quis nunc eu ultrices.
                            </p>
                            <div className="buttons">
                                <input type="button" value="Nope" onClick={this._toggle3} />
                                <input type="button" className="primary" value="Yup" onClick={this._toggle3} />
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="input-row">
                    <a onClick={this._toggle4}>Open Alert Modal</a>

                    <Modal
                        modalTitle=""
                        type="alert"
                        ref="dialogModal2"
                        expanded={this.state.expanded4}
                        onOpen={this._toggle4}
                        bodyClass="ballz">

                        <div className = "title">
                            Alert Modal
                        </div>
                        <div>
                            This modal copies the look of details tooltip with alert class.
                        </div>
                        <div className="buttons">
                            <input type="button" className="cancel" value="Disgard Changes" onClick={this._toggle4}/>
                            <input type="button" className="primary" value="Save" onClick={this._toggle4}/>
                            <br />
                            <a className="cancel" onClick={this._toggle4}>Cancel</a>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
});

module.exports = ModalDemo;
