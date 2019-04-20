# Tips about event behavior in browser

1. Debouncing and Throttling 防抖和节流
    * debounce: Grouping a sudden burst of events (like keystrokes) into a single one.
    * throttle: Guaranteeing a constant flow of executions every X milliseconds. Like checking every 200ms your scroll position to trigger a CSS animation.
    * requestAnimationFrame: a throttle alternative. When your function recalculates and renders elements on screen and you want to guarantee smooth changes or animations. Note: no IE9 support.
    - David Corbacho [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)