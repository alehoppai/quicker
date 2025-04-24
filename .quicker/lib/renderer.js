const render = (...entries) => {
  const parsePropsToAttrs = (props) =>
    Object.entries(props).map(([key, value]) => `${key}="${value}"`)

  return entries
    .map((entry) => {
      if (entry.selfClosing) {
        return `<${entry.element} ${parsePropsToAttrs(entry.props)} />`
      }

      if (Array.isArray(entry.children)) {
        if (typeof entry.children[0] === 'string') {
          return `<${entry.element} ${parsePropsToAttrs(entry.props)}>${
            entry.children[0]
          }</${entry.element}>`
        }

        return `<${entry.element} ${parsePropsToAttrs(entry.props)}>${render(
          ...entry.children
        )}</${entry.element}>`
      }
    })
    .join('')
}

export default render
