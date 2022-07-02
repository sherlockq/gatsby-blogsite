---
path: "/blog/thoughts-after-joining-second-job-in-uk"
date: "2022-06-25"
title: "Thought after joining second job in UK"
tags: ["Thoughts", "Craftsmanship"]
---

I left Codurance this April and joined an online mortgage platform company, named Landbay.

So far, the challenges and the novel experiences have been more or less as I had expected before
joining. It's a good timing to record the fresh thoughts before they dry out.

## Culture

The culture in Landbay, maybe could be expanded to Fintech companies, are fundamentally different
from a consultancy company, especially Codurance.

Business first is in the vein of all product companies, as it should be. In Landbay, though
technology is an indispensable part of the success, underwriting, which is the core business
function, is no less important. Contrast that with software consultancy companies, tech people are
what they own and what they sell.

In daily life, this is represented as pragmatism, or more like practical, in sacrifice of
methodology awareness. If something has worked in the past and is working well, more effort would be
put into delivering more features than finding out a better approach. It's not a direct right or
wrong, but could cause frustration to someone values technical excellence.

What's more, Landbay owes huge part of its success to a strong product owner line-up. It's my first
opportunity in whole career to work with professional product owners. They are in the full life
cycle of the delivery work, and act as bridges between all business stakeholders and developers.
Though that sounds written in the scrum roles, in experience it has usually been the developers
stepping up to take quite a share of responsibilities. This helps the back and forth between tech
team and business. On the dark side, technical team is less involved in first-hand domain
discussion, which is a key part being software consultants.

## Technology

Landbay has accumulated a heavy weight shared library over the time. It provides all aspects of
framework support for most development within the technical environment, while conventions hugely
outweigh clarity. It brings a steeper learning curve, a quicker development start, a harder change
to current situation.

Considering the amount of microservices they have, around 70, the decision is understandable. Anyone
is able to create a new service without hassle after some training. Yet it might take ages if
possible to figure out what's behind the scene, let alone making changes. I'm concerned about the
possible corporate amnesia.

The development style here feels like working with a DSL, there's always a recommended pattern for
certain thing, though the reasoning behind it is questionable.

Though it sounds discouraging, the reality is quite positive. Landbay has achieved de facto trunk
based development, with absolutely no release branch but only feature branches. CI/CD is there,
releases are frequent, with not too troubling failure rate.

Although not TDD, the testing coverage is high. People are not consciously thinking in terms of test
value, clarity, pyramid etc., hence the maintainability is an obvious concern. The coding
style looks old school to me, being a procedural programming in OO language full of "services" and
anemic models. To most people here, it's working well, with some caveats but all expected, which
makes it harder to question the necessity of changes without real pains.

## People

The aforementioned tech style influences the people. I've seen people too comfortable with state as
is and consider consistency as a reason against change. People get productive because they are
familiar with the existing code base, happy with that, instead of continuous improvement on the way
of working.

I haven't seen thoughtful discussion happening for a while, or it might happen out of my sight, only
within senior staffs or so-called architects. They are talented and skilled at all levels, yet I do
miss the academic environment in Codurance.

## Footnote

So far the impression looks fairly negative, but we must bear in mind that Landbay has produced an
impressive successful business and top of industry products. That's exactly why I decided to join,
to find out what's behind the business success, and how I could apply what's in my blood now, the
software craftsmanship, to wider world. It will be my fault, not others', if I couldn't demonstrate
the value of what I believe in.

Instead of sticking to mere practices, like some coding style, I'm trying to find what really
matters to the business and people in long run, and make that comprehensible by others. It's less a
fun to a geek but a necessary shift of mindset. 
