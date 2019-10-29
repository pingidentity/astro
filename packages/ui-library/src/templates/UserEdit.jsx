import React from "react";
import Button from "../components/buttons/Button";
import { Column, Row } from "../components/general/ColumnLayout";
import ExpandableRow from "../components/rows/ExpandableRow";
import Icon from "../components/general/Icon";
import Link from "../components/general/Link";
import RockerButton from "../components/forms/RockerButton";
import Section from "../components/general/Section";
import Toggle from "../components/forms/form-toggle";
import PageHeader from "../components/general/PageHeader";
import InputRow from "ui-library/lib/components/layout/InputRow";

/**
 * @class User Edit
 * @desc This is a template to demonstrate how to build a user edit screen.
 */
const UserEdit = () => {
    const rowAccessories = [
        <Button key="button" label="Button" inline />,
        <Toggle key="label" toggled />
    ];

    const rockerLabels = [
        "Option 1",
        "Option 2",
        "Option 3"
    ];

    return (
        <ExpandableRow.SimpleWrapper>
            <PageHeader title="User Edit" />
            <ExpandableRow
                title="Addleman, Katie"
                subtitle="kaddleman"
                rowAccessories={rowAccessories}
            >
                <RockerButton labels={rockerLabels} />
                <Row className="columns-margin-none section-columns__columns">
                    <Column className="textblock textblock--primary">
                        Role
                    </Column>
                    <Column className="textblock textblock--primary">
                        Jurisdiction
                    </Column>
                </Row>
                <Section
                    data-id="demo-section-1"
                    title="System administrator"
                    detailsText={{
                        collapsed: "Collapsed test",
                        expanded: "Expanded test"
                    }}
                >
                    <Row className="columns-margin-none">
                        <Column>
                            <Link title="Permissions" url="#"/>
                        </Column>
                        <Column>
                            <InputRow>
                                <Icon iconName="earth">
                                    <div className="textblock textblock--primary">
                                        GM Corporate
                                    </div>
                                    <div className="textblock">
                                        CA Employees, Contractors, EU Employees, US Employees
                                    </div>
                                </ Icon>
                            </InputRow>
                            <InputRow>
                                <Icon iconName="earth">
                                    <div className="textblock textblock--primary">
                                        GM sandbox
                                    </div>
                                    <div className="textblock">
                                        CA Employees, Contractors, EU Employees, US Employees, China Region
                                    </div>
                                </ Icon>
                            </InputRow>
                        </Column>
                    </Row>
                </Section>
            </ExpandableRow>
            <ExpandableRow
                title="Lewis, Francisco"
                subtitle="flewis"
                rowAccessories={rowAccessories}
                expanded
            >
                <RockerButton labels={rockerLabels} />
                <Row className="columns-margin-none section-columns__columns textblock--primary">
                    <Column>
                        Role
                    </Column>
                    <Column>
                        Jurisdiction
                    </Column>
                </Row>
                <Section
                    data-id="demo-section-1"
                    title="Client applications developer"
                    detailsText={{
                        collapsed: "2 environments",
                        expanded: "Environment"
                    }}
                    accessories={[
                        <Button inline iconName="edit"/>,
                        <Button inline iconName="delete"/>
                    ]}
                >
                    <Row className="columns-margin-none">
                        <Column>
                            <Link title="Permissions" url="#"/>
                        </Column>
                        <Column>
                            <InputRow>
                                <Icon iconName="earth">
                                    <div className="textblock textblock--primary">
                                        GM Corporate
                                    </div>
                                    <div className="textblock">
                                        CA Employees, Contractors, EU Employees, US Employees
                                    </div>
                                </ Icon>
                            </InputRow>
                            <InputRow>
                                <Icon iconName="earth">
                                    <div className="textblock textblock--primary">
                                        GM sandbox
                                    </div>
                                    <div className="textblock">
                                        CA Employees, Contractors, EU Employees, US Employees, China Region
                                    </div>
                                </ Icon>
                            </InputRow>
                        </Column>
                    </Row>
                </Section>
            </ExpandableRow>
            <ExpandableRow
                title="Schneider, Maria"
                subtitle="mschneider"
                rowAccessories={rowAccessories}
            >
                <RockerButton labels={rockerLabels} />
                <Row className="columns-margin-none section-columns__columns textblock--primary">
                    <Column>
                        Role
                    </Column>
                    <Column>
                        Jurisdiction
                    </Column>
                </Row>
                <Section
                    data-id="demo-section-1"
                    title="Office breakdancer"
                    detailsText={{
                        collapsed: "Who doesn't love breakdancing?",
                        expanded: "Nobody, that's who"
                    }}
                >
                    <Row className="columns-margin-none">
                        <Column>
                            <Link title="Qualifications" url="#"/>
                        </Column>
                        <Column>
                            <InputRow>
                                <Icon iconName="earth">
                                    <div className="textblock textblock--primary">
                                        World-class moves
                                    </div>
                                </ Icon>
                            </InputRow>
                        </Column>
                    </Row>
                </Section>
            </ExpandableRow>
        </ExpandableRow.SimpleWrapper>
    );
};

UserEdit.defaultProps = {
    columns: []
};

export default UserEdit;
