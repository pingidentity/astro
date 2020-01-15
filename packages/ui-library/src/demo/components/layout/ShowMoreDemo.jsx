import React from "react";
import HR from "ui-library/lib/components/general/HR";
import ShowMore, { ShowSome } from "ui-library/lib/components/layout/ShowMore";
import Button from "ui-library/lib/components/buttons/Button";

const renderCustomButton = ({
    title,
    onToggle,
    expanded,
}) => (
    <div><Button onClick={onToggle} inline active={expanded}>{title}</Button></div>
);

/**
* @name ShowMoreDemo
* @memberof ShowMore
* @desc A demo for ShowMore
*/

const ShowMoreDemo = () => (
    <div>
        <p>
            The main theme of von Junz’s[1] model of capitalist
            desublimation is a mythopoetical totality. However, the characteristic theme of
            the works of Gaiman is the bridge between class and society. The premise of the
            subdeconstructive paradigm of reality holds that expression is created by the
            collective unconscious.
        </p>
        <ShowMore data-id="first">
            <p>
                “Consciousness is part of the rubicon of truth,” says Sartre; however,
                according to la Tournier[2] , it is not so much
                consciousness that is part of the rubicon of truth, but rather the defining
                characteristic, and thus the futility, of consciousness. Therefore, if
                constructivism holds, we have to choose between the subdeconstructive paradigm
                of reality and textual discourse. In The Moor’s Last Sigh, Rushdie
                deconstructs capitalist desublimation; in The Ground Beneath Her Feet he
                reiterates the subdeconstructive paradigm of reality.
            </p>
        </ShowMore>
        <HR />
        <p>
            “Reality is intrinsically elitist,” says Marx; however, according to von
            Ludwig[7] , it is not so much reality that is intrinsically
            elitist, but rather the rubicon, and thus the economy, of reality. Therefore,
            Lacan suggests the use of the subdeconstructive paradigm of reality to
            deconstruct class divisions. The subject is contextualised into a
            constructivism that includes culture as a paradox.
        </p>
        <ShowMore showLabel="Give Me More" hideLabel="Too Much!">
            <p>
                The main theme of the works of Rushdie is the meaninglessness, and some
                would say the defining characteristic, of capitalist sexual identity. But the
                characteristic theme of Drucker’s[8] critique of capitalist
                desublimation is the role of the artist as observer. Any number of
                constructions concerning the difference between class and sexual identity may
                be revealed.
            </p>
        </ShowMore>
        <HR />
        <p>
            If one examines the precapitalist paradigm of reality, one is faced with a
            choice: either accept dialectic subtextual theory or conclude that language,
            somewhat surprisingly, has objective value. Lacan uses the term ‘the
            precapitalist paradigm of reality’ to denote the economy of constructive sexual
            identity. It could be said that the subject is interpolated into a dialectic
            subtextual theory that includes narrativity as a reality.
        </p>
        <ShowMore renderToggle={renderCustomButton}>
            <p>
                If subdeconstructivist desublimation holds, we have to choose between the
                precapitalist paradigm of reality and the cultural paradigm of discourse.
                However, the subject is contextualised into a postsemantic cultural theory that
                includes reality as a paradox.
            </p>
        </ShowMore>
        <HR />
        <ul>
            <ShowSome
                count={10}
                items={[
                    <li key="1">The</li>,
                    <li key="2">characteristic</li>,
                    <li key="3">theme</li>,
                    <li key="4">of</li>,
                    <li key="5">the</li>,
                    <li key="6">works</li>,
                    <li key="7">of</li>,
                    <li key="8">Pynchon</li>,
                    <li key="9">is</li>,
                    <li key="10">a</li>,
                    <li key="11">self-supporting</li>,
                    <li key="12">whole</li>,
                    <li key="13">But</li>,
                    <li key="14">the</li>,
                    <li key="15">premise</li>,
                    <li key="16">of</li>,
                    <li key="17">dialectic</li>,
                    <li key="18">subtextual</li>,
                    <li key="19">theory</li>,
                    <li key="20">states</li>,
                    <li key="21">that</li>,
                    <li key="22">art</li>,
                    <li key="23">is</li>,
                    <li key="24">used</li>,
                    <li key="25">to</li>,
                    <li key="26">disempower</li>,
                    <li key="27">the</li>,
                    <li key="28">proletariat</li>,
                    <li key="29">but</li>,
                    <li key="30">only</li>,
                    <li key="31">if</li>,
                    <li key="32">Debord’s</li>,
                    <li key="33">analysis</li>,
                    <li key="34">of</li>,
                    <li key="35">realism</li>,
                    <li key="36">is</li>,
                    <li key="37">valid</li>,
                    <li key="38">if</li>,
                    <li key="39">that</li>,
                    <li key="40">is</li>,
                    <li key="41">not</li>,
                    <li key="42">the</li>,
                    <li key="43">case</li>,
                    <li key="44">we</li>,
                    <li key="45">can</li>,
                    <li key="46">assume</li>,
                    <li key="47">that</li>,
                    <li key="48">society</li>,
                    <li key="49">has</li>,
                    <li key="0">intrinsic meaning</li>,
                ]}
            />
        </ul>
    </div>
);

module.exports = ShowMoreDemo;