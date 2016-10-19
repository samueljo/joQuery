## joQuery

A light-weight library to manage core DOM manipulation functionality, making AJAX requests, and event handling. Implemented using the native DOM API to ensure cross-browser compatibility.

[Demonstrated with an rendition of the classic game Snake!][Snake]
[Snake]: https://samueljo.github.io/Snake/

### Methods

#### $jo

```javascript
const $li = $jo('<li>');
// $jo('<tag>') will create an HTML element with the tag and return a DOMNodeCollection object

const collection = $jo('li');
const collection = $jo('.snake');
// $jo('tag') and $jo('.klass') will collect all matching nodes from the page and return a DOMNodeCollection object

const collection = $jo(HTMLElement);
// If argument is an instance of HTMLElement, function returns native HTMLElement wrapped in joQuery, returning a DOMNodeCollection

$jo(func);
// If argument is a function, will push function into a queue to be executed on `document` `ready`


$jo.extend(objA, objB, objC);
// Merges two or more JavaScript objects

$jo.ajax(options);
// Receives an options object argument and sends an AJAX request with native JavaScript using an XHR, or XMLHttpRequest object.
```

#### DOMNodeCollection

DOMNodeCollection.html(string)
```javascript
```

DOMNodeCollection.empty()
```javascript
```

DOMNodeCollection.append(content)
```javascript
```

DOMNodeCollection.attr(name, value)
```javascript
```

DOMNodeCollection.addClass(name)
```javascript
```

DOMNodeCollection.removeClass(name)
```javascript
```

DOMNodeCollection.children()
```javascript
```

DOMNodeCollection.parent()
```javascript
```

DOMNodeCollection.find(selector)
```javascript
```

DOMNodeCollection.remove()
```javascript
```

DOMNodeCollection.on(event, callback)
```javascript
```

DOMNodeCollection.off(event, callback)
```javascript
```

DOMNodeCollection.text(textString)
```javascript
```

DOMNodeCollection.get(index)
```javascript
```
