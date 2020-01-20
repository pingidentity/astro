import React, { useState, useReducer, useCallback } from "react";
import PageHeader from "ui-library/lib/components/general/PageHeader";
import Button, { buttonTypes } from "ui-library/lib/components/buttons/Button";
import ExpandableRow from "ui-library/lib/components/rows/expandable-row/ExpandableRow";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import Text, { textTypes } from "ui-library/lib/components/general/Text";
import Link, { linkTypes } from "ui-library/lib/components/general/Link";
import Icon, { iconSizes, iconColors } from "ui-library/lib/components/general/Icon";
import FlexRow, { alignments, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
import InlineMessage, { messageTypes } from "ui-library/lib/components/general/InlineMessage";
import FormTextField, { inputWidths } from "ui-library/lib/components/forms/form-text-field";
import FormDropDownList, { optionFromValue } from "ui-library/lib/components/forms/FormDropDownList";
import PageSection from "ui-library/lib/components/layout/PageSection";
import InputRow from "ui-library/lib/components/layout/InputRow";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import FileDrop from "ui-library/lib/components/forms/FileDrop";
import PageWizard, { Step } from "ui-library/lib/components/panels/PageWizard/PageWizard";
import { partial } from "underscore";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";
import editForm, { change, isDirty, discard, getRecord, save } from "./util/reducers/editForm";
import recordList, { updateRecord, deleteRecord } from "./util/reducers/recordList";
import wizard, { emptyWizard, wizardMove, wizardNext } from "./util/reducers/wizard";
import { updateMessage, deleteMessage, addMessage } from "./util/content/recordMessages";
import FormLabel from "ui-library/lib/components/forms/FormLabel";
import Table from "ui-library/lib/components/tables/Table";
import CollapsibleLink from "ui-library/lib/components/general/CollapsibleLink";
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
import Stack from "ui-library/lib/components/layout/Stack";
import { v4 as uuid } from "uuid";
import Messages, { Actions as messageActions, Reducer as messageReducer }
    from "ui-library/lib/components/general/messages/Messages";

const FormDropDownListPassValue = ({ value: selectedValue, onValueChange, ...props }) => (
    <FormDropDownList
        selectedOption={optionFromValue(props.options, selectedValue)}
        onValueChange={({ value }) => onValueChange(value)}
        {...props}
    />
);

const initialSubscriptions = [
    {
        id: uuid(),
        name: "Marketing Splunk",
        destination: "https://going.to.splunk",
        destinationFormat: "splunk",
        eventTypes: [
            "Application Created",
        ],
        userName: "splunk_admin",
    },
    {
        id: uuid(),
        name: "Sales DB",
        destination: "https://sql.sales.endpoint",
        destinationFormat: "generic",
        eventTypes: [
            "User Events",
            "License Events",
        ],
        userName: "sssales",
    },
    {
        id: uuid(),
        name: "Splunk",
        destination: "https://samples.destination/the.endpoint",
        destinationFormat: "splunk",
        eventTypes: [
            "Application Modified",
        ],
        applications: ["My main application"],
        populations: [
            "Canadian Employees",
            "Japanese Employees",
            "US Employees",
            "Xtra Employees",
        ],
        username: "admin",
        customHeaders: [
            "Expires: Wed, 21 Oct 2020 07:28:00 GMT",
            "Age: 24",
        ],
    },
    {
        id: uuid(),
        name: "Tableau",
        destination: "https://tab.bleau",
        destinationFormat: "generic",
        eventTypes: [
            "User Events",
            "Application Events",
        ],
    },
    {
        id: uuid(),
        name: "Test Subscription",
        destination: "https://test.test",
        destinationFormat: "generic",
        invalidCert: true,
        eventTypes: [
            "Account Events",
            "Application Events",
            "Branding Events",
        ],
    },
    {
        id: uuid(),
        name: "Problem Subscription",
        destination: "https://problem",
        destinationFormat: "generic",
        destinationError: "Here is the error message from the destination.",
        eventTypes: [
            "Account Events",
            "Application Events",
            "Branding Events",
        ],
    },
];

const formatOptions = [
    {
        value: "generic",
        label: "Generic Subscription",
    },
    {
        value: "splunk",
        label: "Splunk",
    }
];

const SubscriptionsList = ({ onAdd, onDelete, onEdit, subscriptions, onToggle }) => (
    <>
        <PageHeader
            title="Subscriptions"
            accessories={[
                <Button
                    key="add"
                    iconName="plus"
                    label="Add Subscription"
                    onClick={onAdd}
                />
            ]}
        />
        {subscriptions.map(({
            id,
            name, destination, destinationFormat, eventTypes, disabled,
            applications, populations, username, customHeaders, invalidCert, destinationError
        }) => (
            <ExpandableRow
                confirmDelete
                title={name}
                key={name}
                onEditButtonClick={partial(onEdit, id)}
                onDeleteConfirmClick={partial(onDelete, { id, name })}
                rowAccessories={
                    invalidCert
                        ? [
                            <FlexRow alignment={alignments.CENTER} spacing={spacingOptions.SM} key="cert-warning">
                                <Text variant={Text.textVariants.ERROR} inline>No Valid Certificate</Text>
                                <Icon iconName="alert" iconSize={iconSizes.MD} color={iconColors.ERROR} />
                            </FlexRow>,
                        ]
                        : [
                            destinationError ? (
                                <FlexRow alignment={alignments.CENTER} spacing={spacingOptions.SM} key="cert-warning">
                                    <Text variant={Text.textVariants.ERROR} inline>Destination Error</Text>
                                    <Icon iconName="alert" iconSize={iconSizes.MD} color={iconColors.ERROR} />
                                </FlexRow>
                            ) : null,
                            <Toggle
                                key={`toggle-${name}`}
                                toggled={!disabled}
                                onToggle={partial(onToggle, { id, name, disabled })}
                            />
                        ]
                }
                confirmDeleteContent={
                    ({ onCancel, onConfirm }) => (<div>
                        <Text type={textTypes.BODY}>
                            Are you sure you want to delete this subscription?
                        </Text>
                        <ButtonGroup onCancel={onCancel}>
                            <Button onClick={onConfirm}>Delete</Button>
                        </ButtonGroup>
                    </div>)
                }
            >
                {invalidCert &&
                    <InlineMessage type={messageTypes.ERROR}>
                        To enable this subscription, please provide a valid certificate.
                    </InlineMessage>
                }
                {destinationError &&
                    <InlineMessage type={messageTypes.ERROR}>
                       Error received from the destination: {destinationError}
                    </InlineMessage>
                }
                <LabelValuePairs
                    key={name}
                    dataPairs={[
                        {
                            label: "Destination",
                            value: destination,
                        },
                        {
                            label: "Destination Format",
                            value: formatOptions.find(({ value }) => (value === destinationFormat)).label,
                        },
                        {
                            label: "Event Types",
                            value: eventTypes && eventTypes.map(type => <div key={type}>{type}</div>),
                        },
                        {
                            label: "Applications",
                            value: applications && applications.map(
                                application => <div key={application}>{application}</div>
                            ),
                        },
                        {
                            label: "Populations",
                            value: populations && populations.map(
                                population => <div key={population}>{population}</div>
                            ),
                        },
                        {
                            label: "Basic Auth Username",
                            value: username,
                        },
                        {
                            label: "Custom HTTP Headers",
                            value: customHeaders && customHeaders.map(
                                header => <div key={header}>{header}</div>
                            ),
                        },
                    ]}
                    pruneEmpty
                />
            </ExpandableRow>
        ))}
    </>
);

const eventTypeNames = [
    "Account Linked",
    "Account Unlinked",
    "Application Created",
    "Application Deleted",
    "Application Updated",
    "Branding Updated",
    "Certificate Created",
    "Certificate Read",
    "Certificate Updated",
    "Device Activated",
    "Device Authentication",
    "Device Created",
    "Device Deleted",
    "Device Updated",
    "Environment Created",
    "Environment Deleted",
    "Environment Updated",
    "Flow Completed",
    "Flow Started",
    "Flow Updated",
    "Grant Created",
    "Grant Deleted",
    "Grant Updated",
    "Identity Provider Created",
    "Identity Provider Deleted",
    "Identity Provider Updated",
    "Idp Attribute Created",
    "Idp Attribute Deleted",
    "Idp Attribute Updated",
    "Image Activated",
    "Image Created",
    "Image Deleted",
    "Key Created",
    "Key Read",
    "Key Updated",
    "Notification Created",
    "Notification Updated",
    "Otp Check Failed",
    "Otp Check Invalid",
    "Otp Check Success",
    "Password Check Failed",
    "Password Check Succeeded",
    "Password Policy Updated",
    "Password Reset",
    "Password Set",
    "Password Unlocked",
    "Population Created",
    "Population Deleted",
    "Population Updated",
    "Provisioning Identity Store Created",
    "Provisioning Identity Store Deleted",
    "Provisioning Identity Store Updated",
    "Provisioning Mapping Created",
    "Provisioning Mapping Deleted",
    "Provisioning Mapping Updated",
    "Provisioning Rule Created",
    "Provisioning Rule Deleted",
    "Provisioning Rule Updated",
    "Resource Attribute Created",
    "Resource Attribute Deleted",
    "Resource Attribute Updated",
    "Resource Created",
    "Resource Deleted",
    "Resource Updated",
    "Role Assignment Created",
    "Role Assignment Deleted",
    "SAML Attribute Created",
    "SAML Attribute Deleted",
    "SAML Attribute Updated",
    "Schema Attribute Created",
    "Schema Attribute Deleted",
    "Schema Attribute Updated",
    "Scope Created",
    "Scope Deleted",
    "Scope Updated",
    "Secret Read",
    "Secret Updated",
    "Subscription Created",
    "Subscription Deleted",
    "Subscription Updated",
    "User Created",
    "User Deleted",
    "User Moved",
    "User Updated",
];

const populations = [
    "Canadian Employees",
    "Japanese Employees",
    "US Employees",
    "Xtra Employees",
];

const applications = [
    "My main application",
];

const eventTypes = eventTypeNames.reduce((types, name) => {
    const allTypeName = `${name.split(/\s/).slice(0, -1).join(" ")} Events`;
    const allType = { id: allTypeName, name: allTypeName };
    const type = { id: name, name };

    return types.length && types[types.length - 1].id !== allType.id
        ? [...types, type] : [...types, allType, type];
}, []);

const HeaderLine = ({ value: combinedValue, onValueChange, index, onDelete }) => {
    const key = combinedValue.replace(/\:.*$/, "");
    const value = combinedValue.replace(/^[^\:]*\:\s*/, "");

    return (
        <InputRow>
            <FormTextField
                label={index === 0 ? "Custom HTTP Headers" : null}
                placeholder="Key"
                width={inputWidths.SM}
                value={key}
                onValueChange={newValue => onValueChange(`${newValue}: ${value}`)}
            />
            <FormTextField
                label={index === 0 ? "" : null}
                placeholder="Value"
                width={inputWidths.SM}
                value={value}
                onValueChange={newValue => onValueChange(`${key}: ${newValue}`)}
            />
            {index > 0 &&
                <Button
                    onClick={onDelete}
                    type={buttonTypes.ICON}
                    iconName="delete"
                    noSpacing
                />
            }
        </InputRow>
    );
};

const mockCerts = [
    [
        "Default",
        "2019-04-12 16:26:14"
    ],
    [
        "New Certificate",
        "2019-04-12 16:26:14"
    ],
];

const DestinationFields = ({ form, invalidCert, formFieldProps, listFieldProps, addHeader }) => {
    // mock cert data
    const [certificates, setCertificates] = useState(invalidCert ? [] : mockCerts);

    // state for whether the headers section is expanded
    const [showHeaders, setShowHeaders] = useState(
        !!(form.userName || form.password || (form.customHeaders && form.customHeaders.length))
    );

    return (
        <>
            <PageSection>
                <Stack>
                    <FormTextField
                        label="Name"
                        required
                        {...formFieldProps("name")}
                    />
                </Stack>
            </PageSection>
            <PageSection title="Destination">
                <Stack gap="LG">
                    <InputRow>
                        <FormTextField
                            label="Destination"
                            required
                            width={inputWidths.LG}
                            {...formFieldProps("destination")}
                        />
                        <FormDropDownListPassValue
                            label="Format"
                            required
                            options={formatOptions}
                            {...formFieldProps("destinationFormat")}
                        />
                    </InputRow>
                    <Stack wrappers>
                        <div>
                            <FormLabel detached>Certificates</FormLabel>
                            <Text>PingOne certificates and all certificates signed by default CAs are trusted.</Text>
                        </div>
                        {
                            certificates.length ? (
                                <Table
                                    headData={[
                                        "Trusted PingOne Certificates",
                                        "Expiration Date",
                                    ]}
                                    bodyData={certificates}
                                />
                            ) : (
                                <InlineMessage type={messageTypes.ERROR}>
                                    To enable this subscription, please provide a valid certificate.
                                </InlineMessage>
                            )
                        }
                        <FileDrop
                            replaceContent
                            renderContent={
                                ({ getInputRef }) => (
                                    <Button
                                        iconName="plus"
                                        onClick={() => getInputRef().click()}
                                        type={buttonTypes.LINK}
                                    >Upload New Certificate</Button>
                                )
                            }
                            onValueChange={({ name }) => setCertificates([
                                ...certificates,
                                [name, "2024-12-31 13:57:01"]
                            ])}
                        />
                    </Stack>
                    <div>
                        <CollapsibleLink
                            title={showHeaders ? "Hide Headers" : "Add Headers"}
                            expanded={showHeaders}
                            onToggle={() => setShowHeaders(!showHeaders)}
                        />
                        {showHeaders &&
                            <>
                                <InputRow>
                                    <FormTextField
                                        label="Basic Authentication"
                                        placeholder="Username"
                                        width={inputWidths.SM}
                                        {...formFieldProps("userName")}
                                    />
                                    <FormTextField
                                        label=""
                                        placeholder="Password"
                                        maskValue
                                        showReveal
                                        width={inputWidths.SM}
                                        {...formFieldProps("password")}
                                    />
                                </InputRow>
                                <InputRow>
                                    <Stack gap="SM">
                                        {form.customHeaders && form.customHeaders.map((header, index) => (
                                            <HeaderLine
                                                key={index}
                                                index={index}
                                                {...listFieldProps("customHeaders", index)}
                                            />
                                        ))}
                                        <div>
                                            <Button
                                                type={buttonTypes.LINK}
                                                iconName="plus"
                                                onClick={addHeader}
                                            >Add Custom HTTP Header</Button>
                                        </div>
                                    </Stack>
                                </InputRow>
                            </>
                        }
                    </div>
                </Stack>
            </PageSection>
        </>
    );
};

const FilterFields = ({ filterFieldProps }) => {
    return (
        <PageSection title="Filters">
            <Text type={textTypes.NOTE}>
                These are not the final components.
                Those will be added as a follow-up task in a future sprint.
            </Text>
            <InputRow>
                <FilterSelector
                    label="Event Types"
                    options={eventTypes}
                    {...filterFieldProps("eventTypes")}
                />
            </InputRow>
            <InputRow>
                <FilterSelector
                    label="Applications"
                    options={applications.map(
                        name => ({ option: name, value: name, name, id: name })
                    )}
                    {...filterFieldProps("applications")}
                />
            </InputRow>
            <InputRow>
                <FilterSelector
                    label="Populations"
                    options={populations.map(
                        name => ({ option: name, value: name, name, id: name })
                    )}
                    {...filterFieldProps("populations")}
                />
            </InputRow>
        </PageSection>
    );
};

const EditSubscription = ({ editing, onBack, subscriptions, onSave }) => {
    // get the data for this record
    const record = subscriptions.find(({ id }) => (id === editing));

    // set up data store for form
    const [form, dispatch] = useReducer(editForm, { customHeaders: [ "" ], ...record });

    // create general change handler
    const onValueChange = (key, value) => dispatch(change(key, value));
    // and one particularly for lists
    const onListValueChange = (key, index, value) => dispatch(
        change(key, [...form[key].slice(0, index), value, ...form[key].slice(index + 1)])
    );

    // convenience functions for providing form data and change handlers
    const formFieldProps = field => ({ value: form[field], onValueChange: partial(onValueChange, field) });
    const filterFieldProps = field => ({ selected: form[field], onValueChange: partial(onValueChange, field) });
    const listFieldProps = (field, index) => ({
        value: form[field][index],
        onValueChange: partial(onListValueChange, field, index),
        onDelete: () => onValueChange(field, [...form[field].slice(0, index), ...form[field].slice(index + 1)]),
    });

    // function that adds blank custom header
    const addHeader = () => {
        const { customHeaders = [] } = form;
        dispatch(change("customHeaders", [...customHeaders, ""]));
    };

    return (
        <>
            <div>
                <Link type={linkTypes.PAGE_RETURN} onClick={onBack}>To Subscription List</Link>
            </div>
            <PageHeader title={record.name} />
            <DestinationFields
                form={form}
                formFieldProps={formFieldProps}
                listFieldProps={listFieldProps}
                addHeader={addHeader}
                invalidCert={record.invalidCert}
            />
            <FilterFields filterFieldProps={filterFieldProps} />
            <ButtonBar
                saveDisabled={!(form.name && form.destination && form.destinationFormat)}
                visible={isDirty(form)}
                onDiscard={() => dispatch(discard)}
                onSave={() => {
                    dispatch(save);
                    onSave(getRecord(form));
                }}
            />
        </>
    );
};

const AddSubscription = ({ onClose, onSave }) => {
    // data store for wizard
    const [store, dispatch] = useReducer(wizard, emptyWizard);
    const { form } = store;

    // create general change handler
    const onValueChange = (key, value) => dispatch(change(key, value));
    // and one particularly for lists
    const onListValueChange = (key, index, value) => dispatch(
        change(key, [...form[key].slice(0, index), value, ...form[key].slice(index + 1)])
    );

    // convenience functions for providing form data and change handlers
    const formFieldProps = field => ({ value: form[field], onValueChange: partial(onValueChange, field) });
    const filterFieldProps = field => ({ selected: form[field], onValueChange: partial(onValueChange, field) });
    const listFieldProps = (field, index) => ({
        value: form[field][index],
        onValueChange: partial(onListValueChange, field, index),
        onDelete: () => onValueChange(field, [...form[field].slice(0, index), ...form[field].slice(index + 1)]),
    });

    // function that adds blank custom header
    const addHeader = () => {
        const { customHeaders = [] } = form;
        dispatch(change("customHeaders", [...customHeaders, ""]));
    };

    return (
        <>
            <PageWizard
                onCancel={onClose}
                wizardTitle="Add Subscription"
                activeStep={store.active}
                onNext={() => dispatch(wizardNext)}
                onMenuClick={step => dispatch(wizardMove(step))}
            >
                <Step
                    title="Connect to Destination"
                    description="Provide the name and destination information for this subscription."
                    continueDisabled={!(form.name && form.destination && form.destinationFormat)}
                    required
                >
                    <DestinationFields
                        form={form}
                        formFieldProps={formFieldProps}
                        listFieldProps={listFieldProps}
                        addHeader={addHeader}
                    />
                </Step>
                <Step
                    title="Filter Events"
                    description="Define which events you want to include in this subscription."
                    onSave={() => {
                        onSave({ ...store.data, id: uuid() });
                        onClose();
                    }}
                    required
                >
                    <FilterFields filterFieldProps={filterFieldProps} />
                </Step>
            </PageWizard>
        </>
    );
};

const Subscriptions = () => {
    // setup data store for list of subscriptions
    const [store, dispatch] = useReducer(recordList, initialSubscriptions);

    // set up data store for messages
    const [messages, dispatchMessage] = useReducer(messageReducer, {});

    // simple routing for edit pages
    const [editing, setEditing] = useState("");

    // simple routing for add wizard
    const [adding, setAdding] = useState(false);

    const onDelete = useCallback(record => {
        dispatch(deleteRecord(record.id));
        messageActions.addMessage({
            message: deleteMessage(record.name),
            status: "success"
        })(dispatchMessage);
    }, [dispatch, dispatchMessage]);

    const onAdd = useCallback(partial(setAdding, true), [setAdding]);
    const onClose = useCallback(partial(setAdding, false), [setAdding]);
    const onSave = useCallback(record => {
        const message = store.findIndex(({ id }) => id === record.id) >= 0
            ? updateMessage(record.name) : addMessage(record.name);
        dispatch(updateRecord(record));
        messageActions.addMessage({
            message,
            status: "success"
        })(dispatchMessage);
    }, [dispatch, dispatchMessage]);
    const onToggle = useCallback(record => {
        dispatch(updateRecord({ ...record, disabled: !record.disabled }));
        messageActions.addMessage({
            message: `${record.name} has successfully been ${record.disabled ? "enabled" : "disabled"}.`,
            status: "success"
        })(dispatchMessage);
    }, [dispatch, dispatchMessage]);

    return (
        <>
            <Messages {...messages} />
            {editing
                ? <EditSubscription
                    onBack={partial(setEditing, "")}
                    editing={editing}
                    subscriptions={store}
                    onSave={onSave}
                />
                : <SubscriptionsList
                    onAdd={onAdd}
                    onDelete={onDelete}
                    onEdit={setEditing}
                    onToggle={onToggle}
                    subscriptions={store}
                />
            }
            {adding && <AddSubscription onClose={onClose} onSave={onSave} />}
        </>
    );
};

export default Subscriptions;