import React from "react";
import { Row, Column } from "ui-library/lib/components/general/ColumnLayout";
import LinkingArrow from "ui-library/lib/components/layout/LinkingArrow";

/**
* @name LinkingArrowDemo
* @memberof LinkingArrow
* @desc A demo for LinkingArrow
*/

export default function LinkingArrowDemo() {
    return (
        <Row autoWidth>
            <Column>
                <LinkingArrow title="A linking arrow" />
            </Column>
        </Row>
    );
}
