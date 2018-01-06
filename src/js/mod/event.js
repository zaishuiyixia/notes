/*
* @Author: Administrator
* @Date:   2017-12-25 14:26:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-26 17:16:33
*/
var $ = require('jquery');
var Event = (function() {
    
    var events = {};

    function on(evt,handler) {
        events[evt] = events[evt] || [];

        events[evt].push({
            handler: handler
        });
    }

    function fire(evt,args) {
        if (!events[evt]) {
            return;
        }
        for (var i = 0; i < events[evt].length; i++) {
            events[evt][i].handler(args);
        }
    }

    return {
        on: on,
        fire: fire
    }
})();

module.exports = Event;