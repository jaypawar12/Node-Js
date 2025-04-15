const express = require("express");
const app = express();
const path = require("path");

const PORT = 8000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

const routes = [
  "authentication-login",
  "authentication-register",
  "charts",
  "error-403",
  "error-404",
  "error-405",
  "error-500",
  "form-basic",
  "form-wizard",
  "grid",
  "icon-fontawesome",
  "icon-material",
  "index",
  "index2",
  "pages-buttons",
  "pages-calendar",
  "pages-chat",
  "pages-elements",
  "pages-gallery",
  "pages-invoice",
  "tables",
  "widgets",
];

routes.forEach((route) => {
  app.get(`/${route}.html`, (req, res) => {
    res.render(route, { title: route.replace("-", " ").toUpperCase() });
  });
});

// Define the root route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
