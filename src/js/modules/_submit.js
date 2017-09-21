/*
  For Submit booking
 */

class Submits extends MLP.apps.MLPModule {


  init() {
    this.el.submiter = $('.js-test-ride-form-submit');
    super.init();
    this.event();
  }

  event(){
    this.el.submiter.on('click', () => {
      this.submits();
    });
  }

  submits(){
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var emailAddress = $('#emailAddress').val();
    var mobile = $('#mobile').val();
    var country = $('#country').val();
    var postalcode1 = $('#postalcode1').val();
    var dealerName = $('#js-dealership-name').text();
    var address1 = $('.js-address1').text();
    var number = $('#js-number').text();
    var preferredDate = $('#preferred_date').val();
    var preferredTime = $('#preferred_date').val();
    var bike = $('.js-select-selector .active').find('span').text();
    var currentBike = $('.current_bike').val();

    $.ajax({
      type:"POST",
      url: "https://harleytestride.com.au/services/api/engine/getDealerByPMA/",
      data:{
        "authkey": "b436e3e86cb3800b3864aeecc8d06c126f005e7645803461717a8e4b2de3a905",
        "firstname":firstName,
        "lastname":lastName,
        "emailaddress":emailAddress,
        "mobileno":mobile,
        "country":country,
        "dealer_name":dealerName,
        "address1":address1,
        "number":number,
        "preferredDate":preferredDate,
        "preferredTime":preferredTime,
        "bike":bike,
        "currentBike":currentBike
      },
      success:function(msg){
        if(msg.status === "success"){
          window.location.href="thanks.html"
        }else if(msg.status == 'error'){
          console.log(msg.status);
        }
      }
    });
  }

}

$.mlpModule(Submits, 'Submits');