import {expect} from "chai"
import pkg from 'pactum'
const {spec}  = pkg;
import  'dotenv/config'
import {baseUrl, userId} from '../helpers/data.js';



describe("Api tests", () => {
    it("get requests", async () => {
        const response = await spec()
            .get(`${baseUrl}/BookStore/v1/Books"`)
            .inspect();
        expect(response.statusCode).to.eql(200);
        expect(response.body.books[1].title).to.eql("Learning JavaScript Design Patterns");
        expect(response.body.books[1].author).to.eql("Addy Osmani");      
        console.log(process.env.SECRET_PASSWORD);
    });

    it.skip("Create a user", async () =>{
        const response = await spec()
        .post(`${baseUrl}/Account/v1/user`)
        .withBody({
            userName: "mnowako",
            password: proces.env.SECRET_PASSWORD
        })
        .inspect();
        expect(response.statusCode).to.eql(201)
        //
    //"userID": "86975054-e418-4cb5-b78d-4b02fb8b49b4",
    })
    it("Authorize user", async () => {
        const response = await spec()
            .post(`${baseUrl}Account/v1/Authorized`)
            .withBody({
                userName: "mnowako",
                password: process.env.SECRET_PASSWORD  
            })
            .inspect();
        
        expect(response.statusCode).to.eql(200);
    });
    it("Generate token", async () => {
        const response = await spec()
            .post(`${baseUrl}Account/v1/GenerateToken`)
            .withBody({
                userName: "mnowako",
                password: process.env.SECRET_PASSWORD  
            })
            .inspect();
        
        expect(response.statusCode).to.eql(200); 
        authToken=response.body.token;
        console.log(authToken);
    });
})