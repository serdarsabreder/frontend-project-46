# Difference Calculator (JS) Project Rules

## CRITICAL: Core Requirements & Validation Criteria

You are building a CLI utility to compare JSON/YAML files. This project is graded by an automated Hexlet checker. You MUST satisfy all validation criteria below to pass:

### Architecture & Internal Representation
- The internal diff representation MUST be a tree structure.
- Each node MUST have a `type` property and optionally `children`.
- `children` are NOT the same as data keys; they represent the diff relationship.
- Formatters MUST build output based strictly on node types.
- Parsing logic MUST be pure (no side effects, no direct file I/O inside core functions).

### Technology Stack & Constraints
- **Language:** ES6+ only (use `import`/`export`).
- **Testing:** Jest framework. TDD approach is required.
- **CLI:** Use `commander.js`.
- **Input:** Support JSON and YAML (`js-yaml`).
- **Output Formats:** Plain text, Stylish, JSON.
- **Fixtures:** Must include nested data structures in ALL supported formats.

## CI/CD & Quality Assurance (Hexlet Checker Rules)

To pass the automatic check, the following MUST be true:
- **GitHub Actions:** A workflow must exist to run tests and linting. The badge must be green.
- **SonarQube:** Test coverage is checked. Include the SonarQube badge in README.md.
- **Repository Hygiene:** No temporary files or directories. All ignored files must be in `.gitignore`.
- **Artifacts:** The CI pipeline must expose fixtures and expected outputs as artifacts.

## Development Workflow (Agent Protocol)

When working on any task, follow this strict order:
1. **Plan:** Propose the tree structure change or new formatter logic.
2. **Tests First:** Write the Jest test case using fixtures. Ensure the test covers edge cases (empty files, deep nesting, missing keys).
3. **Implementation:** Implement the core function to satisfy the test. Keep functions pure.
4. **Formatters:** Implement the output generator based on node types.
5. **CI Check:** Before suggesting a commit, verify that `npm test` passes and the code style is correct.
6. **Commit:** Use Conventional Commits format.

## File Loading Strategy
CRITICAL: Use lazy loading via the Read tool for documentation references only when needed. Do not preload.

Relevant references:
- For tree algorithm specifics: @docs/tree-structure.md
- For formatter rules: @docs/formatter-rules.md

## Commit Message Format
Use Conventional Commits strictly:
- `fix: ...` for bug fixes.
- `feat: ...` for new features (e.g., new output format).
- `refactor: ...` for structural changes (e.g., splitting tree logic).
- `test: ...` for adding fixtures or tests.
- `docs: ...` for README updates and badges.

Avoid generic messages. Be specific about the logic changed (e.g., `refactor: implement node type system for internal tree`).

