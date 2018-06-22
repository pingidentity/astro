module.exports = [
    {
        label: "Documentation",
        //Override alphabetical ordering in Demo.jsx to order children as they appear in the list
        listOrder: true,
        icon: "details",
        children: [
            {
                label: "Release Notes",
                demo: require("../components/docs/releaseNotes"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "UI Library 101",
                demo: require("../components/tutorials/uiLibrary101"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Components In-depth",
                demo: require("../components/tutorials/componentsInDepth"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Templates In-depth",
                demo: require("../components/tutorials/templatesInDepth"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Text Styles",
                demo: require("../components/docs/TextStyles"),
                fullscreen: true,
                icon: "details"
            },
            {
                label: "Basic App",
                demo: require("../components/tutorials/basicApp"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Prototyping",
                demo: require("../components/tutorials/prototyping"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Colors",
                demo: require("../components/tutorials/Colors"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Icons",
                demo: require("../components/tutorials/Icons"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Inputs",
                demo: require("../components/tutorials/Inputs"),
                fullscreen: true,
                icon: "clipboard"
            },
            {
                label: "Input Widths",
                demo: require("../components/forms/FormInputWidthsDemo"),
                pathToDemoSource: "demo_components_forms_FormInputWidthsDemo.jsx.html",
                icon: "clipboard"
            },
        ]
    },
    {
        label: "Components",
        listOrder: true,
        icon: "details",
        children: [
            {
                label: "Basic Inputs",
                icon: "circle-o",
                children: [
                    {
                        label: "Checkbox",
                        demo: require("../components/forms/FormCheckboxDemo"),
                        pathToDoc: "components/forms/FormCheckbox.jsx",
                        pathToSource: "components_forms_FormCheckbox.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormCheckboxDemo.jsx.html"

                    },
                    {
                        label: "Checkbox Group",
                        demo: require("../components/forms/CheckboxGroupDemo"),
                        pathToDoc: "components/forms/CheckboxGroup.jsx",
                        pathToSource: "components_forms_CheckboxGroup.jsx.html",
                        pathToDemoSource: "demo_components_forms_CheckboxGroupDemo.jsx.html"

                    },
                    {
                        label: "File Drop",
                        demo: require("../components/forms/FileDropDemo"),
                        pathToDoc: "components/forms/FileDrop.jsx",
                        pathToSource: "components_forms_FileDrop.jsx.html",
                        pathToDemoSource: "demo_components_forms_FileUploadDemo.jsx.html"
                    },
                    {
                        label: "File Upload",
                        demo: require("../components/forms/FileUploadDemo"),
                        pathToDoc: "components/forms/FileUpload.jsx",
                        // FileUpload v2 is split into separate source files, so pass all as array.
                        // First item in array will be displayed in full source iframe, rest will be linked to above the iframe.
                        pathToSource: [
                            "components_forms_file-upload_v2.jsx.html",
                            "components_forms_file-upload_v2-stateless.jsx.html",
                            "components_forms_file-upload_v2-stateful.jsx.html"
                        ],
                        pathToDemoSource: "demo_components_forms_FileUploadDemo.jsx.html"
                    },
                    {
                        label: "Radio Group",
                        demo: require("../components/forms/FormRadioGroupDemo"),
                        pathToDoc: "components/forms/FormRadioGroup.jsx",
                        pathToSource: "components_forms_FormRadioGroup.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormRadioGroupDemo.jsx.html"
                    },
                    {
                        label: "Radio Input (single)",
                        demo: require("../components/forms/FormRadioInputDemo.jsx"),
                        pathToDoc: "components/forms/FormRadioInput.jsx",
                        pathToSource: "components_forms_FormRadioInput.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormRadioInputDemo.jsx.html"
                    },
                    {
                        label: "Text Area",
                        demo: require("../components/forms/FormTextAreaDemo"),
                        pathToDoc: "components/forms/FormTextArea.jsx",
                        pathToSource: "components_forms_form-text-area_v2.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormTextAreaDemo.jsx.html"
                    },
                    {
                        label: "Text Field",
                        demo: require("../components/forms/FormTextFieldDemo"),
                        pathToDoc: "components/forms/FormTextField.jsx",
                        pathToSource: "components_forms_form-text-field_v2.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormTextFieldDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Complex Inputs",
                icon: "calendar",
                children: [
                    {
                        label: "Calendar",
                        demo: require("../components/calendars/CalendarDemo"),
                        pathToDoc: "components/calendars/Calendar.jsx",
                        pathToSource: "components_calendars_Calendar.jsx.html",
                        pathToDemoSource: "demo_components_calendars_CalendarDemo.jsx.html"
                    },
                    {
                        label: "Color",
                        demo: require("../components/general/ColorPickerDemo"),
                        pathToDoc: "components/general/ColorPicker.jsx",
                        pathToSource: "components_general_ColorPicker.jsx.html",
                        pathToDemoSource: "demo_components_general_ColorPickerDemo.jsx.html"
                    },
                    {
                        label: "Conditional Fieldset",
                        demo: require("../components/general/ConditionalFieldsetDemo"),
                        pathToDoc: "components/general/ConditionalFieldset.jsx",
                        pathToSource: "components_general_ConditionalFieldset.jsx.html",
                        pathToDemoSource: "demo_components_general_ConditionalFieldsetDemo.jsx.html"
                    },
                    {
                        label: "Country",
                        demo: require("../components/forms/i18n/I18nCountrySelectorDemo"),
                        pathToDoc: "components/forms/i18n/I18nCountrySelector.jsx",
                        pathToSource: "components_forms_i18n_I18nCountrySelector.jsx.html",
                        pathToDemoSource: "demo_components_forms_i18n_I18nCountrySelectorDemo.jsx.html"
                    },
                    {
                        label: "Integer Field",
                        demo: require("../components/forms/FormIntegerFieldDemo"),
                        pathToDoc: "components/forms/FormIntegerField.jsx",
                        pathToSource: "components_forms_form-integer-field_v2.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormIntegerFieldDemo.jsx.html"
                    },
                    {
                        label: "Multivalues",
                        demo: require("../components/forms/MultivaluesDemo"),
                        pathToDoc: "components/forms/Multivalues.jsx",
                        pathToSource: "components_forms_Multivalues.jsx.html",
                        pathToDemoSource: "demo_components_forms_MultivaluesDemo.jsx.html"
                    },
                    {
                        label: "Phone",
                        demo: require("../components/forms/i18n/I18nPhoneInputDemo"),
                        pathToDoc: "components/forms/i18n/I18nPhoneInput.jsx",
                        pathToSource: "components_forms_i18n_phone-input_v2.jsx.html",
                        pathToDemoSource: "demo_components_forms_i18n_I18nPhoneInputDemo.jsx.html"
                    },
                    {
                        label: "Time",
                        demo: require("../components/general/TimePickerDemo"),
                        pathToDoc: "components/general/TimePicker.jsx",
                        pathToSource: "components_general_TimePicker.jsx.html",
                        pathToDemoSource: "demo_components_general_TimePickerDemo.jsx.html"
                    },
                    {
                        label: "Time Zone",
                        demo: require("../components/forms/TimeZoneDemo"),
                        pathToDoc: "components/forms/FormTimeZone.jsx",
                        pathToSource: "components_forms_FormTimeZone.jsx.html",
                        pathToDemoSource: "demo_components_forms_TimeZoneDemo.jsx.html"
                    },
                    {
                        label: "Unit Input",
                        demo: require("../components/general/UnitInputDemo"),
                        pathToDoc: "components/general/UnitInput.jsx",
                        pathToSource: "components_general_UnitInput.jsx.html",
                        pathToDemoSource: "demo_components_general_UnitInputDemo.jsx.html"
                    },
                ]
            },
            {
                label: "List Inputs",
                icon: "directory-hollow",
                children: [
                    {
                        label: "Drop Down List",
                        demo: require("../components/forms/FormDropDownListDemo"),
                        pathToDoc: "components/forms/FormDropDownList.jsx",
                        pathToSource: "components_forms_FormDropDownList.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormDropDownListDemo.jsx.html"
                    },
                    {
                        label: "Link Drop Down List",
                        demo: require("../components/forms/LinkDropDownListDemo"),
                        pathToDoc: "components/forms/LinkDropDownList.jsx",
                        pathToSource: "components_forms_LinkDropDownList.jsx.html",
                        pathToDemoSource: "demo_components_forms_LinkDropDownListDemo.jsx.html"
                    },
                    {
                        label: "Multi Column Drag Drop",
                        demo: require("../components/panels/MultiDragDemo"),
                        pathToDoc: "components/panels/MultiDrag.jsx",
                        pathToSource: "components_panels_multi-drag_MultiDrag.jsx.html",
                        pathToDemoSource: "demo_components_panels_MultiDragDemo.jsx.html"
                    },
                    {
                        label: "Selection List",
                        demo: require("../components/forms/SelectionListDemo"),
                        pathToDoc: "components/forms/SelectionList.jsx",
                        // SelectionList v2 is split into separate source files, so pass all as array.
                        // First item in array will be displayed in full source iframe, rest will be linked to above the iframe.
                        pathToSource: [
                            "components_forms_selection-list_v2.jsx.html",
                            "components_forms_selection-list_v2-stateless.jsx.html",
                            "components_forms_selection-list_v2-stateful.jsx.html"
                        ],
                        pathToDemoSource: "demo_components_forms_SelectionListDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Text & Icons",
                icon: "info",
                children: [
                    {
                        label: "Code View",
                        demo: require("../components/general/CodeViewDemo.jsx"),
                        pathToDoc: "components/general/CodeView.jsx",
                        pathToSource: "components_general_CodeView.jsx.html",
                        pathToDemoSource: "demo_components_general_CodeViewDemo.jsx.html"
                    },
                    {
                        label: "Icon",
                        demo: require("../components/general/IconDemo"),
                        pathToDoc: "components/general/Icon.jsx",
                        pathToSource: "components_general_Icon.jsx.html",
                        pathToDemoSource: "demo_components_general_IconDemo.jsx.html"
                    },
                    {
                        label: "Indent",
                        demo: require("../components/general/IndentDemo"),
                        pathToDoc: "components/general/Indent.jsx",
                        pathToSource: "components_general_Indent.jsx.html",
                        pathToDemoSource: "demo_components_general_IndentDemo.jsx.html"
                    },
                    {
                        label: "Masked Value",
                        demo: require("../components/general/MaskedValueDemo"),
                        pathToDoc: "components/general/MaskedValue.jsx",
                        pathToSource: "components_general_MaskedValue.jsx.html",
                        pathToDemoSource: "demo_components_general_MaskedValueDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Layout",
                icon: "puzzle",
                children: [
                    {
                        label: "Aside",
                        demo: require("../components/layout/AsideDemo"),
                        pathToDoc: "components/layout/Aside.jsx",
                        pathToSource: "components_layout_Aside.jsx.html",
                        pathToDemoSource: "demo_components_layout_AsideDemo.jsx.html"
                    },
                    {
                        label: "Collapsible Link",
                        demo: require("../components/general/CollapsibleLinkDemo"),
                        pathToDoc: "components/general/CollapsibleLink.jsx",
                        pathToSource: "components_general_CollapsibleLink.jsx.html",
                        pathToDemoSource: "demo_components_general_CollapsibleLinkDemo.jsx.html"
                    },
                    {
                        label: "Collapsible Divider",
                        demo: require("../components/layout/CollapsibleDividerDemo"),
                        pathToDoc: "components/layout/CollapsibleDivider.jsx",
                        pathToSource: "components_layout_CollapsibleDivider.jsx.html",
                        pathToDemoSource: "demo_components_layout_CollapsibleDividerDemo.jsx.html"
                    },
                    {
                        label: "Columns",
                        demo: require("../components/general/ColumnLayoutDemo"),
                        pathToDoc: "components/general/ColumnLayout.jsx",
                        pathToSource: "components_general_ColumnLayout.jsx.html",
                        pathToDemoSource: "demo_components_general_ColumnLayoutDemo.jsx.html"
                    },
                    {
                        label: "Label Value Pairs",
                        demo: require("../components/layout/LabelValuePairsDemo"),
                        pathToDoc: "components/layout/LabelValuePairs.jsx",
                        pathToSource: "components_layout_LabelValuePairs.jsx.html",
                        pathToDemoSource: "demo_components_layout_LabelValuePairsDemo.jsx.html"
                    },
                    {
                        label: "Callout Box",
                        demo: require("../components/layout/CalloutBoxDemo"),
                        pathToDoc: "components/layout/CalloutBox.jsx",
                        pathToSource: "components_layout_CalloutBox.jsx.html",
                        pathToDemoSource: "demo_components_layout_CalloutBoxDemo.jsx.html"
                    },
                    {
                        label: "Page Group",
                        demo: require("../components/layout/PageGroupDemo"),
                        pathToDoc: "components/layout/PageGroup.jsx",
                        pathToSource: "components_layout_PageGroup.jsx.html",
                        pathToDemoSource: "demo_components_layout_PageGroupDemo.jsx.html"
                    },
                    {
                        label: "Page Header",
                        demo: require("../components/general/PageHeaderDemo"),
                        pathToDoc: "components/general/PageHeader.jsx",
                        pathToSource: "components_general_PageHeader.jsx.html",
                        pathToDemoSource: "demo_components_general_PageHeaderDemo.jsx.html"
                    },
                    {
                        label: "Page Section",
                        demo: require("../components/layout/PageSectionDemo"),
                        pathToDoc: "components/layout/PageSection.jsx",
                        pathToSource: "components_layout_PageSection.jsx.html",
                        pathToDemoSource: "demo_components_layout_PageSectionDemo.jsx.html"
                    },
                    {
                        label: "Section",
                        demo: require("../components/general/SectionDemo"),
                        pathToDoc: "components/general/Section.jsx",
                        pathToSource: "components_general_Section.jsx.html",
                        pathToDemoSource: "demo_components_general_SectionDemo.jsx.html"
                    },
                    {
                        label: "Value Item",
                        demo: require("../components/layout/ValueItemDemo"),
                        pathToDoc: "components/layout/ValueItem.jsx",
                        pathToSource: "components_layout_ValueItem.jsx.html",
                        pathToDemoSource: "demo_components_layout_ValueItemDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Actions",
                icon: "nodes",
                children: [
                    {
                        label: "Button",
                        demo: require("../components/buttons/ButtonDemo"),
                        pathToDoc: "components/buttons/Button.jsx",
                        pathToSource: "components_buttons_Button.jsx.html",
                        pathToDemoSource: "demo_components_buttons_ButtonDemo.jsx.html"
                    },
                    {
                        label: "Button Bar",
                        demo: require("../components/forms/ButtonBarDemo"),
                        pathToDoc: "components/forms/ButtonBar.jsx",
                        pathToSource: "components_forms_ButtonBar.jsx.html",
                        pathToDemoSource: "demo_components_forms_ButtonBarDemo.jsx.html"
                    },
                    {
                        label: "Drop Down Button (stateless)",
                        demo: require("../components/forms/DropDownButtonDemo"),
                        pathToDoc: "components/forms/DropDownButton.jsx",
                        pathToSource: "components_forms_DropDownButton.jsx.html",
                        pathToDemoSource: "demo_components_forms_DropDownButtonDemo.jsx.html"
                    },
                    {
                        label: "Ellipsis Loader Button",
                        demo: require("../components/general/EllipsisLoaderButtonDemo"),
                        pathToDoc: "components/general/EllipsisLoaderButton.jsx",
                        pathToSource: "components_general_EllipsisLoaderButton.jsx.html",
                        pathToDemoSource: "demo_components_general_EllipsisLoaderButtonDemo.jsx.html"
                    },
                    {
                        label: "Link",
                        demo: require("../components/general/LinkDemo"),
                        pathToDoc: "components/general/Link.jsx",
                        pathToSource: "components_general_Link.jsx.html",
                        pathToDemoSource: "demo_components_general_LinkDemo.jsx.html"
                    },
                    {
                        label: "Tile Selector",
                        demo: require("../components/buttons/TileSelectorDemo"),
                        pathToDoc: "components/buttons/TileSelector.jsx",
                        pathToSource: "components_buttons_TileSelector.jsx.html",
                        pathToDemoSource: "demo_components_buttons_TileSelectorDemo.jsx.html"
                    },
                    {
                        label: "Toggle",
                        demo: require("../components/forms/ToggleDemo"),
                        pathToDoc: "components/forms/Toggle.jsx",
                        pathToSource: "components_forms_form-toggle_v2.jsx.html",
                        pathToDemoSource: "demo_components_forms_ToggleDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Modals & Tooltips",
                icon: "details",
                children: [
                    {
                        label: "Confirm Tooltip",
                        demo: require("../components/tooltips/ConfirmTooltipDemo"),
                        pathToDoc: "components/tooltips/ConfirmTooltip.jsx",
                        pathToSource: "components_tooltips_ConfirmTooltip.jsx.html",
                        pathToDemoSource: "demo_components_tooltips_ConfirmTooltipDemo.jsx.html"
                    },
                    {
                        label: "Details Tooltip",
                        demo: require("../components/tooltips/DetailsTooltipDemo"),
                        pathToDoc: "components/tooltips/DetailsTooltip.jsx",
                        pathToSource: "components_tooltips_DetailsTooltip.jsx.html",
                        pathToDemoSource: "demo_components_tooltips_DetailsTooltipDemo.jsx.html"
                    },
                    {
                        label: "Help Hint",
                        demo: require("../components/tooltips/HelpHintDemo"),
                        pathToDoc: "components/tooltips/HelpHint.jsx",
                        pathToSource: "components_tooltips_HelpHint.jsx.html",
                        pathToDemoSource: "demo_components_tooltips_HelpHintDemo.jsx.html"
                    },
                    {
                        label: "Modal",
                        demo: require("../components/general/ModalDemo"),
                        pathToDoc: "components/general/Modal.jsx",
                        pathToSource: "components_general_Modal.jsx.html",
                        pathToDemoSource: "demo_components_general_ModalDemo.jsx.html"
                    },
                    {
                        label: "Modal Button",
                        demo: require("../components/general/ModalButtonDemo"),
                        pathToDoc: "components/general/ModalButton.jsx",
                        pathToSource: "components_general_ModalButton.jsx.html",
                        pathToDemoSource: "demo_components_general_ModalButtonDemo.jsx.html"
                    },
                    {
                        label: "Popover Menu",
                        demo: require("../components/tooltips/PopoverMenuDemo.jsx"),
                        pathToDoc: "components/tooltips/PopoverMenu.jsx",
                        pathToSource: "components_tooltips_PopoverMenu.jsx.html",
                        pathToDemoSource: "demo_components_tooltips_PopoverMenuDemo.jsx.html"
                    },
                    {
                        label: "Wizard",
                        demo: require("../components/wizard/WizardDemo"),
                        pathToDoc: "components/wizard/Wizard.jsx",
                        pathToSource: "components_wizard_Wizard.jsx.html",
                        pathToDemoSource: "demo_components_wizard_WizardDemo.jsx.html"
                    },
                    {
                        label: "Wizard - v2",
                        demo: require("../components/wizard-v2/WizardDemo"),
                        pathToDoc: "components/wizard-v2/Wizard.jsx",
                        pathToSource: "components_wizard-v2_Wizard.jsx.html",
                        pathToDemoSource: "demo_components_wizard-v2_WizardDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Rows & Filters",
                icon: "directory",
                children: [
                    {
                        label: "Condensed Table",
                        demo: require("../components/tables/CondensedTableDemo"),
                        pathToDoc: "components/tables/CondensedTable.jsx",
                        pathToSource: "components_table_CondensedTable.jsx.html",
                        pathToDemoSource: "demo_components_table_CondensedTable.jsx.html"
                    },
                    {
                        label: "Drag-N-Drop Table",
                        demo: require("../components/tables/DragDropTableDemo"),
                        pathToDoc: "components/tables/DragDropTable.jsx",
                        pathToSource: "components_tables_DragDropTable.jsx.html",
                        pathToDemoSource: "demo_components_tables_DragDropTableDemo.jsx.html"
                    },
                    {
                        label: "Grid",
                        demo: require("../components/grid/GridDemo"),
                        pathToDoc: "components/grid/Grid.jsx",
                        pathToSource: "components_grid_Grid.jsx.html",
                        pathToDemoSource: "demo_components_grid_GridDemo.jsx.html"
                    },
                    {
                        label: "Expandable Row",
                        demo: require("../components/rows/ExpandableRowDemo"),
                        pathToDoc: "components/rows/ExpandableRow.jsx",
                        pathToSource: "components_rows_expandable-row_ExpandableRow.jsx.html",
                        pathToDemoSource: "demo_components_rows_ExpandableRowDemo.jsx.html"
                    },
                    {
                        label: "Infinite Scroller",
                        demo: require("../components/list/InfiniteScrollDemo"),
                        pathToDoc: "components/list/InfiniteScroll.jsx",
                        pathToSource: "components_list_InfiniteScroll.jsx.html",
                        pathToDemoSource: "demo_components_list_InfiniteScrollDemo.jsx.html"
                    },
                    {
                        label: "Pagination",
                        demo: require("../components/list/PaginationDemo"),
                        pathToDoc: "components/list/Pagination.jsx",
                        pathToSource: "components_list_Pagination.jsx.html",
                        pathToDemoSource: "demo_components_list_PaginationDemo.jsx.html"
                    },
                    {
                        label: "Row Index Navigation",
                        demo: require("../components/general/RowIndexNavDemo"),
                        pathToDoc: "components/general/RowIndexNav.jsx",
                        pathToSource: "components_general_RowIndexNav.jsx.html",
                        pathToDemoSource: "demo_components_general_RowIndexNavDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Search & Filter",
                icon: "search",
                children: [
                    {
                        label: "Search Bar",
                        demo: require("../components/forms/FormSearchBarDemo"),
                        pathToDoc: "components/forms/FormSearchBar.jsx",
                        pathToSource: "components_forms_FormSearchBar.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormSearchBarDemo.jsx.html"
                    },
                    {
                        label: "Search Box",
                        demo: require("../components/forms/FormSearchBoxDemo"),
                        pathToDoc: "components/forms/FormSearchBox.jsx",
                        pathToSource: "components_forms_FormSearchBox.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormSearchBoxDemo.jsx.html"
                    },
                    {
                        label: "Filter Selector",
                        demo: require("../components/filters/FilterSelectorDemo"),
                        pathToDoc: "components/filters/FilterSelector.jsx",
                        pathToSource: "components_filters_FilterSelector.jsx.html",
                        pathToDemoSource: "demo_components_filters_FilterSelectorDemo.jsx.html"
                    },
                ]
            },
            {
                label: "General",
                icon: "globe",
                children: [
                    {
                        label: "Search Bar",
                        demo: require("../components/forms/FormSearchBarDemo"),
                        pathToDoc: "components/forms/SearchBar.jsx",
                        pathToSource: "components_forms_FormSearchBar.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormSearchBarDemo.jsx.html"
                    },
                    {
                        label: "Search Box",
                        demo: require("../components/forms/FormSearchBoxDemo"),
                        pathToDoc: "components/forms/FormSearchBox.jsx",
                        pathToSource: "components_forms_FormSearchBox.jsx.html",
                        pathToDemoSource: "demo_components_forms_FormSearchBoxDemo.jsx.html"
                    },
                    {
                        label: "Table",
                        demo: require("../components/tables/TableDemo"),
                        pathToDoc: "components/tables/Table.jsx",
                        pathToSource: "components_table_Table.jsx.html",
                        pathToDemoSource: "demo_components_table_Table.jsx.html"
                    },
                ]
            },
            {
                label: "Feedback",
                icon: "chat",
                children: [
                    {
                        label: "Ellipsis Loader",
                        demo: require("../components/general/EllipsisLoaderDemo"),
                        pathToDoc: "components/general/EllipsisLoader.jsx",
                        pathToSource: "components_general_EllipsisLoader.jsx.html",
                        pathToDemoSource: "demo_components_general_EllipsisLoaderDemo.jsx.html"
                    },
                    {
                        label: "Inline Message",
                        demo: require("../components/general/InlineMessageDemo"),
                        pathToDoc: "components/general/InlineMessage.jsx",
                        pathToSource: "components_general_InlineMessage.jsx.html",
                        pathToDemoSource: "demo_components_general_InlineMessageDemo.jsx.html"
                    },
                    {
                        label: "Messages",
                        demo: require("../components/general/MessagesDemo"),
                        pathToDoc: "components/general/Messages.jsx",
                        pathToSource: "components_general_messages_Messages.jsx.html",
                        pathToDemoSource: "demo_components_general_MessagesDemo.jsx.html"
                    },
                    {
                        label: "Spinner",
                        demo: require("../components/general/SpinnerDemo"),
                        pathToDoc: "components/general/Spinner.jsx",
                        pathToSource: "components_general_Spinner.jsx.html",
                        pathToDemoSource: "demo_components_general_SpinnerDemo.jsx.html"
                    },
                    {
                        label: "Page Spinner",
                        demo: require("../components/general/PageSpinnerDemo"),
                        pathToDoc: "components/general/PageSpinner.jsx",
                        pathToSource: "components_general_PageSpinner.jsx.html",
                        pathToDemoSource: "demo_components_general_PageSpinnerDemo.jsx.html"
                    },
                    {
                        label: "Validation Messages",
                        demo: require("../components/forms/ValidationMessagesDemo"),
                        pathToDoc: "components/forms/ValidationMessages.jsx",
                        pathToSource: "components_forms_ValidationMessages.jsx.html",
                        pathToDemoSource: "demo_components_forms_ValidationMessagesDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Navigation",
                icon: "browser",
                children: [
                    {
                        label: "App Frame",
                        demo: require("../components/panels/AppFrameDemo"),
                        pathToDoc: "components/panels/AppFrame.jsx",
                        pathToSource: "components_panels_AppFrame.jsx.html",
                        pathToDemoSource: "demo_components_panels_AppFrameDemo.jsx.html"
                    },
                    {
                        label: "Header Bar",
                        demo: require("../components/panels/HeaderBarDemo"),
                        pathToDoc: "components/panels/HeaderBar.jsx",
                        pathToSource: "components_panels_header-bar_HeaderBar.jsx.html",
                        pathToDemoSource: "demo_components_panels_HeaderBarDemo.jsx.html"
                    },
                    {
                        label: "Left Side Nav Bar",
                        demo: require("../components/panels/LeftNavBarDemo"),
                        pathToDoc: "components/panels/LeftNavBar.jsx",
                        pathToSource: "components_panels_left-nav_LeftNavBar.jsx.html",
                        pathToDemoSource: "demo_components_panels_LeftNavBarDemo.jsx.html"
                    },
                    {
                        label: "Rocker Button",
                        demo: require("../components/forms/RockerButtonDemo"),
                        pathToDoc: "components/forms/RockerButton.jsx",
                        pathToSource: "components_forms_RockerButton.jsx.html",
                        pathToDemoSource: "demo_components_forms_RockerButtonDemo.jsx.html"
                    },
                    {
                        label: "Tabbed Sections",
                        demo: require("../components/general/TabbedSectionsDemo"),
                        pathToDoc: "components/general/TabbedSections.jsx",
                        pathToSource: "components_general_TabbedSections.jsx.html",
                        pathToDemoSource: "demo_components_general_TabbedSectionsDemo.jsx.html"
                    },
                ]
            },
            {
                label: "Charting",
                icon: "image",
                children: [
                    {
                        label: "Line Chart",
                        demo: require("../components/general/charting/LineChartDemo"),
                        pathToDoc: "components/general/charting/LineChart.jsx",
                        pathToSource: "components_general_charting_LineChart.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_LineChartDemo.jsx.html"
                    },
                    {
                        label: "Bar Chart",
                        demo: require("../components/general/charting/BarChartDemo"),
                        pathToDoc: "components/general/charting/BarChart.jsx",
                        pathToSource: "components_general_charting_BarChart.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_BarChartDemo.jsx.html"
                    },
                    {
                        label: "Pie & Donut Chart",
                        demo: require("../components/general/charting/PieChartDemo"),
                        pathToDoc: "components/general/charting/PieChart.jsx",
                        pathToSource: "components_general_charting_PieChart.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_PieChartDemo.jsx.html"
                    },
                    {
                        label: "Area Chart",
                        demo: require("../components/general/charting/AreaChartDemo"),
                        pathToDoc: "components/general/charting/AreaChart.jsx",
                        pathToSource: "components_general_charting_AreaChart.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_AreaChartDemo.jsx.html"
                    },
                    {
                        label: "Stat Cards",
                        demo: require("../components/general/charting/StatCardRowDemo"),
                        pathToDoc: "components/general/charting/StatCard.jsx",
                        pathToSource: "components_general_charting_StatCard.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_StatCardRowDemo.jsx.html"
                    },
                    {
                        label: "Hero Chart",
                        demo: require("../components/general/charting/HeroChartDemo"),
                        pathToDoc: "components/general/charting/HeroChart.jsx",
                        pathToSource: "components_general_charting_HeroChart.jsx.html",
                        pathToDemoSource: "demo_components_general_charting_HeroChartDemo.jsx.html"
                    }
                ]
            },
            {
                label: "Utils",
                icon: "wand",
                children: [
                    {
                        label: "Cache",
                        demo: require("../net/CacheDemo"),
                        pathToDoc: "net/Cache.js",
                        pathToSource: "net_Cache.js.html",
                        pathToDemoSource: "demo_net_CacheDemo.jsx.html",
                        // Indicate that the jsdoc is a module and not a class to generate the correct name for the jsdoc url
                        module: true
                    },
                    {
                        label: "Context Close Button",
                        demo: require("../components/general/ContextCloseButtonDemo"),
                        pathToDoc: "components/general/ContextCloseButton.jsx",
                        pathToSource: "components_general_context-close-button_v2.jsx.html",
                        pathToDemoSource: "demo_components_general_ContextCloseButtonDemo.jsx.html"
                    },
                    {
                        label: "Drag-N-Drop Row",
                        demo: require("../components/rows/DragDropRowDemo"),
                        pathToDoc: "components/rows/DragDrop.jsx",
                        pathToSource: "components_rows_DragDropRow.jsx.html",
                        pathToDemoSource: "demo_components_rows_DragDropRowDemo.jsx.html"
                    },
                    {
                        label: "If",
                        demo: require("../components/general/IfDemo"),
                        pathToDoc: "components/general/If.jsx",
                        pathToSource: "components_general_If.jsx.html",
                        pathToDemoSource: "demo_components_general_IfDemo.jsx.html"
                    },
                    {
                        label: "Select Text",
                        demo: require("../components/general/SelectTextDemo"),
                        pathToDoc: "components/general/SelectText.jsx",
                        pathToSource: "components_general_SelectText.jsx.html",
                        pathToDemoSource: "demo_components_general_SelectTextDemo.jsx.html"
                    },
                    {
                        label: "Unit Input",
                        demo: require("../components/general/UnitInputDemo"),
                        pathToDoc: "components/general/UnitInput.jsx",
                        pathToSource: "components_general_UnitInput.jsx.html",
                        pathToDemoSource: "demo_components_general_UnitInputDemo.jsx.html"
                    },
                ]
            },
        ]
    },
    {
        label: "Templates",
        children: [
            {
                label: "Edit View",
                icon: "edit",
                children: [
                    {
                        label: "Edit View - Simple",
                        demo: require("../components/templates/EditViewSimpleDemo"),
                        pathToDoc: "components/templates/EditViewSimple.jsx",
                        pathToSource: "templates_edit-view-simple_EditViewSimple.jsx.html",
                        pathToDemoSource: "demo_components_templates_EditViewSimpleDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "Edit View - Sectioned",
                        demo: require("../components/templates/EditViewSectionedDemo"),
                        pathToDoc: "components/templates/EditViewSectioned.jsx",
                        pathToSource: "templates_edit-view-sectioned_EditViewSectioned.jsx.html",
                        pathToDemoSource: "demo_components_templates_EditViewSectionedDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "Edit View - Switched",
                        demo: require("../components/templates/EditViewSwitchedDemo"),
                        pathToDoc: "components/templates/EditViewSwitched.jsx",
                        pathToSource: "templates_edit-view-switched_EditViewSwitched.jsx.html",
                        pathToDemoSource: "demo_components_templates_EditViewSwitchedDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "Edit View - Collapsible",
                        demo: require("../components/templates/EditViewCollapsibleDemo"),
                        pathToDoc: "components/templates/EditViewCollapsible.jsx",
                        pathToSource: "templates_edit-view-collapsible_EditViewCollapsible.jsx.html",
                        pathToDemoSource: "demo_components_templates_EditViewCollapsibleDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "Edit View - Modal",
                        demo: require("../components/templates/EditViewModalDemo"),
                        pathToDoc: "components/templates/EditViewModal.jsx",
                        pathToSource: "templates_edit-view-modal_EditViewModal.jsx.html",
                        pathToDemoSource: "demo_components_templates_EditViewModalDemo.jsx.html",
                        fullscreen: true
                    }
                ]
            },
            {
                label: "List View",
                icon: "directory-hollow",
                children: [
                    {
                        label: "List View - Infinite Scroll",
                        demo: require("../components/templates/ListViewDemo"),
                        pathToDoc: "components/templates/ListView.jsx",
                        pathToSource: "templates_list-view_ListView.jsx.html",
                        pathToDemoSource: "demo_components_templates_ListViewDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "List View - Paginated",
                        demo: require("../components/templates/ListViewPaginatedDemo"),
                        pathToDoc: "components/templates/ListViewPaginated.jsx",
                        pathToSource: "templates_list-view-paginated_ListViewPaginated.jsx.html",
                        pathToDemoSource: "demo_components_templates_ListViewPaginatedDemo.jsx.html",
                        fullscreen: true
                    },
                    {
                        label: "List View - Ordering",
                        demo: require("../components/templates/ListViewOrderingDemo"),
                        pathToDoc: "components/templates/ListViewOrdering.jsx",
                        pathToSource: "templates_list-view-paginated_ListViewOrdering.jsx.html",
                        pathToDemoSource: "demo_components_templates_ListViewOrderingDemo.jsx.html",
                        fullscreen: true
                    }
                ]
            },
            {
                label: "Authentication Policy",
                demo: require("../components/templates/AuthnPolicyDemo"),
                pathToDoc: "components/templates/AuthnPolicy.jsx",
                pathToSource: "templates_authn-policy_AuthnPolicy.jsx.html",
                pathToDemoSource: "demo_components_templates_AuthnPolicyDemo.jsx.html",
                fullscreen: true,
                icon: "details"
            },
            {
                label: "Wizard View",
                demo: require("../components/templates/WizardViewDemo"),
                pathToDoc: "components/templates/WizardView.jsx",
                pathToSource: "templates_wizard-view_WizardView.jsx.html",
                pathToDemoSource: "demo_components_templates_WizardViewDemo.jsx.html",
                fullscreen: true,
                icon: "details"
            },
            {
                label: "User MFA",
                demo: require("../components/templates/UserMFADemo"),
                pathToDoc: "components/templates/UserMFA.jsx",
                pathToSource: "templates_user-mfa_UserMFA.jsx.html",
                pathToDemoSource: "demo_components_templates_UserMFADemo.jsx.html",
                fullscreen: true,
                icon: "details"
            },
            {
                label: "Platform Provided",
                demo: require("../components/templates/PlatformProvidedDemo"),
                pathToDoc: "components/templates/PlatformProvided.jsx",
                pathToSource: "templates_user-mfa_PlatformProvided.jsx.html",
                pathToDemoSource: "demo_components_templates_PlatformProvidedDemo.jsx.html",
                fullscreen: true,
                icon: "details"
            },
            {
                label: "User Edit",
                demo: require("../components/templates/UserEditDemo"),
                pathToDoc: "components/templates/UserEdit.jsx",
                pathToSource: "templates_user-mfa_UserEdit.jsx.html",
                pathToDemoSource: "demo_components_templates_UserEditDemo.jsx.html",
                fullscreen: true,
                icon: "details"
            },
            {
                label: "Query Builder",
                demo: require("../components/templates/QueryBuilderDemo"),
                pathToDoc: "components/templates/QueryBuilder.jsx",
                pathToSource: "templates_edit-view-modal_QueryBuilder.jsx.html",
                pathToDemoSource: "demo_components_templates_QueryBuilderDemo.jsx.html",
                fullscreen: true,
                icon: "details"
            }
        ]
    }
];
