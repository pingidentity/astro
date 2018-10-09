import ColumnSelector from "./ColumnSelector";
import ColumnSelectorColumn, { ColumnTitle } from "./ColumnSelectorColumn";
import ColumnSelectorRow, { buttonTypes, RowButton, RowTitle } from "./ColumnSelectorRow";

ColumnSelector.buttonTypes = buttonTypes;
ColumnSelector.ColumnSelectorColumn = ColumnSelectorColumn;
ColumnSelector.ColumnSelectorRow = ColumnSelectorRow;
ColumnSelector.ColumnTitle = ColumnTitle;
ColumnSelector.RowButton = RowButton;
ColumnSelector.RowTitle = RowTitle;

export default ColumnSelector;