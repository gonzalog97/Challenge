import {login as Login} from '@pages/Login.Page'
import {inv} from '@pages/Inventory.Page'
import {cart} from '@pages/ShopingCart.Page'
const {login, endpoint} = Cypress.env('swagLabs')  

describe('Agregar productos al carrito de compras',()=>{
    beforeEach("Usuario inicia sesion en la pagina SwagLabs",()=>{
        //Ir a swaglabs
        cy.visit('https://www.saucedemo.com/ ') 
        //Iniciar sesion 
        cy.log(login)
        Login.enterUsername(login.users.correctUser)
        Login.enterPassword(login.users.correctPass)
        Login.submitLogin()
        cy.url().should('include',endpoint.inventory)
    })
    it("TC1: Validar agregar un producto al SC",()=>{
        //Agregar un producto 
        inv.addOneProduct()
        //Validar icono en SC
        cart.get.quantityProducts().should('have.text','1')
        //Ir al SC y validar cards 
        cart.goToSC()
        cy.url().should('include',endpoint.cart)
        cy.url().should('include','cart')
        cy.get('.cart_item').should('be.visible')
    })
    it('TC2: Validar agregar mas de un producto al SC',()=>{
        inv.get.addProduct().then((products)=>{
            //Agregar mas de un producto y almacenar info
            //Genera un numero random del 2 a la cantidad de elementos disponibles (6)
            let x = Math.floor(Math.random() * (products.length -1 ) + 2 )
            inv.addProducts(x) 
            //Validar icono en SC
            cart.get.quantityProducts().should('have.text',x) 
            //Ir al SC y validar cards 
            cart.goToSC()
            cy.url().should('include',endpoint.cart)
            cy.url().should('include','cart')
            cy.get('.cart_item').should('have.length',x-1)
        })        
    })
    it('TC: Listado de Apartamentos',()=>{
        cy.request('https://www.mercadolibre.com.ar/menu/departments').then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('departments')
            expect(response.body.departments).to.be.not.empty
        })
    })
})