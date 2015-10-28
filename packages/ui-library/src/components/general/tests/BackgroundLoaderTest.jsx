window.__DEV__ = true;

jest.dontMock('../../../testutil/TestUtils');
jest.dontMock('../BackgroundLoader.jsx');

describe('BackgroundLoader', function () {
    var React = require('react/addons');
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require('../../../testutil/TestUtils');
    var BackgroundLoader = require('../BackgroundLoader.jsx');

    var loadingContentFunc;
    var loadContentFunc;
    var loaded;

    beforeEach(function () {
        loadingContentFunc = function () {
            /* jshint ignore:start */
            return (
                <span data-id="loading-content">loading content</span>
            );
            /* jshint ignore:end */
        };

        loadContentFunc = jest.genMockFunction();
    });


    it('render loading state', function () {
        loaded = false;

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <BackgroundLoader
                    interval={3000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
            /* jshint ignore:end */
        );
        
        // the loading content should be visible; the loaded content should not be
        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, 'loader');
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.getDOMNode().className).toEqual('css-class');
        var loadingContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loading-content');
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeTruthy();
        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();
    });

    it('render loaded state', function () {
        loaded = true;

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
            /* jshint ignore:end */
        );

        // the loading content should not be visible; the loaded content should be
        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, 'loader');
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        var loadingContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loading-content');
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeFalsy();
        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
    });

    it('verify component unmount', function () {
        global.clearTimeout = jest.genMockFunction();

        var Wrapper = React.createClass({
            getInitialState: function () {
                return { renderChildren: true };
            },

            renderChildren: function (renderChildren) {
                this.setState({ renderChildren: !!renderChildren });
            },

            render: function () {
                if (this.state.renderChildren) {
                    return this.props.children;
                } else {
                    return null;
                }
            }

        });

        var element = (
            <Wrapper>
                <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={false}
                    loading={loadingContentFunc}
                    className="css-class">
                    <div data-id="loaded-content">content loaded</div>
                </BackgroundLoader>
            </Wrapper>
        );
        
        var component = ReactTestUtils.renderIntoDocument(element);

        expect(global.clearTimeout.mock.calls.length).toBe(0);

        component.renderChildren(false);

        expect(global.clearTimeout.mock.calls.length).toBe(1);
    });

    it('verify component loadLoop invoked', function () {
        loaded = false;

        var Wrapper = React.createClass({
            getInitialState: function () {
                return { loaded: false };
            },

            _load: function () {
                this.setState({ loaded: loaded });
            },

            _interval: function () {
                return 2000;
            },

            render: function () {
                return (
                    <BackgroundLoader
                        interval={this._interval}
                        load={this._load}
                        loaded={this.state.loaded}>
                        <div data-id="loaded-content">content loaded</div>
                    </BackgroundLoader>
                );
            }

        });

        var element = (
            <Wrapper />
        );
        
        document['hidden'] = false;
        var component = ReactTestUtils.renderIntoDocument(element);

        expect(setTimeout.mock.calls.length).toBe(1);
        expect(setTimeout.mock.calls[0][1]).toBe(2000);

        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        loaded = true;
        jest.runAllTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();

    });

    it('render passed in loading content', function () {
        loaded = false;

        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc()}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
            /* jshint ignore:end */
        );
        
        // the loading content should be visible; the loaded content should not be
        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, 'loader');
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.getDOMNode().className).toEqual('css-class');
        var loadingContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loading-content');
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeTruthy();
        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();
    });

    it('test non-mapped hidden event', function () {
        loaded = false;

        document['hidden'] = false;
        var component = ReactTestUtils.renderIntoDocument(
            /* jshint ignore:start */
            <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
            /* jshint ignore:end */
        );

        
        expect(component.state.allowPoll).toBeTruthy();
        
        document['hidden'] = true;
        component.changeHidden({ type: 'something' });

        expect(component.state.allowPoll).toBeFalsy();
        
    });

    it('test mozHidden', function () {
        loaded = false;

        // Clear document['hidden'] since it could be polluted from previous tests.
        delete document['hidden'];

        // Setup the document for mozilla hidden testing (with window initially out of focus)
        document['mozHidden'] = true;

        var Wrapper = React.createClass({
            getInitialState: function () {
                return { loaded: false };
            },

            _load: function () {
                this.setState({ loaded: loaded });
            },

            _interval: function () {
                return 2000;
            },

            render: function () {
                return (
                    <BackgroundLoader
                        ref="loader"
                        interval={this._interval}
                        load={this._load}
                        loaded={this.state.loaded}>
                        <div data-id="loaded-content">content loaded</div>
                    </BackgroundLoader>
                );
            }

        });

        var element = (
            <Wrapper />
        );
        
        // Render the component and verify that the loaded content is not yet displayed
        var component = ReactTestUtils.renderIntoDocument(element);

        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // With loaded set to true, trigger a timer callback to attempt a data load.
        // This call should not result in data being loaded since no attempt should
        // be made to load the data due to polling being disabled based on window focus.
        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // Set the document to now be in focus and trigger a document event
        document['mozHidden'] = false;
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('mozvisibilitychange', true, true);
        document.body.dispatchEvent(evt);

        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
        
    });

    it('test webkitHidden', function () {
        loaded = false;

        // Clear document['hidden'] since it could be polluted from previous tests.
        delete document['hidden'];
        delete document['mozHidden'];

        // Setup the document for mozilla hidden testing (with window initially out of focus)
        document['webkitHidden'] = true;

        var Wrapper = React.createClass({
            getInitialState: function () {
                return { loaded: false };
            },

            _load: function () {
                this.setState({ loaded: loaded });
            },

            _interval: function () {
                return 2000;
            },

            render: function () {
                return (
                    <BackgroundLoader
                        ref="loader"
                        interval={this._interval}
                        load={this._load}
                        loaded={this.state.loaded}>
                        <div data-id="loaded-content">content loaded</div>
                    </BackgroundLoader>
                );
            }

        });

        var element = (
            <Wrapper />
        );
        
        // Render the component and verify that the loaded content is not yet displayed
        var component = ReactTestUtils.renderIntoDocument(element);

        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // With loaded set to true, trigger a timer callback to attempt a data load.
        // This call should not result in data being loaded since no attempt should
        // be made to load the data due to polling being disabled based on window focus.
        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // Set the document to now be in focus and trigger a document event
        document['webkitHidden'] = false;
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('webkitvisibilitychange', true, true);
        document.body.dispatchEvent(evt);

        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
        
    });

    it('test msHidden', function () {
        loaded = false;

        // Clear document['hidden'] since it could be polluted from previous tests.
        delete document['hidden'];
        delete document['mozHidden'];
        delete document['webkitHidden'];

        // Setup the document for mozilla hidden testing (with window initially out of focus)
        document['msHidden'] = true;

        var Wrapper = React.createClass({
            getInitialState: function () {
                return { loaded: false };
            },

            _load: function () {
                this.setState({ loaded: loaded });
            },

            _interval: function () {
                return 2000;
            },

            render: function () {
                return (
                    <BackgroundLoader
                        ref="loader"
                        interval={this._interval}
                        load={this._load}
                        loaded={this.state.loaded}>
                        <div data-id="loaded-content">content loaded</div>
                    </BackgroundLoader>
                );
            }

        });

        var element = (
            <Wrapper />
        );
        
        // Render the component and verify that the loaded content is not yet displayed
        var component = ReactTestUtils.renderIntoDocument(element);

        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // With loaded set to true, trigger a timer callback to attempt a data load.
        // This call should not result in data being loaded since no attempt should
        // be made to load the data due to polling being disabled based on window focus.
        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();

        // Set the document to now be in focus and trigger a document event
        document['msHidden'] = false;
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('msvisibilitychange', true, true);
        document.body.dispatchEvent(evt);

        loaded = true;
        jest.runOnlyPendingTimers();

        loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, 'loaded-content');
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
        
    });

});
