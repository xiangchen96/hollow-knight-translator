/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");
const fs = require("fs");

exports.onPreInit = () => {
  if (process.argv[2] === "build") {
    fs.rmdirSync(path.join(__dirname, "docs"), { recursive: true });
    if (fs.existsSync(path.join(__dirname, "public"))) {
      fs.renameSync(
        path.join(__dirname, "public"),
        path.join(__dirname, "public_dev")
      );
    }
  }
};

exports.onPostBuild = () => {
  fs.renameSync(path.join(__dirname, "public"), path.join(__dirname, "docs"));
  fs.closeSync(fs.openSync(path.join(__dirname, "docs", ".nojekyll"), "w"));
  if (fs.existsSync(path.join(__dirname, "public_dev"))) {
    fs.renameSync(
      path.join(__dirname, "public_dev"),
      path.join(__dirname, "public")
    );
  }
};
