import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import InfiniteScroll from "../list/InfiniteScroll";
import classnames from "classnames";
import _ from "underscore";
import uuid from "uuid";
import { defaultRender } from "../../util/PropUtils";

const Head = ({
    columnOrder,
    "data-id": dataId,
    fixed,
    getDropClass,
    headContentType,
    headData,
    onCancel,
    onDrag,
    onDrop,
    widths,
    renderHeaderCell = defaultRender,
}) => {
    const suffixedId = fixed ? dataId + "-fixedHead" : dataId + "-Head";
    return (
        <div data-id={suffixedId} className={classnames("thead", fixed && "fixed")}>
            <div className="tr">
                {columnOrder.map((headIndex, index) => {
                    const { content = headData[headIndex] } = headData[headIndex];
                    const style = widths
                        ? { minWidth: widths[headIndex], maxWidth: widths[headIndex] }
                        : null;
                    const className = classnames(getDropClass(content, index), "th");

                    return renderHeaderCell({
                        key: index,
                        id: index,
                        index: index,
                        onDrag: onDrag,
                        style: style,
                        type: "column",
                        className: className,
                        onDrop: onDrop,
                        onCancel: onCancel,
                        children: (
                            headContentType
                                ? React.cloneElement(
                                    headContentType,
                                    _.defaults(
                                        { id: headIndex,
                                            key: headIndex,
                                            index: headIndex,
                                            data: content }
                                    )
                                )
                                : content
                        )
                    }, "div");
                })}
            </div>
        </div>
    );
};

const Body = ({
    beingDragged,
    bodyClassName,
    bodyData,
    columnOrder,
    "data-id": dataId,
    getDropClass,
    widths
}) => (
    <div data-id={dataId} className={classnames(bodyClassName, "tbody")}>
        { bodyData.map(function (row, index) {
            return (
                <div className="tr" key={index}>
                    {columnOrder.map(function (columnIndex, dataIndex) {
                        const dragClass = beingDragged === dataIndex ? "dragging": null;
                        const style = widths
                            ? { minWidth: widths[columnIndex], maxWidth: widths[columnIndex] }
                            : null;
                        return (
                            <div
                                className={classnames(getDropClass(row[columnIndex], dataIndex), dragClass, "td")}
                                style={style}
                                key={columnIndex}>
                                {row[columnIndex]}
                            </div>
                        );
                    })}
                </div>
            );
        })}
    </div>
);

const ISBody = (props) => (
    <div data-id={props["data-id"]} className={classnames(props.bodyClassName, "infinite-scroll-wrapper")}>
        <InfiniteScroll
            {...props.infiniteScroll}
            contentType={<ISRow {...props}/>}
            onScroll={props.onISScroll}
            batches={
                props.infiniteScroll.batches || [{ id: 1, data: props.bodyData }]}
        />
    </div>
);


const ISRow = (props) => (
    <div>
        {props.columnOrder.map((columnIndex, dataIndex) => {
            const dragClass = props.beingDragged === dataIndex ? "dragging": null;
            const style = props.widths
                ? { minWidth: props.widths[columnIndex], maxWidth: props.widths[columnIndex] }
                : null;
            return (
                <div key={uuid.v4()}
                    className={classnames(props.getDropClass(props[columnIndex], dataIndex), "td", dragClass)}
                    style={style}>
                    {props[columnIndex]}
                </div>
            );
        })}
    </div>
);

/**
 * @callback ReportTable~onDrag
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback ReportTable~onDrop
 * @param {number} targetIndex
 *          current target index where items is dragged over or dropped
 * @param {number} sourceIndex
 *          origin index item is dragged or dropped from
 */

/**
 * @callback ReportTable~onCancel
 */

/**
 * @class ReportTable
 *
 * @desc A stateless wrapper for the DragDrop component that provides table markup based on data
 *
 * @param {DragDrop~onDrag} onDrag
 *          A callback which is execute when the row is moved.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onDrop} onDrop
 *          A callback which is execute when the row is dropped.  Must have signature function (targetIndex, ownIndex)
 * @param {DragDrop~onCancel} onCancel
 *          A callback which is executed when the dragging is cancelled (dropped outside a droppable area
 *          or esc button pressed).
 *
 * @param {array} headData
 *          An array of values for the table head. Members of array can either be strings or objects with
 *          properties of width (number) and content (string)
 * @param {array} [bodyData]
 *          An array of arrays for the body that are ordered in the same was as the headData
 * @param {array} [columnOrder]
 *          An array of values to represent the order of the columns
 * @param {object} [headContentType]
 *          A React object that can be used as a wrapper for the th elements. Receives id, key, index and data as props.
 * @param {string} [className="report-table"]
 *          Classname for the parent table
 * @param {number} [beingDragged]
 *          Index in the headData array that corresponds with the dragging item
 * @param {number} [dropTarget]
 *          Index in the headData array that corresponds with the item drop zone
 * @param {boolean} [fixedHead=true]
 *          Fixes the table header for vertical scrolling
 * @param {object} [infiniteScroll]
 *          Props to pass to the InfiniteScroll component. If included InfiniteScroll is automatically enabled.
 *
 * @example
 *
 * <ReportTable
 *      data-id = "my-report-table"
 *      headData={this.state.headings}
 *      columnOrder={this.state.order}
 *      headContentType={this._getHeadContentType()}
 *      bodyData={this.state.rows}
 *      beingDragged={this.state.beingDragged}
 *      dropTarget={this.state.dropTarget}
 *      onDrag={this._onDrag}
 *      onDrop={this._onDrop}
 *      onCancel={this._onCancel} />
 *
 */

