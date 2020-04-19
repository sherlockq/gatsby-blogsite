---
path: "/blog/transducers-in-clojure-explained"
date: "2020-04-13"
title: "Transducers in Clojure Explained"
tags: ["Clojure"]
---

If you've read the [official article](https://clojure.org/reference/transducers) and still feel confused, you're not alone. So here I try to articulate it with my own words and examples.

Transducing is an idea based on reducers. It's introduced into Clojure since 1.7, and there's not really a functionality which could not be implemented by other ways. Yet it significantly improve the composability of reducing functions.

A transducer's beauty is that: It could affact the final result of reducing, without the dependency on the type of reduced value.

## Antipasti Examples

Let's start with some examples

```clojure
; Here's our first transducer
; rf is short for reducing function
(defn transducer-inc [rf]
  (fn
    ([] (rf))
    ([result] (rf result))
    ; Ignore above 'boilerplate'
    ([result input]
     (rf result (inc input)))))

; Transduce is the variation of reduce, the first and second argument
; are transducer and the reducer.
; https://clojuredocs.org/clojure.core/transduce
; [1 2] -> [2 3] -> 2 + 3 -> 5
(transduce transducer-inc + [1 2])
=> 5

; This statement is analogous to the previous one
; And there's reason why I provide 0 as initial value here. I'll explain later.
(reduce (transducer-inc +) 0 [1 2])
=> 5

; [1 2] -> [2 3] -> 2 * 3 -> 6
(transduce transducer-inc * [1 2])
=> 6

; And the same transducer function can be obtained like this.
; We'll explain that 1-arity map later. It's not a partial function
; (partial map inc), even they function similarly.
(transduce (map inc) + [1 2])
=> 5

; We could definitely achieve same result with collection pre-processing
(reduce + (map inc [1 2]))
=> 5

; But we prefer high-order functions, don't we?
```

## Transducer function

Basically, a transducer function is a wrapper over a reducing function. It returns a new reducing function, in
which it additionaly does its own logic and then invokes the original reducing function.

**What it actually does, is pre-processing the individual item of the collection lazily. When its work is done, it'll pass the processed item to the reducing function, or not (like what `filter` does).**

It also has the ability to change the previous result. But it's not a good practice because that means the transducer is dependent on the type of reduced value. If the return type of reducing function is different, it may break the transducer. And this will weaken the value of transducers.

Several collection manipulation functions in clojure have their transducer-generation arity, in which you don't provide the collection as argument. They have the same functionalities as their collection manipulation counterparts. But the implementation is quite different.

```clojure
; The best way to explain is to show the source code
(defn filter
  "Returns a lazy sequence of the items in coll for which
  (pred item) returns logical true. pred must be free of side-effects.
  Returns a transducer when no collection is provided."
  {:added "1.0"
   :static true}
  ([pred]
    (fn [rf]
      (fn
        ([] (rf))
        ([result] (rf result))
        ([result input]
         ; here is the logic of tranducer
         ; it's so much more readable than the collection version
           (if (pred input)
             (rf result input)
             result)))))
  ([pred coll]
   (lazy-seq
    (when-let [s (seq coll)]
      (if (chunked-seq? s)
        (let [c (chunk-first s)
              size (count c)
              b (chunk-buffer size)]
          (dotimes [i size]
              (let [v (.nth c i)]
                (when (pred v)
                  (chunk-append b v))))
          (chunk-cons (chunk b) (filter pred (chunk-rest s))))
        (let [f (first s) r (rest s)]
          (if (pred f)
            (cons f (filter pred r))
            (filter pred r))))))))

```

> The following functions produce a transducer when the input collection is omitted: map cat mapcat filter remove take take-while take-nth drop drop-while replace partition-by partition-all keep keep-indexed map-indexed distinct interpose dedupe random-sample

## Composite of transducers

Transducers are chainable, because the input and output are both reducing function.

```clojure
(transduce (comp transducer-inc transducer-inc) + [1 2])
=> 7
```

But be careful, the transducers are applied from left to right when chained with `comp`.

Think tranducers as layers of wrappings, you pack your item from inside to outside, like building the new reducing function with transducers from right to left. But when the transformed reducing function is invoked, the logics in transducers are applied from left to right, like unpacking the package.

