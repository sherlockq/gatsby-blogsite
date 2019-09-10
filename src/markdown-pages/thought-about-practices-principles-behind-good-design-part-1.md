---
path: "/blog/thought-about-practices-principles-behind-good-design-part-1"
date: "2019-09-10"
title: "Thought about Practices/Principles behind Good Design (Part 1)"
tags: ["Learn"]
---
### Object Calisthenics
https://javflores.github.io/object-calisthenics/

It’s one of my favorite practices for clean code. It seems a bit strict and hard to follow at first encounter, yet proves profitable if you could stick with it or at least have those principles in mind.

I believe the name comes from its original intention to help transforming a procedural programming mindset into an object-oriented one. And it does a great job for me. I’ll walk through every rules and say some words.

#### Only one level of indentation per method
* Pro: Forbids writing complex logic in just one method.
* Con: A bit too much if you just write an if inside a loop.
* Advice: Try to follow it, but with a pinch of salt. And try do this in a dogmatic way for at least once.

#### Don’t use the ELSE keyword
* Advice: hm… I won’t follow this strictly. Especially when a pair of if and else could introduce a symmetry which is actually more understandable. But if you have lots of else and even some nested if inside, you got a problem.

#### Wrap all primitives and strings
* Pro: All your inputs and output would be more readable and easy to change. And it’s also a good start to bring behaviors into objects.
* Advice: Follow it, break if only you have strong reasons.

#### First class collections (wrap all collections)
* Pro: Most of time a collection is not just a collection. Its insertion/get/remove operations all have certain domain knowledge. Even a simple wrapper/delegation will express intentions clearly and expose only necessary behaviors as well.

Advices: Follow it. Follow it even seams mundane 

#### Only one dot per line dog.Body.Tail.Wag() => dog.ExpressHappiness()
* Pro: Brings good encapsulation. Pushs you to think in an object-oriented way. And changes your design.
* Advice: It’s not an easy one. Even harder to find out the better approach. But it will be worth the effort.

#### Keep all entities small
* [10 files per package, 50 lines per class, 5 lines per method, 2 arguments per method]
* Advice: Of course. Don’t be too strict. You know what it means.

#### No classes with more than two instance variables
* Advice: Follow with discretion. A good hint of clean code anyway.

#### No public getters/setters/properties
* Advice: Too much for a simple data object. But reasonable for a rich object.

### Baby Step
For most people, it means return 0/null for your first implementation. And write silly codes which will never make their way into the final code base.

Well I believe it’s just a principle to make sure you don’t go astray too far away, and stick to the single red test for now. But the problem is it doesn’t work all the time. Not to mention it’s inefficient most of the time.

So treat it as a safety net, meanwhile don’t refrain from thinking a few step ahead. You may not write codes for the future, yet it’s totally fine if you think ahead in design.

### TPP
hmmmm… Don’t like it at all. Not helping. 

### Coupling and Cohesion
Before, I think coupling means how much one module knows about the inner implementation of another module. So if you follow the law of Demeter, you should have a low coupling system. But according to the wikipedia page for that concept, it seems quite different. Any knowledge one module has, and any behaviors  one module invokes on the other module will increase their coupling, including interfaces, parameters of method calls, etc. **Everything**.

So the best way to lower coupling is to move the related information and behavior into itself. And to the extreme, you will have everything in just one module. So cohesion comes in to balance that tendency.

IMO, Low coupling leads to Low Cohesion, High Coupling leads to High Cohesion. The target of a good design is to find a balance between moderately low coupling and moderately high cohesion. That’s why they come in pairs.

* [Wiki](https://en.wikipedia.org/wiki/Coupling_(computer_programming))
* https://stackoverflow.com/questions/3085285/difference-between-cohesion-and-coupling

### The Law of Demeter
Synonym for no chained calling. It can also decrease the coupling between modules, but not eliminate it.

### SOLID
S: simple class. Somehow like high cohesion.

O: A good example is to migrate switch/if statements into Command Pattern. Don’t overdo it.

L: This one stands. I use this rule to check if one class should extend a base class or not.

I: It’s another version of single responsibility, but it’s about the view from caller/client. The interface could be even finer grain than the class.

D:  Use interfaces. And it’s not enough. Abstraction is more than just using interface. Take it with other principles.

