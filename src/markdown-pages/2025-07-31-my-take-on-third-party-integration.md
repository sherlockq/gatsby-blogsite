---
path: "/blog/my-take-on-third-party-integration"
date: "2025-07-31"
title: "My take on third party integration"
tags: ["Integration", "Methodology"]
---

Third party integration has been a staple in our common jobs. It's understandable that people would fear as the perception of its uncontrollable nature. On the other hand, no one could build the whole world. A well planned integration could bring value to business with fastest pace without significantly jeopardise own platform's integrity and robustness. Here's my brief take on this matter and probably would expand on them in future.

## Stages and key points

### Business alignment

This is just same as all features. Business first. What's the value and cost to the business, measured by concrete figures. 

Even the technical people might not be fully involved at this stage, it's still paramount to fully understand the business motivation and constraint to make timely and correct decision along the way.

A simple example, with an automated bank transactions reconciliation, how many man days could be saved for finance. How likely a human error could be made now and how much the risk would cost. This is all measurable. 

However a common pitfall is that people tend to underestimate the long term cost of keeping a third party integration. It's considerably higher than an internal feature, varied as per maturity of in house tooling. As an external force, there's simply predicable and unpredictable cost involved. Just name a few, planned maintenance, unplanned breakdown, certificate rotation, forced deprecation and upgration. For a integration heavy platform, make sure that's considered for the tech budget.

### Evaluation and selection

Alternatives: With previous value estimation, it's always valid to ask, would there be cheaper alternative? Would keep manually uploading a file surfice, albeit it's still a form of integration? 

For cloud native solutions, other than the features, check their service level history. There's aggregation website like https://statusgator.com/, but I find them rarely cover the industry specialised services. At least, you'd rather trust a service with transparent status record than a discreet one.

Anyway, it's a painful process. You have to figure out a score card to fit each scenario and I haven't managed to find a universal methodology on this regard, do shout out and share.

### Early verification

Try to left shift as much as possible, due to the fact that there's way more unexpected outcomes from the third party than an internal feature. Ideally, manually verify the business scenario and seek written clarification from their business representative.

A lesson is that I've seen a feature had been implemented to support next day scheduled payment, without a clear confirmation from their business to promise at what time the payment would be made, which is critical to the viability of the feature to our business. Even a confirmation from their technical unit won't suffice because implementation details is liable to change. Only a law binding contract would justify the investment.

Another plus is that during the early verification, you'll have a rough idea of their readiness of testing environment, production environment, documentation and responsiveness. It might be too late to steer away as a technical personnel, at least you could adjust the estimation and manage the expectation of all parties.

### Design and implementation

Most work is done here, including all the stages I've listed below. I'll list the items with a brief explanation

- Idempotency: This is top in my list for the sheer simplicity it brings to functionality and maintenablity as well. Not saying it's simple to achieve, but it's worth the effort
    - Take payment for example, you won't want to pay twice. Usually the payment service would required an identifier and promise idempotency on their side. On our platform, we need to make sure that identifier is stored and linked to an internal unique business identifier, which should avoid duplicate call by all means. It has to be analysed case by case.
    - Transactional/eventual consistency needs to be considered as well. You'll find achieveing idempotency would most likely levitate burden on this side.
- Security: IP whitelisting, mutual TLS, API key etc. Universal and might be standardisable through internal tooling.
- Volume planning, throttle: Better consider early than late. You might have to introduce rate limiter, separation of accounts. If the call will incur cost, again refer to idempotency and introduce alerting or capping as needed.
    - We have an unexpected bill due to a broken infinite retry mechanism caused by changes to the framework of the platform. Is it foreseeable and preventable? Probably not. Yet for a large platform this should be built into the infrastructure.
- Recoverability: Anything would fail. How would you recover from it and make up for missing data? Guess what, idempotency. When and how to retry is a concern of design as well.
- Implementation wise, try to extract real data from their production environment and test driven from there. Invest in your tooling for automation testing.
- Testing: Depending on the provided testing environment from third party and business scenario, it might not be feasible to link your UAT environment to theirs. In this case, deploy a mock server with responses supporting a subset of scenarios would unblock the flow in UAT to benefit the product owners and tech. 

### Migration and Going live

If the stake is high, test in production as early as possible with minimal chips to lose. Murphy's Law. Even you've coverred all the points at design stage, there'll always be surprise. Prepare for surprise and control the risk.

### Maintenance and Support

Logging, auditing, metrics sparingly. Compared to internal feature, the reproduction cost of integratino issue is higher. Keeping the crime scene is worth it. Storing all requests and responses in S3 would be an option. 

Support wise, like other supporting, automation and automation. Improve design if needed. 

### Business continuity
 
Shit happens. Include third party integration as part of your game day.
