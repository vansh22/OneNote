const connectToMongo = require("./db/db");
const express = require("express"); // express library has offered a factory function express() we can call to create its instance
var cors = require("cors"); // to resolve all cors errors
// cors is a security feature implemented in web browsers to prevent web pages from making requests to a different domain than the one that served the original web page.
const app = express(); // factory function called to create instance of express...which will be needed since we can have multiple servers in our code and in order to do that we need to create multiple instances

app.use(cors());
const dotenv = require("dotenv");
dotenv.config({ path: "./backend/config.env" });

connectToMongo();
const port = process.env.PORT;

app.use(express.json()); // using middleware to send something to the body of request (i.e. to use req.body)

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
