# itc-groupProject-server
ITC Group Project BE

GIT WORKFLOW

Proposed workflow is based on this article: https://render.com/blog/git-organized-a-better-git-flow

PROCESS:
======
  1. On main branch: ```git pull```
  2. Create new feature branch: ```git checkout -b <nameOfFeature>```
  
 ### IMPORTANT NOTE
 * Always, _always_ make sure to _create your own branch_. Do _NOT_ do code changes on ```main```.  
 * Every time you want to make a new branch: first do a ```git pull```.  This makes sure your local codebase is up to date with the remote repo.

The first option here is to make very frequent commits with clear messages, and limit them to one part of the code. Don't overlap with other files, other features, etc.


Alternatively, you can do this:

Step 1: Make your changes
------

The first step isn’t too different than before. Start by creating a new branch and getting to work on making your changes. Don’t worry too much about writing descriptive commit messages just yet, as these won’t be included in your final PR. For now a simple, “work in progress” or “WIP” message will do, or something that will help you remember what was in that commit like “WIP: Started building new model”. The purpose of these commits are to make sure you don’t lose work and provide some general guideposts along the path of that work.

```git checkout -b my-feature-branch```

...make changes...

```git commit -m"WIP"```

...make more changes...

```git commit -m"WIP"```

...make even more changes...

```git commit -m"WIP"```
In this step, it’s okay to leave the codebase in a broken state or to commit half-baked features. This will all get cleaned up later.

Step 2: Reset
------
Once you’ve finished making your changes, it’s time to prepare your work for some “git clean up.” To do this, we’ll run the following command:

git reset origin/main
Without any extra arguments, git reset won’t change the working tree, so your code won’t change — all the work you’ve done will still be there. But because you’ve reset to an older commit, git status will show all the changes you’ve made since you started building your feature. It will look like you did all the work but never made any of those “WIP” commits earlier.
```
git reset origin/main
Unstaged changes after reset:
M       src/components/Footer/Footer.tsx
M       src/components/Nav/Nav.css
M       src/components/Nav/Nav.tsx
M       src/components/Posts/Post.tsx
M       src/components/Posts/PostList.tsx
```
```
git status
On branch feature-branch
Your branch is behind 'origin/feature-branch' by 3 commits, and can be fast-forwarded.
  (use "git pull" to update your local branch)
```
```
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/components/Footer/Footer.tsx
        modified:   src/components/Nav/Nav.css
        modified:   src/components/Nav/Nav.tsx
        modified:   src/components/Posts/Post.tsx
        modified:   src/components/Posts/PostList.tsx
```
In case you get in over your head here, don’t worry — you can always bring back your original commits! Every commit you make lives in your .git folder, even after a reset. Even though it might seem like they’ve disappeared, they’re still there, hiding.

If you want to go back to a commit where things weren’t broken, git reflog will show you a timeline of every commit you’ve referenced in your local repository, even across branches. Run git reflog to find the commit you want to return to and then run git reset <commit-sha>. This command will point the HEAD of your current branch to that commit, and you’re back in business!

From here, we’re ready to start making our new commits.

Step 3: Create new, logically-grouped commits
------
Now, take a look at all the files you’ve changed. Are there any that you can logically group? For example, all the dependency updates or changes related to a particular model. There’s no “right” way to group files, so use your best judgment here. Add these files to your staging area, and make a commit describing the changes.
```
git add src/components/Nav/Nav.css
git add src/components/Nav/Nav.tsx
git commit -m"Added new styles to navigation"

git add src/components/Posts/Post.tsx
git add src/components/Posts/PostList.tsx
git commit -m"Updated author images on posts"

git add src/components/Footer/Footer.tsx
git commit -m"Fixed responsive bug in footer"
```
If you haven’t changed many files, you might not need more than one commit, but we can often make our pull requests much easier to review by splitting up our changes into human-readable, easy-to-follow commits.

What if the same file contains multiple changes that should be grouped separately? It’s possible to stage part of a file using git add --patch (or git add -p). Some code editors also provide a way to stage a range of changes rather than a whole file.

Be mindful of not leaving your codebase in a broken state during this step. Remember, a huge reason we’re cleaning up our commits in the first place is so that nothing will break if we ever want to revert our changes. After making one of these new commits, you can git stash the rest of the unstaged changes and test that everything’s still in working order. If you realize you should have included another file in that commit, you can git stash pop to bring back the other changes, git add the missing file, and perform a git commit --amend . This command will replace the last commit with a new one with the same description, including the old commit and the change you just made.

Step 4: Create a pull request at github.com
------
Now, you're ready to open your pull request.
   * Go to the github repository page, select your branch, and click on "open pull request". This will send the whoever is the assigned code reviewer an email letting them know a pull request has been opened.
   * NOTE: never try to merge to the 

