---
path: "/blog/testing-strategy-in-real-cases"
date: "2020-09-20"
title: "Testing strategy in real cases"
tags: ["Testing TDD"]
---

This is a topic I'm not capable to cover succinctly yet. I'll try my best at the moment and revisit
later.

## Why tests are valuable

- Confidence in implementation
- Freedom of change
- Act as documentation
- Reduce costly debugging

All practices come with applicable contexts. I've seen some well put articles around the 
necessities of unit testing, whatever the definition of unit is. One main context we are under
 is that it's gonna be a moderately big real project, which means at least months of effort 
 from a few Scrum teams of developers.

On the contrary to common image, tests actually take more skills and effort to write. If a test 
is not well written, it will soon lose maintenance thus become useless. A bad written code at 
least has functionality.

## Testing Pyramid

Different test has different cost in writing and running. So they are pictured as a pyramid, 
with expensive one at top, relatively cheap one at bottom.
 
We are living in a real world, everything comes with a cost. Test is no less the same. 
If the probability of a test goes wrong is low, and other tests have covered the same test 
object, there would be no reason to keep it. Tests also require maintenance in the whole life 
cycle of the belonging product. Anyone should not be afraid to change tests to reflect the 
change of business. 

What's worthwhile to note is that it is reasonable to have a test for integration. Its objective
 is to test the links between all units, while the caveat is it's not necessary to cover 
 multiple use cases which should be the responsibility of individual units. It seems unnerving
  for new TDD adopters, a second thought of this approach will reveal that you've lost not much
   in confidence.
    
However, I've seen an exception in recent project. The workflow covers quite a few units, and 
it has various sub cases which expects different behaviours from units. Then it makes sense to 
have a feature test for each sub cases, in case the target is lost during the development.

When we look at the pyramid and the real cases together, confusion arises. Where is the boundary
 for each type of test? Shall we include that component in this test of not?

### Principles

- The more object a test is covering, the less correctness it should be aiming for. For 
example, the higher level test should cover less scenario.
- Be pragmatic, add tests if only extra confidence is necessary.
- Avoid overlaps.
- Cost versus benefits.
- Don't be afraid to introduce manual tests.
- Actively clean up tests
- Change design if testability demands
- Solitary and sociable: two styles of unit testing

### E2E at top

- Including UI interaction, data source, all collaborating services, possibly third party services.
- Should be minimal, just cover the most valuable happy path.
- Costly to maintain.

### Integration test is a dirty word

In my working environment we use integration test for those tests involving infrastructure which
is out of our control, like database, http requests, third party services. The test will call a
real instance, albeit in a controlled environment like docker or wiremock, to make sure the
 interaction between units are as expected. This is distinguished from unit tests by not using
 mocked collaborator, and from e2e tests by mocking the connected instance.

#### Data source integration test

Within the boundary of service, while with data source which is part of the infrastructure. It may 
only verify the correctness of data fetched or persisted, leave a full chain of business logic
 intact. It requires schema populating, data populating and data cleaning up. The schema 
 populating happens only once for a whole run of test. The latter two are required for each
  test cases.

#### Contract test

Sometimes this refers to the specific technics to test contracts between services by Pact.

It requires a continuous integration pipeline to ensure the value of this kind of test.

### Unit test

The definition of unit is always not consistent between teams. Martin Fowler's take on this topic
is worth a reading so attached as reference.

In our job most of the time we adopt solitary unit tests. In some cases we are open to test
two classes together if their interaction is the whole point of one of the unit. Like builder class,
simple factory method, testing them alone would miss the context of their usages, and their contract
might change but not detectable on the other side if tested solitary.

## TDD at all levels

It's not suggested starting a feature with a blackbox acceptance test or e2e test because it
won't provide necessary feedback for next steps in development. Instead start with a xUnit
feature test, covering one business scenario, and start adding tests and implementation at unit
level.

## Missing parts

The seam between connecting parts in most cases are tested by feature tests. If some collaboration
only happens for edge cases which is not covered by feature test, the choice to add one or not is
up to the trade-off between cost and benefits. There is no golden rule and sometimes the lesson has
 to be learnt with found bugs in later stages. 
 
Other hidden infrastructure as API gateway, load balancer, networks, CDN etc can only be covered
 by E2E test, even costly. Question is whether to test features in independent module/service or 
 the interaction among them.

## References

<https://martinfowler.com/bliki/TestPyramid.html>
<https://www.martinfowler.com/bliki/UnitTest.html>
<https://tyrrrz.me/blog/unit-testing-is-overrated>