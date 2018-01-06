/*
* @Author: Administrator
* @Date:   2017-12-25 12:59:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-26 19:45:24
*/
var $ = require('jquery');
require('less/toast.less');

function toast(msg,time) {
            this.msg = msg;
            this.dismissTime = time||1000;
            this.createToast();
            this.showToast();
        }
toast.prototype = {
    createToast: function() {
        var tpl = '<div class="toast">'+this.msg+'</div>';
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast: function() {
        var self = this;
        this.$toast.fadeIn(700,function() {
            setTimeout(function() {
                self.$toast.fadeOut(700,function() {
                    self.$toast.remove();
                });
            },self.dismissTime);
        });
    }
};

function Toast(msg,time) {
    return new toast(msg,time);
}

module.exports.Toast = Toast;

