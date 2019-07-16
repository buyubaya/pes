## Prerequisites
* Node v8.11.3
 
## Setup
npm install

## Run
node server.js

## How to use
Browse to http://localhost:3001 to see all the endpoints supported by the fake-services.

In Web Js application(s), to connect to the faked services, update futureyou/config/web.json file to contain the following entry:

"apiBaseUrl": "http://localhost:3001"

In backend applications/microservices, update config file to use http://localhost:3001 as the starting point of services to be handled by the faked-services.

To add new faked endpoints, modify the api.json and routes.json files and restart the server.

## Anonymous and Authenticated Scenarios for the Web Js App
The Web JS App relies on a call to /api/session/v1/sessionInfo to determine the authentication status. If that calls returns 404, then the user is not authenticated (anonymous). For authenticated users, it should return a fnId value (to be used in other subsequent calls).

To test the web js app for an anonymous journey: 
In api.json, change "sessionInfo" to "_sesssionInfo"

To test the web js app for an authenticated journey: 
In api.json, change "_sessionInfo" back to "sesssionInfo"

To test the web js app for different user profiles:
The profile- entries in api.json are defined for different fnId values.
To switch to a different profile, change fnId value in "sessionInfo" entry.

## Simulating errorneous service conditions

To simulate 404 error, simply change one of the existing entries in api.json e.g. change "messageCount" to "_messageCount"

To simulate 500 error, modify server.js to return 500 status code for errorneous enpoints.

## Application Architecture
The application starts a json-server (https://github.com/typicode/json-server) at port 3001.

api.json: defining the data returned by faked services

routes.json: defining the endpoints supported by faked services

server.js: any custom logic that the faked services should support.

Note: Most of these faked service endpoints are the replacements of HTTP GET endpoints of the real services. However some of the services expect an HTTP POST to return some value(s).

To support those scenarios, server.js will replace all HTTP POST method calls by an HTTP GET call to the same url (which then returns an expected response).

