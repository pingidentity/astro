import React from "react";
import PropTypes from "prop-types";
import Spinner from "../../general/PageSpinner";
import Text, { textTypes } from "../../general/Text";
import Padding, { sizes } from "../../layout/Padding";


const BASE_CLASS_NAME = "chart-wrapper";
const BASE_SPACING = sizes.SM;

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
            <Padding bottom={BASE_SPACING} />
            {legend}
            <Padding bottom={BASE_SPACING} />
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
            <Padding bottom={BASE_SPACING} />
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
