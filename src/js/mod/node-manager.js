/*
* @Author: Administrator
* @Date:   2017-12-25 19:30:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-26 17:16:12
*/
var $ = require('jquery');
var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Event = require('./event.js');

var NoteManager = (function () {

    function load() {
        $.get('/api/notes')
            .done(function(ret) {
                if (ret.status === 0) {
                    $.each(ret.data, function(idx, article) {
                        new Note({
                            id: article.id,
                            context: article.text
                        });
                    });
                    Event.fire('waterfall');
                } else {
                    Toast(ret.errorMsg);
                }
            })
            .fail(function() {
                Toast('网络异常');
            });
    }

    function add() {
        new Note();
    }

    return {
        load: load,
        add: add
    }

})();

module.exports = NoteManager