---
path: "/blog/take-on-llm-dev-after-3-weeks"
date: "2026-04-11"
title: "Takes on LLM assisted development after 3 weeks of use"
tags: ["LLM", "Claude"]
---

I've recently started a new role after the move to Hong Kong. The company has been pushing for AI use in all aspects of the business for more than a year, way ahead of the place I worked earlier in the UK, probably ahead of most places anyway. One approach of the push is unlimited token quota. Since joining, I've started thinking and working AI first. Here is a summary of how it looks like.

## Tooling

We have access to all public commercial LLMs. Claude is the main workforce. It'll be hard to tell the difference between models individually before the establishment of a repeatable benchmark method. So I stay with what most peers have been polishing.

## Works out of box

1. Investigation of code repo

As a new joiner this is supposed to be a headache. There's a whole chapter in Martin Fowler's book Refactoring on how to efficiently grasp a new code base. I reckon with the help of LLM the chapter could use quite a rewrite.

Claude doesn't consume the whole code base, which wouldn't be feasible for the current capacity of LLMs. It goes through an interactive process, starting with obvious entry points like README.md, CLAUDE.md to understand the framework being used. Then it'll navigate the package structure based on common patterns of the framework which are likely part of the training data. Claude combines the knowledge within the model with the local tooling to gain more context, a design that works really well. Who can say the way it navigates the codebase didn't take inspiration from Martin's book?

2. Troubleshooting

Equipped with tooling to access production logs, data, code base and past knowledge in the corporate knowledge base, LLM could pinpoint the issue with high confidence. Troubleshooting is essentially a job of fetching all the information and feeding it into a logic process. Even when the latter goes wrong, the data fetching part could save tons of time as LLM skills accumulate.

3. Document writing

Hands down a life saver. The summarisation of work into tickets, commits and PRs following policies are both accurate and readable. I've picked up the habbit of asking LLM to create or update tasks in Jira when new thing turns up, without breaking my own workflow.

4. Context switching and parallelisation

You can't beat a machine on this. With proper orchestration of sessions/conversations and subtasking, I start questioning the principle of focusing on one work and getting it done in the AI era. I've even built a small gadget, of course totally by AI, to remind me when one session requires input. So far I'm still at an early stage of a handful of sessions, who knows where the limit is.

5. Building small gadget

When complexity is not an issue, and there is likely a known example somewhere in the code world which is inevitably absorbed by the model, it's no brainer to leave it to the model. Like a pomodoro, as I'm too lazy to ask for app installation permission in this highly security aware company. Or the session tracking app, albeit it's still buggy after numerous rounds of attempts.

6. Implementation with clear test case and instruction

For a complex existing code base, the challenge is not to deliver a standalone feature, but to keep the codebase in a maintainable state so that future features or changes can fit in with steady speed and quality. Clean code, TDD, or other modern principles are all about it. With all those thinking processes built into each test case or instruction I hand made, LLM usually could carry out the implementation part with ease. The code quality is mostly acceptable, sometimes just a matter of preference.

## Not that well

1. Prioritisation of instructions

With built-up knowledge/context from hundreds of billions of parameters, prompts, user configuration, project configuration, skills etc, I would wonder how the model sorts out the overcrowded, sometimes conflicting messages. Indeed it's struggling.

I've pushed for a strict TDD style for a while, yet occasionally the model will skip it. There's also known examples that models ignore security instructions and find a way to circumvent. Funnily that's exactly how a human being would do. One colleague mentioned checklists could help. I've yet to implement it.

Another example is that if the code base is low in quality, you need to consistently ask LLM to question the current style and follow a better way.

2. Refactoring

The frustration of LLM carrying out refactoring comes from two factors: the tendency to mimic existing bad behaviour, and the low effectiveness.

The first bit echoes the earlier point of preferring consistency over best practice, which could be corrected with strong instructions.

The second bit is inherently due to how LLM works. It takes in context as tokens and spits out tokens in a probabilistic way. Refactoring requires more input tokens due to the fact that remembering the existing code base costs more than a new feature request. You could see the LLM repeatedly going back and forth fixing imports, which most wouldn't even think of with the help of an IDE.

I'm planning to rely on tooling like OpenRewrite or IntelliJ interface to see if the result would be different.

3. Full agentic work

This is the latest trend, but it didn't work out well for me so far. Even with a prescribed working plan, the end result drifted significantly from the expectation. To have control we might need to fix everything down to low level design, like the traditional outsourcing model. That's against modern engineering approaches due to the loss of fast feedback during development. New questions and information pop up through the process when human beings do the work.

I've instructed several check gates for LLM to interview me and ask for review. It's still under tweaking but I start wondering where the balance of decision making is.

## Final words

So far, I treat LLM as a developer with ultimate knowledge but questionable taste. It could retry things faster than most developers and reach similar results under similar time. Still, it's no substitution for a real software craftsman.

However, all modern software engineering methodologies stem from understanding human limitations: limited mental capacity. Do they still apply to LLM? If not, how much of the methodologies should be rewritten?

In my next blog I'd like to have a quick check on them.
