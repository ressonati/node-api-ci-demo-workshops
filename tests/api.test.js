import {expect} from "chai"
import pkg from 'pactum'
const {spec}  = pkg;
import  'dotenv/config'
import {baseUrl, userId} from '../helpers/data.js';



let authToken; 
describe("Api tests", () => {
    it("get requests", async () => {
        const response = await spec()
            .get(`${baseUrl}/BookStore/v1/Books`) 
            .inspect();
        
        expect(response.statusCode).to.eql(200);
        expect(response.body.books[1].title).to.eql("Learning JavaScript Design Patterns");
        expect(response.body.books[1].author).to.eql("Addy Osmani");
        console.log(process.env.SECRET_PASSWORD);
    });

    it.skip("Create a user", async () => {
        const response = await spec()
            .post(`${baseUrl}/Account/v1/user`)
            .withBody({
                userName: "mnowako",
                password: process.env.SECRET_PASSWORD 
            })
            .inspect();

        expect(response.statusCode).to.eql(201);
        
    });

    it("Authorize user", async () => {
        const response = await spec()
            .post(`${baseUrl}/Account/v1/Authorized`) // Dodano brakujący ukośnik
            .withBody({
                userName: "mnowako",
                password: process.env.SECRET_PASSWORD  
            })
            .inspect();
        
        expect(response.statusCode).to.eql(200);
    });

    it("Generate token", async () => {
        const response = await spec()
            .post("https://demoqa.com/Account/v1/GenerateToken") 
            .withBody({
                userName: "mnowako",
                password: process.env.SECRET_PASSWORD  
            })
            .inspect();
        
        expect(response.statusCode).to.eql(200); 
        authToken = response.body.token;
        console.log(authToken); 
    });
    it("check token", async () => { console.log("another it blokcs" + authToken)})
    it.skip("Create a book", async () => {
        const response = await spec()
            .post(`${baseUrl}/BookStore/v1/Books`)
            .withBearerToken(authToken) // Poprawione wywołanie z kropką
            .withBody({
                userId: userId, // Poprawione przypisanie
                collectionOfIsbns: [{
                    isbn: "9781491950296"
                }]
            })
            .inspect(); // Możesz dodać `.inspect()` do wyświetlenia szczegółów odpowiedzi
    
        expect(response.statusCode).to.eql(201);
        console.log("Response:", response.body);
    });
    it.skip("delete a book", async () => {
        const response = await spec()
            .delete(`${baseUrl}/BookStore/v1/Books`)
            .withBearerToken(authToken) // Poprawione wywołanie z kropką
            .withBody({
                userId: userId, // Poprawione przypisanie
                collectionOfIsbns: [{
                    isbn: "9781449337711"
                }]
            })
            .inspect(); // Możesz dodać `.inspect()` do wyświetlenia szczegółów odpowiedzi
    
        expect(response.statusCode).to.eql(201);
        console.log("Response:", response.body);
    });
    it("check books in user", async () => {
        const response = await spec()
         .get(`${baseUrl}/Account/v1/User/${userId}`)
         .withBearerToken(authToken) // Poprawione wywołanie z kropką
         .inspect();
        expect(response.statusCode).to.eql(200); })
});