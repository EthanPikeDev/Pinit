const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/post", require("./routes/posts"));
app.use("/api/profile", require("./routes/profile"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server runing in port", PORT);
});
