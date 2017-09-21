/*
  For i18n
 */


class Postcode extends MLP.apps.MLPModule {


  init() {
    this.el.postCode = $('#postalcode1');
    this.className = {
      active: 'active'
    };
    super.init();
    this.event();
  }

  event(){
    this.el.postCode.change((e) => {
      this.postCode();
    });
  }

  postCode(){
    var len = this.el.postCode.val().length;
    var country = $('#country').val();
    var postcode = $('#postalcode1').val();
    var postcodeCountry = postcode+country.toUpperCase();
    if(country && !isNaN(postcode) && postcode.length==4){
      $.ajax({
        type:"GET",
        data: {
          "authkey": "b436e3e86cb3800b3864aeecc8d06c126f005e7645803461717a8e4b2de3a905"
        },
        url: "https://harleytestride.com.au/services/api/engine/getDealerByPMA/"+ postcodeCountry,
        success: function (res) {
          $("#dealer_name").empty();
          if(res){
            if(res.length=1){
              $("#dealer_name").append("<option value='"+ res[0].Dealer_Name__c +"'>"+ res[0].Dealer_Name__c +"</option>");
              
            }else{
              for(var i=0; i<res.length; i++){
                $("#dealer_name").append("<option value='"+ res[i].Dealer_Name__c +"'>"+ res[i].Dealer_Name__c +"</option>");
              }
            }
            $("#js-form-group").find('.form__label').text('');
            $("#js-dealership-name").text(res[0].Dealer_Name__c);
            $("#js-address1").text(res[0].ShippingStreet);
            $("#js-number").text(res[0].phone);
          }

          $("#dealer_name").change(function(){
            console.log(11111);
            var value = $("#dealer_name").val();
            $.each(res, function(i, item){
              for(var i=0, len=res.length; i<len; i++){
                if(item.Dealer_Name__c == value){ 
                  $("#js-form-group").find('.form__label').text('');
                  $("#js-dealership-name").text(res[i].Dealer_Name__c);
                  $("#js-address1").text(res[i].ShippingStreet);
                  $("#js-number").text(res[i].phone);
                }
              }
            });

          });
        }
      });
    }
  }

}

$.mlpModule(Postcode, 'Postcode');