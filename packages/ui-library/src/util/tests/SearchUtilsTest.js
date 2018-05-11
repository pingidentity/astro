window.__DEV__ = true;

jest.dontMock("../SearchUtils");

import {
    _addToSearchTerms,
    buildSearchProps
} from "../SearchUtils";

describe("SearchUtils", () => {
    const tree = [
        {
            id: "column",
            label: "Column",
            children: [
                {
                    label: "Section",
                    id: "section",
                    children: [{ label: "Item", id: "item" }]
                }
            ],
            keywords: ["test"]
        }
    ];

    it("adds keyword and label of a node to search terms", () => {
        const searchTerms = _addToSearchTerms(tree[0]);

        const expected = {
            column: ["column"],
            test: ["column"]
        };

        expect(searchTerms).toEqual(expected);
    });

    it("gets possible results and search terms for a given node and its children", () => {
        const {
            searchTerms,
            possibleResults
        } = buildSearchProps(tree);


        const expectedTerms = {
            section: ["section"],
            item: ["item"]
        };

        const expectedResults = {
            section: {
                id: "section",
                label: "Section",
                hasChildren: true,
                root: "column"
            },
            item: {
                id: "item",
                label: "Item",
                hasChildren: false,
                section: "section",
                root: "column"
            }
        };

        expect(searchTerms).toEqual(expectedTerms);
        expect(possibleResults).toEqual(expectedResults);
    });
});