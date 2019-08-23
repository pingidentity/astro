window.__DEV__ = true;


import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import TranslationPicker from "../TranslationPicker";

describe("TranslationPickerTests", function () {
    const OPTIONS = [
        { label: "en", value: "en" },
        { label: "fr", value: "fr" },
        { label: "fr-ca", value: "fr" },
        { label: "es", value: "es" },
        { label: "ch", value: "ch" },
        { label: "zn", value: "zn" },
        { label: "en", value: "en" },
        { label: "fr", value: "fr" },
        { label: "fr-ca", value: "fr-ca" },
        { label: "es", value: "es" },
        { label: "ch", value: "ch" },
        { label: "zn", value: "zn" },
    ];
    it("renders component with icon", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><TranslationPicker label="en" options={OPTIONS} /></div>
        );
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "translation-picker-icon");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <TranslationPicker
                options={[
                    { label: "en", value: "en" },
                    { label: "fr", value: "fr" },
                    { label: "fr-ca", value: "fr" },
                    { label: "es", value: "es" },
                    { label: "ch", value: "ch" },
                    { label: "zn", value: "zn" },
                    { label: "en", value: "en" },
                    { label: "fr", value: "fr" },
                    { label: "fr-ca", value: "fr-ca" },
                    { label: "es", value: "es" },
                    { label: "ch", value: "ch" },
                    { label: "zn", value: "zn" },
                ]}
            />
        );
    });

});