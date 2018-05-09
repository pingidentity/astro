import React from "react";
import StatCard from "ui-library/lib/components/general/charting/StatCard";
import StatCardRow from "ui-library/lib/components/general/charting/StatCardRow";

const StatCardRowDemo = () => (
    <StatCardRow>
        <StatCard title="Failed Attempts" description="February 2016"
            value="1,056"
            data={[
                { label: "Last 30 days", value: "29" },
                { label: "Last 60 days", value: "124" },
                { label: "Last 90 days", value: "167" },
                { label: "Last 120 days", value: "195" },
                { label: "Last 150 days", value: "201" },
            ]}
            iconName="lockout"
        />
        <StatCard title="Peaks per Day" description="February 2016" accent={1}
            value="261"
            data={[
                { label: "Last 30 days", value: "29" },
                { label: "Last 60 days", value: "124" },
                { label: "Last 90 days", value: "167" },
                { label: "Last 120 days", value: "195" },
                { label: "Last 150 days", value: "201" },
            ]}
        />
        <StatCard title="Password Resets" description="February 2016" accent="blue"
            value="53"
            data={[
                { label: "Last 30 days", value: "29" },
                { label: "Last 60 days", value: "124" },
                { label: "Last 90 days", value: "167" },
                { label: "Last 120 days", value: "195" },
                { label: "Last 150 days", value: "201" },
            ]}
            iconName="nodes"
        />
    </StatCardRow>
);

export default StatCardRowDemo;
