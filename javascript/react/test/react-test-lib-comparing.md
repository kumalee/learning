# react-test-renderer vs enzyme

## Overview
**react-test-renderer**: This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

**enzyme**: Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.
Enzyme's API is meant to be intuitive and flexible by mimicking jQuery's API for DOM manipulation and traversal.

summary: react-test-renderer is simple, enzyme is more ambitious

Let's compared how they perform in the following criteria

## API Count
react-test-renderer: {
    testRenderer: {
        apiCount: 1,
        instance: {
            name: 'TestRenderer Instance',
            apiCount: 6,
            subInstance: {
                name: 'Test Instance',
                apiCount: 11,
            },
        },
    },
    shallowRenderer: {
        instance : {
            name: 'Shallow Render',
            apiCount: 2,
        },
    },
}
enzyme: {
    shallow: {
        aka: 'Shallow Rendering',
        instance: {
            name: 'ShallowWrapper',
            apiCount: 62,
        },
    },
    mount: {
        aka: 'Full Rendering',
        instance: {
            name: 'ReactWrapper',
            apiCount: 62,
        },
    },
    render: {
        aka: 'Static Rendering',
        instance: {
            name: 'CheerioWrapper',
            apiCategroy: {
                Selectors: 1,
                Attributes: 13,
                Forms: 2,
                Traversing: 36,
                Manipulation: 15,
            },
        },
    },
}

## Learning Curve
Winner: react-test-renderer
Reason: Less API to learn

## Function
Winner: enzyme
Reason: Support 3 render ways, More API (like click simulations...)

