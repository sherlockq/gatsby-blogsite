---
path: "/blog/my-take-on-third-party-integration"
date: "2025-07-31"
title: "My take on third party integration"
tags: [ "Integration", "Methodology" ]
---

Third party integration has been a staple in our common jobs. It's understandable that people would fear it due to the
perception of its uncontrollable nature. On the other hand, no one could build the whole world. A well-planned
integration could bring value to business at the fastest pace without significantly jeopardising one's own platform's
integrity and robustness. Here's my brief take on this matter, and I’ll probably expand on it in the future.

## Stages and key points

### Business alignment

This is just the same as all features. Business first. What's the value and cost to the business, measured by concrete
figures?

Even if the technical people might not be fully involved at this stage, it's still paramount to fully understand the
business motivation and constraints to make timely and correct decisions along the way.

A simple example: with automated bank transactions reconciliation, how many man-days could be saved for finance? How
likely is a human error now, and how much would the risk cost? This is all measurable.

However, a common pitfall is that people tend to underestimate the long-term cost of maintaining a third party
integration. It's considerably higher than an internal feature, varying depending on the maturity of in-house tooling.
As an external force, there's simply predictable and unpredictable cost involved. Just to name a few: planned
maintenance, unplanned breakdowns, certificate rotation, forced deprecation, and upgrades. For an integration-heavy
platform, make sure this is considered in the tech budget.

### Evaluation and selection

Alternatives: With the previous value estimation, it's always valid to ask—would there be a cheaper alternative? Would
manually uploading a file suffice, albeit still a form of integration?

For cloud-native solutions, beyond the features, check their service level history. There's aggregation websites
like https://statusgator.com/, but I find they rarely cover industry-specialised services. At least, you'd rather trust
a service with a transparent status record than a discreet one.

Anyway, it's a painful process. You have to figure out a scorecard to fit each scenario, and I haven't managed to find a
universal methodology in this regard—do shout out and share.

### Early verification

Try to shift left as much as possible, due to the fact that there's far more unexpected outcomes from a third party than
an internal feature. Ideally, manually verify the business scenario and seek written clarification from their business
representative.

A lesson: I've seen a feature implemented to support next-day scheduled payments, without a clear confirmation from
their business about what time the payment would be made—critical to the viability of the feature for our business. Even
a confirmation from their technical unit won’t suffice, because implementation details are liable to change. Only a
law-binding contract would justify the investment.

Another plus is that during early verification, you'll get a rough idea of their readiness in terms of testing
environment, production environment, documentation, and responsiveness. It might be too late to steer away as a
technical personnel, but at least you could adjust estimations and manage expectations for all parties.

### Design and implementation

Most of the work is done here, including all the stages I've listed below. I'll list the items with a brief explanation:

- **Idempotency:** This is top on my list for the sheer simplicity it brings to functionality and maintainability as
  well. Not saying it's simple to achieve, but it's worth the effort.
    - Take payment for example—you won't want to pay twice. Usually, the payment service would require an identifier and
      promise idempotency on their side. On our platform, we need to make sure that identifier is stored and linked to
      an internal unique business identifier, which should avoid duplicate calls by all means. It has to be analysed
      case by case.
    - Transactional/eventual consistency needs to be considered as well. You'll find achieving idempotency would most
      likely alleviate burden on this side.
- **Security:** IP whitelisting, mutual TLS, API keys etc. Universal and might be standardisable through internal
  tooling.
- **Volume planning, throttling:** Better to consider early than late. You might have to introduce rate limiters or
  separation of accounts. If the call incurs cost, again refer to idempotency and introduce alerting or capping as
  needed.
    - We had an unexpected bill due to a broken infinite retry mechanism caused by changes to the platform framework. Is
      it foreseeable and preventable? Probably not. Yet for a large platform, this should be built into the
      infrastructure.
- **Recoverability:** Anything can fail. How would you recover from it and make up for missing data? Guess
  what—idempotency. When and how to retry is a concern of design as well.
- **Implementation-wise**, try to extract real data from their production environment and test-drive from there. Invest
  in your tooling for automation testing.
- **Testing:** Depending on the third party’s testing environment and the business scenario, it might not be feasible to
  link your UAT environment to theirs. In this case, deploying a mock server with responses supporting a subset of
  scenarios would unblock the flow in UAT to benefit product owners and tech.

### Migration and Going Live

If the stake is high, test in production as early as possible with minimal chips to lose. Murphy's Law. Even if you've
covered all the points at the design stage, there'll always be surprises. Prepare for surprises and control the risk.

### Maintenance and Support

Logging, auditing, metrics—sparingly. Compared to internal features, the reproduction cost of an integration issue is
higher. Keeping the crime scene is worth it. Storing all requests and responses in S3 would be an option.

Support-wise, like other support processes: automation and automation. Improve design if needed.

### Business Continuity

Shit happens. Include third party integrations as part of your game day.

