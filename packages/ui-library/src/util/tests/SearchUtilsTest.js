window.__DEV__ = true;

jest.dontMock("../SearchUtils");

import {
    _addToSearchTerms,
    _sort,
    createSearch
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
                },
                {
                    label: "Other Section",
                    id: "othersection",
                    children: [{ label: "Other Item", id: "otheritem" }]
                },
            ],
            keywords: ["test"]
        }
    ];

    it("creates a usable search function with createSearch that retrieves the correct item", () => {
        const search = createSearch(tree);

        const results = search("item");

        const expected = {
            id: "item",
            label: "Item",
            hasChildren: false,
            section: "section",
            root: "column"
        };

        expect(results[0]).toEqual(expected);
    });

    it("returns no results if no match is found", () => {
        const search = createSearch(tree);

        const results = search("quack");

        expect(results).toEqual([]);
    });

    it("it sorts matches starting with query before matches containing query", () => {
        const search = createSearch(tree);

        const results = search("item");

        const expected = {
            id: "item",
            label: "Item",
            hasChildren: false,
            section: "section",
            root: "column"
        };

        expect(results[0]).toEqual(expected);
    });

    it("it handles an undefined tree", () => {
        const search = createSearch(undefined);

        const results = search("item");

        expect(results).toEqual([]);
    });

    it("_addToSearchTerms adds to search terms", () => {
        const terms = _addToSearchTerms(tree[0].children[0]);

        expect(terms["section"]).toBeTruthy();
    });

    it("_sort sorts alphabetically based on id", () => {
        const initial = [{ id: "b" }, { id: "a" }, { id: "c" }];
        const sorted = initial.sort(_sort);
        const expected = [{ id: "a" }, { id: "b" }, { id: "c" }];

        expect(sorted).toEqual(expected);
    });
});