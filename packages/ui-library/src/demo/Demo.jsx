var React = require('react/addons'),

    // components
    BackgroundLoaderDemo = require('../components/example/BackgroundLoaderDemo.jsx'),
    CacheDemo = require('./core/CacheDemo.jsx');

var Demo = React.createClass({
    
    render: function () {
        return (

            <div className="components-container">

                <div id="header">
                        <div className="logo" />
                        <div className="title"><span className="main">Ping Identity</span> UI Component Library</div>
                </div>
                
                <div id="nav">
                    
                    <ul className="menu">
                        <li><a href="#introduction">Introduction</a></li>
                    </ul>
                    
                    <ul className="menu last">
                        <li><a href="#example">E.g.: Background Loader</a></li>
                        <li><a href="#cache-demo">Cache Demo</a></li>
                        <li><a href="#buttons">Buttons</a>
                            <ul className="sub-menu">
                                <li><a href="#rocker-button">Rocker Button</a></li>
                            </ul>
                        </li>
                    </ul>
                    
                </div>
                
                <div id="content">
                    
                    <div className="introduction">
                        
                        <a name="introduction"></a>
                        <div className="section">
                            <h1>Ping Identity UI Component Libary</h1>
                            <p>A reusable, externalizable component library for Ping Identity.</p>
                        </div>
                        
                    </div>
                
                    <div className="components">

                        <a name="example"></a>
                        <div className="section">
                            <h1>Example: Background Loader</h1>
                            
                            <div className="description">
                                <p>Background loader description.</p>
                            </div>

                            <div className="sub-section">

                                <div className="output">
                                    
                                    <BackgroundLoaderDemo />
                                    
                                </div>
                                
                                <pre className="language-markup">
                                    <code className="language-markup">
                                        
                                        markup
                                        
                                    </code>
                                </pre>
                                
                            </div>
                            
                        </div>
                        
                        <a name="cache-demo"></a>
                        <div className="section">
                            <h1>Cache Demo</h1>
                            
                            <div className="description">
                                <p>Cache demo description.</p>
                            </div>

                            <div className="sub-section">
                                
                                <div className="output">
                                    
                                    <CacheDemo />
                                    
                                </div>

                                <pre className="language-markup">
                                    <code className="language-markup">
                                        <p>drag drop row markup, e.g. usage</p>
                                    </code>
                                </pre>
                                
                            </div>
                        </div>
                        
                        <a name="buttons"></a>
                        <div className="section">
                            <h1>Buttons</h1>
                            
                            <div className="description">
                                <p>Buttons description.</p>
                            </div>

                            <a name="rocker-button"></a>
                            <div className="sub-section">
                                <h2>Rocker Button</h2>
                                
                                <div className="description">
                                    <p>Rocker buttons implementation, supports 2 to 4 buttons (CSS restriction).</p>
                                    <p><strong>Required params:</strong></p>
                                    <p>
                                        &nbsp; &nbsp; &nbsp; - labels:
                                            &nbsp;array of string labels to use as button titles<br></br>
                                        &nbsp; &nbsp; &nbsp; - onChange: function (selectedLabel)
                                            &nbsp;&#123;...&#125; delegate to call when selection changed.
                                    </p>
                                    <p><strong>Callback/ On change:</strong></p>
                                        
                                    <p>this._changeSubview can be defined as:</p>

                                    <p>
                                    _changeSubview: function (selectedView) &#123;<br></br>
                                        &nbsp; &nbsp; &nbsp;
                                            console.log("++ _changeSubview: ", selectedView);<br></br>
                                    &#125;
                                    </p>
                                </div>
                                
                                <div className="output">
                                    
                                    <div className="component">
                                        demo placeholder: 2 buttons
                                    </div>
                                    
                                    <div className="component">
                                        demo placeholder: 3 buttons
                                    </div>
                                    
                                    <div className="component">
                                        demo placeholder: 4 buttons
                                    </div>
                                    
                                </div>
                                
                                <pre className="language-markup">
                                    <code className="language-markup">
                                        &lt;RockerButton onChange=&#123;this._changeSubview&#125;<br></br>
                                            &nbsp; &nbsp; &nbsp;
                                                labels=&#123;["Label 1", "Label 2", "Label 3"]&#125; /&gt;
                                    </code>
                                </pre>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            
            </div>
        );
    }
});

React.render(<Demo />, document.getElementById('demo'));
