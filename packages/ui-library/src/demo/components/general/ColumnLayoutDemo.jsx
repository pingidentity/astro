var React = require("react"),
    Layout = require("../../../components/general/ColumnLayout.jsx");

/**
* @name ColumnLayoutDemo
* @memberof ColumnLayout
* @desc A demo for ColumnLayout
*/
var ColumnLayoutDemo = React.createClass({

    render: function () {
        return (
            <div>
                <Layout.Row data-id="columns-2">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-3">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-4">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-5">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>

                <br /><br />
                <Layout.Row data-id="columns-2-nopad" className="columns-nopad">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-3-nopad" className="columns-nopad">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-4-nopad" className="columns-nopad">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <br />
                <Layout.Row data-id="columns-5-nopad" className="columns-nopad">
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#eee" } }>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={ { background: "#ddd" } }>column content</div>
                    </Layout.Column>
                </Layout.Row>
            </div>
        );
    }

});


module.exports = ColumnLayoutDemo;
