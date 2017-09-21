/*
  For i18n
 */


class SetPostion extends MLP.apps.MLPModule {


  init() {
    super.init();
    this.event();
  }

  event(){

    $(document).on('click', '.js-down-arrow', (e)=> {
      e.preventDefault();
      const scrollTop = $(window).width>767 ? $(e.target).offset().top + 85 : $(e.target).offset().top + 65;
      $('html, body').animate({
        scrollTop: scrollTop
      });
    });
  }


}

$.mlpModule(SetPostion, 'SetPostion');