import React from "react";
import PropTypes from "prop-types";
import ReportTable from "./ReportTable";
import DragDrop from "../rows/DragDrop";

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