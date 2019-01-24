import React from "react";
import { connect } from "react-redux";
import EditSection from "ui-library/lib/components/layout/EditSection";
import CheckboxGroup from "ui-library/lib/components/forms/CheckboxGroup";
import FormTextField from "ui-library/lib/components/forms//form-text-field";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import Messages from "ui-library/lib/components/general/messages/";
import PageSection from "ui-library/lib/components/layout/PageSection";
import PolicyNode from "ui-library/lib/components/layout/PolicyNode";
import EditablePolicyNode from "ui-library/lib/components/layout/EditablePolicyNode";
import PolicySettingsList from "ui-library/lib/components/layout/PolicySettingsList";
import PageHeader from "../../components/general/PageHeader";
import _ from "underscore";
import Actions from "./Actions";

const conditionTypes = {
    "last-sign-on": {
        getString: data => `Last sign-on older than${data.range ? " "+data.range : "..."}`,
        fields: [
            {
                id: "range",
                options: [
                    "1 hour",
                    "8 hours",
                    "24 hours"
                ]
            }
        ]
    },
    "last-authn": {
        getString: data => `Last authentication older than${data.range ? " "+data.range : "..."}`,
        fields: [
            {
                id: "range",
                options: [
                    "1 hour",
                    "8 hours",
                    "24 hours",
                    "30 days"
                ]
            }
        ]
    },
    "ip-address": {
        getString: data => `Accessing from IP out of range${data.range ? " "+data.range : "..."}`,
        fields: [
            {
                id: "range"
            }
        ]
    },
    always: {
        getString: () => "Always"
    }
};

const signOnConditionOptions = [
    "last-sign-on",
];

const MFAConditionOptions = [
    "last-authn",
    "ip-address",
];

const settingsOptions = [
    "SMS OTP",
    "Email OTP"
];

const ConditionField = ({ field, onFormChange }) => {
    const handleValueChange = value => {
        onFormChange([field.id], value);
    };

    if (field.options) {
        const options = _.map(field.options, option => ({
            value: option,
            label: option
        }));
        const selected = _.find(options, option => option.value === field.value) || options[0];

        const handleOptionChange = option => handleValueChange(option.value);

        return (
            <FormDropDownList
                key={field.id}
                options={options}
                selectedOption={selected}
                onValueChange={handleOptionChange}
            />
        );
    }
    return <FormTextField key={field.id} value={field.value} onValueChange={handleValueChange} />;
};

const ConditionDescription = ({ id, conditions, onFormChange }) => {
    const condition = _.find(conditions, each => (each.type === id)) || { type: id };

    const handleFormChange = (path, value) => {
        onFormChange([id].concat(path), value);
    };

    return (
        <div>
            {_.map(
                conditionTypes[id].fields,
                field => (
                    <ConditionField
                        key={field.id}
                        field={Object.assign({ value: condition[field.id] }, field)}
                        onFormChange={handleFormChange}
                    />
                )
            )}
        </div>
    );
};

const getConditionOptions = (ids, conditions, onFormChange) => (
    ids.map(id => ({
        value: id,
        label: conditionTypes[id].getString({}),
        conditionalContent: <ConditionDescription id={id} conditions={conditions} onFormChange={onFormChange} />
    }))
);

const SettingsList = ({ settings }) => (
    <PolicySettingsList label="Settings" iconName="cog-filled" settings={settings} groupingMode="Any" />
);

const ConditionsList = ({ conditions }) => {
    const settings = _.map(conditions.list, condition => conditionTypes[condition.type].getString(condition));

    return (
        <PolicySettingsList
            label="Conditions"
            character="?"
            settings={settings}
            fallbackText="Always"
            groupingMode="Any"
        />
    );
};

const SettingsForm = ({ settings, onFormChange }) => (
    <PolicyNode label="Settings" iconName="cog-filled">
        <CheckboxGroup
            options={_.map(settingsOptions, option => ({ value: option, label: option }))}
            values={settings}
            onValueChange={onFormChange}
        />
    </PolicyNode>
);

