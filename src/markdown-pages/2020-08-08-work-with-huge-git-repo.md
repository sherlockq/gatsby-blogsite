---
path: "/blog/work-with-huge-git-repo.md"
date: "2020-08-08"
title: "How to work with huge git repo"
tags: ["Tips"]
---
## Background

Monolith doesn't only bite you in one way. Lately I have been in a project with thousands of
developers working on the same git repo. Every day there would be dozens of new branch and hundreds
of new commits. Don't mention that some guys would push an image file of 50M. You could imagine
the painful routine of pulling.

There are several ways to handle this, and finally I've found my favourite one. During the finding
I also kinda get clear of the mechanisms behind git. 

## Solution 1: Only fetch specific branch

With `git fetch origin <branch_name>`, git will only download the missing "objects" necessary for
the specified remote branch. Then if that branch is within the range of `remote.origin.fetch` config,
which be default will contain all branches, the remote ref will be updated.

All left is to manually run `git merge FETCH_HEAD`, or simply replace `fetch` with `pull`.

## Solution 2: Limit refs to update only wanted ones

The downside of previous one is that I'm too lazy to remember updating branches in work. It occurs 
to me a lot that I merge from an obsolete master to my working branch. That's why I use `hub sync`.

The problem is this won't work well with a huge repo. `hub sync` won't take any parameters, only fetch
all branches.

The solution is limiting the range in `remote.origin.fetch`, I will only keep the master and working branch
there, by running `git remote set-branches origin <branch_name>`.

That command actually is the shortcut to add an item in `remote.origin.fetch` config. It's so much
easier to maintain then its raw version. Yet the cleanup needs to be done manually through editing
`.git/config`, but even you forgot it won't be lots of pain. 

## Other findings

If you check `.git` folder, there are quite a few ways to hack problems. 
- `packed-refs` It's a condensed version of remote branch refs. Git will look at the `refs` folder
    first. If the branch is not found, it will check `packed-refs`. This file is designed for performance
    and could be generated manually with `git pack-refs`, though I'm not sure the automatic timing for it.
- `refs` Just remove the whole refs folder won't break your git, it requires just another fetch and reset.
Bear in mind `packed-refs` needs be removed as well.
- `git gc --prune=now` Could remove unlinked objects, pack loose objects, a must-do after a cleaning up of references 

