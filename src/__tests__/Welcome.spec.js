import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import Wellcome from './../components/Tests/Wellcome'

describe('<Welcome />', () => {
    it('Renders wellcome message to user', () => {
        const onClickSpy = jest.fn();
        const username = 'Alice';

        var ReactTestUtils = require('react-addons-test-utils');
        const component = ReactTestUtils.renderIntoDocument(
            <Wellcome username= {username} someFunction={onClickSpy} />
        );
        const span = TestUtils.findRenderedDOMComponentWithTag(
            component, 'span'
        );

        TestUtils.Simulate.click(span);

        expect(span.textContent).toBe('Wellcome Alice');
        expect(onClickSpy).toBeCalledWith(username);
    });

    it('Renders wellcome message to user - snapshot', () => {
        const onClickSpy = jest.fn();
        const username = 'Alice';

        const component = renderer.create(
            <Wellcome username={username} someFunction={onClickSpy} />
        );
        console.log(component.props);
        const json = component.toJSON();
        
        expect(json).toMatchSnapshot();
        //expect(onClickSpy).toBeCalledWith(username); // error
    });
});