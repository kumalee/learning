import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Header, Link } from '../src';

describe('Enzyme: <Header> and <Link>', () => {
  it('Shallow', () => {
    const shallowWrapper = shallow(
      <Header>
        <Link page="https://www.facebook.com/">Facebook</Link>
      </Header>
    );
    expect(shallowWrapper.type()).toBe('h1');
    expect(shallowWrapper.props().children).toStrictEqual(<Link page="https://www.facebook.com/">Facebook</Link>);
    expect(shallowWrapper.find(Link).props().children).toBe('Facebook');
    expect(shallowWrapper.find(Link).props().page).toBe('https://www.facebook.com/');
    expect(shallowWrapper.find(Link).render().text()).toBe('Facebook0');
    expect(shallowWrapper).toMatchSnapshot();
  });

  it('mount', () => {
    const mountWrapper = mount(
      <Header>
        <Link page="https://www.facebook.com/">Facebook</Link>
      </Header>
    );
    expect(mountWrapper.find('h1')).toHaveLength(1);
    expect(mountWrapper.props().children).toStrictEqual(<Link page="https://www.facebook.com/">Facebook</Link>);
    expect(mountWrapper.find('Link').props().children).toBe('Facebook');
    console.log(mountWrapper.debug());
    expect(mountWrapper.find(Link).text()).toBe('Facebook0');
    expect(mountWrapper.find(Link).props().page).toBe('https://www.facebook.com/');
    mountWrapper.find(Link).simulate('click');
    expect(mountWrapper.find(Link).text()).toBe('Facebook1');
    console.log(mountWrapper.debug());
    // ReactWrapper::state() can only be called on class components
    // expect(mountWrapper.find(Link).state().count).toBe(1);
    expect(toJson(mountWrapper)).toMatchSnapshot();
  });

  it('render', () => {
    const cheerioWrapper = render(
      <Header>
        <Link page="https://www.facebook.com/">Facebook</Link>
      </Header>
    );
    expect(toJson(cheerioWrapper)).toMatchSnapshot();
  });
});
