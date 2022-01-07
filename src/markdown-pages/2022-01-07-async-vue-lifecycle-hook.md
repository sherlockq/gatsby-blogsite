---
path: "/blog/thoughts-of-shape-up"
date: "2021-12-29"
title: "Thoughts of 'Shape up'"
tags: ["Book review", "Agile", "Project management"]
---
The original problem this tried to resolve is that when you're already in the analysis page, and in arabic locale, after refreshing the page the department list would still be English. That's due to the misunderstanding of Vue's lifecycle hook mechanisms.

The `created` hook in App.vue is responsible of local initialisation, but it won't block the loading of its own lifecycles or other components due to the non-await behaviour of Vue. In nutshell, any async behaviour in lifecycle hook is not guaranteed to be completed before other lifecycles.

The idea of fix comes from https://stackoverflow.com/questions/65639724/how-to-use-async-await-in-vue-lifecycle-hooks-with-vuex, a v-if on a initialisation flag could block the rendering of components until mandatory information is ready, which should be kept to minimum (as for now, only global configs and permitted actions).

In actual page components, the async loading of data's order is not important because once the data field is updated in an async call, vue will render that. So just keep this in mind is good enough.

There are other valuable references:

- https://stackoverflow.com/questions/59310803/vue-async-call-in-created-lifecycle-hook
- https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate
- https://jsfiddle.net/jLs51df7/
