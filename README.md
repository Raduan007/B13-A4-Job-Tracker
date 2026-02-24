

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans: getElementById selects one element by ID, getElementsByClassName selects all elements of a class,querySelector gets the first element matching a CSS selector,querySelectorAll gets all elements matching a CSS selector.


### 2. How do you create and insert a new element into the DOM?

Ans: Use document.createElement() to make a new element, set its content or attributes, and then insert it with methods like appendChild(), prepend().

### 3. What is Event Bubbling? And how does it work?

Ans: Event bubbling is when an event on a child element automatically propagates up to its parent elements in the DOM, triggering their event listeners unless stopped.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Ans: Event delegation is a technique where a single parent element handles events for its child elements, which is useful for improving performance and handling dynamically added elements.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

Ans: preventDefault() stops the browser’s default action for an event,
 while stopPropagation() stops the event from bubbling up or capturing in the DOM.
