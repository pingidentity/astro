import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import HelpHint from "../../tooltips/HelpHint";

const ChartLegend = (
    {
        legend,
        colors,
        label: legendLabel,
        reverseKeys,
        selectedId,
        onMouseOut,
        onMouseOver,
        onClick,
        helpLabel,
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

    const _renderContent = (id, key) => {
        const classes = classnames("legend__aside-key", {
            "legend__aside-key-selected": selectedId === id
        });

        return (
            <div
                data-id="chart-legend-key"
                key={id}
                // eslint-disable-next-line max-len
                className={classes}
                onMouseOver={_handleMouseOver(key, id)}
                onMouseOut={_handleMouseOut}
                onClick={_handleClick(key, id)}
            >
                <div
                    className="legend__aside-key-color"
                    style={{ backgroundColor: colors[key] }}>
                </div>
                <div className="legend__aside-key-label" title={id}>
                    {id}
                </div>
            </div>
        );
    };

    return (
        <div key="asideKey" data-id={dataId} className="legend__aside">
            <div className="legend__aside-label">
                {legendLabel}
            </div>
            <div className={"legend__aside-keys " + (reverseKeys ? "legend__aside-keys-revese" : "")}>
                {
                    legend.map(({ id }, key) =>
                        helpLabel ? (
                            <HelpHint
                                data-id={`helphint-topplacement_${id}`}
                                placement="right"
                                delayShow={500}
                                hintText={helpLabel}
                                key={key}
                            >
                                {_renderContent(id, key)}
                            </HelpHint>
                        ) : (
                            _renderContent(id, key)
                        )
                    )}
            </div>
        </div>
    );
};

ChartLegend.propTypes = {
    legend: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
        })
    ).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    reverseKeys: PropTypes.bool,
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
    reverseKeys: false,
};

export default ChartLegend;