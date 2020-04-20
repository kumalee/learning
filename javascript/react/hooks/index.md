# Brief
1. useState vs useReducer
    * useState
        1. You can call useState three different ways:
        ```
        useState() // no initial value
        useState(initialValue) // a literal initial value
        useState(() => initialValue) // a lazy initial value, will be executed only on the initial render
        ```
    * useReducer
        1. call useReducer
        ```
        const reducerFn = (prevState, dispatchArg) => newState
        const [state, dispatch] = React.useReducer(reducerFn, initialValue)
        ```
        2. with useReducer, if you want to have lazy initialization, then you provide a third argument which is your initialization function and the second argument serves as an argument to that initialization function, so you can rename that to something like initialArg
        ```
        const reducerFn = (prevState, dispatchArg) => newState
        const initializationFn = initialArg => initialValue
        const [state, dispatch] = useReducer(reducerFn, initialArg, initializationFn)
        ```
        3. The useReducer-based useState implementation
        ```
        const useStateReducer = (prevState, newState) =>
            typeof newState === 'function' ? newState(prevState) : newState
        const useStateInitializer = initialValue =>
            typeof initialValue === 'function' ? initialValue() : initialValue
        function useState(initialValue) {
            return React.useReducer(useStateReducer, initialValue, useStateInitializer)
        }
        ```
    * [blog - implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)
3. useEffect vs useLayoutEffect
    * useEffect
        1. If you refactor any of your class components to use hooks, you'll likely move any code from componentDidMount, componentDidUpdate, and componentWillUnmount to useEffect.
        2. This runs after react renders your component and ensures that your effect callback does not block browser painting.
        3. This differs from the behavior in class components where componentDidMount and componentDidUpdate run synchronously after rendering. It's more performant this way and most of the time this is what you want.
        4. If your effect is mutating the DOM, the user could see a flicker. You should use useLayoutEffect.
    * useLayoutEffect
        1. This runs synchronously immediately after React has performed all DOM mutations.
        2. This can be useful if you need to make DOM measurements (like getting the scroll position or other styles for an element) and then make DOM mutations or trigger a synchronous re-render by updating state.
        3. As far as scheduling, this works the same way as componentDidMount and componentDidUpdate. Your code runs immediately after the DOM has been updated, but before the browser has had a chance to "paint" those changes (the user doesn't actually see the updates until after the browser has repainted).
    * summary
        1. useEffect: If you don't need to interact with the DOM at all or your DOM changes are unobservable (seriously, most of the time you should use this).
        2. useLayoutEffect: If you need to mutate the DOM and/or DO need to perform measurements
    * [blog - useEffect vs useLayoutEffect](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)
5. useCallback vs useMemo
    * useCallback: execute every re-render
    * useMemo: execute only the dependencies are changed
    * summary
        1. Performance optimizations are not free. They ALWAYS come with a cost but do NOT always come with a benefit to offset that cost.
        2. There are specific reasons both of these hooks are built-into React:
            1. Referential equality
            2. Computationally expensive calculations
    * [blog - When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
6. useContext

7. useRef
    There is two situations to use useRef
    1. useRef as a variable like setTimeout/setInterval Identifier
    2. useRef as a dom element reference.

    sample code here
    ```jsx
    // 1.
    import React, { useRef, useEffect } from 'react';

    const Counter = props => {
        const timer = useRef(null);

        useEffect(() => {
            // clear interval when component unmount
            return () => {
                clearInterval(timer.current);
            }
        }, []);

        function start() {
            timer.current = setInterval(() => {
                console.log(new Date());
            }, 1000);
        }, []);

        function stop() {
            clearInterval(timer.current);
        }

        return (
            <div>
                <button onClick={start}>Start</button>
                <button onClick={stop}>Stop</button>
            </div>
        )
    }

    // 2.
    import React, { useRef, useEffect } from 'react';
    import some3rdEffect from 'some3rdEffect';

    function tooltip(props) {
        const tooltipRef = useRef();
        useEffect(() => {
            some3rdEffect.init(tooltipRef.current);
            return () => tooltipRef.current.some3rdEffect.destroy();
        });
        return (
            <div ref={tooltipRef}>
            </div>
        )
    }
    ```
8. customHooks

# resources and sample code
0. [video lesson - react hooks and suspense](https://egghead.io/playlists/react-hooks-and-suspense-650307f2)
1. [sample code - useHooks](https://usehooks.com)
2. [useMultipleKeyboards](https://codesandbox.io/s/y3qzyr3lrz)