```clojure

(def transducer-double (map #(* % 2)))

(transduce (comp transducer-inc transducer-double) + [1 2])
=> 10

(transduce (comp transducer-double transducer-inc) + [1 2])
=> 8

```

## A bit about Reduce (Welcome to skip this chapter)

I'll assume the reader understands what reducing is. It's not an easy concept by itself, yet you could find
good explanations elsewhere.

Reducing function/Reducer: The function specified in a `reduce` call. At least it should take two arguments, and return a value. The reducing function should be able to accept its return value as its first argument, otherwise it won't
function as expected.

```clojure
; Plus is a reducing function
(+ 1 2)
=> 3

; Conj is as well
(conj [1 2] 2)
=> [1 2 2]


; Is map a reducing function? Maybe not, The return value couldn't be passed as map's
; first argument
(map inc [1 2])
=>(2 3)
```

Something you might be unaware of: To work properly with a `reduce` call, both 0 and 2-arguments arities are
required of the reducing function. 0-arity is invoked when no init value is provided and the collection is empty.

```clojure
; The value 0 is the result of (+)
(reduce + [])
=> 0
```

2-arity is the normal case. It could be invoked with

- the result from previous invocation and the next item in collection
- the init value and the first item of collection, if init value is provided and collection is not empty
- the first and second items in collection, if no init value is provided and collection has no less than two items.

So what happens if no init value is provided and there's only one item in collection? The item is returned as it is! The reducing function won't be called at all.

```clojure
(reduce conj [1])
=> 1

; What the reducer is doesn't matter
(reduce nil [1])
=> 1
```

If collection is empty and init value is provided, the init value will be returned straight away. But I believe this is a lot more expected, not like the last finding.

```clojure
(reduce nil [5] [])
=> [5]
```

## Init value of transduce

Unlike `reduce` function, `transduce` will always call the 0-arity transformed reducing function to generate
a initial value if it's not provided. So the first item of collection won't be used as the first argument of
2-arity transformed reducing function.

```clojure
(transduce (map inc) + [1 2])
=> 5

(transduce (map inc) + 0 [1 2])
=> 5

(reduce ((map inc) +) [1 2])
=> 4

(reduce ((map inc) +) 0 [1 2])
=> 5
```

Could you explain why the results are different? Because in the third statement, the first `1` is passed as the first argument to the reducing function, and it's never increased as other item.

## Transducers are not only for transduce

Transducer is not necessarily only used with a reducing function. For some special cases, i.e. `into` and `sequence`, there are no places for a reducing function. Instead, under the hood an equivalent of reducing function is provided.

```clojure
(into [] (filter odd?) (range 10))
=> [1 3 5 7 9]

; The reducing function of into is exactly conj
(transduce (filter odd?) conj [] (range 10))
=> [1 3 5 7 9]

(into #{} (filter odd?) (range 10))
=> #{7 1 3 9 5}


; The reducing function of sequence is more complex.
; Somehow it could be fathomed as a function which takes a LazySeq
; and a item, returns a new LazySeq with the item appended
(sequence (filter odd?) (range 10))
=> (1 3 5 7 9)

(class (sequence (filter odd?) (range 10)))
=> clojure.lang.LazySeq

```

## More examples

```clojure
(transduce (filter odd?) + (range 5))
=> 4


; Yes, identity is a transducer, obviously
(transduce identity conj [1])
=> [1]

; cat is a transducer on its own
; https://clojuredocs.org/clojure.core/cat
; Its clojuredoc is really confusing.
; In my word, it'll apply the reducer to each child
; item of the item in collection. Well, it's easier to read the source code directly.
(transduce cat + [[1] [2]])
=> 3

(sequence (comp (take 5) cat) (repeat [1 2 3]))
=> (1 2 3 1 2 3 1 2 3 1 2 3 1 2 3)

(sequence (comp cat (take 5)) (repeat [1 2 3]))
=> (1 2 3 1 2)

```

## Questions

**Q**: What's the 1-arity of the returned reducing function from transducer for?

**A**: Reducing function must have 0 and 2 parameters arities to work with `reduce`. But for a transducer friendly reducing function, one arity is necessary. It's explained [here](https://clojure.org/reference/transducers#_creating_transducers).

## References

- <https://clojure.org/reference/transducers>
- <https://blog.frankel.ch/learning-clojure/7/>
- <https://stackoverflow.com/questions/26317325/can-someone-explain-clojure-transducers-to-me-in-simple-terms>
