import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../general/PageSpinner";
import Text, { textTypes } from "../../general/Text";


const BASE_CLASS_NAME = "chart-wrapper";

function ChartWrapper({
    legend,
    title,
    chart,
    controls,
    loadingMessage,
    message,
}) {
    return (
        <div className={BASE_CLASS_NAME}>
            {title}
            {legend}
            <div className={`${BASE_CLASS_NAME}__chart`}>
                {loadingMessage ? (
                    <div className={`${BASE_CLASS_NAME}__loader`}>
                        <Spinner small show={true} />
                        <Text type={textTypes.SECTIONTITLE}>{loadingMessage}</Text>
                    </div>
                ): null}
                {
                    message !== undefined ? (
                        <div className={`${BASE_CLASS_NAME}__message`}>
                            <Text type={textTypes.SECTIONTITLE}>{message}</Text>
                        </div>
                    ) : null
                }
                {chart}
            </div>
            {controls}
        </div>
    );
}

ChartWrapper.propTypes = {
    message: PropTypes.node,
    legend: PropTypes.node,
    controls: PropTypes.node,
    loadingMessage: PropTypes.node,
    title: PropTypes.node,
};

export default ChartWrapper;
