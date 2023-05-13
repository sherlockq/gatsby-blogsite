---
path: "/blog/notes-on-devoxx-uk-2023.md"
date: "2023-05-11"
title: "Notes on Devoxx UK 2023"
tags: [ "Devoxx" ]
---

## Developer Jox by Sven Peters from Atlassian

- Simple process could be automated, like poking people to review code
- Measure developer joy with 8 metrics
    - Speed to ship
    - Waiting time
    - Independence
    - Access to tools
    - Effort managing external standards
    - Managing code, pipeline and infrastructure
    - Ramp up time
    - Developer satisfaction

# Embracing Imposter syndrome by Dom Hodgson

Dom humorously shared his experience of doing things as novice from scratch. However,
it felt to me that's not wholly imposter related. It's a fun talk but not really impactful I'm
afraid.

# Kotlin, Project Loom and Coroutines by Urs Peter from Xebia

Very informative to a Kotlin novice like me. Some fun facts

- To make web server reactive requires a revamp of whole life cycle with non-blocking APIs,
  including database and IO calls.
- Spring reactive framework looks ugly with all the Mono decorator
- Kotlin is significantly more elegant with first class support from coroutines's `suspend`
  syntax. Just like `async` function in ES5.
- Kernel threads like those used by Java thread pool, has limit of 4K threads per GB memory. Out of
  memory exception will be thrown if too many threads are to be created, which is surprising.
- Coroutine as a light-weight thread supports 2.4m per GB memory
- Structural concurrency: constructs a hierarchy of threads which supports join, exception
  elegantly.
- Coroutine context, supports plugins to share ThreadLocal etc.
- Project Loom primarily supports similar Virtual threads as coroutines. How the syntax is still the
  traditional Java threading.
- One key advantage is that Loom retrofit blocking java IO package including file and JDBC to
  non-blocking if virtual threads are used.
- He did a nice comparison of various factors between Coroutine and Loom, and a decision charts for
  actions.

# Scaling from 0 to 20m users by Josip Stuhli from Sofascore

It's a live game score service founded in 2010. Honest first-hand stories from the speaker.

- Caching, different way and challenges from caching.
- AWS has a hosted caching service from dynamic content which supports request coalescence (only one
  backend request for concurrent user requests)
- They sacrificed fault tolerance for performance in certain stage
- Business first. Optimization based on business.
- They moved back to data center due to the huge cost of data traffic.

# Introduction to agent powered security from Contrast

Interesting product, worth a try.

- Agent injects code into logics to detect attack. Fairly low false positive.
- Requires traffic to reveal vulnerability.
- He quoted the three ways from Project Phoenix to highlight the conflict of security backlog and
  feature backlog. Nice try, kinda wrap the product selling nice.

# Cognitive Biases

Introduces the remedy to the cognitive biases brought known by Think fast, think slow.

- Analogy of the walled garden and dark forest for the intentional self and autonomous self.
- Cognitive dissonance
- The blind spots between us 2015 book
- Compensate for the bias. 10 seconds cool down for emotional response, 30 mins for "fight-flight"
  reaction from sympathetic nervous system.
- Some remedies are mentioned in the book. One of them is mindful meditation which takes 10 min a
  day.
- In-group and out-group bias

# Containers security

- `JDeps` could generate the list of dependent Java modules which could ingested by `JLink` to
  create a custom-bundled JRE. This is the recommended approach after Java 11.
- Base docker image matters hugely in vulnerability numbers
- Snyk scan
- exploit-db, a nice place to find exploitation info
- `docker build --no-cache` to make sure rebuilding with latest base image.

# CTF 101

- A fun challenge to find the hidden hash "flag" through the exploit of vulnerability on a
  designated website.
- Snyk code scan could be used to find out vulnerabilities in source code.
- It's a good game to deepen understanding of web application architecture as well.
- Some options to play
    - https://101.ctf-snyk.io/challenges only 2 as a teaser
    - https://ctf.hacker101.com/
    - https://ctfchallenge.com/

# Connascence

