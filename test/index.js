import React from 'react'
import {render} from 'react-shallow-renderer'
import {test} from 'babel-tap'
import functional from '../lib'

test(`function component`, async ({plan, pass, is, contains}) => {
  plan(6)
  let instance1
  let instance2
  const component = ({name}, cmp) => {
    instance1 = cmp
    pass('render function called')
    return (<div>{name}</div>)
  }

  component.componentWillMount = (props, refs, cmp) => {
    instance2 = cmp
    pass('componentWillMount called')
  }
  
  const Component = functional(component)
  const rendered = render(<Component name='test'/>)
  const {type, props:{children}} = rendered

  {
    const actual = type
    const expected = 'div'
    is(actual, expected, 'div element rendered')
  }

  {
    const actual = children
    const expected = 'test'
    is(actual, expected, 'prop passed through')
  }

  {
    const actual = instance1
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through render')
  }

  {
    const actual = instance2
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through lifecycle methods')
  }


})

test(`function w/ options object`, async ({plan, pass, is, contains}) => {
  plan(6)
  let instance1
  let instance2
  const component = ({name}, cmp) => {
    instance1 = cmp
    pass('render function called')
    return (<div>{name}</div>)
  }

  const options = {
    componentWillMount: (props, refs, cmp) => {
      instance2 = cmp
      pass('componentWillMount called')
    }
  }

  
  const Component = functional(component, options)
  const rendered = render(<Component name='test'/>)
  const {type, props:{children}} = rendered

  {
    const actual = type
    const expected = 'div'
    is(actual, expected, 'div element rendered')
  }

  {
    const actual = children
    const expected = 'test'
    is(actual, expected, 'prop passed through')
  }

  {
    const actual = instance1
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through render')
  }

  {
    const actual = instance2
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through lifecycle methods')
  }
})


test(`object component`, async ({plan, pass, is, contains}) => {
  plan(6)
  let instance1
  let instance2

  const component = {
    componentWillMount: (props, refs, cmp) => {
      instance2 = cmp
      pass('componentWillMount called')
    },
    render: ({name}, cmp) => {
      instance1 = cmp
      pass('render function called')
      return (<div>{name}</div>)
    } 
  }
  
  const Component = functional(component)
  const rendered = render(<Component name='test'/>)

  const {type, props:{children}} = rendered

  {
    const actual = type
    const expected = 'div'
    is(actual, expected, 'div element rendered')
  }

  {
    const actual = children
    const expected = 'test'
    is(actual, expected, 'prop passed through')
  }

  {
    const actual = instance1
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through render')
  }

  {
    const actual = instance2
    const expected = {props:{name:'test'}}
    contains(actual, expected, 'instance passed through lifecycle methods')
  }
})


