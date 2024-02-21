let express = require("express");
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.listen(port, function () {
    console.log(`\nServer is being started on ${port}`);
});
