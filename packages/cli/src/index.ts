#!/usr/bin/env node
import { addCommand } from "./commands/add.js";
import { doctorCommand } from "./commands/doctor.js";
import { initCommand } from "./commands/init.js";

const [, , command, arg] = process.argv;

switch (command) {
  case "init":
    console.log(initCommand());
    break;
  case "add":
    console.log(addCommand(arg));
    break;
  case "doctor":
    console.log(doctorCommand());
    break;
  default:
    console.log(
      [
        "polymarket-ui-kit",
        "",
        "Usage:",
        "  pui init",
        "  pui add market-card",
        "  pui doctor",
      ].join("\n"),
    );
}

