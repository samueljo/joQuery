const DOMNodeCollection = require("./dom_node_collection");

const funcQueue = [];

window.$l = function (arg) {
  if (arg === window) {
    return window;
  } else if (typeof arg === "string") {
    return new DOMNodeCollection(
      Array.from(document.querySelectorAll(arg))
    );
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(
      [arg]
    );
  } else if (typeof arg === "function") {
    if (document.readyState === "complete") {
      arg();
    } else {
      funcQueue.push(arg);
    }
  }
};

function execute() {
  funcQueue.forEach( (func) => {
    func();
  });
}

window.$l.extend = function (...objects) {
  const result = objects[0];
  objects.slice(1).forEach( (object) => {
    Object.keys(object).forEach( (key) => {
      result[key] = object[key];
    });
  });

  return result;
};

window.$l.ajax = function (options) {
  let defaults = {
    method: "GET",
    url: "./",
    data: {},
    success: function() {},
    error: function() {},
  };

  const xhr = new XMLHttpRequest();
  this.extend(defaults, options);

  xhr.open(defaults.method, defaults.url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      defaults.success(JSON.parse(xhr.response));
    } else {
      defaults.error(JSON.parse(xhr.response));
    }
  };

  xhr.send(defaults.data);
};

document.addEventListener("DOMContentLoaded", execute);
