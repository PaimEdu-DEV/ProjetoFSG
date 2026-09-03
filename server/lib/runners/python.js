const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const TIMEOUT_MS = 5000;
const PYTHON_BIN = process.platform === "win32" ? "python" : "python3";

function runPythonFile(code) {
  return new Promise((resolve) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-py-"));
    const file = path.join(tmpDir, "main.py");
    fs.writeFileSync(file, code, "utf8");
    execFile(
      PYTHON_BIN,
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

module.exports = { runPythonFile };
