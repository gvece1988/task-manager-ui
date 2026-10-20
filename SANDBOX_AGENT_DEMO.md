# Sandbox agent demo

This checkout demonstrates an Ollama-backed Codex agent working inside a
workspace-write sandbox. The sample change adds a **Clear filters** action to
the task list.

## Run the agent

Prerequisites: Ollama, Codex CLI, and a model available in Ollama. Check the
models on this machine with `ollama list`. The command below uses the local
Qwen model already installed here; replace it with an available Ollama Cloud
model if you prefer.

Clone the sample repository and create a working branch:

```powershell
git clone https://github.com/gvece1988/task-manager-ui.git
Set-Location task-manager-ui
git switch -c demo/clear-task-filters
```

From the repository root in PowerShell, start the agent:

```powershell
$prompt = @'
Add a Clear filters button to the task list search form. Reset the reactive
form, restore the unfiltered task list, and update the empty-state flag. Edit
only the view component TypeScript and HTML files. Do not commit or push.
'@

$prompt | codex exec --oss --local-provider ollama `
  --model qwen3:4b-instruct-2507-q4_K_M `
  --sandbox workspace-write --cd $PWD -
```

The sandbox lets the agent edit files in this checkout. Review its diff before
using Git commands on the host.

## Review, commit, and open a pull request

After reviewing the diff, use your GitHub account to push a branch and open a
pull request. For example, with GitHub CLI installed:

```powershell
git add src/app/ui/view/view.component.ts src/app/ui/view/view.component.html
git commit -m "Add clear filters action"
git push -u origin demo/clear-task-filters
gh pr create --base master --title "Add clear filters action" --body "Adds a control to reset task list filters."
```

The agent does not need a GitHub token to edit code. Authenticate Git separately
for the push and pull request steps.
