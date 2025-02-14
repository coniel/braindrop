---
to: <%= module %>/<%= name %>/package.json
---
{
  "name": "@minddrop/<%= name %>",
  "version": "0.0.0",
  "main": "src/index",
  "types": "src/index",
  "scripts": {
    "lint": "eslint .  --max-warnings 0",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit --jsx react-jsx"
  },
  "devDependencies": {
    "eslint": "^9.16.0",
    "@minddrop/eslint-config": "workspace:*",
    "tsconfig": "workspace:*",
    "typescript": "^5.7.2"
  }
}
