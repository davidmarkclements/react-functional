import React from 'react'
import {render} from 'react-shallow-renderer'
import {test} from 'babel-tap'
import functional from '../lib'

test(`function component`, async ({plan, pass, is}) => {
  plan(4)
  const component = ({name}) => {
    pass('render function called')
    return (<div>{name}</div>)
  }

  component.componentWillMount = () => 
    pass('componentWillMount called')
  
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
})

test(`function w/ options object`, async ({plan, pass, is}) => {
  plan(4)
  const component = ({name}) => {
    pass('render function called')
    return (<div>{name}</div>)
  }

  const options = {
    componentWillMount: () => pass('componentWillMount called')
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
})


test(`object component`, async ({plan, pass, is}) => {
  plan(4)
  const component = {
    componentWillMount: () => pass('componentWillMount called'),
    render: ({name}) => {
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
})


