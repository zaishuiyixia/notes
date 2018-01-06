/*
* @Author: Administrator
* @Date:   2017-12-25 15:27:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-29 13:40:55
*/
var $ = require('jquery');
require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('./event.js');

function Note(opts) {
    this.opts = opts;
    this.timer = null;
    this.initOpts(opts);
    this.createNote();
    this.setStyle();
    this.bindEvent();
}

Note.prototype = {
    colors: [
        ['#ea9b35', '#efb04e'], // headColor, containerColor
        ['#dd598b', '#e672a2'],
        ['#eee34b', '#f2eb67'],
        ['#c24226', '#d15a39'],
        ['#c1c341', '#d0d25c'],
        ['#3f78c3', '#5591d2']
    ],

    //note的配置信息及初始化
    defaultOpts: {
        id: '',
        $ct: $('#content').length > 0 ? $('#content') : $('body'),
        context: 'input here'
    },

    // init note
    initOpts: function (opts) {
        this.opts = $.extend({}, this.defaultOpts, opts || {});
        if (this.opts.id) {
            this.id = this.opts.id;
        }
    },

    //创建note模板
    createNote: function () {
        var tpl =  '<div class="note">'
              + '<div class="note-head"><span class="delete">&times;</span></div>'
              + '<div class="note-ct" contenteditable="true"></div>'
              +'</div>';

        this.$note = $(tpl);
        this.$note.find('.note-ct').html(this.opts.context);
        this.opts.$ct.append(this.$note);
        if (!this.id) this.$note.animate({
            top: ((Math.random() + 1) * $(window).height()) * 0.3,
            left: ((Math.random() + 1) * $(window).width()) * 0.3,
        }, 100)
    },

      setStyle: function () {
        var color = this.colors[Math.floor(Math.random() * 6)];
        this.$note.find('.note-head').css('background-color', color[0]);
        this.$note.find('.note-ct').css('background-color', color[1]);
    },

    //当note位置发生变化，所有note重新布局
    setLayout: function () {
        var _this = this;
        if (this.timer) {
            clearTimeout(_this.timer);
        }
        this.timer = setTimeout(function() {
            Event.fire('waterfall');
        }, 100);
    },

    //给note绑定事件
    bindEvent: function () {
        var _this = this,
            $note = this.$note,
            $noteHead = $note.find('.note-head'),
            $noteCt = $note.find('.note-ct'),
            $delete = $note.find('.delete');

        $delete.on('click', function() {
            _this.delete();
        });

        // contenteditable,HTML5属性，没有 change 事件，所有这里通过判断元素内容变动来模拟
        $noteCt.on('focus', function() {
            $noteCt.data('before', $noteCt.html());
            if ($noteCt.html() == 'input here') {
                $noteCt.html('');
            }
        }).on('blur paste', function() {
            if ($noteCt.data('before') !== $noteCt.html()) {
                $noteCt.data('before', $noteCt.html());
                _this.setLayout();
                if (_this.id) {
                    _this.edit($noteCt.html())
                } else {
                    _this.add($noteCt.html())
                }
            }
        });

        // note的拖拽效果
        $noteHead.on('mousedown', function (e) {
            // evtX 计算事件的触发点在 dialog 内部到 dialog 的左边缘的距离
            var evtX = e.pageX - $note.offset().left,
                evtY = e.pageY - $note.offset().top;
            // 把事件到 dialog 边缘的距离保存下来
            $note.addClass('draggable').data('evtPos', {x: evtX, y: evtY});
        }).on('mouseup', function () {
            $note.removeClass('draggable').removeData('pos');
        });

        // 当用户移动鼠标时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        $('body').on('mousemove', function (e) {
            $('.draggable').length && $('.draggable').offset({
                top: e.pageY - $('.draggable').data('evtPos').y,
                left: e.pageX - $('.draggable').data('evtPos').x
            });
        });
    },

    //编辑note
    edit: function (msg) {
       var _this = this;
       $.post('/api/notes/edit',{
           id: _this.id,
           note: msg
       }).done(function(ret) {
           if (ret.status === 0) {
               Toast('update success');
           } else {
               Toast(ret.errorMsg);
           }
       })
    },

    // 新建note
    add: function (msg) {
        var _this = this;
        $.post('/api/notes/add',{
            note: msg
        }).done(function(ret) {
            if (ret.status === 0) {
                 Toast('add success');
            } else {
                _this.$note.remove();
                Event.fire('waterfall')
                Toast(ret.errorMsg);
            }
        });
    },

    //删除note
    delete: function () {
       var _this = this;
       $.post('/api/notes/delete', {id: this.id})
        .done(function(ret) {
            if (ret.status === 0) {
                Toast('delete success');
                _this.$note.remove();
                Event.fire('waterfall')
            } else {
                Toast(ret.errorMsg);
            }
        });
    }
};

module.exports.Note = Note;







function fn (arr1,arr2,index) {
    return 
}