import { sign } from "jsonwebtoken";
import { join } from "path";
import { readFileSync } from "fs";
import { parse } from "ini";
import env = require("dotenv");

env.config();

export function generateToken() {
  return sign({ data: "allow" }, process.env.SDN_ACCESS_KEY);
}

console.log("Token: ", generateToken());
