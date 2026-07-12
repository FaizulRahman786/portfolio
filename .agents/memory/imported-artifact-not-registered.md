---
name: Imported artifact.toml not registered
description: What to do when an imported pnpm-workspace project has artifacts/<slug>/.replit-artifact/artifact.toml files on disk but listArtifacts() returns empty and no workflow exists for them.
---

Symptom: `artifacts/<slug>/.replit-artifact/artifact.toml` exists and looks complete (correct id, ports, services), but `listArtifacts()` returns `[]` and `WorkflowsRestart` says the workflow name doesn't exist in config. This happens with imported/cloned projects that never went through the platform's `createArtifact` registration flow.

`createArtifact` cannot be reused for an existing slug — it fails with `ARTIFACT_DIR_EXISTS` and does not touch files, so it can't repair an unregistered artifact in place.

**How to apply:** move the existing `artifacts/<slug>` directory aside (e.g. to `artifacts/<slug>_bak`), call `createArtifact` fresh with the same slug/previewPath/title to get a scaffold plus real platform registration + workflow, then copy the real `src/`, `public/`, `index.html`, and dependency-bearing `package.json`/`tsconfig.json`/`vite.config.ts` back on top of the scaffold (diff first — the scaffold's versions are usually near-identical, just reformatted). Delete the `_bak` directory afterward — its leftover `.replit-artifact/artifact.toml` will otherwise also get auto-registered as a duplicate artifact with the same id.

**Why:** the registration step (not just the toml file) is what creates the managed workflow entry; `createArtifact` is the only path to that registration, and it require a clean slug.
