import React, { useState } from 'react';

export function Header(props) {
    return <h1>{props.children}</h1>;
}
Header.displayName = 'Header';

export function Link(props) {
    const [count, setCount] = useState(0);
    return <a href={props.page} onClick={() => setCount(count + 1)}>{props.children}{count}</a>;
}
