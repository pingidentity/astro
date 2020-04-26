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
    initialTitle,
    initialResults,
    navTree,
    open,
    onClose,
    onOpen,
    onSearchClick,
    sort,
    title,
}) => (
    <div className="nav-search">
        <Icon
            className="nav-search__icon"
            data-id={dataId}
            iconName="search"
            onClick={onOpen}
            type="leading"
        />
        <Modal
            className="nav-search__modal"
            closeOnBgClick
            expanded={open}
            modalTitle="Search"
            type="dialog"
            onClose={onClose}
        >
            <KeywordSearch
                data-id="app-frame-search"
                initialResults={initialResults}
                initialTitle={initialTitle}
                onResultClick={onSearchClick}
                sort={sort}
                title={title}
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
