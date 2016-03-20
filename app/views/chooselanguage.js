var $ = require('jquery-browserify');
var Backbone = require('backbone');
var _ = require('underscore');
var cookie = require('../cookie');
var templates = require('../../dist/templates');
var LOCALES = require('../../translations/locales');
var util = require('../util');

module.exports = Backbone.View.extend({
  className: 'inner deep prose limiter',

  template: templates.chooselanguage,

  events: {
    'click .language': 'setLanguage' 
  },

  render: function() {
    var chooseLanguages = {
      languages: LOCALES,
      active: app.locale ? app.locale : window.locale._current
    };

    this.$el.empty().append(_.template(this.template, chooseLanguages, {
      variable: 'chooseLanguage'
    }));
    return this;
  },

  setLanguage: function(e) {
    if (!$(e.target).hasClass('active')) {
      var code = $(e.target).data('code');
      cookie.set('lang', code);

      // Check if the browsers language is supported
      app.locale = code;

      util.loadLanguage(app.locale);

      // Reflect changes. Could be more elegant.
      window.location.reload();
    }

    return false;
  }
});
