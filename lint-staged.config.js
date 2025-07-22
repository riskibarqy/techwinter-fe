// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,html}': ['prettier --write']
};
// This configuration ensures that JavaScript, TypeScript, and JSX files are linted and formatted with ESLint and Prettier,
// while JSON, Markdown, CSS, and HTML files are only formatted with Prettier.
// It runs on pre-commit to ensure code quality before commits are made.
// Adjust the commands as necessary based on your project's requirements and tools. 