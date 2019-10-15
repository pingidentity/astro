import React from "react";
import PropTypes from "prop-types";
import { noop } from "underscore";

import { generateNavTreePropType } from "../../../util/PropUtils";
import Icon from "../../general/Icon";
import KeywordSearch from "../../forms/KeywordSearch";
import Modal from "../../general/Modal";
import { inStateContainer } from "../../utils/StateContainer";


const NavSearchBase = ({
    "data-id": dataId,
    navTree,
    open,
    onClose,
    onOpen,
    onSearchClick
}) => (
    <div>
        <Icon
            data-id={dataId}
            iconName="search"
            onClick={onOpen}
            type="leading"
        />
        <Modal
            closeOnBgClick
            expanded={open}
            modalTitle="Search"
            type="dialog"
            onClose={onClose}
            flags={["p-stateful", "use-portal"]}
        >
            <KeywordSearch
                data-id="app-frame-search"
                onResultClick={onSearchClick}
                tree={navTree}
            />
        </Modal>
    </div>
);

const NavSearch = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [
            {
                name: "onOpen",
                transform: () => true
            },
            {
                name: "onClose",
                transform: () => false
            },
            {
                name: "onSearchClick",
                transform: () => false
            }
        ],
    }
])(NavSearchBase);

NavSearch.propTypes = {
    "data-id": PropTypes.string,
    navTree: generateNavTreePropType(4),
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onSearchClick: PropTypes.func
};

NavSearch.defaultProps = {
    "data-id": "nav-search",
    onClose: noop,
    onOpen: noop,
    onSearchClick: noop
};

export default NavSearch;
