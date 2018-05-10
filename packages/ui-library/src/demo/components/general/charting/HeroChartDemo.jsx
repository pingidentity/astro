import React from "react";
import HeroChart from "../../../../components/general/charting/HeroChart";
import StatCardRowDemo from "./StatCardRowDemo";

/**
* @name HeroChartDemo
* @memberof HeroChart
* @desc A demo for HeroChart
*/
const HeroChartDemo = () => {

    const _handleRangeChange = (range) => {
        console.log(`new time range selected: ${range.label}`);
    };

    const data = [
        { id: "1/1", successes: 4400, failures: 200 },
        { id: "1/2", successes: 3100, failures: 198 },
        { id: "1/3", successes: 1900, failures: 900 },
        { id: "1/4", successes: 7908, failures: 200 },
        { id: "1/5", successes: 4800, failures: 281 },
        { id: "1/6", successes: 3908, failures: 200 },
        { id: "1/7", successes: 4800, failures: 281 },
        { id: "1/8", successes: 4000, failures: 200 },
        { id: "1/9", successes: 3000, failures: 198 },
        { id: "1/10", successes: 2000, failures: 900 },
        { id: "1/11", successes: 3908, failures: 200 },
        { id: "1/12", successes: 4800, failures: 281 },
        { id: "1/13", successes: 3908, failures: 200 },
        { id: "1/14", successes: 4800, failures: 281 },
        { id: "1/15", successes: 4000, failures: 200 },
        { id: "1/16", successes: 3000, failures: 198 },
    ];

    const bgImage = `src/demo/images/hero-bg${Math.floor(Math.random() * 3) + 1}.png`;

    return (
        <div>
            <HeroChart
                bgImage={bgImage}
                data={data}
                onValueChange={_handleRangeChange}

                bottomSeriesKey="failures"
                topSeriesKey="successes"
                xAxisKey="id"

                greetingText="Good morning, Eric."
                titleText="User Logins"
                subtitleText="so far today"
                tooltipTopLabel="Logins"
                tooltipBottomLabel="Failures"
                totalValue="24,458"
            />
            <div className="hero-chart__stat-cards">
                <StatCardRowDemo />
            </div>
        </div>
    );
};

module.exports = HeroChartDemo;
