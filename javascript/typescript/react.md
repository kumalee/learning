1. Import React
```ts
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```
with `"allowSyntheticDefaultImports": true` in `tsconfig.json`
```ts
import React from 'react';
import ReactDOM from 'react-dom';
```

2. Function Components
```ts
type AppProps = { message: string }; 
/* could also use interface */

const App = ({ message }: AppProps) => <div>{message}</div>;
```

with `React.FunctionComponent`, it provides an implicit definition of `children`
```ts
const App: React.FC<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```
```ts
// this is the better style to be explicit about components that consume children

const Title: React.SFC<{ title: string }> = ({ children, title }) => (
    <div title={title}>{children}</div>
);
```

3. Hooks
#### useState
```ts
const [val, toggle] = React.useState(false); 
// `val` is inferred to be a boolean, `toggle` only takes booleans
```
```ts
const [user, setUser] = React.useState<IUser | null>(null);

// later...
setUser(newUser);
```
#### useRef
```ts
// creating a ref container that does not have an initial value

// ref1.current read-only
// be passed in to built-in ref attributes that React will manage (because React handles setting the current value for you)
const ref1 = useRef<HTMLElement>(null!);

// ref2.current mutable
// for "instance variables" that you manage yourself
const ref2 = useRef<HTMLElement | null>(null);

function TextInputWithFocusButton() {
  // initialise with null, but tell TypeScript we are looking for an HTMLInputElement
  const inputEl = React.useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    // strict null checks need us to check if inputEl and current exist.
    // but once current exists, it is of type HTMLInputElement, thus it
    // has the method focus! ✅
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      {/* in addition, inputEl only can be used with input elements. Yay! */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
#### useEffect
When using useEffect, take care not to return anything other than a function or undefined, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:
```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;
  // bad! setTimeout implicitly returns a number because the arrow function body isn't wrapped in curly braces
  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  return null;
}
```
#### useReducer
```ts
type Action =
  | { type: 'SET_ONE'; payload: string }
  | { type: 'SET_TWO'; payload: number };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ONE':
      return {
        ...state,
        one: action.payload // `payload` is string
      };
    case 'SET_TWO':
      return {
        ...state,
        two: action.payload // `payload` is number
      };
    default:
      return state;
  }
}
```
#### Custom Hooks
If you are returning an array in your Custom Hook, you will want to avoid type inference as Typescript will infer a union type (when you actually want different types in each position of the array). Instead, use [TS 3.4 const assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions):
```ts
export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; 
  // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

4. Class Components
```ts
type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```
#### Class Methods
```ts
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    // like this
    this.setState(state => ({
      count: state.count + amt
    }));
  };
}
```
#### Class Properties
```ts
class App extends React.Component<{
  message: string;
}> {
  pointer: number; // like this
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>
        {this.props.message} and {this.pointer}
      </div>
    );
  }
}
```

5. Typing defaultProps
#### Function components
Just type your props like normal, except don't use React.FC(break defaultProps)
```ts
type Props = { age: number } & typeof defaultProps;
const defaultProps = {
  who: 'Johny Five'
};

const Greet = (props: Props) => {
  /*...*/
};
Greet.defaultProps = defaultProps;
```
#### Class component
there are a couple ways to do it(including using the Pick utility type) but the recommendation is to "reverse" the props definition:
```ts
type GreetProps = typeof Greet.defaultProps & {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    name: 'world'
  };
  /*...*/
}

// Type-checks! No type assertions needed!
let el = <Greet age={3} />;
```

6. Types or Interfaces?
    * always use interface for public API's definition when authoring a library or 3rd party ambient type definitions.
    * consider using type for your React Component Props and State, because it is more constrained.
    * Types are useful for union types (e.g. type MyType = TypeA | TypeB) whereas Interfaces are better for declaring dictionary shapes and then implementing or extending them.

    Useful table for Types vs Interfaces
