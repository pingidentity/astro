jest.dontMock("../FormattedContent");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import FormattedContent from "../FormattedContent";

describe("FormattedContent", function () {

    it("rendered component with data-id", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <FormattedContent>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, <strong>totam rem aperiam</strong>, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam <em>voluptatem quia voluptas sit aspernatur aut odit aut fugit</em>, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p>
                    Soluta tempor mel eu. Ad has odio scriptorem. Te ius eros volumus reprimique. Ad ius erat
                    appareat aliquando, per dicunt minimum an. Lobortis suavitate repudiare cum cu, nam
                    recusabo reprehendunt ne.
                </p>
                <h2>A Heading</h2>
                <ul>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
                <hr />
                <ol>
                    <li>Hey</li>
                    <li>Bee</li>
                    <li>Sea</li>
                </ol>
                <h3>A Smaller Heading</h3>
                <blockquote>
                    Cicero famously orated against his political opponent Lucius Sergius Catilina. Occasionally the
                    first Oration against Catiline is taken for type specimens: Quo usque tandem abutere, Catilina,
                    patientia nostra? Quam diu etiam furor iste tuus nos eludet? (How long, O Catiline, will you
                    abuse our patience? And for how long will that madness of yours mock us?)
                </blockquote>
            </FormattedContent>
        );
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "formatted-content");

        expect(ReactTestUtils.isDOMComponent(element)).toBeDefined();
    });

});