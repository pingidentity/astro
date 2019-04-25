import React from "react";
import FlagsProvider from "./../../../components/utils/FlagsProvider";
import HR from "ui-library/lib/components/general/HR";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import FormTextField from "ui-library/lib/components/forms/form-text-field";

/**
* @name FlagsProviderDemo
* @memberof FlagsProvider
* @desc A demo for FlagsProvider
*/
const FlagsProviderDemo = () => (
    <div>
        <FlagsProvider flags={["p-stateful"]}>
            <FormTextField labelText="Progressively Stateful" />
        </FlagsProvider>
        <FlagsProvider>
            <FormTextField labelText="Stateless" />
        </FlagsProvider>
        <HR />
        <FlagsProvider flags={["use-portal"]}>
            <DetailsTooltip
                open={true}
                label={<div>Details Tooltip using portals</div>}
                placement="bottom"
                title="Portals"
            >My Content</DetailsTooltip>
        </FlagsProvider>
        <span> | </span>
        <FlagsProvider>
            <DetailsTooltip
                open={true}
                label={<div>Details Tooltip not using portals</div>}
                placement="bottom"
                title="No Portals"
            >My Content</DetailsTooltip>
        </FlagsProvider>
    </div>
);

export default FlagsProviderDemo;
