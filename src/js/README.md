FE Lab > JS Sources
=================

Instructions
-------------

- Do not attach modules via class/id name, use a standard attribute like `data-js-module-name`
```
// jade
a(data-js-module-name="foo").btn-next

// js
$('[data-js-module-name]').ModuleName();
```

- Options passed to the module in the form:
```
a(data-js-module-name="some-value", data-option-name="some-value2").btn-next
```

- Use `js-` selector names to show that certain elements have JS behaviour attached  
``` 
// jade
a.js-btn.btn-next

// js
$('.js-btn').on('click', function(){
  console.log('Hello world.');
});
```

- Long functions should be split into bite sizes

[Documentation](https://loweproferotech.atlassian.net/wiki/display/IL/The+JavaScript+Standard)