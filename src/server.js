const app = require("express")();
var session = require("express-session");
var Keycloak = require("keycloak-connect");
var bodyParser = require("body-parser");
var cors = require("cors");
const helloWorld = require("./services/helloWorld.service");

app.use(bodyParser.json());

// Enable CORS support
app.use(cors());

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "userData",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloakConfig = {
  clientId: "nodejs-microservice",
  bearerOnly: false,
  serverUrl: "http://localhost:8080/auth",
  realm: "demo_realm",
  credentials: {
    secret: "dfe7754d-c489-4682-b93a-e9b7b3017c73",
  },
};
var keycloak = new Keycloak(
  {
    store: memoryStore,
  },
  keycloakConfig
);

app.use(
  keycloak.middleware({
    logout: "/logout",
    admin: "/",
  })
);

app.get("/hello", keycloak.protect("user"), function (req, res) {
  res.send(helloWorld.hello(req));
});

app.listen(5000, function () {
  console.log("Started at port 5000");
});
