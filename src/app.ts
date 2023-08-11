// Import required packages
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
// Import express-session
import session from "express-session";
// Import xss-clean package to prevent cross-site scripting (XSS) attacks
import xss from "xss-clean";
// Import helmet package to secure app
import helmet from "helmet";
// Import cors package to enable Cross-Origin Resource Sharing (CORS)
import cors from "cors";
// Import index router
import indexRouter from "./routes/indexRouter";
// Connect to database
import("./db/db");

const app = express();

// Parse request bodies as JSON
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Use xss-clean middleware
app.use(xss());

// Use helmet middleware with options to disable some headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// configure session middleware with MemoryStore
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());

// Use index router for handling requests to the root URL
app.use("/", indexRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("Typescript Express");
});

app.post("/api/data", (req: Request, res: Response) => {
  console.log(req.body);
  return res.sendStatus(200);
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
