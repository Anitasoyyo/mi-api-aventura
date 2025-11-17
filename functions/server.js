const serverless = require("serverless-http");
const express = require("../server.js");

const app = express.default || express;

exports.handler = serverless(app);
