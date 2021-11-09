import React from 'react';
import { act } from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme';
import Preview, { Frame, EndUserSandbox, ThemeStyles } from './Preview';

window.__DEV__ = true;

jest.useRealTimers();

function sleep(timeoutMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeoutMs);
    });
}

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

const getThemeStyles = props => mount(
    <ThemeStyles {...props} />
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

    it('sets opacity to 0 until theme CSS loaded', () => {
        const path = 'http://example.com/example.css';
        const wrapper = getPreview({
            themeStyleSheet: path,
        });

        expect(wrapper.props().style.opacity).toEqual(0);

        const preview = wrapper.children();
        const link = preview.find(ThemeStyles);

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

describe('ThemeStyles', () => {
    const loadingTimeoutThreshold = 200;

    const path = 'http://example.com/example.css';

    it('adds custom theme CSS', () => {
        const wrapper = getThemeStyles({
            stylesheet: path,
            timeout: loadingTimeoutThreshold,
        });

        expect(wrapper.find('link').prop('href')).toEqual(path);
    });

    it('does not trigger onLoad and onError on initial render', () => {
        const onLoad = jest.fn();
        const onError = jest.fn();

        const wrapper = getThemeStyles({
            stylesheet: path,
            timeout: loadingTimeoutThreshold,
            onLoad,
            onError
        });

        expect(onLoad).not.toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
    });

    describe('triggers onLoad', () => {
        it('when resource is loaded in time', () => {
            const onLoad = jest.fn();
            const onError = jest.fn();

            const wrapper = getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
                onError,
            });

            wrapper.find('link').invoke('onLoad')();
            expect(onLoad).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
        });

        it('if no onError passed when resource cannot be loaded', () => {
            const onLoad = jest.fn();

            const wrapper = getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
            });

            wrapper.find('link').invoke('onError')();
            expect(onLoad).toHaveBeenCalled();
        });

        it('if no onError passed when resource cannot be loaded in time', async () => {
            const onLoad = jest.fn();
            getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
            });

            await act(() => sleep(loadingTimeoutThreshold - 50));
            expect(onLoad).not.toHaveBeenCalled();
            await act(() => sleep(100));
            expect(onLoad).toHaveBeenCalled();
        });

        it('only once even if resource is loaded later', async () => {
            const onLoad = jest.fn();
            const wrapper = getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
            });

            await act(() => sleep(loadingTimeoutThreshold));
            wrapper.find('link').invoke('onError')();
            wrapper.find('link').invoke('onLoad')();
            expect(onLoad).toHaveBeenCalledTimes(1);
        });
    });

    describe('triggers onError if specified', () => {
        it('when resource cannot be loaded', () => {
            const onLoad = jest.fn();
            const onError = jest.fn();

            const wrapper = getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
                onError
            });

            wrapper.find('link').invoke('onError')();
            expect(onLoad).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
        });

        it('when resource cannot be loaded in time', async () => {
            const onLoad = jest.fn();
            const onError = jest.fn();
            getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
                onError
            });

            await act(() => sleep(loadingTimeoutThreshold - 50));
            expect(onError).not.toHaveBeenCalled();
            await act(() => sleep(100));
            expect(onError).toHaveBeenCalled();
            expect(onLoad).not.toHaveBeenCalled();
        });

        it('only once even if resource is loaded later', async () => {
            const onLoad = jest.fn();
            const onError = jest.fn();
            const wrapper = getThemeStyles({
                stylesheet: path,
                timeout: loadingTimeoutThreshold,
                onLoad,
                onError
            });

            await act(() => sleep(loadingTimeoutThreshold - 50));
            expect(onError).not.toHaveBeenCalled();
            await act(() => sleep(100));
            wrapper.find('link').invoke('onError')();
            wrapper.find('link').invoke('onLoad')();
            expect(onError).toHaveBeenCalledTimes(1);
            expect(onLoad).not.toHaveBeenCalled();
        });
    });
});
