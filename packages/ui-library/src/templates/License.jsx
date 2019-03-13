import React, { Component } from "react";
import PageSection from "../components/layout/PageSection";
import Button from "../components/buttons/Button";
import Layout from "../components/general/ColumnLayout";
import PageHeader from "../components/general/PageHeader";
import FormLabel from "../components/forms/FormLabel";
import Text from "../components/general/Text";
import Stack from "../components/layout/Stack";
import Icon from "../components/general/Icon";
import Link from "../components/general/Link";
import FormattedContent from "../components/general/FormattedContent";

export default class License extends Component {
    render () {
        return (
            <div>
                <PageHeader title="License" />
                <PageSection>
                    <Stack gap="LG">
                        <Layout.Column>
                            <FormLabel value="Organization" />
                            <Text type="value">
                                PingOne Demo
                            </Text>
                        </Layout.Column>
                        <Layout.Column>
                            <FormLabel value="License Type" />
                            <Text type="value">
                                Trial - expires 2019-12-13
                            </Text>
                        </Layout.Column>
                    </Stack>
                    <hr className="hr" />
                    <Layout.Row className="columns-width-auto">
                        <Layout.Column>
                            <Icon iconName="earth" iconSize="xl" title="environments">
                                <Stack gap="ZERO">
                                    <Text type="value">5 maximum</Text>
                                    <Text type="value">Sandbox only</Text>
                                </Stack>
                            </Icon>
                        </Layout.Column>
                        <Layout.Column>
                            <Icon iconName="users" iconSize="xl" title="identites">
                                <FormattedContent>
                                    <Stack gap="ZERO">
                                        <Text type="value">10 million max per environment</Text>
                                        <Text type="error">
                                            Exceeded by 1 environment
                                            <ul>
                                                <li>disobedient-env</li>
                                            </ul>
                                        </Text>
                                    </Stack>
                                </FormattedContent>
                            </Icon>
                        </Layout.Column>
                    </Layout.Row>
                    <hr className="hr" />
                    <Stack gap="SM">
                        <Link title="Compare plans" url="#" type="block"/>
                        <Link title="Terms of service" url="#" type="block"/>
                        <Button type="primary" label="Contact Us" />
                    </Stack>
                </PageSection>
            </div>
        );
    }
}