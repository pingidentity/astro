import React from "react";
import Page from "./Page";
import Branding from "./Branding";
import Card from "./Card";
import Stack from "./Stack";
import Logo from "./Logo";
import FloatLabelTextInput from "./FloatLabelTextInput";
import FloatLabelPasswordInput from "./FloatLabelPasswordInput";
import Checkbox from "./Checkbox";
import Button from "./Button";

const SignOnPage = ({branding}) => (
    <Page footer="© Copyright 2017 Ping Identity. All rights reserved.">
        <Branding {...branding}/>
        <Card>
            <Stack header={true}>
                <Logo src={branding && branding.logo}/>
                <FloatLabelTextInput label="Username" id="username"/>
                <FloatLabelPasswordInput label="Password" id="password"/>
                <Checkbox label="Remember me"/>
                <Button label="Sign On" primary/>
            </Stack>
        </Card>
    </Page>
);

export default SignOnPage;
