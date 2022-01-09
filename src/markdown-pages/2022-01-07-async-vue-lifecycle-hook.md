---
path: "/blog/async-vue-lifecycle-hook"
date: "2022-01-07"
title: "Async Vue lifecycle hook"
tags: ["Vue"]
---

## Summary

For who is looking for an approach to ensure async operation such as backend data loading is done in
`created` lifecycle hook, this blog hopes to shed some light and reveal under the hood mechanism for
the sake of other scenarios.

## Final solution

https://codepen.io/sherlockq/pen/abLaGMp

## Reasoning

The original problem this tried to resolve was that, in the top App.vue we intended to load a
minimum set of global status such as localisation, permissions from backend before routed page
component is loaded. Yet we later found out the latter stages in life cycle won't wait for the
completion of an async call in earlier stage. That's due to the misunderstanding of Vue's lifecycle
hook mechanisms.

This shows how it doesn't work as expected.

https://codepen.io/sherlockq/pen/RwLYyJQ

### Vue lifecycle hook is synchronised called

As briefly mentioned
in [Vue API guide](https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate), the hook is
called
"synchronously". What that means is even the hook is an async function itself, which is valid
syntactically, the hook is called as regular function in Vue's codebase, without `await` or
Promise's
`.then()`.

### The initialisation flag

The idea of fix comes
from https://stackoverflow.com/questions/65639724/how-to-use-async-await-in-vue-lifecycle-hooks-with-vuex
, a `v-if` on an initialisation flag could block the rendering of components until mandatory
information is ready, which should be kept to minimum to avoid user experience drawback.

### More common cases

Most of the time, this technique is not necessary for page component. Provide a default value for
the data to be rendered at start, and rely on Vue's reactive rendering after the data is fetched in
the async function is good enough.

## References

- https://stackoverflow.com/questions/59310803/vue-async-call-in-created-lifecycle-hook
- https://github.com/vuejs/vue/issues/7209


