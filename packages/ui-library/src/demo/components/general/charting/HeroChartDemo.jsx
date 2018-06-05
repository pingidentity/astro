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
        { id: "Sat 12/8", successes: 4000, failures: 200 },
        { id: "Sun 12/9", successes: 3000, failures: 198 },
        { id: "Mon 12/10", successes: 2000, failures: 900 },
        { id: "Tue 12/11", successes: 3908, failures: 200 },
        { id: "Wed 12/12", successes: 4800, failures: 281 },
        { id: "Thu 12/13", successes: 3908, failures: 200 },
        { id: "Fri 12/14", successes: 4800, failures: 281 },
    ];

    const bgImage = `src/images/herochart-bg${Math.floor(Math.random() * 3) + 1}.png`;

    return (
        <div>
            <HeroChart
                bgImage={bgImage}
                data={data}
                onValueChange={_handleRangeChange}
                selected="1W"

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
