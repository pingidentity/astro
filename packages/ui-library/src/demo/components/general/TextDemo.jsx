import React from "react";
import Text from "ui-library/lib/components/general/Text";

/**
* @name TextDemo
* @memberof Text
* @desc A demo for Text component
*/
const TextDemo = () => {
    return (
        <div>
            <Text>
                If these lines aren't straight, your water's going to run
                right out of your painting and get your floor wet.
                You can't have light without dark. You can't know happiness unless you've known sorrow.
                It's a super day, so why not make a beautiful sky? <Text inline type="success">I think there's an
                artist hidden in the bottom of every single one of us.</Text> It is a lot of fun.
            </Text>
            <Text type="primary">
                There are no limits in this world. Tree trunks grow however makes them happy.
                Let's make some happy little clouds in our world. You can do anything your heart can imagine.
            </Text>
            <Text type="value">
                Just let these leaves jump off the brush It takes dark in order to show light.
                This present moment is perfect simply due to the fact you're experiencing it.
                Here we're limited by the time we have. Let's give him a friend too. Everybody needs a friend.
            </Text>
            <Text type="label">
                Have fun with it. We're not trying to teach you a thing to copy.
                We're just here to teach you a technique, then let you loose into the world.
                You're the greatest thing that has ever been or ever will be. You're special.
                You're so very special. You've got to learn to fight the temptation to resist these things.
                Just let them happen. You have to make almighty decisions when you're the creator.
            </Text>
            <Text type="success">
                There is immense joy in just watching - watching all the little creatures in nature.
                This is your creation - and it's just as unique and special as you are.
                Isn't it great to do something you can't fail at? If we're gonna walk though the woods,
                we need a little path. All you need is a dream in your heart, and an almighty knife.
                That's the way I look when I get home late; black and blue.
            </Text>
            <Text align={Text.alignments.CENTER}>Centered</Text>
            <Text align={Text.alignments.RIGHT}>Right-aligned</Text>
        </div>
    );
};

export default TextDemo;
