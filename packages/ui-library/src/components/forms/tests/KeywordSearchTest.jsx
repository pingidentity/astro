window.__DEV__ = true;

jest.dontMock("../KeywordSearch.jsx");
jest.dontMock("../KeywordSearchView.jsx");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import KeywordSearch from "../KeywordSearch";


describe("KeywordSearch", () => {
    const searchDefaults = {
        onResultClick: jest.genMockFunction(),
        searchTerms: {
            "test keyword": ["testResult"]
        },
        possibleResults: {
            testResult: {
                label: "Result"
            }
        }
    };

    const getComponent = (props) => {
        return ReactTestUtils.renderIntoDocument(
            <KeywordSearch
                {...{
                    ...searchDefaults,
                    ...props
                }}
            />
        );
    };

    it("should render the component", () => {
        const keywordSearch = getComponent();
        expect(keywordSearch).toBeTruthy();
    });

    it("_resultClicked should correctly update state", () => {
        const onResultClick = jest.genMockFunction();
        const component = getComponent({
            onResultClick,
            results: [
                { label: "test" }
            ]
        });
        component._resultClicked(
            { label: "test" }
        );

        expect(component.state.query).toEqual("");
        expect(component.state.results).toEqual([]);
    });

    it("_resultClicked should call onResultClick prop if passed in", () => {
        const onResultClick = jest.genMockFunction();
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
        const component = getComponent();
        component._onValueChange("");

        expect(component.state.results.length).toEqual(0);
    });

    it("should have results if a query matches one of its search terms", () => {
        const component = getComponent();
        component._onValueChange("test");

        expect(component.state.results.length).toEqual(1);
    });

    it("should not have results if a query doesn't match one of its search terms", () => {
        const component = getComponent();
        component._onValueChange("not a thing");

        expect(component.state.results.length).toEqual(0);
    });

    it("should sort results starting with the query before results containung the query", () => {
        const component = getComponent({
            searchTerms: {
                test: ["testResult"],
                different: ["differentResult"]
            },
            possibleResults: {
                testResult: {
                    id: "result",
                    label: "result"
                },
                differentResult: {
                    id: "different",
                    label: "different"
                }
            }
        });

        component._onValueChange("t");
        expect(component.state.results[0].label).toEqual("result");
        expect(component.state.results[1].label).toEqual("different");
    });

    it("should sort results alphabetically", () => {
        const component = getComponent();

        const results = [
            { id: "b" },
            { id: "a" },
            { id: "c" }
        ];

        const sortedResults = results.sort(component._sort);

        const expected = [
            { id: "a" },
            { id: "b" },
            { id: "c" }
        ];

        expect(sortedResults).toEqual(expected);
    });
});
