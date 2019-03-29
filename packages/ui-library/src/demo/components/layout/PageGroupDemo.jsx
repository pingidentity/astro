import React from "react";
import PageGroup from "../../../components/layout/PageGroup";
import HelpHint from "ui-library/lib/components/tooltips/HelpHint";
import HR from "ui-library/lib/components/general/HR";

/**
* @name PageGroupDemo
* @memberof PageGroup
* @desc A demo for PageGroup
*/

const PageGroupDemo = () => {
    const helpHint = <span>Would you like <HelpHint hintText="Some help?" className="inline" /></span>;

    return (
        <div>
            <PageGroup title="Here is your Group Header">
                Bacon ipsum dolor amet pork belly leberkas short loin filet mignon capicola.
                Picanha ribeye meatloaf, doner beef frankfurter sirloin burgdoggen prosciutto ball tip.
                Kevin spare ribs salami capicola meatball shoulder rump alcatra.
                Sausage kielbasa capicola picanha, frankfurter bresaola spare ribs brisket pork chop tenderloin tongue.
                Turducken kielbasa filet mignon, pork chop ground round fatback strip
                steak pork loin boudin porchetta frankfurter beef.
                Buffalo ham hock meatloaf kielbasa.
            </PageGroup>
            <HR />
            <PageGroup title={helpHint}>
                You can put markup in the title.
            </PageGroup>
        </div>
    );
};

module.exports = PageGroupDemo;