"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required packages
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const path_1 = __importDefault(require("path"));
// Import express-session
const express_session_1 = __importDefault(require("express-session"));
// Import xss-clean package to prevent cross-site scripting (XSS) attacks
const xss_clean_1 = __importDefault(require("xss-clean"));
// Import helmet package to secure app
const helmet_1 = __importDefault(require("helmet"));
// Import cors package to enable Cross-Origin Resource Sharing (CORS)
const cors_1 = __importDefault(require("cors"));
// Import index router
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const app = (0, express_1.default)();
// Parse request bodies as JSON
app.use(express_1.default.json());
// Parse URL-encoded request bodies
app.use(express_1.default.urlencoded({ extended: false }));
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Use xss-clean middleware
app.use((0, xss_clean_1.default)());
// Use helmet middleware with options to disable some headers
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));
// configure session middleware with MemoryStore
app.use((0, express_session_1.default)({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
}));
app.use((0, cors_1.default)());
// Use index router for handling requests to the root URL
app.use("/", indexRouter_1.default);
app.get("/", (req, res) => {
    return res.send("Typescript Express");
});
app.post("/api/data", (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
});
// Error handler
app.use((err, req, res, next) => {
    // Set locals for error message and error details
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // Set HTTP response status code
    res.status(err.status || 500);
    console.log(err);
    // Render the error page using the view engine
    res.render("error");
    next();
});
app.listen(3000, () => {
    console.log("Application listening at http://localhost:3000");
});
