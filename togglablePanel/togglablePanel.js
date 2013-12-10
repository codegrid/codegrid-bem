(function() {

  // コンフィグ

  var blockName = 'togglablePanel';

  // ブロックを表現するコンストラクタ

  var TogglablePanel = function($block) {
    this.opened = false;
    this.$block = $block;
    this.$button = this.findElement('button');
    this.$body = this.findElement('body');
    this._eventify();
  };

  TogglablePanel.prototype = {

    // 内部的なDOMイベント連携

    _eventify: function() {
      var self = this;
      self.$button.on('click', function() {
        self.toggle();
      });
    },

    // パネルを開く
    
    open: function() {
      if(this.opened) {
        return;
      }
      this.opened = true;
      this.setModifier(this.$button, 'state', 'open');
      this.setModifier(this.$body, 'state', 'open');
      this.$block.trigger('panel.open');
    },

    // パネルを閉じる
    
    close: function() {
      if(!this.opened) {
        return;
      }
      this.opened = false;
      this.delModifier(this.$button, 'state', 'open');
      this.delModifier(this.$body, 'state', 'open');
      this.$block.trigger('panel.close');
    },

    // パネルをトグル
    
    toggle: function() {
      if(this.opened) {
        this.close();
      } else {
        this.open();
      }
    },

    // ブロック内部のエレメントを探す
    
    findElement: function(elementName) {
      var fullElementName = 'togglablePanel__' + elementName;
      var selector = '.' + fullElementName;
      var $element = this.$block.find(selector);
      $element.fullElementName = fullElementName;
      return $element;
    },

    // モディファイアを設定
    
    setModifier: function($target, modifierName, modifierValue) {
      var cls = $target.fullElementName + '_' + modifierName + '_' + modifierValue;
      $target.addClass(cls);
    },

    // モディファイアを削除
    
    delModifier: function($target, modifierName, modifierValue) {
      var cls = $target.fullElementName + '_' + modifierName + '_' + modifierValue;
      $target.removeClass(cls);
    },

    // イベント

    on: function(eventName, callback) {
      this.$block.on(eventName, callback);
    },
    off: function(eventName, callback) {
      this.$block.off(eventName, callback);
    }

  };

  // グローバルに置いておく

  window.TogglablePanel = TogglablePanel;

}());
