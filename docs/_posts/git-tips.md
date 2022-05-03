### Git: General commands

Git: a version control system ..

<b>1.</b> -- pull vs fetch vs merge:

`Git Pull`: perform as a fetch additionally merge changes into your local branch  
(`git pull = git fetch + git merge`)

`Git Fetch`: download any changes to local except for local branch (local branch stay unchanged)

`Git Rebase`: rewrite the changes of one branch onto another without creating a new commit

`Git Merge`: merge changes from remote to local

<b>2.</b> -- git pull vs git pull rebase:

`git pull = git fetch + git merge`

`git pull --rebase = git fetch + git rebase`

<!-- this is something to recall quickly: https://github.com/twtrubiks/Git-Tutorials -->

Common usage: `git pull --rebase`, providing more cleaner and won't impose a `logical grouping` on your commits

Simple word: `git pull --rebase` made `code reviewer` life much easier to review the commits

**_ after git rebase, if we have conflicts, we normally `git add .` + `git rebase --continue` + `git push` _**

<b>3.</b> -- git push commands:

```js
-u: `-u` means `--set-upstream`, eg: `git push -u origin master`
```

`git push origin HEAD`: A handy way to push the current branch to the same name on the remote.

`git push origin HEAD:master`: Push the current branch to the remote ref matching master in the origin repository. This form is convenient to push the current branch without thinking about its local name.

<b>4.</b> -- How to combine old commits into 1 commit before merge (Equivalent with `Squash`):

```js
`git reset --soft the-commit-hash-before-the-first-commit-for-this-branch`;
```

Then, do `git push -f` to update code for that branch

<b>5.</b> -- `git push --force-with-lease`:

it helps developers to double check whether someone has already push something, (try to avoid overwrite other developer's code)

<b>6.</b> -- `git cherry-pick`:

When to use:

Case 1: when we want to pick up specific commit from one branch (original/source) instead of all commit and paste commit to a new branch (destination)

Case 2: when we push our code into a wrong branch, we want to put the commit into a correct branch

Branch A has 3 commits, Branch B has 6 commits, and we only need Branch B second commit and put into Branch A, this is story case, we can use `cherry-pick` command in `Branch A`. After the cherry-pick, the commit which get cherry picked will be set as the `topest/latest` commit for Branch A.

If we cherry pick multiple files (this is the command): `git cherry-pick #hash-1 #hash-2`
If we have conflicts during cherry pick, so we `first` resolve the conflicts and then use `git cherry-pick --continue`

<a href="https://github.com/DamengRandom/cherry-pick-recall" target="_blank">Github example for cherry-pick (recall)</a>

<b>7.</b> -- git revert vs git reset:

**_ danger level: checkout -> revert -> reset _**

git revert: delete the `specific` commit from commit chains, just don't want this specific commit

git reset: reset to a specific spot of previous commit, it deletes a range of commits

#commit-1 -> #commit-2 -> #commit-3 -> #commit-4

- For git revert, we can revert #commit-3, so #commit-3 will be `deleted` and behaves as `never added before`, and it will add a new `REVERT-hash-commit` as latest commit instead of delete the commit which needs to be reverted !!!! Again, if we want to change back, we can revert the `REVERT-hash-commit`, so we changed back !!

- For git reset, we can reset #commit-2 as `HEAD`, so, #commit-3 and #commit-4 are removed forever

[<a href="https://www.youtube.com/watch?v=RIYrfkZjWmA&ab_channel=TheNetNinja" target="_blank">Reference</a>]

<b>8.</b> -- git logs:

- `git reflog`
- `git log --oneline`
- `git log`
- `git diff`
- `git show #hash-commit`

<b>9.</b> --track (Git command):

git command --track is for fetching remote branch into local

When we don’t have the local branch and we can run this command to checkout the branch and fetch that branch into your local codebase:

Eg: git checkout --track origin/feature/sample-pos-two

<b>10.</b> git rebase process commands:

```
git checkout master (target-branch)
git pull
git checkout feature-branch
git rebase master // also need to fix merge issues / conflicts after run this command
git rebase --continue
git rebase --abort // if not happy with rebase changes
git push -f
```

<b>11.</b> git branch rename:

```
// assume you were not in your current branch:
git branch -m oldName newName
// assume you were inside your current branch
git branch -m newName
```

<b>12.</b> `git add -A`

- add everything in your current repo even you were inside the sub-folder

<b>13.</b> `git config --global alias.ac '!git add -A && git commit -m'`

- used for setup global commit. Then we can type git ac "commit message"

<b>14.</b> `git describe --always --tag --long`

- used for get the latest master branch commit hash code of your current codebase [Give it a shot, then you know better]

<b>15.</b> `git revert commit-hash`: revert means not going to delete the commit, just create a new commit which revert back to before current target revert commit.

For example: we need to revert to commit-3 (commit-1, commit-2, commit-3).
So now, we do `git revert commit-3-hash-code`
Then we can see now, we have a new commit (commit-4), which is exactly same as commit-2 !!

`git revert HEAD`: it means undo the most recent commit !!

<b>16.</b> `git reflog`: we can see the history of git logs

<b>17.</b> `git branch -vv`: give details about the branch

<b>18.</b> `git remote update --prune`: remove the remote branch reference if the branch no longer exists in the remote repository.

Example:

```
Step 1: `git remote update --prune`
Step 2: `git branch -vv | awk '/: gone]/{print $1}' xargs git branch -d`

awk : is used for search certain text
/: gone]/ : means find keyword 'gone'
print $1 : means print out the first result
xargs : means read the input data which the research result of (awk '/: gone]/{print $1}')
```

<b>19.</b> `git reset --hard origin/branch_name`: just re-pull the remote branch ("branch_name") code and wipe out all local changes, super dangerous !!

<b>20.</b> `git commit --amend --no-edit`: overwrite current commit without creating a new commit

- The pre-condition for running this command is `you already open a PR in remote git server`

<b>21.</b> `git revert -m 1 <already-committed-hash>`: its used for reverting back already merged commit. The example case: `I made a mistake to accidentally merge code into master branch and I want to revert back for master branch ..`

```js
1. git checkout -b revert-merge // branch out from master branch !!
2. git revert -m 1 <already-committed-hash>
3. git commit -m "revert merge fix"
4. git push // Then ask for review
// Reference: https://stackoverflow.com/questions/7099833/how-to-revert-a-merge-commit-thats-already-pushed-to-remote-branch
```

<b>22.</b> Git rename the file from lowercase to uppercase

in the current branch, it can be done by: `git mv OLD_FOLDER NEW_FOLDER` ensure all files are renamed instead of deleted !!!

![rename-git-files](https://res.cloudinary.com/dameng/image/upload/v1649890240/tipify/rename-git-files.png)

**_ -- Reference: <a href="https://git-scm.com/docs" target="_blank">https://git-scm.com/docs</a> _**

<b>23.</b> Git checkout to a branch you forgot the full name

git checkout `git branch | grep branch-name-you-can-remember`

<b>24.</b>
