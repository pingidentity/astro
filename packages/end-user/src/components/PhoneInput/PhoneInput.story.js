import React from "react";
import PhoneInput from "./PhoneInput";
import Button from "../Button";

export default {
  title: "Components/Inputs/Phone",
  component: PhoneInput,
};

export const Default = () => <PhoneInput />;

export const WithFieldMessage = () => (
  <>
    <PhoneInput fieldMessage="Here is a long and very important message!" />
    <Button>Submit</Button>
  </>
);
