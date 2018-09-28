/* eslint-disable */
(function (ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
      const element = this
      let elements = (element.document || element.ownerDocument).querySelectorAll(selector)
      let index = 0

      while (elements[index] && elements[index] !== element) {
        ++index
      }

      return Boolean(elements[index])
    }
  }

  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      let element = this

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element
        }

        element = element.parentNode
      }

      return null
    }
  }
}(window.Element.prototype))
