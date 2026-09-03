const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const TIMEOUT_MS = 5000;

function runJsFile(code) {
  return new Promise((resolve) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-js-"));
    const file = path.join(tmpDir, "main.js");
    fs.writeFileSync(file, code, "utf8");
    execFile(
      process.execPath,
      [file],
      { timeout: TIMEOUT_MS, maxBuffer: 1024 * 1024 },
      (err, stdout, stderr) => {
        fs.rm(tmpDir, { recursive: true, force: true }, () => {});
        resolve({
          stdout: stdout || "",
          stderr: stderr || "",
          timedOut: Boolean(err && err.killed),
        });
      }
    );
  });
}

module.exports = { runJsFile };
