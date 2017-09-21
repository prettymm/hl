FE Lab > Coffee Sources
=================

Instructions
-------------

- Do not attach modules via class/id name, use a standard attribute like `data-js-module-name` 
```
// jade
a(data-js-module-name).btn-next

// coffee
$('[data-js-module-name]').ModuleName()
```

- Options passed to the module in the form:
```
a(data-js-module-name="some-value", data-option-name="some-value2").btn-next
```

- Use `js-` selector names to show that certain elements have JS behaviour attached  
```
// jade
a.js-btn.btn-next

// coffee
$('.js-btn').click ->
  console.log 'Hello world.'
```

- Long functions should be split into bite sizes

[Documentation](https://loweproferotech.atlassian.net/wiki/display/IL/The+JavaScript+Standard)