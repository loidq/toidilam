# 🛍️ Git Workflow Convention

> A unified Git workflow to maintain clean history, reduce conflicts, and ensure production stability.

---

## 📂 Branching Strategy

| Branch                  | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `main`                  | Production code only                        |
| `dev`                   | Integration branch for all features         |
| `feat/*`                | Feature branches                            |
| `fix/*`                 | Bugfix branches (non-critical)              |
| `hotfix/*`              | Urgent patch for production                 |
| `release/*`             | Pre-release QA/staging if needed (optional) |
| `chore/*`, `refactor/*` | Maintenance or cleanup tasks                |

---

## 🔀 Merge & Rebase Rules

### ✅ Always Rebase Before MR

* **Before creating a Merge Request (MR):**

  * Rebase your branch on top of the target branch.
  * Ensure all conflicts are resolved before pushing.

```bash
git fetch origin
git rebase origin/dev
```

---

### 🚀 Feature → Dev

* MR is **always required** when merging from `feat/*` to `dev`
* Rebase `dev` into `feat/*` before MR to avoid conflicts.

```bash
# Example
git checkout feat/login
git fetch origin
git rebase origin/dev
# resolve conflicts, test
git push -f origin feat/login
# Then create MR to `dev`
```

---

### 🔀 Hotfix → Main + Dev

* Merge `hotfix/*` into `main` for production patch.
* Then **also merge the same hotfix into `dev`** to avoid regressions.

```bash
# Patch to production
git checkout main
git merge --no-ff hotfix/fix-login-crash

# Backport to dev
git checkout dev
git merge --no-ff hotfix/fix-login-crash
```

---

### 🎯 Dev → Main (Release)

* Only leads/release managers can merge `dev` → `main`
* Should be done via **release MR**
* All MRs must be merged into `dev` before release

---

### 💪 Optional: Release Branch (Staging/QA)

* For testing before main
* Tag releases here, do fixes in `hotfix/*`

```bash
release/2025.07.0
```

---

## ✅ Commit Convention (Conventional Commits)

```txt
<type>(scope): short summary

# Examples
feat(auth): add login API
fix(ui): resolve button overlap in dark mode
refactor(core): improve query performance
chore(ci): update GitHub Actions workflow
docs(readme): update setup instructions
```

### Allowed Commit Types

* `feat`
* `fix`
* `hotfix`
* `chore`
* `refactor`
* `test`
* `docs`
* `style`
* `perf`
* `ci`
* `build`
* `revert`

### Commit Message Regex

```regex
^(feat|fix|hotfix|refactor|chore|docs|test|style|perf|ci|build|revert)(\(.+\))?: .+
```

---

## 📆 Branch Naming Convention

| Type     | Format                  |
| -------- | ----------------------- |
| Feature  | `feat/<short-desc>`     |
| Fix      | `fix/<short-desc>`      |
| Hotfix   | `hotfix/<short-desc>`   |
| Chore    | `chore/<short-desc>`    |
| Refactor | `refactor/<short-desc>` |
| Release  | `release/YYYY.MM.X`     |
| WIP      | `wip/<desc>`            |
| Exp      | `experiment/<desc>`     |
| Renovate | `renovate/<package>`    |

### Examples

* `feat/login-ui`
* `fix/api-crash`
* `hotfix/reset-token`
* `refactor/clean-arch`
* `release/2025.07.0`
* `wip/test-redesign`

### Branch Name Regex

```regex
^(feature|feat|fix|hotfix|chore|refactor|test|docs|perf|ci|build|revert|release|wip|experiment|renovate)\/.*
```

---

## 🚧 Do Not

* ❌ Push directly to `dev` or `main`
* ❌ Use `merge` instead of `rebase` for local syncing
* ❌ Create MRs without rebasing first
* ❌ Force-push `dev` or `main`

---

## ✅ Summary

| Action           | Rules                                 |
| ---------------- | ------------------------------------- |
| Feature to dev   | MR + rebase `dev` into `feat/*` first |
| Hotfix to main   | Merge + also merge into `dev`         |
| Dev to main      | MR only by lead/release               |
| Rebase before MR | Always                                |
| Commit format    | Conventional Commits                  |
| Force push       | Only for your feature branch          |
