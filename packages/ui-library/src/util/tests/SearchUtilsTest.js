window.__DEV__ = true;

jest.dontMock("../SearchUtils");

import {
    _addToSearchTerms,
    _sort,
    containsString,
    createSearch,
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
        const [search] = createSearch(tree);

        const { startsWith } = search("item");

        const expected = {
            id: "item",
            label: "Item",
            hasChildren: false,
            section: {
                id: "section",
                label: "Section"
            },
            root: {
                id: "column",
                label: "Column"
            }
        };

        expect(startsWith[0]).toEqual(expected);
    });

    it("returns no results if no match is found", () => {
        const [search] = createSearch(tree);

        const { startsWith, contains } = search("quack");

        expect(startsWith).toEqual([]);
        expect(contains).toEqual([]);
    });

    it("returns all results when given empty query", () => {
        const [search] = createSearch(tree);
        const { contains, startsWith } = search("item");

        expect([...contains, ...startsWith].length).toEqual(2);
    });

    it("it sorts matches starting with query before matches containing query", () => {
        const [search] = createSearch(tree);

        const { startsWith } = search("item");

        const expected = {
            id: "item",
            label: "Item",
            hasChildren: false,
            section: {
                id: "section",
                label: "Section"
            },
            root: {
                id: "column",
                label: "Column"
            }
        };

        expect(startsWith[0]).toEqual(expected);
    });

    it("it handles an undefined tree", () => {
        const [search] = createSearch(undefined);

        const { startsWith, contains } = search("item");

        expect(startsWith).toEqual([]);
        expect(contains).toEqual([]);
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

    it("containsString returns true if the given argument contains a specific string", () => {
        const contains = containsString("astring", "a");

        expect(contains).toEqual(true);
    });

    it("containsString returns false if the given argument does not contain a specific string", () => {
        const contains = containsString("astring", "[*{");

        expect(contains).toEqual(false);
    });
});