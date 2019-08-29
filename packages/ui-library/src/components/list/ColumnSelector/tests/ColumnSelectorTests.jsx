import React from "react";
import { mount, shallow } from "enzyme";
import { omit } from "underscore";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import ColumnSelector from "../ColumnSelector";
import ColumnSelectorFrame from "../ColumnSelectorFrame";
import ColumnSelectorRow, { RowButton } from "../ColumnSelectorRow";

window.__DEV__ = true;

jest.mock("../../../rows/DragDrop.jsx", () => () => <div className="drag-drop-mock" />);

describe("ColumnSelector", () => {
    const baseOptions = [
        {
            id: "prod",
            subtitle: "US, Europe and Israel",
            title: "Production",
            //Can add "open" property here; the component will not manage state for whether options
            //are collapsed or expanded if any options have this property defined.
            children: [
                {
                    id: "prod-us-employees",
                    title: "US Employees",
                    titleIcon: "globe"
                },
                {
                    id: "prod-europe-employees",
                    title: "Europe Employees",
                    titleIcon: "globe"
                },
                {
                    id: "prod-israel-employees",
                    title: "Israel Employees",
                    titleIcon: "globe"
                },
            ],
        },
        {
            id: "sandbox",
            subtitle: "US, Europe and Israel",
            title: "Sandbox",
            children: [
                {
                    id: "sandbox-us-employees",
                    title: "US Employees",
                    titleIcon: "globe"
                },
                {
                    id: "sandbox-europe-employees",
                    title: "Europe Employees",
                    titleIcon: "globe"
                },
                {
                    id: "sandbox-israel-employees",
                    title: "Israel Employees",
                    titleIcon: "globe"
                },
            ]
        },
        {
            id: "test",
            subtitle: "US, Europe and Israel",
            title: "Test",
            children: [
                {
                    id: "test-us-employees",
                    title: "US Employees",
                    titleIcon: "globe"
                },
                {
                    id: "test-europe-employees",
                    title: "Europe Employees",
                    titleIcon: "globe"
                },
                {
                    id: "test-israel-employees",
                    title: "Israel Employees",
                    titleIcon: "globe"
                },
            ],
            customButton: ({ handleOnButtonClick }) => {
                //handleOnButtonClick();

                return (<RowButton
                    onClick={handleOnButtonClick}
                />);
            }
        }
    ];

    function getComponent({
        "dataid": dataId = "test-selector",
        options = baseOptions,
        ...props
    } = {}) {
        return shallow(
            <ColumnSelector
                data-id={dataId}
                options={options}
                selectedOptions={baseOptions}
                {...props}
            />
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ColumnSelector
                options={baseOptions}
                selectedOptions={baseOptions}
            />
        );
    });

    it("renders the first column", () => {
        const component = getComponent();

        // Make sure that render prop fires
        const [firstColumn] =
            component
                .find(ColumnSelectorFrame)
                .props()
                .children();
        const renderedColumn = shallow(firstColumn);

        expect(renderedColumn.exists()).toEqual(true);
    });

    it("renders the first row", () => {

    });

    it("renders row with no children", () => {
        const component = getComponent({
            options: baseOptions.map(opt => omit(opt, "children"))
        });

        // Make sure that render prop fires
        const [firstColumn] =
            component
                .find(ColumnSelectorFrame)
                .props()
                .children();

        const [firstRow] =
            shallow(firstColumn)
                .find(ColumnSelectorRow);

        const renderedRow = mount(firstRow);

        expect(renderedRow.props().children({})).toEqual(null);
    });

    it("renders closed row with children", () => {
        const component = getComponent({
            options: [
                {
                    ...baseOptions[0],
                    open: false
                }
            ]
        });

        // Make sure that render prop fires
        const [firstColumn] =
            component
                .find(ColumnSelectorFrame)
                .props()
                .children();

        const [firstRow] =
            shallow(firstColumn)
                .find(ColumnSelectorRow);

        const renderedRow = mount(firstRow);

        expect(renderedRow.props().children({})).toEqual(null);
    });

    it("renders open row with children", () => {
        const component = getComponent({
            options: [
                {
                    ...baseOptions[0],
                    open: true
                }
            ]
        });

        // Make sure that render prop fires
        const [firstColumn] =
            component
                .find(ColumnSelectorFrame)
                .props()
                .children();

        const [firstRow] =
            shallow(firstColumn)
                .find(ColumnSelectorRow);

        const childRows = shallow(firstRow).find(ColumnSelectorRow);

        expect(childRows.length).toEqual(3);
    });

    it("renders drag drop rows if draggable prop is true", () => {
        const component = mount(
            <ColumnSelector
                draggable
                options={baseOptions}
            />
        );

        const draggable = component.find("div.drag-drop-mock");
        expect(draggable.exists()).toEqual(true);
    });

    it("does not render drag drop rows if draggable prop is false", () => {
        const openOptions = baseOptions.map(opt => ({ ...opt, open: true }));
        const component = mount(
            <ColumnSelector
                draggable={false}
                options={openOptions}
                selectedOptions={openOptions}
            />
        );

        const draggable = component.find("div.drag-drop-mock");
        expect(draggable.exists()).toEqual(true);
    });

    it("handleAdd calls onAdd with options and selectedOptions added to payload", () => {
        const onAdd = jest.fn();
        const component = getComponent({
            onAdd,
            options: [],
            selectedOptions: []
        });
        component.instance().handleAdd({});

        expect(onAdd).toHaveBeenCalledWith({
            options: [],
            selectedOptions: []
        });
    });

    it("handleAdd correctly sets lastMoved if openSameId prop is true", () => {
        const component = getComponent({
            options: baseOptions,
            selectedOptions: baseOptions
        });
        component.instance().handleAdd({ id: "sandbox-israel-employees" });

        expect(component.state().lastMoved).toEqual("sandbox-israel-employees");
    });

    it("handleAdd does not set lastMoved if openSameId prop is false", () => {
        const component = getComponent({
            openParentOnMove: false,
            options: baseOptions,
            selectedOptions: baseOptions
        });
        component.instance().handleAdd({ id: "sandbox-israel-employees" });

        expect(component.state().lastMoved).not.toEqual("sandbox-israel-employees");
    });

    it("handleRemove correctly sets lastMoved if openSameId prop is true", () => {
        const component = getComponent({
            options: baseOptions,
            selectedOptions: baseOptions
        });
        component.instance().handleRemove({ id: "sandbox-israel-employees" });

        expect(component.state().lastMoved).toEqual("sandbox-israel-employees");
    });

    it("handleRemove does not set lastMoved if openSameId prop is false", () => {
        const component = getComponent({
            openParentOnMove: false,
            options: baseOptions,
            selectedOptions: baseOptions
        });
        component.instance().handleRemove({ id: "sandbox-israel-employees" });

        expect(component.state().lastMoved).not.toEqual("sandbox-israel-employees");
    });

    it("handleRemove calls onRemove with options and selectedOptions added to payload", () => {
        const onRemove = jest.fn();
        const component = getComponent({
            onRemove,
            options: [],
            selectedOptions: []
        });
        component.instance().handleRemove({});

        expect(onRemove).toHaveBeenCalledWith({
            options: [],
            selectedOptions: []
        });
    });

    it("handleToggleOptions calls onToggleOption with options and selectedOptions added to payload", () => {
        const onToggleOption = jest.fn();
        const component = getComponent({
            onToggleOption,
        });
        component.instance().handleToggleOption("test id", true);

        expect(onToggleOption).toHaveBeenCalledWith({
            id: "test id",
            open: true
        });
    });

    it("sorts rows using customSort function", () => {
        const sort = ({ id: idA }, { id: idB }) => idA > idB;
        const options = [
            {
                id: "second",
                title: "second"
            },
            {
                id: "third",
                title: "third"
            },
            {
                id: "first",
                title: "first"
            }
        ];

        const component = mount(
            <ColumnSelector
                customSort={sort}
                draggable={false}
                options={options}
            />
        );

        const [firstRow] = component.find(ColumnSelectorRow);

        expect(mount(firstRow).props().id).toEqual("first");
    });
});
