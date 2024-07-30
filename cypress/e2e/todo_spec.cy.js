/* eslint-disable cypress/no-unnecessary-waiting */
describe("todos", () => {
  // add todos
  // remove a todo
  // check/toggle todo
  // todo count values

  beforeEach(() => {
    cy.login();
  });

  it("should add a todo", () => {
    cy.findByRole("textbox", { name: /title/i }).type("Todo1{enter}");

    cy.findByText(/Todo1/i).should("exist");
  });

  it("should remove a todo", () => {
    cy.findByRole("textbox", { name: /title/i }).type("Todo1{enter}");
    cy.findByRole("textbox", { name: /title/i }).type("Todo2{enter}");

    cy.wait(2000);

    cy.findByTestId(/test-Todo2/i).within(() => {
      cy.findByRole("button", { name: /remove/i }).click();
    });

    cy.findByText(/Todo2/i).should("not.exist");

    cy.findByTestId(/test-Todo1/i).within(() => {
      cy.findByRole("button", { name: /remove/i }).click();
    });

    cy.findByText(/Todo1/i).should("not.exist");
  });

  it.only("should add a todo, click on check todo and remove the todo", () => {
    cy.findByRole("textbox", { name: /title/i }).type("Todo1{enter}");

    cy.wait(1000);
    cy.screenshot();
    

    cy.findByRole("textbox", { name: /title/i }).type("Todo2{enter}");

    cy.wait(1000);
    cy.screenshot();

    cy.findByText(/Total todos: 2/i).should("exist");
    cy.findByText(/Selected todos: 0/i).should("exist");

    cy.findByRole("checkbox", { name: /todo1/i }).click();

    cy.wait(1000);
    cy.screenshot();

    cy.findByText(/todo1/i).should("have.class", "todoLine");

    cy.findByText(/Selected todos: 1/i).should("exist");

    cy.findByTestId(/test-Todo1/i).within(() => {
      cy.findByRole("button", { name: /remove/i }).click();
    });

    cy.findByText(/Todo1/i).should("not.exist");

    cy.findByText(/Total todos: 1/i).should("exist");
    cy.findByText(/Selected todos: 0/i).should("exist");

     cy.findByRole("checkbox", { name: /todo2/i }).click();

     cy.wait(1000);
     cy.screenshot();

     cy.findByText(/todo2/i).should("have.class", "todoLine");

     cy.findByText(/Selected todos: 1/i).should("exist");

     cy.findByTestId(/test-Todo2/i).within(() => {
       cy.findByRole("button", { name: /remove/i }).click();
     });

     cy.findByText(/Todo2/i).should("not.exist");

       cy.findByText(/Total todos: 0/i).should("exist");
       cy.findByText(/Selected todos: 0/i).should("exist");

       cy.screenshot();
  });
});
