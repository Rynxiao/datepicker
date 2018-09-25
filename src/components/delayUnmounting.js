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
      const { isMounted, delayTime } = this.props
      if (prevProps.isMounted && !isMounted) {
        setTimeout(() => this.setState({ shouldRender: false }), delayTime)
      } else if (!prevProps.isMounted && isMounted) {
        /* eslint-disable react/no-did-update-set-state */
        this.setState({ shouldRender: true })
      }
    }

    render() {
      const { shouldRender } = this.state
      return shouldRender ? <Component {...this.props} /> : null
    }
  }
}
