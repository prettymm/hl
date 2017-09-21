//------Custom Functions
//String.format('{0} is a {1}', 'A', 'B')
String.format = function () { //It can be removed if not used
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];

    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }

    return theString;
}

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function MakeRequest(theUrl, paramData, callbackfunction, requestType, async) {
    if (requestType == undefined) {
        requestType = "POST"
    }
    if (paramData == undefined) {
        paramData = '{}'
    }
    if (async == undefined) {
        async = false;
    }


    $.ajax({
        url: theUrl,
        data: paramData,
        dataType: "json",
        type: requestType,
        async: async,
        //contentType: "application/json",
        //contentType: 'application/json; charset=utf-8',
        error: function (e) {
            //alert("An error has occurred." + e);
        },
        success: function (data) {
            callbackfunction(data);
        }
    });
}



//------Custom Functions END






(function ($, window, document, MY18_2017, undefined) {
    MY18_2017.project = (function () {
        function _project() {
            var that = this,
				clickEvt = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click',
				iosEvt = (/iPhone/.test(navigator.userAgent)) ? 'touchend' : 'click',
				bikeData = [],
				currSlide, 
				sliderHTML, 
				currRow, 
				elemIn1R = 3,
				thumbData, 
				activeSlideBox, 
				totalGalleryElements, 
				currSlide1, 
				activePage, 
				balSlider, 
				windowWidth, 
				windowHeight, 
				windowScroll, 
				sliderPopup, 
				viewportWidth;

            this.init = function () {
                var $dealerEmailWrap = $("#dealerSpan");
                if ($dealerEmailWrap.length > 0) {
                    var dealerEmail = $.trim($dealerEmailWrap.html().replace("<br/>e:", "").replace("<br>e:", ""));
                    if (dealerEmail.length > 0){
                        dealerEmail = dealerEmail.replace(/#/g, "@").replace(/\$/g, ".");
                        $dealerEmailWrap[0].innerHTML = '<br /><a style="color:#e16f00; text-decoration:none" href="mailto:'+dealerEmail+'">e: '+dealerEmail+'</a>';

                        $dealerEmailWrap.show();
                    }
                }
                var listTitle = $('.list-wrapper .feature-title').eq(5).text().trim(),
                        listIndex = listTitle.lastIndexOf(" "),
                        newHtml = '<span>' + listTitle.substring(0, listIndex) + '<br/></span><span>' + listTitle.substring(listIndex + 1) + '</span>';
                $('.list-wrapper .feature-title').eq(5).html(newHtml);
                if($(window).width()<768){
                    $('.page2 .list-content ul').addClass('list-block').removeClass('list-inline');
                    setTimeout(function(){
                        $('.page2 .list-content ul').addClass('list-inline').removeClass('list-block');
                },100);

                    
            
                }
                attachEvents();
				
				// Making last copy clickable.
				
                //var locale = $("#hidCurrentLocaleCode").val(),
				//	disabledLocalesArr = ["hu_hu", "fr_fr", "es_es", "de_de", "de_at", "de_ch", "cs_cz", "sv_se", "fi_fi", "no_no","tr_tr","en_il"];	// pl_pl, es_ES, sv_se, fi_fi, no_no Video is disabled. On others, the copy is not present.
                //if (locale && disabledLocalesArr.indexOf(locale.toLowerCase()) < 0){
                //    var descArr = $(".page1 p")[0].innerHTML.split(".");
                    
                //    if ($.trim(descArr[descArr.length-1]).length > 10){
                //        descArr[descArr.length-1] = '<span class="play-video-link"> '+$.trim(descArr[descArr.length-1])+'</span>';
                //    }else if ($.trim(descArr[descArr.length-2]).length > 10){
                //        descArr[descArr.length-2] = '<span class="play-video-link"> '+$.trim(descArr[descArr.length-2])+$.trim(descArr[descArr.length-1])+'</span>';
                //        descArr[descArr.length-1] = "";
                //    }
                    
                //    $(".page1 p")[0].innerHTML = descArr.join('.');
                //}
				
                //adaptToOrientation();
            };
            this.load = function () {
                if ($('.page1').length) {
                    $.ajax({
                        url: '../Content/js/bikes.json',
                        dataType: "json",
                        success: function (data) {
                            bikeData = data;
                        }
                    });
                    loadBikeSlider();

                    globalVar();
                    handleQuery();
                    if ($(window).width() <= 767) {
                        //loadFeatureCarousel();
                        $('#selectBike').attr('tabindex', '1');
                    }
                    setTimeout(function () {
                        loadBgImages();
                    }, 1000);

                    slideHeadings();
                    stickyheader();
                    videoPopupSize();
                    adjustSliderWidth();
                    (navigator.platform.match(/(Mac|iPhone|iPod|iPad|Macintosh)/i)) ? $('.page2').addClass('mac') : '';

                }
                else if ($('.page5').length) {

                    setSplashPosition();
                }
                else if ($('#thanksPage').length > 0) {
                    $('body').addClass('thanks-page-wrapper');

                }
                else if ($('#bookingform').length > 0) {
                    ($('#postalAdd').hasClass('hide')) ? $('#postalAdd').find('input').attr('disabled', 'disabled') : $('#postalAdd').find('input').removeAttr('disabled');
                    if ($('#ddlVehicles').val()) {
                        ($('#ddlVehicles').val().toLowerCase() == "other") ? $('#txtOtherVehicle').removeAttr('disabled').parent('#otherVehicleSpan').removeAttr('style') : $('#txtOtherVehicle').attr('disabled', 'disabled');
                    }
                }
                $('.page1 .heading-primary').parent('div').addClass('slide-right').removeClass('invisible');
                $('.page1 .heading-secondary').parent('div').addClass('slide-left').removeClass('invisible');

            };

            this.resize = function () {
                if ($('.page1').length) {
                    globalVar();
                    mobileDevice();
                    gallerySliderPos();
                    videoPopupSize();
                    videoPopupPos();
                    stickyheader();
                    adjustSliderWidth();
                    if (!$('.feature-popup-container .inner-popup').hasClass('slick-initialized')) {
                        loadFeatureCarousel();
                    }
                }
                else if ($('.page5').length) {

                    setSplashPosition();
                }
				
                if ($('#broucher-overlay').length && !$('#broucher-overlay').hasClass('no-show')) {
                    if ($(window).width() <= 767) {
                        $('.contactBY .upperCase a').removeClass('clicked').addClass('clicked-mobile');
                        setLBPostion();
                    } else {
                        setTimeout(function () {
                            $('.contactBY .upperCase a').hasClass('clicked-mobile') && $('.contactBY .upperCase a').removeClass('clicked-mobile').addClass('clicked');
                            $('#broucher-overlay').css({ 'top': $('.contactBY .upperCase a').offset().top - 16, 'bottom': 'auto' });
                        }, 1000);
                    }
                }
                
				
            };

            var setSplashPosition = function () {
                if ($(window).width() <= 767) {
                    $('.page5').height($(window).height());
                }
            }
            this.scroll = function () {
                if ($('.page1').length) {
                    globalVar();
                    stickyheader();
                    adjustSliderWidth();
                    slideHeadings();
                }
               
                
            };
            var slideHeadings = function () {
                if ($(window).scrollTop() + $(window).height() >= ($('#page2').offset().top +0.25*$(window).height()) && !$('#page2').hasClass('scrolled')) {
                    $('.page2 .heading-primary').parent('div').addClass('slide-right').removeClass('invisible');
                    $('.page2 .heading-secondary').parent('div').addClass('slide-left').removeClass('invisible');
                    $('#page2').addClass('scrolled')
                }
                if ($(window).scrollTop() + $(window).height() >= ($('#page4').offset().top + 0.25 * $(window).height()) && !$('#page4').hasClass('scrolled')) {
                    $('.page4 .heading-primary').parent('div').addClass('slide-right').removeClass('invisible');
                    $('.page4 .heading-secondary').parent('div').addClass('slide-left').removeClass('invisible');
                    $('#page2').addClass('scrolled')
                }
            }
            var loadBikeSlider = function () {
                $('.bike-slider').slick({
                    dots: true,
                    rtl:true,
                    infinite: true,
                    speed: 1200,
                    autoplay: true,
                    lazyLoad: 'progressive',
                    pauseOnHover: false,
                    slidesToShow: 1,
                    slidesToScroll: -1,
                    centerMode: true,
                    centerPadding: '25%',
                    dotsClass: 'popup-dots slick-dots',
                    appendArrows: $('.page3 .subHeading-container'),
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                centerPadding: '15%'
                            }
                        }]
                      // You can unslick at a given breakpoint now by adding:
                      // settings: "unslick"
                      // instead of a settings object
                    
                });
            }
            //Landing Page Slider
            var adjustSliderWidth = function () {
                var pos = $('#page2').offset().top;
                    var getHeight = $('.bg img').height();
                    $('#slideshow').height(getHeight);
                    $('.fg').removeClass('fg').addClass('active');
                    $('.bg').css('visibility', 'visible');
                    $('.active img').height(getHeight);
            }

            // form legoBlock START
            var setLBPostion = function () {
                setTimeout(function () {
                    var bottomVal = $('body').height() - $('.contactBY .upperCase a').offset().top - 81;
                    $('#broucher-overlay').css({ bottom: bottomVal, top: 'auto' });
                }, 200);
            };
            // form legoBlock END
            var attachEvents = function () {
                if ($(".customDropdown").length > 0) {
                    $(".customDropdown").on("change", function () {
                        $(this).parent().find(".dropdownLabel").text($(this).find(":selected").text());
                    });
                }
                var $doc = $(document);
                window.addEventListener('message', function (evt) {
                    if (typeof evt.data == 'string') {
                        if (evt.data == 'scrolltop') {
                            if ($('#keepmeposted_iframe').length > 0) {
                                var scrollPos = $('#keepmeposted_iframe').scrollTop();
                                $('#keepmeposted_iframe').attr('data-scroll', scrollPos);
                            }
                            $('#keepmeposted_iframe').scrollTop(0);
                            
                        } else if (evt.data == 'thankpage') {
                            $('#keepmeposted_iframe .wrapper').css('height', '650px');
                            $('#keepmeposted_iframe').scrollTop(0);
                            $('#keepmeposted_iframe .close-overlay').addClass('white');
                        } else if (evt.data == 'formpage') {
                            $('#keepmeposted_iframe .wrapper').css('height', '');
                            $('#keepmeposted_iframe').scrollTop(0);
                            $('#keepmeposted_iframe .close-overlay').removeClass('white');
                        } else if (evt.data.indexOf('height:') >= 0) {
                            var height = evt.data.split(':')[1];
                            var frame = $("#keepmeposted_iframe .wrapper");
                            frame.css('height', parseInt(height, 10) + 400 + 'px');
                        } else if (evt.data == 'showClose') {
                            $('#keepmeposted_iframe').hasClass('hidden') || $('#keepmeposted_iframe span.close-overlay').removeClass('hidden');
                        } else if (evt.data == 'hideClose') {
                            $('#keepmeposted_iframe').hasClass('hidden') || $('#keepmeposted_iframe span.close-overlay').addClass('hidden');
                        } else if (evt.data = 'scrollSet') {
                           $('#keepmeposted_iframe').scrollTop( $('#keepmeposted_iframe').data('scroll'));
                        }

                    }
                }, false);

                $doc.delegate('a.twShare', 'click', function (evt) {
                    evt.preventDefault();
                    var $this = $(this),
                    url = $this.attr('data-url'),
                    title = $this.attr('data-title'),
                    hashtag = $this.attr('data-hashtags');

                    MY18_2017.coreUtils.twitterShare(url, title, hashtag);
                });
                $doc.delegate('a.fbShare', 'click', function (evt) {

                    evt.preventDefault();
                    var $this = $(this),
                        fbUrl = $this.attr('href');
                    //    appid = $this.data('appid').toString(),
                    //    url = $this.data('url'),
                    //    redirectURI = $this.data('redirecturi'),
                    //    image = $this.data('image'),
                    //    name = $this.data('name'),
                    //    caption = $this.data('caption'),
                    //    desc = $this.data('desc');
                    MY18_2017.coreUtils.popup(fbUrl, 'Post to Facebook', '550', '450');
                });
				
                $doc.on('click', '.play-video-link', function () {
                    $(".playVideoBtn").trigger('click');
                });
				
                $doc.on('click', '.downArrowImg', function (e) {
					e.preventDefault();
					var pageId = parseInt($(this).data('page')),
						scrollVal = $(window).width>767 ? $('#page' + pageId).offset().top -72 : $('#page' + pageId).offset().top-38;
					MY18_2017.coreUtils.scrollTo(scrollVal, 1000);
					setTimeout(MY18_2017.tracking.pageOmni, 1500);
				});
			
                $doc.on('click', '.logo', function (e) {
					MY18_2017.coreUtils.scrollTo(0);
				});
	
                $doc.on('keyup click', '.radioBtn .checkBox, .radioBtn input[type=radio]', function () {
                    $(this).parents('.radioBtn').find('.checkBox ').removeClass('active').parents('.radioBtn').find('input').prop('checked', false);
                    $(this).parent('.marginBottomNone').children('.checkBox').addClass('active').parent('.marginBottomNone').children('input').prop('checked', true);
                    var yesno = $(this).parent().find('input').attr('id');
                    if (yesno == "rdbYes") {
                        $('#vehicalDiv').removeAttr('class').addClass('show');
                        $('#ddlVehicles').removeAttr('disabled');
                        ($('#ddlVehicles').val().toLowerCase() == "other") ? $('#txtOtherVehicle').removeAttr('disabled') : $('#txtOtherVehicle').attr('disabled', 'disabled');
                    }
                    else if (yesno == "rdbNo") {
                        $('#vehicalDiv').removeAttr('class').addClass('hide');
                        $('#ddlVehicles, #txtOtherVehicle').attr('disabled', 'disabled');
                    }
					
                });
                $doc.on('keyup change', '#ddlVehicles', function () {
                    var selectValue = $(this).val().toLowerCase();
                    if (selectValue == 'other') {
                        $('#otherVehicleSpan').show().parent().parent().addClass('addedTextField');
                        $('#txtOtherVehicle').removeAttr('disabled');
                    }
                    else {
                        $('#otherVehicleSpan').hide().parent().parent().removeClass('addedTextField');
                        $('#txtOtherVehicle').attr('disabled', 'disabled');
                    }
                });
                $doc.on('click', '.contactBY div.checkBox, .contactBY input[type=checkbox]', function () {
                    if ($(this).parent('.row').find('.active').length == 1) {
                        $(this).parent('.row').children('.checkBox').removeClass('active').parent('.row').children('input').prop('checked', false);
                    }
                    else {
                        $(this).parent('.row').children('.checkBox').addClass('active').parent('.row').children('input').prop('checked', true);
                    }
                });
                $doc.on('click', '.contactBY .pmail', function () {
                    $('#postalAdd').toggleClass('hide');
                    ($('#postalAdd').hasClass('hide')) ? $('#postalAdd').find('input').attr('disabled', 'disabled') : $('#postalAdd').find('input').removeAttr('disabled');
                        window.parent.postMessage('height:' + $('body').height(), getUrl());
                });
                $doc.on('change', '#ContactByPostalMail', function () {
                    $('#postalAdd').toggleClass('hide');
                    ($('#postalAdd').hasClass('hide')) ? $('#postalAdd').find('input').attr('disabled', 'disabled') : $('#postalAdd').find('input').removeAttr('disabled');
                    
                });
                $doc.on('keyup change', '#DealerID', function () {
                    var selectData = $('#DealerID option:selected').text();
                    $('.dealerEventShow .placeholder-text').html(selectData);
                });
                $doc.on('keyup change', '#Title', function () {
                    var selectData = $('#Title option:selected').text();
                    $('.titleShow .placeholder-text').html(selectData);
                });
                $doc.on('keyup change', '#ddlCountry', function () {
                    var selectData = $('#ddlCountry option:selected').text();
                    $('.countryShow .placeholder-text').html(selectData);
                });
                $doc.on('keyup change', '#ddlVehicles', function () {
                    var selectData = $('#ddlVehicles option:selected').text();
                    $('.bikeNameShow .placeholder-text').html(selectData);
                });
                $doc.on('keyup change', '#selectBike', function () {
                    
                    var selectData = $('#selectBike option:selected').text();
                    $('.bikeShow .placeholder-text').html(selectData);
                    var selectedBike = $('#selectBike').val();
                    // $('#BikeID').val(selectedBike);
                    $('.selectYourBike li').removeClass('active');
                    $('.selectYourBike li[data-id=' + selectedBike + ']').addClass('active');
                });
                $doc.on(iosEvt, '.slideDown .slider li', function (event) {
                    event.stopPropagation();
                    var gbn = parseInt($(this).attr('data-index')),
						slideNo = parseInt($(this).attr('data-image'));
                    $('.galleryPopup').removeClass('height0').css('display', 'block');
                    $('.galleryPopup .bikeGallery').css('display', 'none');
                    $('.galleryPopup #bikeGallery' + gbn).css('display', 'block');
                    $('.galleryPopup #bikeGallery' + gbn + ' #popupCarousel' + gbn + ' img[data-index=' + slideNo + ']').trigger('click');
                    $('body').addClass('active-overlay').css({ top: -goToSliderPos + 'px' });
                    gallerySliderPos();
                });
                $doc.on(iosEvt, '.playVideoBtn', function (event) {
                    event.stopPropagation();
                    var scrollTop = $(document).scrollTop(),
                        vidSrc = 'https://www.youtube.com/embed/' + $('#videoId').data('video');
                    //$('.videoPopup').css('display', 'block').find('iframe').attr('src', '/video-page.html');

                    $('.videoPopup').css('display', 'block').find('iframe').attr('src', vidSrc+'?autoplay=1');
                    $('body').addClass('active-overlay').attr('data-scroll', scrollTop).css({ top: -scrollTop });
                   
                    videoPopupSize();
                    videoPopupPos();
                    setTimeout(function(){$('header').addClass('sticky')},30);
                });
                $doc.on(iosEvt, '.galleryPopup span.close-overlay, .galleryPopup .ctaBtn', function () {
                    setTimeout(function () {
                        $('body').removeClass('hang').find('.galleryPopup').addClass('hide');
                    }, 300);
                    
                });
                $doc.on(iosEvt, '.videoPopup span.close-overlay', function () {
                    $('.videoPopup').css('display', 'none').find('iframe').attr('src', '');
                    $('body').removeAttr('style').removeClass('active-overlay');
                    $(document).scrollTop($('body').data('scroll'));
                    
                });
                $doc.on('touchend click', '.galleryPopup', function (ent) {
                    var checkPop = $(ent.target).parents('.galleryPopup').length;
                    if (checkPop == 0 && !$('.galleryPopup').hasClass('hide')) {
                        $('body').removeClass('hang').find('.galleryPopup').addClass('hide');
                        
                    }
                });
                $doc.on('touchend click', '.videoPopup', function (ent) {
                    var checkPop = $(ent.target).parents('.videoPopup').length;
                    if (checkPop == 0 && $('.videoPopup').css('display') == 'block') {
                        $('.videoPopup').css('display', 'none').find('iframe').attr('src', '');
                        $('body').removeAttr('style').removeClass('active-overlay');
                        $(document).scrollTop($('#page4').offset().top);
                    }
                });
                $doc.on('click', 'ul.selectYourBike li', function () {
                    $('ul.selectYourBike li').removeClass('active');
                    $(this).addClass('active');
                    var selectedBikeText = $(this).find('.bike-title')[0].innerHTML;
                    $('.bikeShow .placeholder-text').html(selectedBikeText);
                });
                $doc.on('touchend click', '.page3 .ctaBlack', function (event) {
                    event.preventDefault();
                    $('.bike-slider').slick('slickPause');
                    $('.bike-slider .slick-current a').trigger('click');
                });
                $doc.on('touchend click', '.bike-slider .item a', function (event) {
                    event.preventDefault();
                    //alert($('.bike-slider'));
                    $('.bike-slider').slick('slickPause');
                    var $self = ($(this).hasClass('ctaBlack')) ? $('.bike-slider .slick-current a') : $(this),
                        //ctaURL = $('.thumbImg[data-index=' + bikeNo + '] h5').attr('data-display'),
						$bikeWrapper = $self.parents('.item'),
                        bikeName = $bikeWrapper.data('bikename'),
                        bikeDesc = $bikeWrapper.data('desc');
                        bikeNo = parseInt($bikeWrapper.attr('data-index')),
                        bikeUrl = $bikeWrapper.data('cta-link');
                        $('.galleryPopup .ctaBtn').attr('href', bikeUrl);
                        $('.galleryPopup .ctaBtn.mobile-show').attr('href', bikeUrl);
                    if (bikeNo == $('.galleryPopup').data('index')) {
                        $('body').addClass('hang').find('.galleryPopup').removeClass('hide');
                    }
                    else {
                        
                        $('body').addClass('hang').find('.galleryPopup').removeClass('hide');
                        $('.galleryPopup').data('bikeName', bikeName);
                        $('.galleryPopup .galleryDesc').html(bikeDesc);
                        $('.galleryPopup .bike-logo img').attr('src', bikeData[bikeNo].bikeLogo).attr('alt', bikeName);
                        $('body').addClass('hang').find('.galleryPopup').removeClass('hide');
                        if ($("#bikeGallery").hasClass('slick-initialized')) {
                            $("#bikeGallery").slick('unslick');
                            $('#bikeGallery').empty();
                          
                         }
                       
                        for (var i = 0; i < bikeData[bikeNo].bikeGallery.length; i++) {
                            $('<div class="slides"><img src="/Content/images/placeholder.jpg" data-lazy="' + bikeData[bikeNo].bikeGallery[i].bigImg + '" class="lazyOwl" alt="" /></div>').appendTo('.galleryPopup .bikeGallery');
                        }
                            $("#bikeGallery").slick({
                                // Most important owl features
                                infinite: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                dots: true,
                                dotsClass: 'popup-dots slick-dots',
                                //Basic Speeds
                                speed: 800,
                                //Autoplay
                               // autoplay: true,
                                pauseOnHover: true,
                                //Lazy load
                               lazyLoad: 'progressive'

                            });
                        
                    
                            
                            
                    }
					
					
                    
					
					//$('.galleryPopup span.ctaBtn').attr('data-display',ctaURL);
					//$('.galleryPopup a.ctaBtn').attr('href',ctaURL);
					
					
					
					

                    gallerySliderPos();
					
                });
				
                $doc.on('click', '.gallerySection span.close', function () {
					$('.thumbImg').removeClass('active');
					$(".slideDown").slideUp(600, function () {
						$(".slideDown").removeClass('active');
					});
					$('.bike-slider').slick('setOptions','autoplay',true,false);
					$('.bike-slider').slick('slickPlay');
				});

                $doc.on('click', '.contactBY a', function (evt) {
                    evt.preventDefault();
                    var $this = $(this),
                        url = $this.attr('href'),
						winWidth = $(window).width();

                    if (url == '#slide1') {
                        $('#slide2').addClass('no-show');
                        $('#broucher-overlay, #slide1').removeClass('no-show');
                        if (winWidth <= 767) {
                            setLBPostion();
                            $this.addClass('clicked-mobile');
                        } else {
                            $this.addClass('clicked');
                            $('#broucher-overlay').css('top', $this.offset().top - 16);
                        }
                    } else if (url == "#tnc" ) {
                        if (window.self == window.top) {
                            $('#tnc').data('scroll', $('.overlayPages').scrollTop());
                        }
                        
                        window.parent.postMessage('scrolltop', $('#tnc').attr('data-url'));
                        window.parent.postMessage('hideClose', $('#tnc').attr('data-url'));
                       
                        $('#tnc').removeClass('no-show');
                        $('#bookingform, .submitBtnContainer, #broucher-overlay, #slide1, #slide2, #privacySettings').addClass('no-show');
                        $('#container_Overlay a').removeClass('clicked');
                        $(window).scrollTop(0);
                        window.parent.postMessage('height:' + $('body').height(), getUrl());

                    }
					else if (url == "#hebrew" ) {
                        if (window.self == window.top) {
                            $('#hebrew').data('scroll', $('.overlayPages').scrollTop());
                        }
                        
                        window.parent.postMessage('scrolltop', $('#hebrew').attr('data-url'));
                        window.parent.postMessage('hideClose', $('#hebrew').attr('data-url'));
                        $('#hebrew').removeClass('no-show');
                        $('#bookingform, .submitBtnContainer, #broucher-overlay, #slide1, #slide2, #privacySettings').addClass('no-show');
                        $('#container_Overlay a').removeClass('clicked');
                        $(window).scrollTop(0);
                        window.parent.postMessage('height:' + $('body').height(), getUrl());
                    }
                });
               

                $doc.on('click', '#broucher-overlay .slide a', function (evt) {
                    evt.preventDefault();
                    var $this = $(this),
                        url = $this.attr('href');

                    if (url == '#slide2') {
                        $('#slide1').addClass('no-show');
                        $('#slide2').removeClass('no-show');
                        if ($(window).width() <= 767) {
                            setLBPostion();
                        }
                    } else if (url == '#privacySettings') {
                        window.parent.postMessage('scrolltop', $('#privacySettings').attr('data-url'));
                        window.parent.postMessage('hideClose', $('#privacySettings').attr('data-url'));
                        $('.contactBY .upperCase a.clicked').removeClass('clicked');
                        $('.contactBY .upperCase a.clicked-mobile').removeClass('clicked-mobile');
                        $('#privacySettings').removeClass('no-show');
                        $('#bookingform, .submitBtnContainer, #broucher-overlay, #slide1, #slide2, #tnc, #hebrew').addClass('no-show');
                        $(window).scrollTop(0);
                        window.parent.postMessage('height:' + $('body').height(), getUrl());
                    }
                });

                $doc.on('click', '#privacySettings a.pp-back-btn, #tnc a.pp-back-btn, #hebrew a.pp-back-btn', function (evt) {
                    evt.preventDefault();
                    window.parent.postMessage('showClose', $('#privacySettings').attr('data-url'));
                    window.parent.postMessage('scrollSet', $('#privacySettings').attr('data-url'));
                    $('#privacySettings').addClass('no-show');
                    $('#tnc').addClass('no-show');
                    $('#hebrew').addClass('no-show');
                    $('#bookingform, .submitBtnContainer').removeClass('no-show');
                    if (window.self == window.top) {
                        $('.overlayPages').scrollTop($('#tnc').data('scroll'));
                        $('.overlayPages').scrollTop($('#hebrew').data('scroll'));
                    }
                    window.parent.postMessage('height:' + $('body').height(), getUrl());
                });

                $doc.on('click', 'body', function (evt) {
                    // Close overlay on body click.
                    var $this = $(evt.target),
                        isOverlayOpen = !($('#broucher-overlay').hasClass('no-show')),
                        clickOutsideOverlay = $this.parents('#broucher-overlay').length > 0 ? false : true,
                        clickOnAnchor = $this.hasClass('clicked') || $this.hasClass('clicked-mobile'),
                        clickOutsideOverlayLicence = $this.parents('#broucher-overlay1').length > 0 ? false : true,
                        clickOnRadio = ($this.attr('id') == 'rdbNoLicense') || $this.hasClass('.licence-no-box') || $this.parents('.licence-no-box').length>0;

                    if (isOverlayOpen && clickOutsideOverlay && !clickOnAnchor) {
                        $('#broucher-overlay, #slide1, #slide2').addClass('no-show').removeAttr('style');
                        $('.formPage .contactBY .upperCase a.clicked').removeClass('clicked');
                        $('.formPage .contactBY .upperCase a.clicked-mobile').removeClass('clicked-mobile');
                    }
                    if (clickOutsideOverlayLicence && !clickOnRadio && $('#rdbNoLicense').hasClass('checked')) {
                        $("#broucher-overlay1").addClass("no-show");
                        $("#slide-no-licence").addClass("no-show");
                        $(".top-arrow.licence").addClass("no-show");
                    }
                });

                $doc.on('submit', '#bookingform', function (evt) {
                    $('.submitBtnContainer input').attr('disabled', 'disabled');
                });
				
				// Keep Me Posted Form Popup START

                $doc.on('click', '.ancKeepMePosted', function (event) {
					event.stopPropagation();
			
					var url = $(this).attr('data-display'),
						$overlay = $('#keepmeposted_iframe'),
						$iframe = $overlay.find('iframe');
					winScroll = $(window).scrollTop();
			
					//MY18_2017.coreUtils.scrollTo($('body').offset().top, 200);
					$('body').addClass('active-overlay').css({ top: -winScroll + 'px' });
					$iframe.attr('src', url);
					$overlay.removeClass('hidden'); //.css('height', bodyHeight)
			
					//$('body').css('overflow-x','hidden');
					event.stopPropagation();
				});
			
                $doc.on('click', '#keepmeposted_iframe .close-overlay, #gallerySlider_iframe .close-overlay', function () {
					$('#keepmeposted_iframe, #gallerySlider_iframe').addClass('hidden');
					$('#keepmeposted_iframe .wrapper').css('height', '');
					$('#keepmeposted_iframe iframe, #gallerySlider_iframe iframe').removeAttr('src');
					$('body').removeAttr('style').removeClass('active-overlay');
					$('#keepmeposted_iframe .close-overlay').removeClass('white');
					$(document).scrollTop(winScroll);
				});
                
                /**
                  @Author   : Paribhasika
                  @Desc     : Toggle display of bike features popup
                **/

                $doc.on('click', '.list-content li .list-wrapper,.list-content li .feature-title', function () {
                    var $self = $(this).parents('li'),
                        indexList = parseInt($self.attr('data-feature'));
                    $('.list-content').addClass('hidden');
                    
                   
                    if ($('.feature-popup-container .inner-popup').hasClass('slick-initialized')) {
                        $('.feature-popup-container').removeClass('hidden');
                        $('.feature-popup-container .inner-popup').slick('slickGoTo', indexList);
                        setTimeout(function () {
                        $('.feature-popup-container .item').removeClass('invisible');
                        }, 300)
                        
                      
                    }
                    else {
                        $('.feature-popup-container').removeClass('hidden');
                        loadFeatureCarousel(indexList);
                        
                    }
                    
                });

                $doc.on('click', '.feature-popup-container .close-overlay', function () {
                    $('.list-content').removeClass('hidden');
                    $('.feature-popup-container').addClass('hidden');
                    $('.feature-popup-container .item').addClass('invisible');
                    
                });

                $('.bike-slider').on('afterChange',  function (event, slick, currentSlide, nextSlide) {
                    var $bikeWrapper = $('.bike-slider').find('.item[data-index="' + currentSlide + '"]').eq(0),
                        ctaName = $bikeWrapper.data('cta-copy'),
                        ctalink = $bikeWrapper.data('cta-link'),
                        ctaDesc = $bikeWrapper.data('subheading');
                    $('.page3 .subHeading-container .ctaBlack span').html(ctaName);
                    $('.page3 .subHeading-container  .inner-content .subheading-content p').html(ctaDesc);
                    $('.page3 .button-mobile .ctaBtn').attr('href', ctalink);
                });
                $("#bikeGallery").on('lazyLoaded', function (event, slick, image, imageSource) {
                    gallerySliderPos();
                });

                $doc.on('click', '.radioBtn .checkBox, .radioBtn input[type=radio]', function () {
                    var $self = $(this),
                        isRadioDivngNo = ($self.attr('id') == 'rdbNoLicense') || ($self.parent().find('#rdbNoLicense').length > 0),
                        isRadioDivngYes = ($self.attr('id') == 'rdbYesLicense') || ($self.parent().find('#rdbYesLicense').length > 0);
                    if (isRadioDivngNo && !($('#rdbNoLicense').hasClass('checked'))) {
                        $("#broucher-overlay1").removeClass("no-show");
                        $("#slide-no-licence").removeClass("no-show");
                        $(".top-arrow.licence").removeClass("no-show");
                        $('#rdbNoLicense').addClass('checked');
                        $('#rdbYesLicense').removeClass('checked');
                    }
                    if (isRadioDivngYes) {
                        $('#rdbYesLicense').addClass('checked');
                        $('#rdbNoLicense').removeClass('checked');
                        $("#broucher-overlay1").addClass("no-show");
                        $("#slide-no-licence").addClass("no-show");
                        $(".top-arrow.licence").addClass("no-show");
                    }

                });
                $doc.on('click', '#broucher-overlay1 .close-overlay.orange', function (evnt) {
                  
                    evnt.preventDefault();
                    $('#broucher-overlay1').addClass('no-show');
                    $("#slide-no-licence").addClass("no-show");
                    $(".top-arrow.licence").addClass("no-show");
                });

                $doc.on('keyup change', '#ddlCountriesNew', function () {
                    var selectData = $('#ddlCountriesNew option:selected').text();
                    $('.page5 p.custom-dropDown').html(selectData);
                });
			
				// Keep Me Posted Form Popup END
            };

            var loadFeatureCarousel = function (index) {
                var indexList = (index>0)?index:0
                $('.feature-popup-container .owl-carousel').slick({
                    dots: true,
                    infinite: true,
                    arrows: true,
                    fade:true,
                    initialSlide: indexList,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dotsClass: 'popup-dots slick-dots'
                          
                      

                });

            }
           

            /**
			 * Handle Query string based actions.
			**/
            var handleQuery = function () {
                var url = location.href,
					query = url.split('?')[1];

                // Checking for terms & conditions query string action.
                if (url.indexOf('Booking') < 0 && query == 'terms' && $("#ddlCountriesNew").length == 0) {
                    MY18_2017.selfPlugins.overlay('iframe', url.split('?')[0] + '/Overlay/Terms/');
                }
            };

            /**
			 * @Auth : Jay Tanwar
			 * @Usage : Lazy Loading background images.
			**/
            var loadBgImages = function () {
                var lazyBgArr = $('[data-lazybg]');

                var loadBgimage = function ($elem, src) {
                    var image = new Image();

                    image.onload = function () {
                        $elem.css('background-image', 'url(' + src + ')');
                    }

                    image.src = src;
                }

                for (var bg = 0, bgLen = lazyBgArr.length; bg < bgLen; bg++) {
                    var thisBg = lazyBgArr[bg],
						src = $(thisBg).attr('data-lazybg');

                    loadBgimage($(thisBg), src);
                }

            };
			
			//Global Var
			var globalVar =  function(){
				windowWidth = $(window).width(),
				windowHeight = $(window).height(),
				windowScroll = $(window).scrollTop();
			};
			
			//Sticky Header
			var stickyheader = function(){
			    if ($('body').hasClass('mainPage') && !($('body').hasClass('active-overlay'))) {
			        var startPos = $('.page1 .buttonRow').offset().top,
			            viewPortWidth = MY18_2017.coreUtils.getViewportSize()[0];
			        
			        (windowScroll > 1 || (viewPortWidth <= 767 && windowScroll > 1)) ? $('.mainPage header').addClass('sticky') : $('.mainPage header').removeClass('sticky');

			        if (viewPortWidth > 767 && windowScroll > 1) {
			            $('.sticky-desktop').addClass('show-inline');
			            $('.desktop-show').addClass('hide');
			        }
			        else {
			            $('.sticky-desktop').removeClass('show-inline');
			            $('.desktop-show').removeClass('hide');
			        }


			        (viewPortWidth <= 767 && windowScroll > 1) ? $('header span.ctaBtn.desktop-show').addClass('hide') : $('header span.ctaBtn.desktop-show').removeClass('hide');
			        (viewPortWidth <= 767 && windowScroll > 1) ? $('header a.ctaBtn.desktop-show').addClass('hide') : $('header a.ctaBtn.desktop-show').removeClass('hide');

			        if (viewPortWidth < 767 && windowScroll > 1) {
			            $('.sticky-mobile').addClass('show-inline');
			            $('.mobile-show').addClass('hide');
			        }
			        else {
			            $('.sticky-mobile').removeClass('show-inline');
			            $('.mobile-show').removeClass('hide');
			        }
			        (windowScroll > startPos && (viewPortWidth >= 767 && windowScroll > 1)) ? $('header.sticky span.desktop-show').addClass('show') : $('header.sticky span.desktop-show').removeClass('show');
			        (windowScroll > startPos && (viewPortWidth >= 767 && windowScroll > 1)) ? $('header.sticky a.desktop-show').addClass('show') : $('header.sticky a.desktop-show').removeClass('show');
				}
			};
			
			// Gallery Slider Postion Check START 
			var gallerySliderPos = function () {
			    windowHeight = $(window).height();
			    var galleryPopupHeight = $('.galleryPopup .inner').outerHeight();
			    (windowHeight <= galleryPopupHeight) ? $('.galleryPopup .inner').removeClass('yCenter') : $('.galleryPopup .inner').addClass('yCenter');

			};
			// Gallery Slider Position Check END
			
			// videoPopup Size Check START 
			var videoPopupSize = function () {
			    var vidContainer = $('.videoPopup').find('iframe'),
			        iFrameHeight = vidContainer.attr('height'),
                    iFrameWidth = vidContainer.attr('width'),
                    iFrameRatio = iFrameWidth / iFrameHeight,
                    parentWidth = $('.videoPopup .inner').width();
			    vidContainer.attr('width', parentWidth);
			    vidContainer.attr('height', parentWidth / iFrameRatio);

			};
			// videoPopup Size Check END 
			
            // videoPopup Position Check START 
			var videoPopupPos = function () {
			    windowHeight = $(window).height(),
				topCount = (($(window).height() - 560) / 2) + 'px';
			    //(windowHeight > 560) ? $('.videoPopup .inner').css('top', topCount) : $('.videoPopup .inner').css('top', '0px');
			};
            // videoPopup Position Check END 

			// Custom ScrollBar START
			this.initCustomScroll = function() {
				$.mCustomScrollbar.defaults.theme = "inset"; //set "inset" as the default theme
				$.mCustomScrollbar.defaults.scrollButtons.enable = false; //enable scrolling buttons by default
				$(".customScrollbar").mCustomScrollbar();
			};
			// Custom ScrollBar END
			
			// Device Width START
			var mobileDevice = function() {
				viewportWidth = screen.width;
				if (viewportWidth < 768) {
					$('html').addClass('mobileDevice');
				}
			};
			// Device Width END

            return this;
        }
        return new _project();
    }());

    $(function () {
        MY18_2017.project.init();
        MY18_2017.selfPlugins.init();
		MY18_2017.project.initCustomScroll();
        
		$(document).delegate('body', 'click', function () {
            MY18_2017.selfPlugins.bodyClick();
        });
		
		// IE Check
		if (MY18_2017.coreUtils.msieversion() == "IE") {
			$('html').addClass('gt-ie9');
		}
    });

    $(window).on('load', function () {
        MY18_2017.project.load();
        OpenBooking();
        /*setTimeout(function () {
            loadBikeSliderIMG();
        }, 1000);*/

        //mobileDevice();
    }).on('resize', function () {
        MY18_2017.project.resize();
        MY18_2017.selfPlugins.resize();
        //mediaQuery();
    }).on('scroll', function () {
        MY18_2017.project.scroll();
        MY18_2017.project.initCustomScroll();
    }).on('beforeunload', function () {
       // $(window).scrollTop(0);
    });

})(jQuery, this, this.document, window.MY18_2017 = window.MY18_2017 || {});


