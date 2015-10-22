var React = require('react/addons');
var ModalButton = require('./../../../components/general/ModalButton.jsx');

var ModalButtonDemo = React.createClass({
    
    render: function () {
        return (
            <div>
                <ModalButton value="Open Modal" modalTitle="Example Modal">
                    <div>
                        <p>Amazing modal content here!</p>
                    </div>
                </ModalButton>
            </div>
        );
    }
});

module.exports = ModalButtonDemo;