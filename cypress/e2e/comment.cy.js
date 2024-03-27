describe('Checks comment section', () => {
  beforeEach(() => {
    cy.visit('https://techinsightsblog.com/')
    cy.title().should('eq', 'TechInsightsBlog')
    cy.get('.comments-link > a').should('have.text', 'Leave a comment')
    cy.get('.inside-article').screenshot('comment-page-link-visible', { overwrite: true })

    cy.get('.comments-link > a').click()
    cy.get('.comment-respond', { timeout: 10000 }).should('be.visible')
  })
 
  it('checks comment section and input field visibility', () => {
    cy.get('.comment-reply-title').should('contain.text', 'Leave a Comment')
    cy.get('#comment').should('be.visible')
    cy.get('input[name=author]').should('be.visible')
    cy.get('input[name=email]').should('be.visible')
    cy.get('input[name=url]').should('be.visible')
    cy.get('input[type=checkbox]').should('be.visible')
    cy.get('input[type=submit]').should('be.visible')

    cy.get('.comments-area').screenshot('input-fields-visible', { overwrite: true })
  })
 
  it('submits a valid comment', () => {
    const validComment = `This is a valid comment - ${Date.now()}` // Prevents duplication
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
 
    cy.get('ol.comment-list').should('have.length.greaterThan', 0)
    cy.get('ol.comment-list').first().contains('.comment-awaiting-moderation', 'Your comment is awaiting moderation.').should('exist')
    cy.get('.comment-body').screenshot('valid-comment-posted', { overwrite: true })
  })

  
  it('submits a comment with an empty comment field', () => {
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', 'Please type your comment text').should('be.visible')
    cy.screenshot('error-message-for-empty-comment', { overwrite: true })
  })

  it('submits a comment with an empty name field', () => {
    const validComment = `This is a valid comment - ${Date.now()}`
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', ' Please fill the required fields').should('be.visible')
    cy.screenshot('error-message-for-empty-name', { overwrite: true })
  })

  it('submits a comment with an empty email field', () => {
    const validComment = `This is a valid comment - ${Date.now()}`
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', ' Please fill the required fields').should('be.visible')
    cy.screenshot('error-message-for-empty-email', { overwrite: true })
  })

  it('submits an empty comment field with all empty required field', () => {
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', ' Please fill the required fields').should('be.visible')
    cy.screenshot('error-message-for-all-empty-field', { overwrite: true })
  })

  it('submits a comment with an invalid email', () => {
    const validComment = `This is a valid comment - ${Date.now()}`
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', 'Please enter a valid email address').should('be.visible')
    cy.screenshot('error-message-for-invalid-email', { overwrite: true })
  })

  

  it('Reply to an unapproved comment', () => {
    const validReply = `This is a valid reply - ${Date.now()}`
    const validComment = `This is a valid comment - ${Date.now()}` // Prevents duplication
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
 
    cy.get('ol.comment-list').should('have.length.greaterThan', 0)
    cy.get('ol.comment-list').first().contains('.comment-awaiting-moderation', 'Your comment is awaiting moderation.').should('exist')
    cy.get('.reply').contains('a', 'Reply').click()
    cy.get('#comment').type(validReply, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', 'Sorry, replies to unapproved comments are not allowed.').should('be.visible')
    cy.screenshot('error-message-for-unapproved-comment-reply', { overwrite: true })
  })

  
  it('Cancel Reply', () => {
    const validReply = `This is a valid reply - ${Date.now()}`
    const validComment = `This is a valid comment - ${Date.now()}` // Prevents duplication
    cy.get('#comment').type(validComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
 
    cy.get('ol.comment-list').should('have.length.greaterThan', 0)
    cy.get('ol.comment-list').first().contains('.comment-awaiting-moderation', 'Your comment is awaiting moderation.').should('exist')
    cy.get('.reply').contains('a', 'Reply').click()
    cy.get('#comment').type(validReply, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })

    cy.get('#cancel-comment-reply-link').contains('Cancel reply').click()
 
  })

  it('Prevent similar comment', () => {
    const duplicateComment = `This comment will be duplicated - ${Date.now()}`
    cy.get('#comment').type(duplicateComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()

    cy.get('#comment').type(duplicateComment, { delay: 50 })
    cy.get('input[name=author]').type('John Doe', { delay: 50 })
    cy.get('input[name=email]').type('john.doe@example.com', { delay: 50 })
    cy.get('input[name=url]').type('https://example.com', { delay: 50 })
 
    cy.get('input[type=submit]').click()
    cy.contains('[id = "error-page"]', 'Duplicate comment detected; it looks as though you’ve already said that!').should('be.visible')
 
    cy.screenshot('error-message-for-duplicate-comment', { overwrite: true })    
  })
})
