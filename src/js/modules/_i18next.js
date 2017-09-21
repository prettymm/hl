/*
  For i18n
 */


class I18next extends MLP.apps.MLPModule {

  init() {
    this.el.formSubmit = $('.js-test-ride-form-submit');
    super.init();
    let _lang = this.el.target.data('lang');
    const langArr = ['en','zh_cn','th_th','zh_tw','vi_vn','ko','id_id'];

    i18next.use(window.i18nextXHRBackend).init({
      debug: false,
      load: 'all',
      lng: _lang,
      resGetPath: '../Content/locale/{{lng}}.json',
      fallbackLng: "en",
      backend: {
        loadPath: '../Content/locale/{{lng}}.json',
        addPath: '../Content/locale/add/{{lng}}',
        allowMultiLoading: false
      }
    }, (err, t) => {
      jqueryI18next.init(i18next, $);
      return $('body').localize();
    });

   this.event();
  }

  event(){
    
  }

  

}

$.mlpModule(I18next, 'I18next');