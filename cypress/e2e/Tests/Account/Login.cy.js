import {login as Login} from '@pages/Login.Page'
const {login, endpoint} = Cypress.env('swagLabs')  
const baseUrl = Cypress.env('baseUrl');

describe('Iniciar sesion en SwagLabs',()=>{
    it('TC1:Iniciar sesion con usuario valido',()=>{ 
        cy.visit(baseUrl);
        Login.enterUsername(login.users.correctUser);
        Login.enterPassword(login.users.correctPass)
        Login.submitLogin()
        cy.url().should('include',endpoint.inventory)
    });  
    it('TC2: No poder Iniciar sesion con usuario invalido',()=>{ 
        cy.visit(baseUrl);
        Login.enterUsername(login.users.userInv);
        Login.enterPassword(login.users.correctPass)
        Login.submitLogin()
        cy.contains(login.errorMsg.PassOrUserInv)
    }); 
    it('TC3: No poder Iniciar sesion con password invalido',()=>{ 
        cy.visit(baseUrl);
        Login.enterUsername(login.users.correctUser);
        Login.enterPassword(login.users.passInv)
        Login.submitLogin()
        cy.contains(login.errorMsg.PassOrUserInv)
    }); 
    it('TC4: No poder Iniciar sesion con usuario nulo',()=>{ 
        cy.visit(baseUrl);
        Login.enterPassword(login.users.correctPass)
        Login.submitLogin()
        cy.contains(login.errorMsg.UserNull)
    }); 
    it('TC5: No poder Iniciar sesion con password nulo',()=>{ 
        cy.visit(baseUrl);
        Login.enterUsername(login.users.correctUser);
        Login.submitLogin()
        cy.contains(login.errorMsg.PassNull)
    });
    it('TC6: No poder Iniciar sesion con usuario y passowrd nulos',()=>{ 
        cy.visit(baseUrl);
        Login.submitLogin()
        cy.contains(login.errorMsg.UserNull)
    });
});