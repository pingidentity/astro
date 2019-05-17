import React from "react";
import MappedAttributes from "../../../components/layout/MappedAttributes";

export default function MappedAttributesDemo() {
    return (
        <MappedAttributes
            attributes={[
                {
                    from: "email",
                    to: "username",
                    type: "Empty Only",
                    required: true
                },
                {
                    from: "email",
                    to: "email",
                    type: "Always"
                },
            ]}
            labels={
                {
                    from: "Facebook Attribute",
                    to: "P1 User Attribute"
                }
            }
        />
    );
}
