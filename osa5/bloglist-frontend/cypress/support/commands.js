Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    cy.log(body)
    localStorage.setItem('loggedInUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addblog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs/',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
    }
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})