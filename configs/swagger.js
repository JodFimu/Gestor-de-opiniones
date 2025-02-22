import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor de opiniones API",
            version: "1.0.0",
            description: "API para un gestor de opiniones",
            contact:{
                name: "José Figueroa",
                email: "jfigueroa-2023015@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/GestorOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/post/post.routes.js",
        "./src/comment/comment.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}