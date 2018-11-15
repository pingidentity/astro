import React from "react";
import FormattedContent from "ui-library/lib/components/general/FormattedContent";

/**
* @name FormattedContentDemo
* @memberof FormattedContent
* @desc A demo for FormattedContent component
*/
const FormattedContentDemo = () => {
    return (
        <div>
            <FormattedContent>
                <h1>Biggest Heading</h1>
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
                    <li>In
                        <ul>
                            <li>My
                                <ul><li>Nest</li></ul>
                            </li>
                        </ul>
                    </li>
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
                <h4>The smallest heading</h4>
                <p>Now we're going to show you some code:</p>
                <p>
                    You can put <code>some.code["inline"]</code>. Or as a block:
                </p>
                <pre>
                    import HTML5Backend from "react-dnd-html5-backend";
                    import {"{ DragDropContext }"} from "react-dnd";
                    class DemoApp extends React.Component {"{}"};
                    DemoApp = DragDropContext(HTML5Backend)(DemoApp);
                </pre>
            </FormattedContent>
        </div>
    );
};

module.exports = FormattedContentDemo;
