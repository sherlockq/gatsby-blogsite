---
path: "/blog/documentation-and-comments"
date: "2024-08-11"
title: "The Theory of Layered Documentation"
tags: ["Discipline", "documentation", "comment"]
---

Combined with recent reading of "A Philosophy of Software Design" and earlier
reading of all-time classics "Clean Code", my practices of documentation
including code comments have evolved to a stable stage. Learning is the first
stage, ensues the practicing and condensing, and finally theorisation. So here
I am.

Before we start, the definition of documentation in my context is: anything
there not mandatory for the functionality. To be a little more pedantic,
functionality includes cross-functional requirement, like performance,
resilience etc.

## One Reason: Help the future understanding

It could be your team member, could be yourself. The longer the gap of
revisiting same code is, the more likely these two end up the same, apart from
some surprise when finding your own name in Git Blame.

It's not for the present. So try not to measure the value and the urgency of
writing documentation by current instinct, but picture yourself in the future.
The more experience you have, the better foresight you'll have.

## One Deterrence: Cost, of initial writing and keeping up-to-update

Everything comes with a cost, it's all about the trade-off and balance.

- How big is the team, how many people are likely to benefit from documentation
- How long the code might survive

The threshold of these two might be way lower than you'd expect. Off the top of
my head, 3 people team on a codebase more than 3 months, that's a situation
worth start considering documentation.

The consideration of cost should pervade all stages of software engineering,
we'll revisit this soon.

## Multiple Layered

### Code as documentation

This is where Robert Martin has highly advocated for and I still believe is
fundamentally lacking in the industry. I couldn't say better than what's taught
in Clean Code but could summarize them based on my daily work flow:

- Extract as well named variable
- Extract as well named method
- Reveal intention by code arrangement at same level of abstraction
- Package structure
- Micro service structure

Although there's some counter arguments against short methods in The Philosophy
of Software Design and in my work environment, with the support of study on
cognition (limited short term mind capacity) and my own experience, I vote for
Clean Code.

The problem I found in the industry is that, people hasn't even tried hard
enough before they argue for the value of long code, which I doubt is more an
excuse of laziness than genuine reasoning. Also, there's chance they're
preoccupied by the current instinct and curse of knowledge instead of
consideration for the future.

### Comment in codebase

This is what has been thoroughly discussed in The Philosophy of Software Design
that starts my reflection on earlier dogmatic embracing of Robert Martin's "no
comment" approach. There's simply something left out after due share of time
and effort has been invested into code as documentation.

I've seen two extremes on the practices of commenting. One is repeating what's
already in the code or could easily be replaced with better naming. The other
is documenting so few that leave the future self and others in the toil of
repeating same journey.

Here's a few scenarios I've found justifying code comments
- A key design decision; When a decision has to be explicitly made implies the
  significance of it worth mentioning in comment. Try to make it as concise as
  possible to fit into code comments, but better to lend a hand to future
  readers just in time in the cost of a bit aesthetic.
- An issue couldn't be solved due to all kinds of reasons; Don't be shy to
  admit the failure, it might save the future readers from treading on the same
  wrong steps.

In a nutshell, anything you find hard to consolidate into code that could help
the future readers should at least be tried to document along side the code
most relevant.

### README

Treat README as a map pointing to where to start. Again, be as concise as
possible as the higher level the documentation is, the less likely it'll be
kept up-to-date.

### Procedure documents

- Git history
- Pull request
- Story/Issue tracking
- Design documents and alike

A shared feature of these is they are side products from the development
process. They kinda provide a view into the process but that's it. The
immutability of it is a blessing and a curse of piling complexity.


