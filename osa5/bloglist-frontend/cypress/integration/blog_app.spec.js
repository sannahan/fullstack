describe('blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'name',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('name logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('username')
      cy.get('#password').type('wrongpassword')
      cy.contains('login').click()
      cy.get('#message').should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'name logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'username', password: 'password' })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('testtitle')
      cy.get('#author').type('testauthor')
      cy.get('#url').type('testurl')
      cy.get('#createButton').click()
      cy.contains('added')
      cy.contains('testtitle')
    })

    describe('when one blog added', function () {
      beforeEach(function () {
        cy.addblog({
          title: 'testtitle',
          author: 'testauthor',
          url: 'testurl'
        })
      })

      it('a blog can be liked', function () {
        cy.contains('view')
          .click()
        cy.contains('like')
          .click()
        cy.contains('likes 1')
      })

      it('a blog can be removed by the person who added it', function() {
        cy.contains('view')
          .click()
        cy.contains('remove')
          .click()
        cy.get('html')
          .should('not.contain', 'testtitle')
      })
    })

    describe('when many blogs added', function () {
      beforeEach(function () {
        cy.addblog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.addblog({ title: 'title2', author: 'author2', url: 'url2' })
      })

      it('blogs are arranged from most to least liked', function() {
        cy.contains('title2').as('blog2')
        cy.get('@blog2').contains('view').click()
        cy.get('@blog2').contains('like').click()
        cy.get('#blogs > div').should(blogs => {
          expect(blogs[0]).to.contain.text('title2')
          expect(blogs[1]).to.contain.text('title1')
        })
      })
    })
  })
})