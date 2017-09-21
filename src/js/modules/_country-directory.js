/*
  country state city
 */


class CountryDirectory extends MLP.apps.MLPModule {

  init() {
    super.init();
    this.sel.state = this.el.target.data('state-selector');
    this.sel.city = this.el.target.data('city-selector');
    this.events();
  }


  events() {
    $(this.sel.state).parent().hide();
    $(this.sel.city).parent().parent().hide();
    $(this.el.target).on("change" , () => {

      this.populateStateData($(this.el.target).val());
    });
    $(this.sel.state).on("change" , (e) => {

      this.populateCityData(e.target.value);
    });
  }

  populateStateData(countryCode) {

    var hasOption = false;
    $(this.sel.state).val('');
    $(this.sel.state).parent().show();
    $(this.sel.state).attr("disabled",false);
    $(this.sel.state).children().each( (index, item)=> {
      if($(item).data('country') == countryCode){

        $(item).show();
        hasOption = true;
      }else{
        $(item).hide();
      }
    });

    if(!hasOption){
      $(this.sel.state).parent().hide();
      $(this.sel.city).parent().parent().hide();
    }
    else{
      $(this.sel.state).parent().show();
    }
  }
  populateCityData(cityCode) {
    var hasOption = false;
    $(this.sel.city).val('');
    $(this.sel.city).parent().show();
    $(this.sel.state).attr("disabled",false);
    $(this.sel.city).children().each( (index, item)=>{
      if($(item).data('city') == cityCode){

        $(item).show();
        hasOption = true;
      }else{
        $(item).hide();
      }
    });
    if(!hasOption){
      $(this.sel.city).parent().hide();
    }else{
      $(this.sel.city).parent().parent().show();
    }
  }

}

$.mlpModule(CountryDirectory, 'CountryDirectory');