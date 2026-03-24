import fs from "fs";
import path from "path";

// Python ファイルがあるディレクトリ
const targetDir = "./backend/Feature";

// README 出力先
const readmePath = "./README.md";

// Python ヘッダーを抽出する正規表現
const headerRegex = /"""\s*([\s\S]*?)\s*"""/m;

let collected = "# 📘 Auto‑Collected Backend Documentation\n\n";

for (const file of fs.readdirSync(targetDir)) {
    if (!file.endsWith(".py")) continue;

    const fullPath = path.join(targetDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");

    const match = content.match(headerRegex);
    if (!match) continue;

    const header = match[1];

    collected += `## ${file}\n\n`;
    collected += "```\n" + header.trim() + "\n```\n\n";
}

// README に追記 or 上書き
fs.writeFileSync(readmePath, collected);

console.log("README に Python ヘッダーを自動収集しました！");
``