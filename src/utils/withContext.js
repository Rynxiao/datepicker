import React from 'react'

export const withContext = (Context, Component) => props => (
  <Context.Consumer>
    {context => <Component {...props} context={context} />}
  </Context.Consumer>
)
