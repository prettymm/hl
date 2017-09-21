/*
  Every plugin/module initialization goes here.
 */
$(document).ready( ()=> {

  console.log('APAC MY18 CAMPAIN');

  //i18n
  $('[data-js-i18next]').I18next();

  //set bike value
  //$('[data-js-setBikeValue]').SetBikeValue();

  //down arrow link
  $(".js-down-arrow").SetPostion();


  //datepicker
  $('[data-js-datePicker]').DatePicker();

  //slick carousel
  $('.js-select-bike').slick({
    centerMode: false,
    centerPadding: '0px',
    slidesToShow: 2.5,
    slidesToScroll: 1,
    infinite: false,
    arrows: false
  });

  //form validator
  $('[data-js-form-validator]').Validator();

  //three-level country state city
  $('[data-js-country-directory]').CountryDirectory();

  //get bike
  $('[data-js-getBike]').Getbike();
  $('[data-js-postCode]').Postcode();

  //submit
  $('[data-js-submit]').Submits();

});