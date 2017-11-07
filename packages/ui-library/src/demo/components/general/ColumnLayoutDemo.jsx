var React = require("react"),
    Layout = require("../../../components/general/ColumnLayout.jsx");

/**
* @name ColumnLayoutDemo
* @memberof ColumnLayout
* @desc A demo for ColumnLayout
*/
class ColumnLayoutDemo extends React.Component {
    render() {
        var style1 = {
                background: "#ddd",
                padding: "10px",
                marginBottom: "10px"
            },
            style2 = {
                background: "#eee",
                padding: "10px",
                marginBottom: "10px"
            };

        return (
            <div>
                <h2>
                    Full Width - with margins
                </h2>
                <Layout.Row data-id="columns-2">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-3">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-4">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-5">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                </Layout.Row>

                <br/>
                <h2>
                    Full Width - without margins
                </h2>
                <Layout.Row data-id="columns-2-margin-none" className="columns-margin-none">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-3-margin-none" className="columns-margin-none">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-4-margin-none" className="columns-margin-none">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                </Layout.Row>
                <Layout.Row data-id="columns-5-margin-none" className="columns-margin-none">
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>column content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>column content</div>
                    </Layout.Column>
                </Layout.Row>

                <br/>
                <h2>
                    Auto Width - with margins
                </h2>
                <Layout.Row data-id="columns-6-auto" className="columns-width-auto">
                    <Layout.Column>
                        <div style={style1}>an auto-width column sizes to the width of its content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>like this</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>and like this</div>
                    </Layout.Column>
                </Layout.Row>

                <br/>
                <h2>
                    Auto Width - without margins
                </h2>
                <Layout.Row data-id="columns-6-auto" className="columns-width-auto columns-margin-none">
                    <Layout.Column>
                        <div style={style1}>an auto-width column sizes to the width of its content</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style2}>like this</div>
                    </Layout.Column>
                    <Layout.Column>
                        <div style={style1}>and like this</div>
                    </Layout.Column>
                </Layout.Row>
            </div>
        );
    }
}


module.exports = ColumnLayoutDemo;
