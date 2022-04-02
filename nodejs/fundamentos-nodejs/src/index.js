

const express = require('express');


const app = express();

/** HTTP VERBS
 * GET - Seach for an information from server side
 * POST - Insert an information into server side
 * PUT - Change an information in server side
 * PATCH = Change a specific information
 * DELETE - Delete an information in server side
 */

/** PARAMETERS TYPE
 * 
 * 1. Route Params => /:routeParam
 *    - They are parameters which are encapsulated inside the route
 *    - They are used to identify an specific server resource for search/edit/delete operations
 * 
 *    const params = request.params
 *    const {routeParam} = request.params
 * 
 * 2. Query Params => ?key=value
 *    - They are parameters which helps select informations 
 *    - Usually, they are used to do pagination, filters, etc
 * 
 *    http://localhost:3333/course?page=1&order=asc
 * 
 *    const query = request.query  // {page: 1, order: 'asc'}
 * 
 * 
 * 3. Body Params => {property: value}
 *     - They are objects passed inside request body
 *     - Usually they are used as insertion/change objects
 *     - Can contain a several types of types (JSON, text, etc)
 * 
 * 
 *      const body = request.body
 */





app.get('/', (request, response) => {
    return response.json({ message: "Hello World, Ignite NodeJS!" });
})


app.get('/courses', (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3"])
});

app.post('/course', (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"])
});

app.get('/course/:id', (request, response) => {

    const {id } = request.params; // get the route param id

    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"].filter(c => (c.includes(id))))
});

app.patch('/course/:id', (request, response) => {
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"])
});


app.delete('/course/:id', (request, response) => {
    return response.json(["Curso 2", "Curso 3", "Curso 4"])
});

// starts application -> on port indicated
app.listen(3333);



