const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.get("/", (request, response) => {
    return response.json({
        "name": "Celso",
    })
})

module.exports = usersRoutes;