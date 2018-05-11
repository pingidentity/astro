import React from "react";
import _ from "underscore";
import Indent from "../general/Indent";
import PolicyNode from "./PolicyNode";

const PolicySettingsList = ({ character, iconName, label, settings, fallbackText, groupingMode }) => (
    <PolicyNode label={label} iconName={iconName} character={character}>
        {
            settings && settings.length > 1
                ? <Indent title={groupingMode}>
                    <div className="stack-sm">
                        {_.map(settings, setting => (
                            <div className="text-value" key={setting}>{setting}</div>
                        ))}
                    </div>
                </Indent>
                : <div className="text-value">
                    {settings && settings.length > 0 ? settings[0] : fallbackText}
                </div>
            }
    </PolicyNode>
);

export default PolicySettingsList;