# link-to

Navigating with Links and the {{link-to}} Helper

```
<div class="container">
  <div class="menu">
    {{#link-to "index"}}
      <h1>
        <em>SuperRentals</em>
      </h1>
    {{/link-to}}
    <div class="links">
      {{#link-to "about" class="menu-about"}}
        About
      {{/link-to}}
      {{#link-to "contact" class="menu-contact"}}
        Contact
      {{/link-to}}
    </div>
  </div>
  <div class="body">
    {{outlet}}
  </div>
</div>
```

# beforeModel

All we want to do when a user visits the root (/) URL is transition to /rentals. To do this we will add code to our index route handler by implementing a route lifecycle hook called `beforeModel`. Route lifecycle hooks are special methods that are called automatically when a route renders or data changes. Inside, we'll call the `replaceWith` function:

```
import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.replaceWith('rentals');
  }
});
```

The `replaceWith` function is similar to the route's `transitionTo()` function, the difference being that `replaceWith` will replace the current URL in the browser's history, while `transitionTo` will add to the history. Since we want our rentals route to serve as our home page, we will use the `replaceWith` function.

Summary:
`replaceWith`: replace the current URL in the browser's history
`transitionTo`: add the current URL to the browser's history

