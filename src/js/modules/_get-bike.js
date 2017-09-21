/*
  For i18n
 */


class Getbike extends MLP.apps.MLPModule {


  init() {
    this.className = {
      active: 'active'
    };
    super.init();
    this.event();
  }

  event(){
    //this.getBike();
    this.change();
  }

 /* getBike(){
    var _this = this;
    var img={
      "0":"../Content/images/form/bike0.jpg",
      "1":"../Content/images/form/bike1.jpg",
      "2":"../Content/images/form/bike2.jpg",
      "3":"../Content/images/form/bike3.jpg",
      "4":"../Content/images/form/bike4.jpg",
      "5":"../Content/images/form/bike5.jpg",
      "6":"../Content/images/form/bike6.jpg",
      "7":"../Content/images/form/bike7.jpg",
      "8":"../Content/images/form/bike8.jpg"
    };
    $.ajax({
      type:"GET",
      data: {
        "authkey": "b436e3e86cb3800b3864aeecc8d06c126f005e7645803461717a8e4b2de3a905"
      },
      url: "https://harleytestride.com.au/services/api/engine/getproducts/",
      success: function (res) {
        $('#js-select-box').html('');
        var req = "";
        for(var i=0, len=res.length; i<9; i++){
          req += '<li data-id="'+i+'" data-value="'+ res[i].Name +'" class="js-select-selector "><span data-i18n="[html]Booking.form.bikes.'+i+'.name" class="c-form__bike--title"></span><img src="'+img[i]+'" data-i18n="[alt]Booking.form.bikes.'+i+'.value"></li>';
        }

        $('#js-select-box').append(req);
        $('#js-select-box li').first().addClass('active');

        $(".js-select-selector").off("click").on("click", evt => {
          const $target = $(evt.target).parent();

          $(".js-select-selector").removeClass(_this.className.active);
          $target.addClass(_this.className.active);
          let dataValue = $target.data("value");
          if(dataValue){
            $(".js-select-box").val(dataValue);
          }
        });
      },
      error:function(error){
        console.log(error);
      }
    });
  }*/

  change(){
    $(".js-select-selector").off("click").on("click", evt => {
      const $target = $(evt.target).parent();

      $(".js-select-selector").removeClass(this.className.active);
      $target.addClass(this.className.active);
      let dataValue = $target.data("value");
      if(dataValue){
        $(".js-select-box").val(dataValue);
      }
    });
  }



}

$.mlpModule(Getbike, 'Getbike');