![Useful table for Types vs Interfaces](https://camo.githubusercontent.com/f00cd1e1d40c197e5cdb82c383952241d7e0dc10/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f4477562d6f4f7358634149637432712e6a7067)

7. Basic Prop Types Examples
Notice we have used the TSDoc /** comment */ style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our Commenting Components section in the Advanced Cheatsheet.
```ts
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: 'waiting' | 'success';
  /** any object as long as you dont use its properties (not common) */
  obj: object;
  obj2: {}; // same
  /** an object with defined properties (preferred) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

8. Useful React Prop Type Examples
```ts
export declare interface AppProps {
  children1: JSX.Element; // bad, doesnt account for arrays
  children2: JSX.Element | JSX.Element[]; // meh, doesnt accept functions
  children3: React.ReactChildren; // despite the name, not at all an appropriate type; it is a utility
  children4: React.ReactChild[]; // better
  children: React.ReactNode; // best, accepts everything
  functionChildren: (name: string) => React.ReactNode; // recommended function as a child render prop type
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  props: Props & React.PropsWithoutRef<JSX.IntrinsicElements['button']>; // to impersonate all the props of a button element without its ref
}
```

9. Forms and Events
```ts
// inline
const el = (
  <button
    onClick={event => {
      /* ... */
    }}
  />
);

// separately
class App extends React.Component<
  {},
  {
    // no props
    text: string;
  }
> {
  state = {
    text: ''
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```
Instead of typing the arguments and return values with React.FormEvent<> and void, you may alternatively apply types to the event handler itself (contributed by @TomasHubelbauer):
```ts
// typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

If you don't quite care about the type of the event, you can just use React.SyntheticEvent. If your target form has custom named inputs that you'd like to access, you can use type widening:

```ts
<form
  ref={formRef}
  onSubmit={(e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    // etc...
  }}
>
  <div>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  </div>
  <div>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
  </div>
  <div>
    <input type="submit" value="Log in" />
  </div>
</form>
```

10. Context

Using React.createContext and context getters to make a createCtx with no defaultValue, yet no need to check for undefined:
```ts
// create context with no upfront defaultValue
// without having to do undefined check all the time
function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as [() => A, typeof ctx.Provider];
}

// usage

export const [useCtx, SettingProvider] = createCtx<string>(); // no need to specify value upfront!
export function App() {
  const key = useCustomHook('key'); // get a value from a hook, must be in a component
  return (
    <SettingProvider value={key}>
      <Component />
    </SettingProvider>
  );
}
export function Component() {
  const key = useCtx(); // can still use without null check!
  return <div>{key}</div>;
}
```

11. forwardRef/createRef

createRef:
```ts
class CssThemeProvider extends React.PureComponent<Props> {
  private rootRef = React.createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```
forwardRef:
```ts
type Props = { children: React.ReactNode; type: 'submit' | 'button' };
export type Ref = HTMLButtonElement;
export const FancyButton = React.forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

12. Portals

Using ReactDOM.createPortal:
```ts
const modalRoot = document.getElementById('modal-root') as HTMLElement;
// assuming in your html file has a div with id 'modal-root';

export class Modal extends React.Component {
  el: HTMLElement = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

13. Enum Types
```ts
export enum ButtonSizes {
  default = 'default',
  small = 'small',
  large = 'large'
}

export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

14. Using Inferred Types

Leaning on Typescript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with typeof, you won't have to do that. Just use it on any value:
```ts
const [state, setState] = React.useState({
  foo: 1,
  bar: 2
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```

15. Using Partial Types
```ts
const [state, setState] = React.useState({
  foo: 1,
  bar: 2
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in React.useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

16. The Types I need weren't exported!

Grabbing the Prop types of a component: Use React.ComponentProps and typeof, and optionally Omit any overlapping types
```ts
import { Button } from 'library'; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, 'onClick'>; // modify
const AlertButton: React.FC<AlertButtonProps> = props => (
  <Button onClick={() => alert('hello')} {...props} />
);
```
You may also use ComponentPropsWithoutRef (instead of ComponentProps) and ComponentPropsWithRef (if your component specifically forwards refs)
```ts
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

17. Troubleshooting Handbook: Images and other non-TS/TSX files

Use declaration merging:
```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module '*.png';

// importing in a tsx file
import * as logo from './logo.png';
```

18. Troubleshooting Handbook: TSLint
```ts
/* tslint:disable */ total disable
// tslint:disable-line just this line
/* tslint:disable:semicolon */ sometimes prettier adds semicolons and tslint doesn't like it.
/* tslint:disable:no-any */ disable tslint restriction on no-any when you WANT to use any
/* tslint:disable:max-line-length */ disable line wrapping linting
```

19. Troubleshooting Handbook: tsconfig.json
```ts
{
  "compilerOptions": {
    "outDir": "build/lib",
    "module": "commonjs",
    "target": "es5",
    "lib": ["es5", "es6", "es7", "es2017", "dom"],
    "sourceMap": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "baseUrl": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "strict": true,
    "esModuleInterop": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "scripts"]
}

// esModuleInterop: disables namespace imports (import * as foo from "foo") and enables CJS/AMD/UMD style imports (import fs from "fs")

// strict: strictPropertyInitialization forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.
```

20. Troubleshooting Handbook: Bugs in official typings

If you run into bugs with your library's official typings, you can copy them locally and tell TypeScript to use your local version using the "paths" field. In your tsconfig.json:

```json
{
  "compilerOptions": {
    "paths": {
      "mobx-react": ["../typings/modules/mobx-react"]
    }
  }
}
```

If you just need to add an interface, or add missing members to an existing interface, you don't need to copy the whole typing package. Instead, you can use declaration merging:

```ts
/ my-typings.ts
declare module 'plotly.js' {
  interface PlotlyHTMLElement {
    removeAllListeners(): void;
  }
}

// MyComponent.tsx
import { PlotlyHTMLElement } from 'plotly.js';
import './my-typings';
const f = (e: PlotlyHTMLElement) => {
  e.removeAllListeners();
};
```