Didn't make it to the end, the value of the talk wasn't clear to me.

# Autonomous devices by Lorenzo Paris and Fabrizio Cannizzo from IOTICS

Fun demo of autonomous IOT devices by a robot car and a traffic light.

- Digital twin: the virtual corresponding entity of a physical device, exists in an interoperable
  cyberspace.
- It's impractical to have a single federation of all devices due to scalability issue. So all the
  devices are standalone and autonomous and interact with other devices through state listening and
  actions.
- There are a defined ontology for device types, actions, metrics etc. which supports the metadata
  of devices. SPARQL is a query language to search devices based on metadata.

# Distributed teams by Bertrand Delacretaz from Adobe & Apache

Though the advices are not systematic, the points were delivered clear and most of them were
valuable. As a principle scientist and board member of Apache foundation, the speaker distilled his
experiences into these.

- Meeting is expensive, there should be agenda and required preparation for people to attend a
  meeting.
- Writing with concise and clarity will save time for others.
- Maker's schedule versus Manager's schedule is different. A meeting in the middle of afternoon will
  interrupt the former severely.
- 4 phases of decision: brain storming -> define options -> build consensus -> decide
- Use broadcasting to announce intention, switch to issue tracking for details and logging
- Swiss Federal Council's meeting procedure consists pre-organise issues into groups
- ASD-STE100 is a simplified technical English starting from aviation industry. Define a language if
  necessary.
- All technical discussions should be open because it's unpredictable who could contribute to the
  discussion.

# Build searching bar from MongoDB

It's more like a well-prepared demo of the full text searching engine built on MongoDB Atlas with
similar syntax to Lucene. No critical questions are answered like distributed information, multiple
index building etc.

# From OOP to Go by Yarden from Rookout

A junior engineer's pieces of observation after shifting OOP language Java to Go. Not really
insightful but encouraging to see juniors in a conference.

- Go is "duck typed". It doesn't have real inheritance. Composition is always used.
- Actually, my take is that it's a comparison between OOP and procedural language.

# Cracking the scalability of JVM from creators of Quarkus

It's a controversy talk. Quarkus performed below expectation at the beginning on TechEmpower
benchmarking. After assembly level analysis, it's due to the caching of last type checked/cast
interface of concrete class. When the cache miss and requires rewrite, all the L1 cache in all the
cores requires synchronization. And the access speed across cores is not consistent due to multiple
packaging. What makes it even worth is the write of a cache address will block the read of whole
cache line, which cause false sharing.

[Netflix techblog](https://netflixtechblog.com/seeing-through-hardware-counters-a-journey-to-threefold-performance-increase-2721924a2822)
covers the similar issue. Netflix fixed it by disabling the fast type check caching altogether in
their JDK distribution. It's not feasible for Quarkus, and the issue impacts multiple library
depended on Quarkus. So the team submitted MRs to open source projects to fix the issue.

In my opinion, since the fix from JVM would come in due time, and the performance gain in real
business scenario is questionable, the solution looks short-sighted in terms of maintainability of
affected open source projects.

Nevertheless, it's an informative talk that shows how a simple type check optimization could result
in three-fold performance degradation in extreme case.

# Learn from Montessori Method by Simone Casciaroli from Onto

One of my favourite talk for its insight and wisdom.

Five key aspects of the method which applies to work settings as well. The speaker is still working
on his [blog series](https://simonecasciaroli.com/tag/montessori-leadership/).

1. Independence: Don't step in teammate's work too early. Better to show different approach later.
2. Intrinsic motivation: separate personal growth from performance review. In other words, doing the
   job itself should be source of satisfaction.
3. Respect
4. Prepared environment
5. Freedom within limit

# Where does a Platform start and end by Paula Kennedy from Syntasso

Though the talk is mostly a rearrangement of content from Team Topology, the product seems worth a
look: [Kratix](https://kratix.io/).

# Quick & Dirty (& Right)

Though the speaker scoffed Software Craftsmanship as always writing clean code dogmatically, he's
for sure a software craftsman because he cares about how to do things sensibly depending on the
situation. 