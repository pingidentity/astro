window.__DEV__ = true;

import React from "react";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import ContentArea from "../ContentArea";

describe("ContentArea", function () {

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ContentArea
                onCancel={jest.fn()}
            />
        );
    });

});