import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Preview, { Frame, EndUserSandbox } from './Preview';

window.__DEV__ = true;

const defaultProps = {
    'data-id': 'test-preview',
    width: '500px',
    height: '500px',
    scale: 0.5,
};

const getFrame = props => shallow(
    <Frame {...defaultProps} {...props}>
        <p>Some text...</p>
    </Frame>
);

const getEndUserSandbox = props => shallow(
    <EndUserSandbox {...defaultProps} {...props}>
        <p>Some text...</p>
    </EndUserSandbox>
);

const getPreview = props => shallow(
    <Preview {...defaultProps} {...props}>
        <p>Some text...</p>
    </Preview>
);

describe('Frame', () => {
    it('generates viewport and style tags', () => {
        const wrapper = getFrame();

        const viewport = wrapper.instance().getViewport();
        expect(viewport.tagName.toLowerCase()).toEqual('meta');
        expect(viewport.getAttribute('name')).toEqual('viewport');
        expect(viewport.getAttribute('content')).toEqual('width=device-width, initial-scale=1');

        const styles = wrapper.instance().getStyles();
        expect(styles.tagName.toLowerCase()).toEqual('style');
    });

    it('properly sets the height if height prop not described', () => {
        ReactDOM.render = jest.fn();
        const wrapper = getFrame({
            children: [
                <div height="500px"></div>
            ],
        });

        const viewport = wrapper.instance().paintFrame();

        const style = wrapper.props().style;
        expect(style.height).toEqual('500px');
    });

    it('properly sets the width and height if described', () => {
        ReactDOM.render = jest.fn();
        const wrapper = getFrame({
            width: '400px',
            height: '300px',
        });

        wrapper.instance().paintFrame();

        const style = wrapper.props().style;
        expect(style.width).toEqual('400px');
        expect(style.height).toEqual('300px');
    });

    it('"disables" autoheight if height described', () => {
        ReactDOM.render = jest.fn();
        const wrapper = getFrame({
            height: '300px',
            children: [
                <div height="500px"></div>
            ],
        });

        wrapper.instance().paintFrame();

        const style = wrapper.props().style;
        expect(style.height).toEqual('300px');
    });
});

describe('EndUserSandbox', () => {
    it('imports base CSS', () => {
        process.env = Object.assign(process.env, { END_USER_VERSION: '0.0.1' });
        const template = `https://assets.pingone.com/ux/end-user/${END_USER_VERSION}/end-user.css`;

        const wrapper = getEndUserSandbox();
        const preview = wrapper.children();
        const link = preview.find('link');

        expect(link.prop('href')).toEqual(template);
    });

    it('sets opacity to 0 until base CSS loaded', () => {
        process.env = Object.assign(process.env, { END_USER_VERSION: '0.0.1' });
        const wrapper = getEndUserSandbox();

        expect(wrapper.props().style.opacity).toEqual(0);

        const preview = wrapper.children();
        const link = preview.find('link');

        link.simulate('load');

        expect(wrapper.props().style.opacity).toEqual(1);
    });
});

describe('Preview', () => {
    it('does not render link if not theme CSS provided', () => {
        const wrapper = getPreview();

        const preview = wrapper.children();
        const link = preview.find('link');

        expect(link.length).toEqual(0);
    });

    it('adds custom theme CSS', () => {
        const path = 'http://example.com/example.css';
        const wrapper = getPreview({
            themeStyleSheet: path,
        });

        const preview = wrapper.children();
        const link = preview.find('link');

        expect(link.prop('href')).toEqual(path);
    });

    it('sets opacity to 0 until theme CSS loaded', () => {
        const path = 'http://example.com/example.css';
        const wrapper = getPreview({
            themeStyleSheet: path,
        });

        expect(wrapper.props().style.opacity).toEqual(0);

        const preview = wrapper.children();
        const link = preview.find('link');

        link.simulate('load');

        expect(wrapper.props().style.opacity).toEqual(1);
    });

    it('allows pointer events if interactive enabled', () => {
        const path = 'http://example.com/example.css';
        const wrapper = getPreview({
            themeStyleSheet: path,
            interactive: true,
        });

        const preview = wrapper.children();

        expect(preview.props().style.pointerEvents).toEqual('all');
    });

    it('removes pointer events if interactive disabled', () => {
        const path = 'http://example.com/example.css';
        const wrapper = getPreview({
            themeStyleSheet: path,
            interactive: false,
        });

        const preview = wrapper.children();

        expect(preview.props().style.pointerEvents).toEqual('none');
    });
});
