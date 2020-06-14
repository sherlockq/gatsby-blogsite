---
path: "/blog/testing-strategy-in-real-cases"
date: "2020-05-02"
title: "Testing strategy in real cases"
tags: ["Testing TDD"]
---
WIP

## Why tests are valuable

Confidence in implementation
Freedom of change
Act as documentation
Reduce costly debugging

On the contrary to common image, tests actually take more skills and effort to write. If a test is not well written, it will soon lose maintenance thus become useless. A bad written code at least has functionality.

## Testing Pyramid

Different test has different cost in writing and running. So they are pictured as a pyramid, with expensive one at top, relatively cheap one at bottom.

We are living in real world, everything comes with a cost. Test is so as well. If the probability of a test goes wrong is low, and its target is covered by other tests, there's no reason to keep it. Tests also require maintenance in the whole life cycle of the belonging product. Anyone should not be afraid to change tests to reflect the change of business.

However, when we look at the pyramid and the real cases together, confusion arises. Where is the boundary for each type of test? Shall we include that component in this test of not?

### Seesaw between boundary and correctness

### E2E at top

Including UI interaction, data source, all collaborating services, possibly third party services.
Should be minimal, just cover the most valuable happy path.
Costly to maintain.

### Integration test is a dirty word

#### Data source integration test

Within boundary of the service, while with data source which is part of the infrastructure. It may only verify the correctness of data fetched or persisted, leave a full chain of business logic intact. It requires schema populating, data populating and data cleaning up. The schema populating happens only once for a whole run of test. The latter two is required for each test cases.

#### Contract test

At the boundary of each service, contract test.

### Unit test

Mostly within domain, no infrastructure involved or simply mocked.

## TDD at all levels

Contract test is perfect for starting a feature in the owning service. Both input and output is well defined. If it's not, start with even outside, until there's enough confidence in the requirement.

## Feature test

It's treating the target as a white box so that the orchestration of running parts inside the target could be tested. Its boundary is large so correctness of the target is not the focus.

## Missing parts

The seam between connecting parts. If the contract
Hidden infrastructure: API gateway, load balancer, networks, CDN etc.
Can only be covered by E2E test, even costly. Question is to test features in independent module/service or the interaction through them.

## Vertical Slices

Encourage parallel work.
Preliminary blocking work, if could be refactored later, accept early chaos.

## References

<https://martinfowler.com/bliki/TestPyramid.html>
