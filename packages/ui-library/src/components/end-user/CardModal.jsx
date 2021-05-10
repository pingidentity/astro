import React from "react";
import PropTypes from "prop-types";

import Modal from "../general/Modal";

const CardModal = ({
    children,
    title,
    ...props
}) => (
    <Modal { ...props } type="dialog" >
        <div className="modal-title">{title}</div>
        { children }
    </Modal>
);

CardModal.propTypes = {
    ...Modal.propTypes,
    title: PropTypes.node,
};

CardModal.defaultProps = {
    ...Modal.defaultProps,
    title: "",
    className: "end-user card-modal",
};


export default CardModal;
