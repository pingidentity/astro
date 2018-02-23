import React from "react";
import Branding from "./Branding";
import Button from "./Button";
import Card from "./Card";
import Checkbox from "./Checkbox";
import Feedback from "./Feedback";
import FloatLabelTextInput from "./FloatLabelTextInput";
import FloatLabelPasswordInput from "./FloatLabelPasswordInput";
import Form from "./Form";
import Heading from "./Heading";
import Logo from "./Logo";
import Page from "./Page";
import Requirements from "./Requirements";
import Tooltip from "./Tooltip";

const ChangePWPage = ({branding}) => (
    <Page footer="© Copyright 2017 Ping Identity. All rights reserved.">
        <Branding {...branding}/>
        <Card>
            <Logo src={branding && branding.logo}/>
            <Heading>Change Password</Heading>
            <Form>
                <Feedback type="alert">Your password has expired. Please create a new one.</Feedback>
                <FloatLabelPasswordInput label="Current Password" id="password"/>
                <FloatLabelPasswordInput label="New Password" id="new">
                    <Tooltip>
                        <Heading level={4}>Password Must Have at Least:</Heading>
                        <Requirements requirements={[
                            {
                                name: "6 characters",
                                status: "no"
                            },
                            {
                                name: "1 UPPERCASE letter",
                                status: "yes"
                            },
                            {
                                name: "1 lowercase letter",
                                status: "yes"
                            },
                            {
                                name: "1 number (0-9)",
                                status: "no"
                            },
                        ]} />
                    </Tooltip>
                </FloatLabelPasswordInput>
                <FloatLabelPasswordInput label="Verify New Password" id="verify"/>
                <Button label="Save" primary disabled/>
            </Form>
        </Card>
    </Page>
);

export default ChangePWPage;