class ReportTable extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        onDrag: PropTypes.func,
        onDrop: PropTypes.func,
        onCancel: PropTypes.func,
        headData: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    content: PropTypes.string,
                    width: PropTypes.number
                }),
                PropTypes.string,
            ])
        ).isRequired,
        bodyData: PropTypes.arrayOf(
            PropTypes.arrayOf(
                PropTypes.node
            )
        ),
        columnOrder: PropTypes.array,
        headContentType: PropTypes.object,
        className: PropTypes.string,
        beingDragged: PropTypes.number,
        dropTarget: PropTypes.number,
        fixedHead: PropTypes.bool,
        infiniteScroll: PropTypes.object,
        renderHeaderCell: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "report-table",
        className: "report-table",
        fixedHead: false,
    };

    state = {
        columnWidths: null
    };

    _setWidths = () => {
        //this function reads the width of the initial table columns and uses it to set widths for the fixed table
        const headerTh = this.tableHead.getElementsByClassName("th");

        this.setState({
            columnWidths: this.props.headData.map(
                ({ width }, idx) => width !== undefined ? width : headerTh[idx].getBoundingClientRect().width
            )
        });
    };

    _handleHorizontalScroll = ({
        currentTarget: {
            scrollLeft
        }
    }) => {
        if (this.initialX === scrollLeft) {
            return;
        }
        this.tableHead.style.left = -(scrollLeft) + "px";
        this.initialX = scrollLeft;
    };

    _handleISHorizontalScroll = (param, e) => {
        this._handleHorizontalScroll(e);
    };

    _infiniteScrollRef = (component) => {
        this.infiniteScrollNode = ReactDOM.findDOMNode(component);
    };

    _getDropClass = (item, index) => {
        const dragRight = this.props.headData.length - 1 === index &&
                this.props.dropTarget === this.props.headData.length;
        return classnames("dd-column", { "drag-left": this.props.dropTarget === index }, { "drag-right": dragRight });
    };

    componentDidMount() {
        this.tableHead = ReactDOM.findDOMNode(this.rootElement.getElementsByClassName("thead")[0]);
        if (this.props.fixedHead && !this.state.columnWidths) {
            this._setWidths();
        }
    }

    render() {
        const order = this.props.columnOrder || _.range(this.props.headData.length).map(Number.call, Number);
        const bodyData = this.props.infiniteScroll
            ? (this.props.infiniteScroll.batches[0].data || this.props.bodyData)
            : this.props.bodyData;

        const infiniteScrollActive = this.props.infiniteScroll && this.state.columnWidths;
        const fixedHeadActive = (this.props.fixedHead || this.props.infiniteScroll) && this.state.columnWidths;

        const props = _.defaults({
            columnOrder: order,
            getDropClass: this._getDropClass,
            widths: this.state.columnWidths,
            fixed: fixedHeadActive,
            bodyData: bodyData,
            onISScroll: infiniteScrollActive ? this._handleISHorizontalScroll : null
        }, this.props);

        const onScroll = (fixedHeadActive && !infiniteScrollActive) ? this._handleHorizontalScroll : null;

        if (this.props.infiniteScroll) {
            this.props.infiniteScroll.ref = this._infiniteScrollRef;
        }

        const tableHead = <Head {...props} />;
        const tableBody = this.props.infiniteScroll && this.state.columnWidths
            ? <ISBody {...props} />
            : <Body {...props} />;

        const className = classnames(
            this.props.className,
            { "infinite-scroll-container": infiniteScrollActive },
            { "fixed-head": fixedHeadActive },
            { "has-next": infiniteScrollActive && this.props.infiniteScroll.hasNext }
        );

        return (
            <div
                data-id={this.props["data-id"]}
                className={className}
                ref={ref => this.rootElement = ref}
            >
                <div className="dd-table-container" onScroll={onScroll} data-id={this.props["data-id"] + "-container"}>
                    <div className="table" data-id={this.props["data-id"] + "-table"}>
                        {tableHead}
                        {tableBody}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = ReportTable;
