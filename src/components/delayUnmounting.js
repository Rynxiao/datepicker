/* eslint-disable react/no-did-update-set-state */
import React from 'react'

export default function delayUnmounting(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      const { isMounted } = this.props
      this.state = {
        shouldRender: isMounted,
      }
    }

    componentDidUpdate(prevProps) {
      const { isMounted, delayTime, animation } = this.props
      if (prevProps.isMounted && !isMounted) {
        if (animation) {
          setTimeout(() => this.setState({ shouldRender: false }), delayTime)
        }
        this.setState({ shouldRender: false })
      } else if (!prevProps.isMounted && isMounted) {
        this.setState({ shouldRender: true })
      }
    }

    render() {
      const { shouldRender } = this.state
      return shouldRender ? <Component {...this.props} /> : null
    }
  }
}
