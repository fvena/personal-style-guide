import path from "node:path";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";

const root = path.dirname(fileURLToPath(import.meta.url));

export function createESLint(config) {
  return new ESLint({
    overrideConfigFile: path.resolve(root, "..", "eslint", config),
  });
}

export async function lintFixture(eslint, fixture) {
  const results = await eslint.lintFiles([path.join(root, "fixtures", fixture)]);
  return results.flatMap((r) => r.messages);
}

export function findRule(messages, ruleId) {
  return messages.filter((m) => m.ruleId === ruleId);
}

export async function lintCode(eslint, code, filePath) {
  const results = await eslint.lintText(code, { filePath });
  return results.flatMap((r) => r.messages);
}
