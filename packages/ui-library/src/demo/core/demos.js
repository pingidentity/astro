module.exports = [
    {
        label: "Templates",
        children: [
            {
                label: "Wizard View",
                demo: require("../components/templates/WizardViewDemo.jsx"),
                pathToDoc: "components/templates/Wizard.jsx",
                pathToSource: "components_wizard_Wizard.jsx.html",
                fullscreen: true
            },
            {
                label: "List View - Infinite Scroll",
                demo: require("../components/templates/ListViewDemo.jsx"),
                pathToDoc: "components/templates/ListView.jsx",
                pathToSource: "templates_list-view_ListView.jsx.html",
                fullscreen: true
            },
            {
                label: "List View - Paginated",
                demo: require("../components/templates/ListViewPaginatedDemo.jsx"),
                pathToDoc: "components/templates/ListViewPaginated.jsx",
                pathToSource: "templates_list-view-paginated_ListViewPaginated.jsx.html",
                fullscreen: true
            },
            {
                label: "Edit View - Simple",
                demo: require("../components/templates/EditViewSimpleDemo.jsx"),
                pathToDoc: "components/templates/EditViewSimple.jsx",
                pathToSource: "templates_edit-view-simple_EditViewSimple.jsx.html",
                fullscreen: true
            },
            {
                label: "Edit View - Sectioned",
                demo: require("../components/templates/EditViewSectionedDemo.jsx"),
                pathToDoc: "components/templates/EditViewSectioned.jsx",
                pathToSource: "templates_edit-view-sectioned_EditViewSectioned.jsx.html",
                fullscreen: true
            },
            {
                label: "Edit View - Switched",
                demo: require("../components/templates/EditViewSwitchedDemo.jsx"),
                pathToDoc: "components/templates/EditViewSwitched.jsx",
                pathToSource: "templates_edit-view-switched_EditViewSwitched.jsx.html",
                fullscreen: true
            },
            {
                label: "Edit View - Collapsible",
                demo: require("../components/templates/EditViewCollapsibleDemo.jsx"),
                pathToDoc: "components/templates/EditViewCollapsible.jsx",
                pathToSource: "templates_edit-view-collapsible_EditViewCollapsible.jsx.html",
                fullscreen: true
            },
            {
                label: "Edit View - Modal",
                demo: require("../components/templates/EditViewModalDemo.jsx"),
                pathToDoc: "components/templates/EditViewModal.jsx",
                pathToSource: "templates_edit-view-modal_EditViewModal.jsx.html",
                fullscreen: true
            }
        ]
    },
    {
        label: "Forms",
        children: [
            {
                label: "Toggle",
                demo: require("../components/forms/ToggleDemo.jsx"),
                pathToDoc: "components/forms/Toggle.jsx",
                pathToSource: "components_forms_Toggle.jsx.html"
            },
            {
                label: "Help Hint",
                demo: require("../components/tooltips/HelpHintDemo.jsx"),
                pathToDoc: "components/tooltips/HelpHint.jsx",
                pathToSource: "components_tooltips_HelpHint.jsx.html"
            },
            {
                label: "Checkbox",
                demo: require("../components/forms/FormCheckboxDemo.jsx"),
                pathToDoc: "components/forms/FormCheckbox.jsx",
                pathToSource: "components_forms_FormCheckbox.jsx.html"
            },
            {
                label: "Checkbox List (stateless)",
                demo: require("../components/forms/FormCheckboxListDemo.jsx"),
                pathToDoc: "components/forms/FormCheckboxList.jsx",
                pathToSource: "components_forms_FormCheckboxList.jsx.html"
            },
            {
                label: "Radio Group",
                demo: require("../components/forms/FormRadioGroupDemo.jsx"),
                pathToDoc: "components/forms/FormRadioGroup.jsx",
                pathToSource: "components_forms_FormRadioGroup.jsx.html"
            },
            {
                label: "Text Field",
                demo: require("../components/forms/FormTextFieldDemo.jsx"),
                pathToDoc: "components/forms/FormTextField.jsx",
                pathToSource: "components_forms_form-text-field_v2.jsx.html"
            },
            {
                label: "Integer Field",
                demo: require("../components/forms/FormIntegerFieldDemo.jsx"),
                pathToDoc: "components/forms/FormIntegerField.jsx",
                pathToSource: "components_forms_FormIntegerField.jsx.html"
            },
            {
                label: "Text Area",
                demo: require("../components/forms/FormTextAreaDemo.jsx"),
                pathToDoc: "components/forms/FormTextArea.jsx",
                pathToSource: "components_forms_FormTextArea.jsx.html"
            },
            {
                label: "Select Field",
                demo: require("../components/forms/FormSelectFieldDemo.jsx"),
                pathToDoc: "components/forms/FormSelectField.jsx",
                pathToSource: "components_forms_FormSelectField.jsx.html"
            },
            {
                label: "Input Widths",
                demo: require("../components/forms/FormInputWidthsDemo.jsx")
                //This is a CSS class style demo with no component source
            },
            {
                label: "Rocker Button",
                demo: require("../components/forms/RockerButtonDemo.jsx"),
                pathToDoc: "components/forms/RockerButton.jsx",
                pathToSource: "components_forms_RockerButton.jsx.html"
            },
            {
                label: "Drop Down Button (stateless)",
                demo: require("../components/forms/DropDownButtonDemo.jsx"),
                pathToDoc: "components/forms/DropDownButton.jsx",
                pathToSource: "components_forms_DropDownButton.jsx.html"
            },
            {
                label: "I18n Country Selector",
                demo: require("../components/forms/i18n/I18nCountrySelectorDemo.jsx"),
                pathToDoc: "components/forms/i18n/I18nCountrySelector.jsx",
                pathToSource: "components_forms_i18n_I18nCountrySelector.jsx.html"
            },
            {
                label: "I18n Phone Input",
                demo: require("../components/forms/i18n/I18nPhoneInputDemo.jsx"),
                pathToDoc: "components/forms/i18n/I18nPhoneInput.jsx",
                pathToSource: "components_forms_i18n_I18nPhoneInput.jsx.html"
            },
            {
                label: "File Upload",
                demo: require("../components/forms/FileUploadDemo.jsx"),
                pathToDoc: "components/forms/FileUpload.jsx",
                pathToSource: "components_forms_FileUpload.jsx.html"
            },
            {
                label: "Selection List",
                demo: require("../components/forms/SelectionListDemo.jsx"),
                pathToDoc: "components/forms/SelectionList.jsx",
                pathToSource: "components_forms_selection-list_v2.jsx.html"
            }
        ]
    },
    {
        label: "Panels",
        children: [
            {
                label: "Left Side Nav Bar",
                demo: require("../components/panels/LeftNavBarDemo.jsx"),
                pathToDoc: "components/panels/LeftNavBar.jsx",
                pathToSource: "components_panels_left-nav_LeftNavBar.jsx.html"
            },
            {
                label: "Header Bar",
                demo: require("../components/panels/HeaderBarDemo.jsx"),
                pathToDoc: "components/panels/HeaderBar.jsx",
                pathToSource: "components_panels_header-bar_HeaderBar.jsx.html"
            },
            {
                label: "Columns",
                demo: require("../components/general/ColumnLayoutDemo.jsx"),
                pathToDoc: "components/general/ColumnLayout.jsx",
                pathToSource: "components_general_ColumnLayout.jsx.html"
            },
            {
                label: "Multi Column Drag Drop",
                demo: require("../components/panels/MultiDragDemo.jsx"),
                pathToDoc: "components/panels/MultiDrag.jsx",
                pathToSource: "components_multi-drag_MultiDrag.jsx.html"
            }
        ]
    },
    {
        label: "Components",
        children: [
            {
                label: "Color Picker",
                demo: require("../components/general/ColorPickerDemo.jsx"),
                pathToDoc: "components/general/ColorPicker.jsx",
                pathToSource: "components_general_ColorPicker.jsx.html"
            },
            {
                label: "Infinite Scroller",
                demo: require("../components/list/InfiniteScrollDemo.jsx"),
                pathToDoc: "components/list/InfiniteScroll.jsx",
                pathToSource: "components_list_InfiniteScroll.jsx.html"
            },
            {
                label: "Wizard",
                demo: require("../components/wizard/WizardDemo.jsx"),
                pathToDoc: "components/wizard/Wizard.jsx",
                pathToSource: "components_wizard_Wizard.jsx.html"
            },
            {
                label: "Details Tooltip",
                demo: require("../components/tooltips/DetailsTooltipDemo.jsx"),
                pathToDoc: "components/tooltips/DetailsTooltip.jsx",
                pathToSource: "components_tooltips_DetailsTooltip.jsx.html"
            },
            {
                label: "Collapsible Section (stateless)",
                demo: require("../components/general/CollapsibleSectionDemo.jsx"),
                pathToDoc: "components/general/CollapsibleSection.jsx",
                pathToSource: "components_general_CollapsibleSection.jsx.html"
            },
            {
                label: "Collapsible Link",
                demo: require("../components/general/CollapsibleLinkDemo.jsx"),
                pathToDoc: "components/general/CollapsibleLink.jsx",
                pathToSource: "components_general_CollapsibleLink.jsx.html"
            },
            {
                label: "Section",
                demo: require("../components/general/SectionDemo.jsx"),
                pathToDoc: "components/general/Section.jsx",
                pathToSource: "components_general_Section.jsx.html"
            },
            {
                label: "Context Close Button",
                demo: require("../components/general/ContextCloseButtonDemo.jsx"),
                pathToDoc: "components/general/ContextCloseButton.jsx",
                pathToSource: "components_general_ContextCloseButton.jsx.html"
            },
            {
                label: "Ellipsis Loader",
                demo: require("../components/general/EllipsisLoaderDemo.jsx"),
                pathToDoc: "components/general/EllipsisLoader.jsx",
                pathToSource: "components_general_EllipsisLoader.jsx.html"
            },
            {
                label: "Ellipsis Loader Button",
                demo: require("../components/general/EllipsisLoaderButtonDemo.jsx"),
                pathToDoc: "components/general/EllipsisLoaderButton.jsx",
                pathToSource: "components_general_EllipsisLoaderButton.jsx.html"
            },
            {
                label: "If",
                demo: require("../components/general/IfDemo.jsx"),
                pathToDoc: "components/general/If.jsx",
                pathToSource: "components_general_If.jsx.html"
            },
            {
                label: "Modal",
                demo: require("../components/general/ModalDemo.jsx"),
                pathToDoc: "components/general/Modal.jsx",
                pathToSource: "components_general_Modal.jsx.html"
            },
            {
                label: "ModalButton",
                demo: require("../components/general/ModalButtonDemo.jsx"),
                pathToDoc: "components/general/ModalButton.jsx",
                pathToSource: "components_general_ModalButton.jsx.html"
            },
            {
                label: "Spinner",
                demo: require("../components/general/SpinnerDemo.jsx"),
                pathToDoc: "components/general/Spinner.jsx",
                pathToSource: "components_general_Spinner.jsx.html"
            },
            {
                label: "BackgroundLoader",
                demo: require("../components/general/BackgroundLoaderDemo.jsx"),
                pathToDoc: "components/general/BackgroundLoader.jsx",
                pathToSource: "components_general_BackgroundLoader.jsx.html"
            },
            {
                label: "SelectText",
                demo: require("../components/general/SelectTextDemo.jsx"),
                pathToDoc: "components/general/SelectText.jsx",
                pathToSource: "components_general_SelectText.jsx.html"
            },
            {
                label: "Expandable Row",
                demo: require("../components/rows/ExpandableRowDemo.jsx"),
                pathToDoc: "components/rows/ExpandableRow.jsx",
                pathToSource: "components_rows_expandable-row_ExpandableRow.jsx.html"
            },
            {
                label: "Messages",
                demo: require("../components/general/MessagesDemo.jsx"),
                pathToDoc: "components/general/Messages.jsx",
                pathToSource: "components_general_messages_Messages.jsx.html"
            },
            {
                label: "Inline Message",
                demo: require("../components/general/InlineMessageDemo.jsx"),
                pathToDoc: "components/general/InlineMessage.jsx",
                pathToSource: "components_general_InlineMessage.jsx.html"
            },
            {
                label: "Drag-N-Drop Row",
                demo: require("../components/rows/DragDropRowDemo.jsx"),
                pathToDoc: "components/rows/DragDropRow.jsx",
                pathToSource: "components_rows_DragDropRow.jsx.html"
            },
            {
                label: "Calendar",
                demo: require("../components/calendars/CalendarDemo.jsx"),
                pathToDoc: "components/calendars/Calendar.jsx",
                pathToSource: "components_calendars_Calendar.jsx.html"
            },
            {
                label: "Multivalues",
                demo: require("../components/forms/MultivaluesDemo.jsx"),
                pathToDoc: "components/forms/Multivalues.jsx",
                pathToSource: "components_forms_Multivalues.jsx.html"
            },
            {
                label: "Cache",
                demo: require("../net/CacheDemo.jsx"),
                pathToDoc: "net/Cache.js",
                pathToSource: "net_Cache.js.html",
                // Indicate that the jsdoc is a module and not a class to generate the correct name for the jsdoc url
                module: true
            },
            {
                label: "Tabbed Sections",
                demo: require("../components/general/TabbedSectionsDemo.jsx"),
                pathToDoc: "components/general/TabbedSections.jsx",
                pathToSource: "components_general_TabbedSections.jsx.html"
            },
            {
                label: "Tutorial",
                demo: require("../components/help/intro-tutorial/IntroTutorialDemo.jsx"),
                pathToDoc: "components/help/intro-tutorial/IntroTutorial.jsx",
                pathToSource: "components_help_intro-tutorial_IntroTutorial.jsx.html"
            },
            {
                label: "Pagination",
                demo: require("../components/list/PaginationDemo.jsx"),
                pathToDoc: "components/list/Pagination.jsx",
                pathToSource: "components_list_Pagination.jsx.html"
            },
            {
                label: "Time Picker",
                demo: require("../components/general/TimePickerDemo.jsx"),
                pathToDoc: "components/general/TimePicker.jsx",
                pathToSource: "components_general_TimePicker.jsx.html"
            },
            {
                label: "Grid",
                demo: require("../components/grid/GridDemo.jsx"),
                pathToCode: "components/grid/Grid.jsx",
                pathToSource: "components_grid_Grid.jsx.html"
            }
        ]
    },
    {
        label: "Tutorials",
        //Override alphabetical ordering in Demo.jsx to order children as they appear in the list
        listOrder: true,
        children: [
            {
                label: "UI Library 101",
                demo: require("../components/tutorials/uiLibrary101.jsx"),
                fullscreen: true
            },
            {
                label: "Components In-depth",
                demo: require("../components/tutorials/componentsInDepth.jsx"),
                fullscreen: true
            },
            {
                label: "Templates In-depth",
                demo: require("../components/tutorials/templatesInDepth.jsx"),
                fullscreen: true
            },
            {
                label: "Basic App",
                demo: require("../components/tutorials/basicApp.jsx"),
                fullscreen: true
            }
        ]
    }
];
