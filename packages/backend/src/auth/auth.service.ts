import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Axios } from "axios";

//application flow:
//the resource owner (a 42 user) is first redirected by the application to the OAuth authorization server at the API provider ->
// If she does, the authorization server prompts her for access to the requested data. After she grants access, she is redirected back to the web application and an authorization code is included in the URL as the code query parameter: http://www.example.com/oauth_callback?code=ABC1234 ->
// Because the code is passed as a query parameter, the web browser sends it along to the web server that is acting as the OAuth client. This authorization code is then exchanged for an access token using a server-to-server call from the application to the authorization server. This access token is used by the client to make API calls.

// Here's a basic outline of what the flow could look like:

// 1. Your server receives a signup request from the client with the user's details.  -> client should redirect to 42 oauth. User logs in.

// 2. You check your database to see if a user with the provided username already exists.

// 3. If the username is already taken, you send a response back to the client indicating that they need to choose a different username.

// 4. If the username is not taken, you send a POST request to the third-party API to create a new user or retrieve a token (or whatever action is appropriate based on your specific use case). This step might require additional error handling in case the third-party API request fails for some reason.

// 5. If the third-party API request was successful, you create a new user in your own database using the provided details and the token you got from the third-party API.

// 6. Finally, you send a response back to the client indicating that the signup was successful.

// This flow ensures that you're not making unnecessary requests to the third-party API for users that you can't actually create (because their chosen username is already taken), and it provides clear feedback to the client about the status of their signup request.

@Injectable({})
export class AuthService {

    async oauthCallback(code: string) {
        console.log('yeah boi authenticatin');
        console.log(code);
        const uid: string =  'u-s4t2ud-47600cc08a77769cea8bec6cacdd6ef77df4be8fbb4984a8b9435f3cdddee480';
        const secret: string = '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';
        return await code;
    }


    signin () { //checks credentials, if user exists and provided password is valid returns a new token
        
    }
}