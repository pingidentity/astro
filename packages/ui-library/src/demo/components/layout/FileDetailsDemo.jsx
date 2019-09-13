import React from "react";
import FileDetails from "../../../components/layout/FileDetails";
import Icon from "../../../components/general/Icon";
import FlexRow, { justifyOptions, alignments } from "../../../components/layout/FlexRow";
import Button from "../../../components/buttons/Button";
import FieldSet from "../../../components/layout/FieldSet";

/**
* @name FileDetails Demo
* @desc A demo for File Details component
*/
const FileDetailsDemo = () => {
    return (
        <FieldSet>
            <FlexRow justify={justifyOptions.SPACEBETWEEN} alignment={alignments.CENTER}>
                <FlexRow justify={justifyOptions.START} alignment={alignments.TOP}>
                    <Icon
                        data-id="file-icon"
                        className="input-file__file-icon"
                        iconName="docs"
                        iconSize={Icon.iconSizes.MD}
                        type="leading"
                    />
                    <FileDetails fileName="Test.doc" validTo="9/9/2020" validFrom="1/1/2019"/>
                </FlexRow>
                <Button
                    data-id="remove-button"
                    className="input-file__remove-btn"
                    inline
                    label="Remove"
                />
            </FlexRow>
        </FieldSet>
    );
};

module.exports = FileDetailsDemo;

