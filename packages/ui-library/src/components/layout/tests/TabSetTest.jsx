import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { TabSet, TabContent } from "../TabSet";
import TestUtils from "../../../testutil/TestUtils";
import _ from "underscore";

jest.dontMock("../TabSet");
jest.dontMock("../../forms/RockerButton.jsx");

describe("TabSet", function () {
    const componentId = "tab-set";
    const defaults = {
        "data-id": componentId,
        labels: [],
        children: [<div />, <div />]
    };

    function getTabSet (opts) {
        opts = _.defaults(opts || {}, );
        return ReactTestUtils.renderIntoDocument(<TabSet {...defaults} {...opts} />);
    }

    it("renders component with data-id=tab-set", function () {
        const component = getTabSet({});

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("getLabels correctly gets labels and active tab content", function () {
        const component = getTabSet({
            selectedIndex: 0
        });

        const mock = [
            {
                props: {
                    label: "label one",
                    children: ["whatever"]
                }
            },
            {
                props: {
                    label: "label two",
                    children: ["hello world"]
                }
            }
        ];

        const {
            activeTabContent,
            labels
        } = component._getLabels(mock);

        expect(labels).toEqual(["label one", "label two"]);
        expect(activeTabContent).toEqual(["whatever"]);
    });

    it("getLabels correctly gets active tab content for non-default tab", function () {
        const component = getTabSet({
            selectedIndex: 1
        });

        const mock = [
            {
                props: {
                    label: "label one",
                    children: ["whatever"]
                }
            },
            {
                props: {
                    label: "label two",
                    children: ["hello world"]
                }
            }
        ];

        const {
            activeTabContent,
        } = component._getLabels(mock);

        expect(activeTabContent).toEqual(["hello world"]);
    });

    it("renders the custom labels correctly", () => {
        const renderCustomLabels = data => {
            return (
                <div className="custom-labels">
                    {data.labels.map((label, index) => <div key={index} className="custom-tab">{label}</div>)}
                </div>
            );
        };

        const tabContents = [
            { label: "Label 1", content: "Label one content" },
            { label: "Label 2", content: "Label two content" },
            { label: "Label 3", content: "Label three content" },
        ];

        const children = [
            <TabContent label={tabContents[0].label}>{tabContents[0].content}</TabContent>,
            <TabContent label={tabContents[1].label}>{tabContents[1].content}</TabContent>,
            <TabContent label={tabContents[2].label}>{tabContents[2].content}</TabContent>,
        ];

        var component = getTabSet({
            renderLabels: renderCustomLabels,
            children: children,
        });

        var selectedContent = TestUtils.findRenderedDOMNodeWithClass(component, "tab-set-children");
        expect(selectedContent.textContent).toBe(tabContents[0].content);

        const customLabels = TestUtils.findRenderedDOMNodeWithClass(component, "custom-labels");
        expect(customLabels.children[0].textContent).toContain(tabContents[0].label);
        expect(customLabels.children[1].textContent).toContain(tabContents[1].label);
        expect(customLabels.children[2].textContent).toContain(tabContents[2].label);

        component = getTabSet({
            renderLabels: renderCustomLabels,
            children: children,
            selectedIndex: 1,
        });
        selectedContent = TestUtils.findRenderedDOMNodeWithClass(component, "tab-set-children");
        expect(selectedContent.textContent).toBe(tabContents[1].content);

        component = getTabSet({
            renderLabels: renderCustomLabels,
            children: children,
            selectedIndex: 2,
        });
        selectedContent = TestUtils.findRenderedDOMNodeWithClass(component, "tab-set-children");
        expect(selectedContent.textContent).toBe(tabContents[2].content);
    });

    it("renders the tabContent correctly", () => {
        const myCss = "mur-sur-urs-urs";
        const myContent = "mur curnturnt";
        const myDataId = "mur-durdur-urdur";
        const myLabel = "mur lurbl";

        const component = ReactTestUtils.renderIntoDocument(
            <TabContent className={myCss} data-id={myDataId} label={myLabel}>{myContent}</TabContent>
        );

        const dom = TestUtils.findRenderedDOMNodeWithDataId(component, myDataId);
        expect(dom).toBeTruthy();
        expect(dom.className).toContain(myCss);
        expect(dom.getAttribute("label")).toContain(myLabel);
        expect(dom.textContent).toContain(myContent);
    });
});