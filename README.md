# react-functional

Add life cycle methods to stateless functional components,
without the class noise. 

```sh
npm i -g --save react-functional
```

## functional(component)

### Pass life cycle methods as an options object

```javascript
import { React } from 'react'
import functional from 'react-functional'

function ComponentA(props) {
  return <div>{ props.name }</div>
}

const options = {
  shouldComponentUpdate: (props, nextProps) =>
    props.name !== nextProps.name
}

export default functional(ComponentA, options)
```

### Add life cycle methods to function component

```javascript
import { React } from 'react'
import functional from 'react-functional'

function ComponentA(props) {
  return <div>{ props.name }</div>
}

ComponentA.shouldComponentUpdate = (props, nextProps) =>
  props.name !== nextProps.name

export default functional(ComponentA)
```

### Compose component from an object

```javascript
import { React } from 'react'
import functional from 'react-functional'

function shouldComponentUpdate(props, nextProps) {
  return props.name !== nextProps.name
}

function render(props) {
  return <div>{ props.name }</div>
}

export default functional({shouldComponentUpdate, render})
```

### Access Component Instance

Since this isn't a class, using `this` to lookup a component
instance is undesirable (and probably bug-prone). So react-functional
passes the component instance as the last argument of the render method
and all life cycle methods

```js
import { React } from 'react'
import functional from 'react-functional'

function ComponentA(props, cmp) {
  return <input ref='name' onClick={()=>console.log(cmp.refs.name.value)}/>
}

const options = {
  componentWillReceiveProps: (nextProps, cmp) => 
    cmp.refs.name.value = nextProps.name
}

export default functional(ComponentA, options)

```

### Supported properties

- `propTypes`
- `defaultProps`
- `displayName` (auto-detected from function names)

### Supported methods

- `componentWillMount(props)`
- `componentDidMount(props, refs)`
- `componentWillReceiveProps(props, nextProps, refs)`
- `shouldComponentUpdate(props, nextProps, refs)`
- `componentWillUpdate(props, nextProps, refs)`
- `componentDidUpdate(props, prevProps, refs)`
- `componentWillUnmount(props, refs)`

## Test Coverage

```sh
npm run cov
```

| File      |  % Stmts | % Branch |  % Funcs |  % Lines |
|-----------|----------|----------|----------|----------|
| All files |      100 |      100 |      100 |      100 |

```sh
npm test
```

```sh
test/index.js
  function component
    ✓ componentWillMount called
    ✓ render function called
    ✓ div element rendered
    ✓ prop passed through
    ✓ instance passed through render
    ✓ instance passed through lifecycle methods

  function w/ options object
    ✓ componentWillMount called
    ✓ render function called
    ✓ div element rendered
    ✓ prop passed through
    ✓ instance passed through render
    ✓ instance passed through lifecycle methods

  object component
    ✓ componentWillMount called
    ✓ render function called
    ✓ div element rendered
    ✓ prop passed through
    ✓ instance passed through render
    ✓ instance passed through lifecycle methods
```

## Thanks

* [react-stateless](http://npmjs.com/react-stateless) for inspiration and code
* [nearForm](http://nearform.com) for sponsoring
