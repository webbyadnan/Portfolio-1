const fs = require('fs');

let content;
try {
    content = fs.readFileSync('lint_results.json', 'utf8');
} catch (e) {
    content = fs.readFileSync('lint_results.json', 'utf16le');
}

// Find the first '['
const jsonStart = content.indexOf('[');
if (jsonStart === -1) {
    console.error('No JSON array found in file');
    process.exit(1);
}

const jsonContent = content.slice(jsonStart);
const results = JSON.parse(jsonContent);

results.forEach(file => {
    const errors = file.messages.filter(m => m.severity === 2);
    if (errors.length > 0) {
        console.log(`\nFILE: ${file.filePath}`);
        errors.forEach(e => {
            console.log(`  - [${e.line}:${e.column}] ${e.message} (${e.ruleId})`);
        });
    }
});