const ConditionsForm = ({ conditions, onFormChange, conditionOptions }) => {
    const handleFormChange = (path, value) => {
        const conditionIndex = _.findIndex(conditions.list, condition => condition.type === path[0]);

        onFormChange(["conditions", "list", conditionIndex].concat(path.slice(1)), value);
    };

    const onChangeConditions = values => {
        onFormChange(
            ["conditions", "list"],
            _.map(
                values,
                value => (
                    _.find(conditions.list, condition => condition.type === value) ||
                    { type: value }
                )
            )
        );
    };

    return (
        <PolicyNode label="Conditions" character="?">
            <CheckboxGroup
                options={getConditionOptions(conditionOptions, conditions.list, handleFormChange)}
                values={_.pluck(conditions.list, "type")}
                onValueChange={onChangeConditions}
            />
        </PolicyNode>
    );
};

const StepViewEdit = connect(
    state => ({
        settings: state.authn.draftStep.settings,
        conditions: state.authn.draftStep.conditions,
        dirty: state.authn.draftStep.dirty ? true : false
    }),
    (dispatch, { policyId, id }) => ({
        onFormChange: (path, value) => {
            dispatch(Actions.changeValue(path, value));
        },
        onSave: () => dispatch(Actions.saveStep(policyId, id))
    })
)(
    ({ id, settings, conditions, onCancel, onSave, onFormChange, dirty }) => {
        const handleSettingsFormChange = values => onFormChange(["settings"], values);

        return (
            <EditSection onCancel={onCancel} onSave={onSave} saveDisabled={!dirty}>
                <Layout.Row>
                    <Layout.Column>{id === "mfa"
                        ? <SettingsForm
                            settings={settings}
                            onFormChange={handleSettingsFormChange}
                        />
                        : <SettingsList settings={settings} />
                    }</Layout.Column>
                    <Layout.Column>
                        <ConditionsForm
                            conditions={conditions}
                            onFormChange={onFormChange}
                            conditionOptions={id === "mfa" ? MFAConditionOptions : signOnConditionOptions}
                        />
                    </Layout.Column>
                </Layout.Row>
            </EditSection>
        );
    }
);

const StepViewView = ({ settings, conditions }) => (
    <Layout.Row>
        <Layout.Column><SettingsList settings={settings} /></Layout.Column>
        <Layout.Column><ConditionsList conditions={conditions} /></Layout.Column>
    </Layout.Row>
);

const PolicyView = ({ id, name, steps, editing, onEdit, onCancel }) => (
    <PageSection title={name}>
        {_.map(steps, (step, index) => {
            const handleEdit = () => onEdit(step.id);

            return (
                <EditablePolicyNode
                    {...step}
                    label={step.name}
                    editing={editing === step.id}
                    key={step.id}
                    number={index + 1}
                    onEdit={handleEdit}
                    onCancel={onCancel}
                    policyId={id}
                >
                    <StepViewView settings={step.settings} conditions={step.conditions} />
                    <StepViewEdit id={step.id} onCancel={onCancel} />
                </EditablePolicyNode>
            );
        })}
        <PolicyNode label="Done" parent iconName="check"/>
    </PageSection>
);

const PolicyList = connect(
    state => ({
        policies: state.authn.policies,
        editingPolicyId: state.authn.draftStep.policyId,
        editingStepId: state.authn.draftStep.id
    }),
    dispatch => ({
        onEdit: (policyId, stepId) => dispatch(Actions.editStep(policyId, stepId)),
        onCancel: () => dispatch(Actions.cancelEditStep())
    })
)(
    ({ policies, editingPolicyId, editingStepId, onEdit, onCancel }) => (
        _.map(policies, policy => {
            const editing = policy.id === editingPolicyId ? editingStepId : null;

            const handleEdit = stepId => onEdit(policy.id, stepId);

            return (
                <PolicyView
                    id={policy.id}
                    key={policy.id}
                    name={policy.name}
                    steps={policy.steps}
                    editing={editing}
                    onEdit={handleEdit}
                    onCancel={onCancel}
                />
            );
        })
    )
);

const ConnectedMessages = connect(
    state => ({
        messages: state.messages.messages
    }),
    dispatch => ({
        onRemoveMessage: index => dispatch(Messages.Actions.removeAt(index))
    })
)(Messages);


/**
 * @class AuthnPolicy
 * @desc This is a template to demonstrate how to build an Authentication Policy page
 */
module.exports = class extends React.Component {

    render() {
        return (
            <div>
                <ConnectedMessages containerType="page-messages--sidebar-fix" />
                <PageHeader title="Policies" />

                <PolicyList/>
            </div>
        );
    }
};
