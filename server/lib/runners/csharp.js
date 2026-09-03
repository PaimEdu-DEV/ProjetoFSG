const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const TIMEOUT_MS = 20000;

const CSPROJ = `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <InvariantGlobalization>true</InvariantGlobalization>
  </PropertyGroup>
</Project>
`;

function runCsharpFile(code) {
  return new Promise((resolve) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pd-cs-"));
    fs.writeFileSync(path.join(tmpDir, "run.csproj"), CSPROJ, "utf8");
    fs.writeFileSync(path.join(tmpDir, "Program.cs"), code, "utf8");
    execFile(
      "dotnet",
      ["run", "--project", tmpDir, "-c", "Release"],
      { timeout: TIMEOUT_MS, maxBuffer: 1024 * 1024, cwd: tmpDir },
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

module.exports = { runCsharpFile };
