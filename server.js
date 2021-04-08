const express = require("express");
const app = express();

const http = require('http').createServer(app);
const socketService = require('./app/socket/socketService');

const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/auth.routes")(app);
require("./app/routes/posts.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/chats.routes")(app);



app.use((req, res, next) => {
    const error = new Error('not found route');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
            error: {
                message: error.message
            }
        })
});

socketService.init(http);

http.listen(3000, () => {
    console.log(`Server is running on port 3000.`);
});