function OpenBooking() {
    try {
        var url = location.href;
        var localeCode = $("#hidCurrentLocaleCode").val();
        var bikeurn = GetQueryStringParams('bikeUrn');
        var dealerurn = GetQueryStringParams('dealerUrn');
        if (url.indexOf('Booking') < 0) {
            //if (bikeurn != undefined && bikeurn != '' && dealerurn != undefined && dealerurn != '') {//open ifarme ?bikeurn=392&dealerurn=175
            if (bikeurn != undefined) {//open ifarme ?bikeurn=392&dealerurn=175
                if (dealerurn == undefined) {
                    dealerurn = '';
                }

                //var bikeId = $('#page1').attr("data-bike-" + bikeurn);
                var url = $('#page1 .ctaBtn').attr('data-display') + '?bikeurn=' + bikeurn.toLowerCase() + '&dealerurn=' + dealerurn;
                /*if (bikeId != undefined) {
                    url = $('#page1 .ctaBtn').attr('data-display') + '?bikeurn=' + bikeurn + '&dealerurn=' + dealerurn;
                }*/
                window.location.href = url;
                /*$overlay = $('#keepmeposted_iframe'),
                $iframe = $overlay.find('iframe');
                winScroll = $(window).scrollTop();
               
                $('body').addClass('active-overlay').css({ top: -winScroll + 'px' });
                $iframe.attr('src', url);
                $overlay.removeClass('hidden'); //.css('height', bodyHeight)*/
                event.stopPropagation();
            }
        }
    }
    catch (e) {
    }
}
function getBrightCoveVideoID() {
    //Czech - cs_CZ - 4767557011001
    //French - for both fr_FR and fr_CH -4767624218001
    //German for: de_DE, de_AT, de_CH - 4767531470001
    //Hungarian - hu_HU - 4767564780001
    //Italian_CH - it_CH - 4767624215001
    //Italian_IT - it_IT - 4767531468001
    //Polish - pl_PL - 4767557006001
    //Portugese - pt_PT - 4767624214001
    //Spanish - es_ES - 4767531465001
    var currentLocaleCode = $('#hidCurrentLocaleCode').val();
    var VideoId = '5093966196001';
    if (currentLocaleCode != undefined && currentLocaleCode != '') {
        switch (currentLocaleCode) {
            case 'cs_CZ'://Czech
                VideoId = "5093731120001";
                break;
			case ('da_DK'): //Danish
                VideoId = "5093735735001";
                break;
			case ('nl_NL')://Neitherland
            case ('nl_BE'):
                VideoId = "5093737557001";
                break;
			case ('fi_FI'): //Finnish
                VideoId = "5093729142001";
                break;
            case ('fr_FR')://French
            case ('fr_BE'):
			case ('fr_CH'):
			case ('fr_LU'):
                VideoId = "5093731151001";
                break;
			case ('de_DE')://German
            case ('de_AT'):
            case ('de_CH'):
                VideoId = "5093731128001";
                break;
			case 'el_GR'://Greek
                VideoId = "5093729137001";
                break;
			case 'it_CH'://Italian
            case 'it_IT':
                VideoId = "5093735775001";
                break;
			case 'no_NO'://Norweign
				VideoId = "5093730049001";
				break;
			case 'pl_PL'://Polish
                VideoId = "5093731155001";
                break;
			case 'pt_PT'://Portugese
                VideoId = "5093725807001";
                break;
			case 'sv_SE'://Swedish
				VideoId = "5093730054001";
				break;
            case 'tr_TR'://Turkish
                VideoId = "5093731162001";
                break;
			case 'hu_HU'://Hungarian
				VideoId = "5093731152001";
				break;
            case 'es_ES'://Spanish
                VideoId = "5093731149001";
                break;
            default:
                VideoId = "5093966196001";
        }
    }
    return VideoId;
}
function mediaQuery() {
    var bodywidth = MY18_2017.coreUtils.getViewportSize()[0];
    
}