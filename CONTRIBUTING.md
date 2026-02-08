# Contributing to Sunny Archive

This project is a high-fidelity artifact. All contributions must respect the "Luxury Boutique" design philosophy and the Atomic Pipeline V2.

## 🛠 The Zown Atomic Pipeline (Git Flow)

### 1. Task Acquisition
- **Source of Truth**: All work begins at [GitHub Issues](https://github.com/GTOVD/sunny-archive/issues).
- **Selection**: Choose a P0 or P1 issue. Ensure it aligns with the current design spec (Editorial Kindle).

### 2. Branching & Linking
- **Branch Name**: `feat/SUNNY-XXX-description` (Always branch from `develop`).
- **Linking**: Comment on the GitHub issue: `Started work in branch feat/SUNNY-XXX`.

### 3. State Synchronization (Mandatory)
Before a PR is considered complete, you **MUST** update the following project files:
- **MEMORY.md**: 
  - Move the completed Issue from "Active Backlog" to "Strategic Milestones" or "Technical History."
  - Update the "Technical State" if you've resolved a design or resilience gap.
- **SOUL.md / IDENTITY.md**: Update if the project's aesthetic or archival scope expands.

### 4. Pull Requests (PRs)
- **Target**: All PRs must target the `develop` branch.
- **Auto-Closing**: PR descriptions must include `Closes #XXX`.
- **Review**: PRs must pass linting, type checks, and be audited for 60fps performance impact.

### 5. Integration & Promotion
- **Step A**: Merge PR into `develop`.
- **Step B**: Promote `develop` to `main`:
  ```bash
  git checkout main && git merge develop && git push origin main
  ```

## 🏁 Definition of Done
- Implementation matches the Acceptance Criteria.
- **Identity, Soul, and Memory files are synchronized to reflect the changes.**
- UI matches the "Luxury Boutique" aesthetic (Grayscale hovers, Noise overlays).
- PR is merged into `develop` and promoted to `main`.
- The linked GitHub Issue is closed.
