window.__DEV__ = true;

jest.dontMock("../KeywordSearch.jsx");
jest.dontMock("../KeywordSearchView.jsx");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { mount } from "enzyme";
import KeywordSearch from "../KeywordSearch";

describe("KeywordSearch", () => {
    const searchDefaults = {
        onResultClick: jest.fn(),
        tree: [
            {
                id: "column",
                label: "Column",
                children: [
                    {
                        label: "Section",
                        id: "section",
                        children: [
                            { label: "Item", id: "item1" },
                            { label: "A third item, even", id: "item3" },
                            { label: "Item2", id: "item2" },
                        ]
                    }
                ],
                keywords: ["test"]
            }
        ]
    };

    const getComponent = (props) => {
        return ReactTestUtils.renderIntoDocument(
            <KeywordSearch
                {...searchDefaults}
                {...props}
            />
        );
    };

    it("should render the component", () => {
        const keywordSearch = getComponent();
        expect(keywordSearch).toBeTruthy();
    });

    it("_resultClicked should correctly update state", () => {
        const onResultClick = jest.fn();
        const component = getComponent({
            onResultClick,
            results: [
                { label: "test" }
            ]
        });
        component._resultClicked(
            { label: "test" }
        );

        expect(component.state.query).toEqual(null);
        expect(component.state.results.length).toEqual(3);
    });

    it("_resultClicked should call onResultClick prop if passed in", () => {
        const onResultClick = jest.fn();
        const component = getComponent({
            onResultClick,
            results: [
                { label: "test" }
            ]
        });
        component._resultClicked(
            { label: "test" }
        );

        expect(onResultClick).toBeCalled();
    });

    it("should not get results if query is shorter than buffer length", () => {
        const component = getComponent({
            searchBuffer: 2
        });
        component._onValueChange("");

        expect(component.state.results.length).toEqual(0);
    });

    it("should have results if a query matches one of its search terms", () => {
        const component = getComponent();
        component._onValueChange("item");

        expect(component.state.results.length).toEqual(3);
    });

    it("should not have results if a query doesn't match one of its search terms", () => {
        const component = getComponent();
        component._onValueChange("not a thing");

        expect(component.state.results.length).toEqual(0);
    });

    it("calls onResultClick when enter key is pressed", () => {
        const onResultClick = jest.fn();
        const component = getComponent({ onResultClick });
        component._onKeyDown({ keyCode: 13 });

        expect(onResultClick).toHaveBeenCalled();
    });

    it("selects next result when down arrow key is pressed", () => {
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "test2" }
            ]
        });

        component._onKeyDown({ keyCode: 40 });

        expect(component.state.selectedIndex).toEqual(1);
    });

    it("selects previous result when up arrow key is pressed", () => {
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "test2" }
            ]
        });
        component.setState(prev => ({
            ...prev,
            selectedIndex: 1
        }));

        component._onKeyDown({ keyCode: 38 });

        expect(component.state.selectedIndex).toEqual(0);
    });

    it("selects same result if up arrow key is pressed and first result is already selected", () => {
        const component = getComponent({
            results: [
                { label: "test" },
                { label: "test2" }
            ]
        });
        component.setState(prev => ({
            ...prev,
            selectedIndex: 0
        }));

        component._onKeyDown({ keyCode: 38 });

        expect(component.state.selectedIndex).toEqual(0);
    });

    it("calls onResultClick when enter key is pressed", () => {
        const onResultClick = jest.fn();
        const component = getComponent({
            onResultClick,
            results: [
                { label: "test" },
                { label: "test2" }
            ]
        });
        component.setState(prev => ({
            ...prev,
            selectedIndex: 0
        }));

        component._onKeyDown({ keyCode: 38 });

        expect(component.state.selectedIndex).toEqual(0);
    });

    it("default sort correctly sorts alphabetically, first by starts with and then contains", () => {
        const component = mount(
            <KeywordSearch
                {...searchDefaults}
            />
        );

        component.find("[data-id=\"searchBox-input\"]").simulate("change", { target: { value: "t" } });

        const results = component.find("KeywordSearchView").prop("results");

        expect(results[0].id).toEqual("item1");
        expect(results[2].id).toEqual("item3");
    });


});
