import elements from '../.quicker/lib/elements.js'

const { div, h3, span, label, form, input, button, ul, li } = elements

function postsPage({ posts }) {
  return div(
    { id: 'root' },
    h3({}, 'Do you want to participate?'),
    form(
      {},
      div(
        { class: 'form-item' },
        label({ for: 'name-input' }, 'Name'),
        input({
          placeholder: 'Type your text here',
          id: 'name-input',
          name: 'name-input',
        }),
        span({ class: 'form-item-description' }, 'Type name of a participant')
      ),
      button({ type: 'submit' }, 'Participate!')
    ),
    ul({},
      ...posts.map(post => li({}, JSON.stringify(post)))
    )
  )
}

export default {
  page: postsPage,
  path: 'posts',
  title: 'Posts',
  data: 'posts',
}
