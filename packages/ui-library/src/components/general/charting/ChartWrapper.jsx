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
            { (title || legend) &&
                <div className={`${BASE_CLASS_NAME}__info`}>
                    {title &&
                        <Padding bottom={BASE_SPACING}>
                            {title}
                        </Padding>
                    }
                    {legend &&
                        <Padding bottom={BASE_SPACING}>
                            {legend}
                        </Padding>
                    }
                </div>
            }

            { loadingMessage &&
                <div className={`${BASE_CLASS_NAME}__loader`}>
                    <Spinner small show={true} />
                    <Text type={textTypes.SECTIONTITLE}>{loadingMessage}</Text>
                </div>
            }
            { message &&
                <div className={`${BASE_CLASS_NAME}__message`}>
                    <Text type={textTypes.PAGETITLE}>{message}</Text>
                </div>
            }

            { chart &&
                <div className={`${BASE_CLASS_NAME}__chart`}>
                    {chart}
                </div>
            }

            { controls &&
                <div className={`${BASE_CLASS_NAME}__controls`}>
                    <Padding bottom={BASE_SPACING} />
                    {controls}
                </div>
            }

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
