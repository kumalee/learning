# Quick Start
[Doc](https://guides.emberjs.com/release/getting-started/quick-start/)

# Install
```
npm install -g ember-cli
```

# Create a project
```
ember new ember-quickstart
```

# Start a ember server
```
cd ember-quickstart
ember serve
```

output
```
Livereload server on http://localhost:7020
Serving on http://localhost:4200/
```

# Edit template
`app/templates/application.hbs`
```
<h1>PeopleTracker</h1>

{{outlet}}
```

# Define a route
```
ember generate route scientists
```

output
```
installing route
  create app/routes/scientists.js
  create app/templates/scientists.hbs
updating router
  add route scientists
installing route-test
  create tests/unit/routes/scientists-test.js
```