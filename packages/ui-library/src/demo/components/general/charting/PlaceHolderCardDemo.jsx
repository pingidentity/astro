import React from "react";
import { PlaceHolderCard, CardRow } from "../../../../components/general/charting/Cards";


/**
* @name PlaceHolderCardDemo
* @memberof PlaceHolderCard
* @desc A demo for PlaceHolderCard
*/

const PlaceHolderCardDemo = () => {
    return (
        <div>
            <PlaceHolderCard
                message="We're building more data widgets. Check back soon!"
            />
            <br />
            <CardRow>
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
            </CardRow>
            <br />
            <CardRow>
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
                <PlaceHolderCard
                    message="We're building more data widgets. Check back soon!"
                />
            </CardRow>
        </div>
    );
};

export default PlaceHolderCardDemo;