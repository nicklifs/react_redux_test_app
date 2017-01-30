import React from 'react'
import { shallow } from 'enzyme'
import Home from './../components/Tests/Home'
import Wellcome from './../components/Tests/Wellcome';

describe('<Home />', () => {
    it('should render self and Wellcome', () => {
        const renderedComponent = shallow(
            <Home username={'Alice'} changeUsername={jest.fn()} />
        );

        // Выведем отрендеренный компонент
        console.log(renderedComponent.debug());

        expect(renderedComponent.find('section').hasClass('home')).toBe(true);
        expect(renderedComponent.find('h1').text()).toBe('Home');
        expect(renderedComponent.find('input').length).toBe(1);

        expect(renderedComponent.find(Wellcome).props().username).toBeDefined();
        expect(renderedComponent.contains(<Wellcome username={'Alice'} />)).toBe(true);
    });

    it('should call changeUsername on input changes', () => {
        const changeUsernameSpy = jest.fn();

        const renderedComponent = shallow(
            <Home username={'Alice'} changeUsername={changeUsernameSpy} />
        );

        renderedComponent.find('input').simulate('change', { target: { value: 'Test' } });
        expect(changeUsernameSpy).toBeCalledWith('Test');
    });
});