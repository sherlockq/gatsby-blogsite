---
path: "/blog/review-of-software-architecture-the-hard-parts-trade-off.md"
date: "2023-05-31"
title: "Every decisions in architecture is about trade-off: Review of Software Architecture: The Hard Parts"
tags: ["Book review", "Software architecture"]
---

The sub title of the book is "Modern Trade-off Analyses for Distributed Architectures",
which perfectly summarizes the key topics of the book: distributed system and trade-offs.
What makes this book stand out, in my opinion, is the latter.

What makes a decision making in architecture different from a micro level one, is that
there won't be a best practice present. Down to the bottom it's because of how the modern
computer system is designed and possibly the limitation of current technology. The famous
CAP theorem is one of the example.

In this book, the authors categorize the transactional saga pattern options, which is the
key decision for distributed system, into the juxtaposition of three dimensions:
Communication (sync/async), Consistency (Atomic/Eventual) and Coordination
(Orchestrated/Choreographed). For each of them there's an analysis of the pro and con, and
scores in several metrics. These analyses could be used as a reference for later, however
the mindset of trade-off analysis is an indispensable utility for all technical
practitioners.

The book also covers other aspects, following the same trade-off analysis methodology. To
name a few:

- Service granularity
- Reuse patterns
- Data ownership
- Data access
- Contracts
- Data

Last but not least, the book highlighted the importance to speak the language of business
regarding the architectural decisions, namely the business drivers.

This book is a respectable achievement from four authors, three of whom are from
ThoughtWorks. They've found a unified narrative behind one of the hardest challenges in
technical world: decision making.

