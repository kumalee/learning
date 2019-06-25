import React from 'react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Header, Link } from '../src';

describe('<Header> and <Link>', () => {
  it('ShallowRenderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Header>
        <Link page="https://www.facebook.com/">Facebook</Link>
      </Header>
    );
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('h1');
    expect(result.props.children).toStrictEqual(<Link page="https://www.facebook.com/">Facebook</Link>);
    expect(result.props.children.props.page).toBe("https://www.facebook.com/");
    expect(result.props.children.props.children).toBe("Facebook");
    expect(result).toMatchSnapshot();
  });

  it('testRenderer', () => {
    const testRenderer = TestRenderer.create(
      <Header>
        <Link page="https://www.facebook.com/">Facebook</Link>
      </Header>
    );
    const instance = testRenderer.root;
    expect(instance.findByType('h1').type).toBe('h1');
    expect(instance.props.children).toStrictEqual(<Link page="https://www.facebook.com/">Facebook</Link>);
    expect(instance.findByType(Link).props.page).toBe("https://www.facebook.com/");
    expect(instance.findByType(Link).props.children).toBe("Facebook");
    const result = testRenderer.toJSON();
    expect(result).toMatchSnapshot();
  });
});
