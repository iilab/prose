// PhantomJS doesn't have bind...
Function.prototype.bind = Function.prototype.bind||require("function-bind")