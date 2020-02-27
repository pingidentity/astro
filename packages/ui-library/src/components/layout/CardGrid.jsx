import React from "react";
import PropTypes from "prop-types";

class CardGrid extends React.Component {
    render() {
        return (
            <div className="card-grid" style={{
                gridTemplateColumns: `repeat(${this.props.columns}, 1fr)`
            }}>
                {this.props.children}
            </div>
        );
    }
}

CardGrid.propTypes = {
    columns: PropTypes.number,
};

CardGrid.defaultProps = {
    columns: 2,
};

class Block extends React.Component {
    render() {
        return (
            <div className="card-grid__block">
                {this.props.children}
            </div>
        );
    }
}

CardGrid.Block = Block;
export default CardGrid;