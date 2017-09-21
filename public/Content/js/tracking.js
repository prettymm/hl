(function ($, window, document, MY18_2017, undefined) {
    MY18_2017.tracking = (function () {
        function _tracking() {
            var localeCode = (!!$('#hidCurrentLocaleCode').attr('value')) ? $('#hidCurrentLocaleCode').attr('value').toLowerCase() : '';
            var flag = false;
            var clearVars = function () {
                for (var i = 1; i <= 7; i++) {
                    s['prop' + i] = '';
                    s['eVar' + (i)] = '';
                }
                s.prop18 = '';
                s.prop19 = '';
                s.prop20 = '';
                s.prop22 = '';
                s.prop53 = '';
                s.prop61 = '';
                s.prop62 = '';
                s.prop63 = '';

                s.eVar53 = '';
                s.eVar59 = '';
                s.events = '';
            };

            var that = this, oldActivePage, exBikeID;
            this.loadTracking = function () {
				if ($('#bookingform')[0]) {
				    var selectedBike = ($('.selectYourBike li.active').length > 0) ? $('.selectYourBike li.active p').text().trim() : 'NoBike';
					
					s.pageName="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form/";
					s.channel="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form";
					s.hier1=s.pageName;
					s.events="event57";
					
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form";

					s.eVar1 = 'D=ch';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					s.eVar6 = 'D=c5';
					
					s.eVar53=s.prop53='MY18+Touring';
					s.eVar60=selectedBike;
				}
				else if ($('.thanksPage')[0]) {				
					var bikeModel = $('#omniDetails span[class=data-bike]').text().trim(),
						dealderID = $('#omniDetails').attr('data-id'),
						postCode = $('#omniDetails').attr('data-pcode');
						
					s.pageName="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Confirm/"+bikeModel;
					s.channel="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Confirm";					
					s.events="event58";
					s.hier1=s.pageName;
					
					s.eVar60=bikeModel;
					s.eVar61=dealderID;
					s.eVar58=postCode;
					
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.prop5="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Confirm";
					s.eVar53 = s.prop53 = 'MY18+Touring';
					s.eVar1 = 'D=ch';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					s.eVar6 = 'D=c5';
					s.events="event58";
                 }
					// Splash page load tracking
				else if ($('.splash-page')[0]) 
				{
					s.pageName="/Experience/Promotions/Campaigns/MY18+Touring/Splash";
					s.channel="/Experience/Promotions/Campaigns/MY18+Touring";
					s.hier1=s.pageName;
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					
					s.eVar53=s.prop53='MY18+Touring';
					oldActivePage = 1;
				}
				else if ($('#page6')[0]) {
				    s.pageName = "/Experience/Promotions/Campaigns/MY18+Touring/Campaign End";
				    s.channel = "/Experience/Promotions/Campaigns/MY18+Touring";
				    s.hier1 = s.pageName;
				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring";

				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    oldActivePage = 1;
				}
				else if (($('body.overlayPages #legalNotice').length)) {
				    s.pageName = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:Legal Notice";
				    s.channel = "/Experience/Promotions/Campaigns/MY18+Touring/";
				    s.hier1 = s.pageName;
				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring";
				    s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:Legal Notice";

				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    oldActivePage = 1;
				}
				else if (($('body.overlayPages #privacy').length)) {
				    s.pageName = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:Privacy Policy";
				    s.channel = "/Experience/Promotions/Campaigns/MY18+Touring/";
				    s.hier1 = s.pageName;
				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring";
				    s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:Privacy Policy";

				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    oldActivePage = 1;
				}
				else if (($('body.overlayPages #care').length)) {
				    s.pageName = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:We Care About You";
				    s.channel = "/Experience/Promotions/Campaigns/MY18+Touring/";
				    s.hier1 = s.pageName;
				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring";
				    s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:We Care About You";

				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    oldActivePage = 1;
				}
				    // Main page load tracking
			else  	if (!($('body.overlayPages').length)){
					s.pageName="/Experience/Promotions/Campaigns/MY18+Touring/Home";
					s.channel="/Experience/Promotions/Campaigns/MY18+Touring";
					s.hier1=s.pageName;
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.eVar1 = 'D=ch';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					s.eVar53=s.prop53='MY18+Touring';
					oldActivePage = 1;
				} else {
					s.pageName="/MY18+Touring/Overlay/Gallery";
					s.channel="/MY18+Touring/Overlay/Gallery";
					s.hier1="/MY18+Touring/Overlay/Gallery";
					s.prop1="MY18+Touring";
					s.prop2="MY18+Touring/Overlay";
					s.prop3="MY18+Touring/Overlay/Gallery";

					s.prop53="MY18+Touring";
				}
				
				
				/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
                var s_code = s.t(); if (s_code) document.write(s_code)//-->

            };
            this.initTracking = function () {
                $(document).on('click', '#page1 .ctaBtn, #page2 .ctaBtn, .galleryPopup .ctaBtn,header .ctaBtn', function () {
                    var checkPage = $(this).parents('section').attr('id'),
                   
						linkName = /*(checkPage == "page1") ? "BOOK NOW" : */"BOOK A TEST RIDE",
						ctaName = /*(checkPage == "page1") ? "BOOK NOW" :*/ "BOOK A TEST RIDE";
					s.linkTrackVars='prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19 = s.prop62 = "MY18+Touring:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:"+linkName;
					
					s.channel="/MY18+Touring/"+ctaName;
					s.hier1="/MY18+Touring/"+ctaName;
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring="+linkName;					
					s.eVar53 = s.prop53 = 'MY18+Touring';

					s.eVar1 = '/MY18+Touring/BOOK A TEST RIDE';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
                    s.tl(this, 'o', 'MY18+Touring:' + linkName);
                    clearVars();
					
					
                });
				$(document).on('click', '#page4 .playVideoBtn', function () {
				    var linkName = 'WATCH THE WAVE OF THE REVOLUTION/Video+Play';
					s.linkTrackVars='prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:"+linkName;
					
					s.channel="/MY18+Touring/Video";
					s.hier1="/MY18+Touring/Video";
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=Video+Play";
					s.eVar53=s.prop53='MY18+Touring';
                    s.tl(this, 'o', 'MY18+Touring:' + linkName);
                    clearVars();
                });
				$(document).on('click', 'body.mainPage .headerTopNav a', function () {
				    var linkName = ($(this).hasClass('twShare')) ? "Twitter" : "Facebook";
				    if ($(this).hasClass('instashare')) {
				        linkName = "Instagram";
				    }
					
					s.linkTrackVars='eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:Share_"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:Share_"+linkName;
					
					s.channel="/MY18+Touring/Social";
					s.hier1="/MY18+Touring/Social";
					//s.prop1="/Experience";
					//s.prop2="/Experience/Promotions";
					//s.prop3="/Experience/Promotions/Campaigns";
					//s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=SideScroll";
					s.eVar53=s.prop53='MY18+Touring';
                    s.tl(this, 'e', 'MY18+Touring:Share_' + linkName);
                    clearVars();
				});
				$(document).on('click', '#page2 .list-content .list-wrapper', function () {
				    var linkName = $(this).parent('li').data('feature-name').trim().toUpperCase();
				    s.linkTrackVars = 'prop1,eVar1,eVar2,eVar3,eVar4,eVar5,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53';
				    s.linkTrackEvents='event56';
				    s.events='event56';
				    s.channel = '/MY18+Touring/Features';
				    s.prop1='/Experience';
				    s.prop2='/Experience/Promotions';
				    s.prop3='/Experience/Promotions/Campaigns';
				    s.prop4='/Experience/Promotions/Campaigns/MY18+Touring=Select+Feature';

				    s.prop18=s.prop61=s.pageName;
				    s.prop19=s.prop62='MY18+Touring:'+linkName;
				    s.prop20=s.prop63=s.pageName+'|MY18+Touring:'+linkName;
				  
				    s.eVar53=s.prop53='MY18+Touring';
				    s.eVar59=s.prop19;

				    s.eVar1='/MY18+Touring/Features';
				    s.eVar2='D=c1';
				    s.eVar3='D=c2';
				    s.eVar4='D=c3';
				    s.eVar5='D=c4';

				    s.tl(this,'o','MY18+Touring:'+linkName);
				    clearVars();
				});
				$(document).on('click', '.feature-popup-container .slick-arrow', function () {
					var linkName = ($(this).hasClass('slick-prev')) ? "Previous" : "Next";
					s.linkTrackVars='prop1,prop2,prop3,prop4,prop59,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,eVar1,eVar2,eVar3,eVar4,eVar5,prop53';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.channel = '/MY18+Touring/Scroll';
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=SideScroll";

					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:Feature:SideScroll:"+linkName;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:Feature:SideScroll:"+linkName;
					
					s.eVar53=s.prop53='MY18+Touring';
					s.eVar59=s.prop19;

					s.eVar1='/MY18+Touring/Scroll';
					s.eVar2='D=c1';
					s.eVar3='D=c2';
					s.eVar4='D=c3';
					s.eVar5='D=c4';
					s.tl(this, 'o', 'MY18+Touring:Features:SideScroll:' + linkName);
                    clearVars();
				});
				$(document).on('click', '#page3 .subHeading-container .slick-arrow', function () {
				    var linkName = ($(this).hasClass('slick-prev')) ? "Previous" : "Next";
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop59,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,eVar1,eVar2,eVar3,eVar4,eVar5,prop53';
				    s.linkTrackEvents = "event56";
				    s.events = "event56";

				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring=SideScroll";

				    s.prop18 = s.prop61 = s.pageName;
				    s.prop19 = s.prop62 = "MY18+Touring:Touring+Range+2018:SideScroll:" + linkName;
				    s.prop20 = s.prop63 = s.pageName+"|MY18+Touring:Touring+Range+2018:SideScroll:"+ linkName;
				   
				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    s.eVar59 = s.prop19;
				    s.channel = '/MY18+Touring/Scroll';
				    s.eVar1 = '/MY18+Touring/Scroll';
				    s.eVar2 = 'D=c1';
				    s.eVar3 = 'D=c2';
				    s.eVar4 = 'D=c3';
				    s.eVar5 = 'D=c4';
				    s.tl(this, 'o', 'MY18+Touring:Touring+Range+2018:SideScroll:' + linkName);
				    clearVars();
				});
				$(document).on('click', '.bike-slider .slick-current.slick-active', function () {
				    var linkName = $('.bike-slider .slick-current.slick-active').data('bike-text');

				    s.linkTrackVars='prop1,eVar1,eVar2,eVar3,eVar4,eVar5,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53';
				    s.pageName = "/Experience/Promotions/Campaigns/MY18+Touring/TOURING RANGE 2018";
				    s.linkTrackEvents='event56';
				    s.events='event56';
				    s.channel = '/MY18+Touring/Discover+Range';
				    s.prop1='/Experience';
				    s.prop2='/Experience/Promotions';
				    s.prop3='/Experience/Promotions/Campaigns';
				    s.prop4='/Experience/Promotions/Campaigns/MY18+Touring=Discover+Range';

				    s.prop18=s.prop61=s.pageName;
				    s.prop19 = s.prop62 = 'MY18+Touring:' + linkName;
				    s.prop20 = s.prop63 = s.pageName+'|MY18+Touring:' + linkName;
				   
				    s.eVar53=s.prop53='MY18+Touring';
				    s.eVar59=s.prop19;

				    s.eVar1='/MY18+Touring/Discover+Range';
				    s.eVar2='D=c1';
				    s.eVar3='D=c2';
				    s.eVar4='D=c3';
				    s.eVar5='D=c4';

				    s.tl(this, 'o', 'MY18+Touring:' + linkName);
				    clearVars();
				});
				$(document).on('click', '#bikeGallery .slick-arrow', function () {
				    var linkName = ($(this).hasClass('slick-prev')) ? "Previous" : "Next";
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop59,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,eVar1,eVar2,eVar3,eVar4,eVar5,prop53';
				    s.linkTrackEvents = "event56";
				    s.events = "event56";
				    s.channel = '/MY18+Touring/Scroll';
				    s.prop1="/Experience";
				    s.prop2="/Experience/Promotions";
				    s.prop3="/Experience/Promotions/Campaigns";
				    s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=SideScroll";

				    s.prop18=s.prop61=s.pageName;
				    s.prop19=s.prop62="MY18+Touring:Touring+Range+2018:Inner+SideScroll:"+linkName;
				    s.prop20=s.prop63=s.pageName+"|MY18+Touring:Touring+Range+2018:Inner+SideScroll:"+linkName;
				   
				    s.eVar53=s.prop53='MY18+Touring';
				    s.eVar59=s.prop19;

				    s.eVar1='/MY18+Touring/Scroll';
				    s.eVar2='D=c1';
				    s.eVar3='D=c2';
				    s.eVar4='D=c3';
				    s.eVar5='D=c4';

				    s.tl(this,'o','MY18+Touring:Touring+Range+2018:Inner+SideScroll:'+linkName);
				    clearVars();
				});
				$(document).on('click', '.own-motorcycle .radioBtn .checkBox,.own-motorcycle .radioBtn input[type=radio]', function () {
				    var $self = $(this),
                       isRadioDivngYesNo = (($self.attr('id') == 'rdbYes') || ($self.parent().find('#rdbYes').length > 0)) ? 'Yes' : 'No';
               
                       s.linkTrackVars = 'eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53';

                       s.linkTrackEvents = 'event56';
                       s.events = 'event56';
                       s.prop18 = s.prop61 = s.pageName;
                       s.prop19 = s.prop62 = 'MY18+Touring:Book2018+Form:Own+Motorcycle:' + isRadioDivngYesNo;
                       s.prop20 = s.prop63 = s.pageName+'|MY18+Touring:Book2018+Form:Own+Motorcycle:' + isRadioDivngYesNo;
                       s.eVar53 = s.prop53 = 'MY18+Touring';
                       s.eVar59 = s.prop19;

                       s.tl(this, 'o', 'MY18+Touring:Book2018+Form:Own+Motorcycle:' + isRadioDivngYesNo);
                       clearVars();

				});
				$(document).on('click', '.own-licence .radioBtn .checkBox,.own-licence .radioBtn input[type=radio]', function () {
				    var $self = $(this),
                       isRadioDivngYesNo = (($self.attr('id') == 'rdbYesLicense') || ($self.parent().find('#rdbYesLicense').length > 0)) ? 'Yes' : 'No';

				    s.linkTrackVars = 'eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53';

				    s.linkTrackEvents = 'event56';
				    s.events = 'event56';

				    s.prop18 = s.prop61 = s.pageName;
				    s.prop19 = s.prop62 = 'MY18+Touring:Book2018+Form:Licence:' + isRadioDivngYesNo;
				    s.prop20 = s.prop63 = s.pageName+'|MY18+Touring:Book2018+Form:Licence:' + isRadioDivngYesNo;
				   
				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    s.eVar59 = s.prop19;

				    s.tl(this, 'o', 'MY18+Touring:Book2018+Form:Licence:' + isRadioDivngYesNo);
				    clearVars();

				});
				$(document).on('click', '.contactBY div.checkBox,.contactBY input[type=checkbox]', function () {
				    var $self = $(this).closest('.row'),
                       linkName = $self.has('#ContactByPostalMail').length > 0 ? 'via post' : ($self.has('#ContactByPhone').length > 0 ? 'via phone' : 'via email');
				    if ($self.find('.checkBox').hasClass('active')) {
				        s.linkTrackVars = 'eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53';

				        s.linkTrackEvents = 'event56';
				        s.events = 'event56';

				        s.prop18 = s.prop61 = s.pageName;
				        s.prop19 = s.prop62 = 'MY18+Touring:Book2018+Form:Contact_' + linkName;
				        s.prop20 = s.prop63 = s.pageName+'|MY18+Touring:Book2018+Form:Contact_' + linkName;
				        
				        s.eVar53 = s.prop53 = 'MY18+Touring';
				        s.eVar59 = s.prop19;

				        s.tl(this, 'o', 'MY18+Touring:Book2018+Form:Contact_' + linkName);
				        clearVars();
				    }
				   

				});
				$(document).on('click', '.thumbImg', function () {
				    if (!flag) {
				        var linkName = $(this).find('h4').text().trim();
				        s.linkTrackVars = 'prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
				        s.linkTrackEvents = "event56";
				        s.events = "event56";
				        s.prop18 = s.prop61 = s.pageName;
				        s.prop19 = s.prop62 = "MY18+Touring:" + linkName;
				        s.eVar59 = s.prop19;
				        s.prop20 = s.prop63 = s.pageName + "|MY18+Touring:" + linkName;

				        s.channel = "/MY18+Touring/Bikes";
				        s.hier1 = "/MY18+Touring/Bikes";
				        s.prop1 = "/Experience";
				        s.prop2 = "/Experience/Promotions";
				        s.prop3 = "/Experience/Promotions/Campaigns";
				        s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring=Bike+More+Info";
				        s.eVar53 = s.prop53 = 'MY18+Touring';

				        s.tl(this, 'o', 'MY18+Touring:' + linkName);
				        clearVars();
				    }
				    flag = false;
				});
				$(document).on('click', '.thumbImg a', function () {
				    flag = true;
				    var linkName = $(this).parents('.thumbImg').find('h4').text().trim();
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
				    s.linkTrackEvents = "event56";
				    s.events = "event56";
				    s.prop18 = s.prop61 = s.pageName;
				    s.prop19 = s.prop62 = "MY18+Touring:" + linkName;
				    s.eVar59 = s.prop19;
				    s.prop20 = s.prop63 = s.pageName + "|MY18+Touring:" + linkName;

				    s.channel = "/MY18+Touring/Bikes";
				    s.hier1 = "/MY18+Touring/Bikes";
				    s.prop1 = "/Experience";
				    s.prop2 = "/Experience/Promotions";
				    s.prop3 = "/Experience/Promotions/Campaigns";
				    s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring=Book+A+Test+Ride";
				    s.eVar53 = s.prop53 = 'MY18+Touring';

				    s.tl(this, 'e', 'MY18+Touring:' + linkName);
				    clearVars();

				});
				$(document).on('click', '.thumbImg h5', function () {
					var linkName = $(this).parents('.thumbImg').find('h4').text().trim();
					s.linkTrackVars='prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:"+linkName;
					
					s.channel="/MY18+Touring/Bikes";
					s.hier1="/MY18+Touring/Bikes";
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=Book+A+Test+Ride";					
					s.eVar53 = s.prop53 = 'MY18+Touring';
					
                    s.tl(this, 'o', 'MY18+Touring:' + linkName);
                    clearVars();
				});
				$(document).on('click', '.slideDown .ctaBtn', function () {
					var linkName = $(this).parents('.slideDown').find('h3').text().trim();
					s.linkTrackVars='prop1,prop2,prop3,prop4,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:BikeInfo:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:BikeInfo:"+linkName;
					
					s.channel="/MY18+Touring/Bikes";
					s.hier1="/MY18+Touring/Bikes";
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring=Book+A+Test+Ride";					
					s.eVar53 = s.prop53 = 'MY18+Touring';
					if (localeCode == 'id_id' || localeCode == 'en_au' || localeCode == 'zh_cn' || localeCode == 'en_in' || localeCode == 'ru_ru') {
                        s.tl(this, 'e', 'MY18+Touring:BikeInfo:' + linkName);
                        clearVars();
					}
					else {
                        s.tl(this, 'o', 'MY18+Touring:BikeInfo:' + linkName);
                        clearVars();
					}
				});
				var selectedBikeName = function(){
					var linkName = $('.bikeShow .placeholder-text').text().trim();
					
					s.linkTrackVars = 'prop1,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,prop2,prop3,prop4,prop5,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar60';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:Book2018+Form:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:Book2018+Form:"+linkName;
					
					s.channel="/MY18+Touring/Bikes";
					s.hier1="/MY18+Touring/Bikes";
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form=Choose+Your+Ride";

					s.eVar1 = '/MY18+Touring/Bikes';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					
					s.eVar60=linkName;
					s.eVar53=s.prop53='MY18+Touring';
                    s.tl(this, 'o', 'MY18+Touring:Book2018+Form:' + linkName);
                    clearVars();
				}
				$(document).on('click', '.selectYourBike li', function () {
					selectedBikeName();
				});
				$(document).on('change', '#selectBike', function () {
					var queryVar = window.location.href.split('?id=')[1];
					exBikeID = (!exBikeID && queryVar && queryVar.length > 0) ? false : true;
					(exBikeID) && selectedBikeName();
					exBikeID = true;
				});		
				$(document).on('submit', '#bookingform', function () {
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop5,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,prop53';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop1 = '/Experience';
					s.prop2 = '/Experience/Promotions';
					s.prop3 = '/Experience/Promotions/Campaigns';
					s.prop4 = '/Experience/Promotions/Campaigns/MY18+Touring';
					s.prop5 = '/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form=Submit';

					s.prop18 = s.prop61 = s.pageName;
					s.prop19 = s.prop62 = 'MY18+Touring:Book2018+Form:BOOK+A+TEST+RIDE:Confirm';
					s.prop20 = s.prop63 = s.pageName+'|MY18+Touring:Book2018+Form:BOOK+A+TEST+RIDE:Confirm';
		
					s.eVar53 = s.prop53 = 'MY18+Touring';
					s.eVar59 = s.prop19;

					s.eVar1 = '/MY18+Touring/Form';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					s.eVar6 = 'D=c5';
					s.tl(this, 'o', 'MY18+Touring:Book2018+Form:BOOK+A+TEST+RIDE:Confirm');
                    clearVars();
                });
				$(document).on('click', '#thanksPage .headerTopNav a', function() {
				    var linkName = ($(this).hasClass('twShare')) ? "Twitter" : "Facebook",
				        bikeModel = $('#omniDetails span[class=data-bike]').text().trim();
					s.linkTrackVars='eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19 = s.prop62 = "MY18+Touring:Share_" + linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:Share_"+linkName;
					
					s.channel="/MY18+Touring/Social";
					s.hier1="/MY18+Touring/Social";
					
					s.eVar53=s.prop53='MY18+Touring';
                    s.tl(this, 'e', 'MY18+Touring:Share_' + linkName);
                    clearVars();
                });
				$(document).on('click', '#thanksPage .ctaBtn', function() {
					var linkName = $.trim($(this).text());
					
					s.linkTrackVars='prop1,prop2,prop3,prop4,prop5,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar1,eVar2,eVar3,eVar4,eVar5';
					s.linkTrackEvents="event56";
					s.events="event56";
					s.prop18=s.prop61=s.pageName;
					s.prop19=s.prop62="MY18+Touring:"+linkName;
					s.eVar59=s.prop19;
					s.prop20=s.prop63=s.pageName+"|MY18+Touring:"+linkName;
					
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.prop5="/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Confirm=Bike+Info";
					s.eVar53=s.prop53='MY18+Touring';
                    s.tl(this, 'o', 'MY18+Touring:' + linkName);
                    clearVars();
				});
				$(document).on('click', 'footer a', function () {
				    var linkName = $.trim($(this).text());
				    var link = $.trim($(this).attr("data-link"));

				    if (link == 'HD-com') {
				        s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop18,prop19,prop20,prop22,prop53,prop61,prop62,prop63,eVar1,eVar2,eVar3,eVar4,eVar5,eVar53,eVar59,eVar61,events';
				        s.linkTrackEvents = 'event56';
				        s.events = 'event56';
				        s.prop18 = s.prop61 = s.pageName;
				        s.prop19 = s.prop62 = 'MY18+Touring:Footer:' + linkName;
				        s.prop20 = s.prop63 = s.pageName + '|MY18+Touring:Footer:' + linkName;

				        s.prop1 = '/Experience';
				        s.prop2 = '/Experience/Promotions';
				        s.prop3 = '/Experience/Promotions/Campaigns';
				        s.prop4 = '/Experience/Promotions/Campaigns/MY18+Touring';
				        s.prop5 = '/Experience/Promotions/Campaigns/MY18+Touring';
				        s.prop6 = "/Experience/Promotions/Campaigns/MY18+Touring/Footer:" + linkName;
				        s.eVar1 = '/Experience/Promotions/Campaigns/MY18+Touring';
				        s.eVar2 = s.prop1;
				        s.eVar3 = s.prop2;
				        s.eVar4 = s.prop3;
				        s.eVar5 = s.prop4;
				        s.eVar6 = s.prop5;
				        s.eVar7 = s.prop6;
				        s.prop53 = 'MY18+Touring';
				        s.eVar53 = s.prop53;
				        s.eVar59 = s.prop19;
                        s.tl(this, 'e', 'MY18+Touring:Footer' + linkName);
                        clearVars();
				    }
				    
				});
				$(document).on('change', 'footer select', function () {
				    var linkName = $.trim($(this).text());
				   // var FooterLink = linkName.substr(0, str.indexOf(''));
				    var list = document.getElementById("ddlCountries");
				    var countryName = list.options[list.selectedIndex].text;
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop5,prop6,prop18,prop19,prop20,prop22,prop53,prop61,prop62,prop63,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar53,eVar59,events';
				    s.linkTrackEvents = 'event56';
				    s.events = 'event56';

				    s.prop1 = '/Experience';
				    s.prop2 = '/Experience/Promotions';
				    s.prop3 = '/Experience/Promotions/Campaigns';
				    s.prop4 = '/Experience/Promotions/Campaigns/MY18+Touring';
				    s.prop5 = '/Experience/Promotions/Campaigns/MY18+Touring/Footer:' + countryName;

				    s.prop18 = s.prop61 = s.pageName;
				    s.prop19 = s.prop62 = 'MY18+Touring:Switch Country:' + countryName;
				    s.prop20 = s.prop63 = s.pageName + '|MY18+Touring:Switch Country:' + countryName;
				   
				    s.eVar1 = 'D=ch';
				    s.eVar2 = 'D=c1';
				    s.eVar3 = 'D=c2';
				    s.eVar4 = 'D=c3';
				    s.eVar5 = 'D=c4';
				    s.eVar6 = 'D=c5';

				    s.eVar53 = s.prop53 = 'MY18+Touring';
				    s.eVar59 = s.prop19;
                    s.tl(this, 'o', 'MY18+Touring:Switch Country:' + countryName);
                    clearVars();

				});

				$(document).on('change', '#page5  select', function () {
				    var linkName = $.trim($(this).text());
				    // var FooterLink = linkName.substr(0, str.indexOf(''));
				    var list = document.getElementById("ddlCountriesNew");
				    var countryName = list.options[list.selectedIndex].text;
				    s.linkTrackVars = 'prop1,prop2,prop3,prop4,prop5,prop6,prop18,prop19,prop20,prop22,prop53,prop61,prop62,prop63,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar7,eVar53,eVar59,events';
				    s.linkTrackEvents = 'event56';
				    s.events = 'event56';
				    s.prop18 = s.prop61 = s.pageName;
				    s.prop19 = s.prop62 = 'MY18+Touring:Selected Country:' + countryName;
				    s.prop20 = s.prop63 = s.prop18 + '|' + s.prop19;

				    s.prop1 = '/Experience';
				    s.prop2 = '/Experience/Promotions';
				    s.prop3 = '/Experience/Promotions/Campaigns';
				    s.prop4 = '/Experience/Promotions/Campaigns/MY18+Touring';
				    s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Selected Country:" + countryName;
				    s.eVar1 = '/Experience/Promotions/Campaigns/MY18+Touring';
				    s.eVar2 = s.prop1;
				    s.eVar3 = s.prop2;
				    s.eVar4 = s.prop3;
				    s.eVar5 = s.prop4;
				    s.eVar6 = s.prop5;
				    s.prop53 = 'MY18+Touring';
				    s.eVar53 = s.prop53;
				    s.eVar59 = s.prop19;
				
                    s.tl(this, 'o', 'MY18+Touring:Selected Country:' + countryName);
                    clearVars();

				});
            };
			this.pageOmni = function(){
				var activePage = 1,
					pageName = 'WELCOME TO THE NEXT CUSTOM REVOLUTION';
				if ($(window).scrollTop() >= $('#page2').offset().top && $(window).scrollTop() < $('#page3').offset().top) { activePage = 2, pageName = '2018 HARLEY-DAVIDSON FEATURES' }
				if ($('#page4').length > 0) { if ($(window).scrollTop() >= $('#page3').offset().top && $(window).scrollTop() < $('#page4').offset().top) { activePage = 3, pageName = 'TOURING RANGE 2018' } }
				else { if ($(window).scrollTop() >= $('#page3').offset().top) { activePage = 3, pageName = 'TOURING RANGE 2018' } }
				if ($('#page4').length > 0) { if ($(window).scrollTop() >= $('#page4').offset().top) { activePage = 4, pageName = 'THE TEST RIDE EXPERIENCE' } }
				
				if (oldActivePage != activePage){	
				oldActivePage = activePage;
					s.linkTrackVars='channel,hier1,prop1,prop2,prop3,prop4,prop53,prop18,prop19,prop20,eVar1,eVar2,eVar3,eVar4,eVar5,prop22,eVar53';				
					s.pageName="/Experience/Promotions/Campaigns/MY18+Touring/"+pageName;
					s.channel="/Experience/Promotions/Campaigns/MY18+Touring";
					s.hier1=s.pageName;
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4="/Experience/Promotions/Campaigns/MY18+Touring";
					s.eVar1 = 'D=ch';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';
					s.eVar53=s.prop53='MY18+Touring';	
                    s.t();	
                    clearVars();
				}
			}
            return this;
        }
        return new _tracking();
    }());

    $(function () {
        MY18_2017.tracking.initTracking();
    });

    $(window).on('load', function(){
        MY18_2017.tracking.loadTracking();
    }).on('scroll', function(){
		if ($('#page1').length > 0){
			MY18_2017.tracking.pageOmni();
		}
    });

})(jQuery, this, this.document, window.MY18_2017 = window.MY18_2017 || {});
