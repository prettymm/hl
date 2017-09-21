/*
  For i18n
 */


class DatePicker extends MLP.apps.MLPModule {


  init() {
    super.init();
    this.event();
  }

  event(){
    let startDate=new Date(), endDate=new Date();
    startDate.setDate(startDate.getDate()+2);
    endDate = new Date(endDate.getFullYear()+1, endDate.getMonth(), 0);
    $('#preferred_date').datetimepicker({
      minView: 'month',
      startDate : startDate,
      endDate : endDate,
      format: 'dd MM yyyy',
      autoclose: true,
      todayBtn: true,
      pickerPosition: 'bottom-left'
    }).on('hide',()=>
      $(this).siblings('label.form__label').addClass('form__label--filled')
    );
  }


}

$.mlpModule(DatePicker, 'DatePicker');