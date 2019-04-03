import React from "react";
import PropTypes from "prop-types";

const ChartLegend = (
    {
        data,
        label: legendLabel,
        selectedId,
        onMouseOut,
        onMouseOver,
        onClick,
        "data-id": dataId
    }) => {
    const _handleMouseOver = /* istanbul ignore next  */ (index, label) => (e) => {
        onMouseOver({ index, label }, e);
    };

    const _handleMouseOut = /* istanbul ignore next  */ (e) => {
        onMouseOut(e);
    };

    const _handleClick = /* istanbul ignore next  */ (index, label) => (e) => {
        onClick({ index, label }, e);
    };

    return (
        <div key="asideKey" data-id={dataId} className="legend__aside">
            <div className="legend__aside-label">
                {legendLabel}
            </div>
            <div className="legend__aside-keys">
                {data.map(({ id, color }, key) =>
                    <div
                        data-id="chart-legend-key"
                        key={id}
                        // eslint-disable-next-line max-len
                        className={
                            `legend__aside-key
                            ${selectedId === id ?"legend__aside-key-selected" : ""}`
                        }
                        onMouseOver={_handleMouseOver(key, id)}
                        onMouseOut={_handleMouseOut}
                        onClick={_handleClick(key, id)}
                    >
                        <div
                            className="legend__aside-key-color"
                            style={{ backgroundColor: color }}>
                        </div>
                        <div className="legend__aside-key-label" title={id}>
                            {id}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ChartLegend.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            color: PropTypes.string
        })
    ).isRequired,
    label: PropTypes.string.isRequired,
    selectedId: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onClick: PropTypes.func,
};

ChartLegend.defaultProps = {
    // Ignore default mouse events for testing
    onMouseOut: /* istanbul ignore next  */ () => {},
    onMouseOver: /* istanbul ignore next  */ () => {},
    onClick: /* istanbul ignore next  */ () => {},
};

export default ChartLegend;