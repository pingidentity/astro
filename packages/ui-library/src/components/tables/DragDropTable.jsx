import React from "react";
import PropTypes from "prop-types";
import ReportTable from "./ReportTable";
import DragDrop from "../rows/DragDrop";

/**
* @class DragDropTable
* @desc A stateless wrapper for the DragDrop component that provides table markup based on data
*
* @param {DragDrop~onDrag} onDrag
*          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
* @param {DragDrop~onDrop} onDrop
*          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
* @param {DragDrop~onCancel} onCancel
*          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
*          or esc button pressed).
* @example
* <DragDropTable
*     headData={withWidth}
*     columnOrder={this.state.order}
*     headContentType={this._getHeadContentType(this._sort)}
*     bodyData={this.state.rows}
*     beingDragged={this.state.beingDragged}
*     dropTarget={this.state.dropTarget}
*     onDrag={this._onDrag}
*     onDrop={this._onDrop}
*     onCancel={this._onCancel}
*     fixedHead={true}
* />
*/

const renderDragDropCell = props => <DragDrop {...props} />;
const DragDropTable = props => <ReportTable renderHeaderCell={renderDragDropCell} {...props} />;

DragDropTable.propTypes = {
    "data-id": PropTypes.string,
    onDrag: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

DragDropTable.defaultProps = {
    "data-id": "drag-drop-table",
};

export default DragDropTable;