const fs = require('fs');
const path = require('path');
const { resolvedRedo, resolvedArchive, protectedSlugs } = require('./resolve_targets');

let md = `# Selective Showcase Manifest

This manifest documents the exact repository slugs, folder paths, registry entries, and intended actions for all targets in the showcase rebuild task.

## Summary

- **Total Registry Entries**: 151
- **Redo Targets**: ${resolvedRedo.length}
- **Archive Targets**: ${resolvedArchive.length}
- **Protected Targets**: ${protectedSlugs.length}

---

## Target Manifest Table

| Tracker # | Restaurant Name | Exact Repository Slug | Existing Folder | Intended Action | Registry Entry Exists | Showroom Card Exists | Naming Discrepancy |
|---|---|---|---|---|---|---|---|
`;

const allTargets = [...resolvedRedo, ...resolvedArchive].sort((a, b) => parseInt(a.num) - parseInt(b.num));

for (const t of allTargets) {
  md += `| ${t.num} | ${t.name} | \`${t.slug}\` | \`${t.folder}\` | **${t.action}** | ${t.regExists ? 'Yes' : 'No'} | ${t.cardExists ? 'Yes' : 'No'} | ${t.discrepancy} |\n`;
}

md += `\n## Protected Targets (${protectedSlugs.length} Restaurants)\n\n`;
md += `The following ${protectedSlugs.length} restaurant folders and registry entries are immutable protected targets:\n\n`;
protectedSlugs.sort().forEach((s, idx) => {
  md += `${idx + 1}. \`${s}\`\n`;
});

const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(path.join(docsDir, 'SELECTIVE_SHOWCASE_MANIFEST.md'), md, 'utf8');
console.log('Successfully generated docs/SELECTIVE_SHOWCASE_MANIFEST.md');
