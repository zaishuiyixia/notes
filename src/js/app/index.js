/*
* @Author: Administrator
* @Date:   2017-12-24 23:23:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-26 17:16:36
*/
var $ = require('jquery');
require('less/index.less');

var NoteManager = require('mod/node-manager.js');
var Event = require('mod/event.js');
var WaterFall = require('mod/waterfall.js');

NoteManager.load();

$('.add-note').on('click',function() {
    NoteManager.add();
})

Event.on('waterfall',function() {
    WaterFall.init($('#content'));
})