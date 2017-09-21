/*
  For i18n
 */


class Fullpage extends MLP.apps.MLPModule {
  defaults() {
    this.defaults = {
      property: 'foo'
    };
  }
  init() {
    this.el = {
      thankYou: $('.js-thankyou-fullpage')
    };
    super.init();
    this.events();
    $(window).resize(function(){
      this.fullPage();
    });
  }


  events() {
    this.fullPage();
  }

  fullPage(){
    var windowHeight = $(window).height();
    var footerHeight = $('.footer').outerHeight();
    console.log(windowHeight);
    this.el.thankYou.height(windowHeight-footerHeight);
  }

}

$.mlpModule(Fullpage, 'Fullpage');