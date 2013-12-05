(function() {

  // Block内で使われているclass名の紐付け

  var selector_block = '.togglable-panel';
  var selector_button = '.togglable-panel__button';
  var selector_body = '.togglable-panel__body';
  var cls_button_open = 'togglable-panel__button_state_open';
  var cls_body_open = 'togglable-panel__body_state_open';

  // 生成したインスタンスを要素に紐付けるkey

  var widget_data_key = 'togglablePanel';

  // インスタンス生成時に実行されるコンストラクタ

  var TogglablePanel = function($el) {
    this.opened = false;
    this.$el = $el;
    this.$button = $(selector_button, $el);
    this.$body = $(selector_body, $el);
    this._eventify();
  };

  TogglablePanel.prototype = {

    // 公開メソッド
    
    open: function() {
      if(this.opened) {
        return;
      }
      this.opened = true;
      this.$button.addClass(cls_button_open);
      this.$body.addClass(cls_body_open);
      // panel.openイベントを発生させる
      this.$el.trigger('panel.open');
    },
    close: function() {
      if(!this.opened) {
        return;
      }
      this.opened = false;
      this.$button.removeClass(cls_button_open);
      this.$body.removeClass(cls_body_open);
      // panel.closeイベントを発生させる
      this.$el.trigger('panel.close');
    },
    toggle: function() {
      if(this.opened) {
        this.close();
      } else {
        this.open();
      }
    },

    // event things

    on: function(eventName, callback) {
      this.$el.on(eventName, callback);
    },
    off: function(eventName, callback) {
      this.$el.off(eventName, callback);
    },

    // パネルを開閉する振る舞いをbind

    _eventify: function() {
      var self =  this;
      self.$el.on('click', selector_button, function() {
        self.toggle();
      });
    }

  };

  // jQuery plugin化

  $.fn.togglablePanel = function() {
    return this.each(function(i, el) {
      var $panel = $(el);
      // インスタンスの生成
      var instance = new TogglablePanel($panel);
      // jQuery Data APIを利用し、生成したインスタンスを紐付ける
      $panel.data(widget_data_key, instance);
    });
  };

  // セットアップメソッド

  TogglablePanel.setup = function(rootEl) {
    $(selector_block, rootEl).togglablePanel();
  };

  // セットアップ実行

  $(function() {
    TogglablePanel.setup('body');
  });

  // TogglablePanelをグローバルで実行可能にする

  window.TogglablePanel = TogglablePanel;

}());
