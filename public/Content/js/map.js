(function ($, window, document, MY18_2017, undefined) {
    MY18_2017.map = (function () {
        function _Map() {
            var map,
				iconURLPrefix = '/Content/images/form-bikes/',
				icons = [
				  iconURLPrefix + 'marker-inactive.png',
				  iconURLPrefix + 'marker-active.png'
				],
				iconsLength = icons.length,
				markers = new Array(),
                lat, lng, country;

            this.init = function () {
                attachEvents()
            };

            this.load = function () {
                initGoogleAutocomplete();
                renderMapNonFrenchDeepLink();
            };

            this.dealerArray = []; // Dealer details array, as the value of this variable is used in main.js file, hence added this variable to global scope. DealerArray is used to pass data on click on submit button on form page	

            var renderMapNonFrenchDeepLink = function () {
                if ($("#hidNonFrenchDeepLink").val() != '') {
                    //Bind Map
                    var arr = $("#hidNonFrenchDeepLink").val().split(',');
                    if (arr != null && arr.length == 3) {
                        lat = arr[0];
                        lng = arr[1];
                        country = arr[2];
                        RenderMapForDealers(lat, lng, country);
                        $('#pac-input').val('  ')
                    }
                }
            }
            
            var attachEvents = function () {
                $(document).on('click', '#mapAccordian li', function () {
                    var dealerCde = $(this).attr('data-code');
                    $("#DealerID").val(dealerCde);
                    $('#mapAccordian li').removeClass('active');
                    $(this).addClass('active');
                    setDealer();
                    var markerText = $(this).attr('data-index');
                    if (markerText == "A") {
                        markers[1] && markers[1].setIcon(icons[0]);
                        markers[2] && markers[2].setIcon(icons[0]);
                        markers[0] && markers[0].setIcon(icons[1]);
                        markers[1] && markers[1].set('labelClass', 'markerText');
                        markers[2] && markers[2].set('labelClass', 'markerText');
                        markers[0] && markers[0].set('labelClass', 'markerTextActive');
                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[0]));
                    }
                    else if (markerText == "B") {
                        markers[0] && markers[0].setIcon(icons[0]);
                        markers[2] && markers[2].setIcon(icons[0]);
                        markers[1] && markers[1].setIcon(icons[1]);
                        markers[0] && markers[0].set('labelClass', 'markerText');
                        markers[2] && markers[2].set('labelClass', 'markerText');
                        markers[1] && markers[1].set('labelClass', 'markerTextActive');
                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[1]));

                    }
                    else if (markerText == "C") {
                        markers[0] && markers[0].setIcon(icons[0]);
                        markers[1] && markers[1].setIcon(icons[0]);
                        markers[2] && markers[2].setIcon(icons[1]);
                        markers[0] && markers[0].set('labelClass', 'markerText');
                        markers[1] && markers[1].set('labelClass', 'markerText');
                        markers[2] && markers[2].set('labelClass', 'markerTextActive');
                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[2]));
                    }

                });
            };
			
            var setDealer = function () {
                
				var dealerID = $('#mapAccordian li.active').attr('data-code'),
					postCode = $('#mapAccordian li.active').attr('data-pcode');
					s.linkTrackVars='prop1,prop2,prop3,prop4,prop5,eVar59,prop18,prop19,prop20,prop61,prop62,prop63,events,prop22,eVar53,prop53,eVar58,eVar61,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6';
					s.linkTrackEvents="event56";
					s.events="event56";
					
					s.eVar58=postCode;
					s.eVar61=dealerID;
					
					s.prop18=s.prop61=s.pageName;
					s.prop19 = s.prop62 = "MY18+Touring:Book2018+Form:" + dealerID;
					s.eVar59=s.prop19;
					s.prop20 = s.prop63 = s.pageName + "|MY18+Touring:Book2018+Form:" + dealerID;
					
					s.channel = "/MY18+Touring/Form";
					s.hier1 = "/MY18+Touring/Form";
					s.prop1="/Experience";
					s.prop2="/Experience/Promotions";
					s.prop3="/Experience/Promotions/Campaigns";
					s.prop4 = "/Experience/Promotions/Campaigns/MY18+Touring";
					s.prop5 = "/Experience/Promotions/Campaigns/MY18+Touring/Book2018+Form=Choose+The+Dealer";
				    
					s.eVar1 = '/MY18+Touring/Form';
					s.eVar2 = 'D=c1';
					s.eVar3 = 'D=c2';
					s.eVar4 = 'D=c3';
					s.eVar5 = 'D=c4';

					s.eVar53 = s.prop53 = 'MY18+Touring';
					s.tl(this, 'o', 'MY18+Touring:Book2018+Form:' + dealerID);
				}

			var initGoogleAutocomplete = function() {
                var countrySK = '';
                var address = (document.getElementById('pac-input')),
					autocomplete = new google.maps.places.Autocomplete(address);
                autocomplete.setTypes(['geocode']);
                google.maps.event.addListener(autocomplete, 'place_changed', function () {
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }

					var address = '';
					if (place.address_components) {
						address = [
							(place.address_components[0] && place.address_components[0].short_name || ''),
							(place.address_components[1] && place.address_components[1].short_name || ''),
							(place.address_components[2] && place.address_components[2].short_name || '')

						].join(' ');
                    }

                    //var v = place.geometry.location,
					lat = place.geometry.location.lat(),
                    lng = place.geometry.location.lng(),
                    locale = $('#hidLocaleCode').val();
					
                    var address = place.adr_address;
                    //country = GetCountryName(address);
                    //var iso = 'GB|FR|NL|BE|CH|LU|DE|IT|CZ|DK|GR|ES|HU|NO|PT|RU|TR|FI|SE|PL|AT|IE|ZA|MU|AO|NA|NG|TZ|ZM|UG|RE|DZ|MA|BH|EG|AE|JO|KW|LB|OM|QA|SA|SN|CI|AA|SK';
                        iso2Array = $('#divDealerMap').attr('data-iso2').split("|");
                        iso3Array = $('#divDealerMap').attr('data-iso3').split("|");
                    var countryIsoCode;
                    for (var acLen = place.address_components.length, addrComp = (acLen - 1) ; addrComp >= 0; addrComp--) {
                        var thisAddr = place.address_components[addrComp];
                        if (thisAddr.types && thisAddr.types.indexOf('country') >= 0) {
                            countryIsoCode = thisAddr.short_name;
                        }
                    }
                    
                    //RenderMapForDealers(lat, lng, country);

                    var loc = locale.split('_').pop();
                    //EuList = ['CY', 'BG', 'HR', 'RS', 'RO', 'AZ', 'MT', 'SI', 'EE', 'LV', 'LT', 'UA', 'EE'];
                    EuList = ['LV', 'LT', 'UA', 'EE'];
                    countryIsoCode = (EuList.indexOf(countryIsoCode) >= 0) ? "EU" : countryIsoCode;

                    MENAList = ['AA', 'RE', 'ZA','NA','MU'];
                    countryIsoCode = (MENAList.indexOf(countryIsoCode) >= 0) ? "AA" : countryIsoCode;

                    CZECHList = ['SK', 'CZ'];
                    countryIsoCode = (CZECHList.indexOf(countryIsoCode) >= 0) ? "CZ" : countryIsoCode;

                    UKList = ['GB', 'IE', 'JE'];
                    countryIsoCode = (UKList.indexOf(countryIsoCode) >= 0 && loc == 'GB') ? "GB" : countryIsoCode;

                    MEList = ['DZ', 'MA', 'BH', 'EG', 'AE', 'JO', 'KW', 'LB', 'OM', 'QA', 'SA', 'SN', 'CI'];
                    countryIsoCode = (MEList.indexOf(countryIsoCode) >= 0 && loc == 'ZZ') ? "ZZ" : countryIsoCode;
                    //countryIsoCode = (countryIsoCode == 'JE' && loc == 'GB') ? "GB" : countryIsoCode;
                    //countryIsoCode = (countryIsoCode == 'IE' && loc == 'GB') ? "GB" : countryIsoCode;
                    //loc = (loc == 'BE' && countryIsoCode == 'NL') ? "NL" : loc;
                    var countryLocaleCode = countryIsoCode;
                    (iso2Array.indexOf(countryIsoCode) >= 0 && countryLocaleCode == loc) ? RenderMapForDealers(lat, lng, countrySK) : noDealerFound();
                    


                    //$('#dealerMap, #mapAccordian, #no-dealer').hide();
                    //$("#spanDealer").text('');
                    //$("#DealerID").val('');
                    ////	setAllMap(null);

                    //var theUrl = "/" + locale + "/Booking/GetDealerListByLatLong/";
                    //var paramData = { 'latPoint': lat, 'LongPoint': lng, 'CountryName': country };

                    //MakeRequest(theUrl, paramData, GetDealerCallBack, "GET");
					//setDealer();
                });
			}
			var RenderMapForDealers = function (lat, lng, countrySK) {
			   var locale = $("#hidLocaleCode").val();
			    $('#dealerMap, #mapAccordian, #no-dealer').hide();
			    $("#spanDealer").text('');
			    $("#DealerID").val('');
			    
			    //var theUrl = "/" + locale + "/Booking/GetDealerListByLatLong/";
			    //var paramData = { 'latPoint': lat, 'LongPoint': lng, 'CountryName': country };
			    locale =  locale.split('_').pop();

			    //var theUrl = "//www.harley-davidson.com/dealerservices/services/rest/dealers/v2/search.json?latlng=" + lat + "%2C" + lng + "&limit=50&version=desktop" + "&country=" + locale;
			    var theUrl = "//www.harley-davidson.com/dealerservices/services/rest/dealers/v2/search.json?latlng=" + lat + "%2C" + lng + "&limit=50&version=desktop";
			    $.ajax({
			        url: theUrl,
			        dataType: "json",
			        type: "GET",
			        async: false,
			        //contentType: "application/json",
			        //contentType: 'application/json; charset=utf-8',
			        //error: function(xhr, ajaxOptions, thrownError) {
			        //    var errorCode = xhr.status;
			           
			        //},
			        statusCode: {
			            502: function () {
			                
			                $('#findDealer .field-validation-error').removeClass('field-validation-error').addClass('field-validation-valid');
			                $('#findDealer .field-validation-valid')[0].innerHTML = "<span>"+ $('#divDealerMap').attr('data-error-location-sharing-message') +"</span>";
			                $('#findDealer .field-validation-valid').removeClass('field-validation-valid').addClass('field-validation-error');

			                $('.location-cell .loader').removeClass('showIB show').addClass('hide');
			                $('#findDealer .field-validation-error').show();
			            },
			            404: function () {
			              
			            }
			        },
			        success: function (data) {
			           
			            GetDealerCallBack(data);
			        }
			    });
			    setDealer();
			}

			var checkLocale = function (dealerCountry) {
			    var countryCodeDealer = $("#hidLocaleCode").val();
			    countryCodeDealer = countryCodeDealer.split('_').pop();
			    dealerCountry = dealerCountry.toString();

			    switch (countryCodeDealer){
			        case 'EU':
			            {
			                EuList = ['LVA', 'LTU','UKR','EST'];
			                var Bool = EuList.indexOf(dealerCountry) >= 0 ? true: false;
			                return Bool;
			                break;
			            }
			        case 'AA':
			            {
			                MENAList = ['REU', 'ZAF', 'NAM', 'MUS'];
			                var Bool = MENAList.indexOf(dealerCountry) >= 0 ? true: false;
			                return Bool;
			                break;
			            }
			        case 'CZ':
			            {
			                CZECHList = ['SVK', 'CZE'];
			                var Bool = CZECHList.indexOf(dealerCountry) >= 0 ? true: false;
			                return Bool;
			                break;
			            }
			        case 'GB':
			            {
			                UKList = ['GBR', 'IRL', 'JEY'];
			                var Bool = UKList.indexOf(dealerCountry) >= 0 ? true : false;
			                return Bool;
			                break;
			            }
			        case 'ZZ':
			            {
			                MEList = ['DZA', 'MAR', 'BHR', 'EGY', 'ARE', 'JOR', 'KWT', 'LBN', 'OMN', 'QAT', 'SAU', 'SEN', 'CIV'];
			                var Bool = MEList.indexOf(dealerCountry) >= 0 ? true : false;
			                return Bool;
			                break;
			            }
			        default:
			            {
			                var Iso2 = [ 'PT', 'IT', 'BE', 'DE', 'ES', 'FR', 'GR', 'IE', 'LU', 'HU', 'AT', 'PL', 'CH', 'TR', 'IL', 'NO', 'FI', 'SE', 'NL', 'BE', 'RU', 'DK','ZZ'];
			                var Iso3 = [ 'PRT', 'ITA', 'BEL', 'DEU', 'ESP', 'FRA', 'GRC', 'IRL', 'LUX', 'HUN', 'AUT', 'POL', 'CHE', 'TUR', 'ISR', 'NOR', 'FIN', 'SWE', 'NLD', 'BEL', 'RUS', 'DNK'];

			                var ind = Iso2.indexOf(countryCodeDealer);
			                if (ind >= 0 && Iso3[ind] === dealerCountry) {
			                    return true;
			                }
			                else {
			                    return false;
			                }
			            }
			    }
			}

            var GetCountryName = function (address) {//retrieve Country From<span class="country-name">South Africa</span> retrieve Country From
                var countryName = '';
                try {
                    address = address.substr(address.indexOf('<span class="country-name">'), address.lenght);
                    address = address.substr(0, address.indexOf('</span>') + 7)
                    countryName = $(address).html();
                } catch (e) {
                    countryName = '';
                }
                return countryName;
            }
            var GetDealerCallBack = function (dealerList) {
                dealerAddr = dealerList.dealers;
                $("#spanDealer").text("");
                $("#DealerID").val('');//contains dealer code
                $('#mapAccordian').find('li').remove();
                for (var mkr = 0, mkrLen = markers.length; mkr < mkrLen ; mkr++) {
                    markers[mkr].setMap(null);
                }
                markers = [];
                if (dealerAddr != undefined && dealerAddr != null && dealerAddr.length > 0) {
					$('#dealerMap, #mapAccordian').show();
					$('#no-dealer').hide();
					if (!map) {
                        map = new google.maps.Map(document.getElementById('dealerMap'), {
                            zoom: 10,
                            center: new google.maps.LatLng(lat, lng),
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            streetViewControl: false,
                            panControl: false,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.LEFT_BOTTOM
                            }
                        });
                    }
					
					$("#DealerID").val(dealerAddr[0].id);
                    ValidateElement("#DealerID");//removing validation message

                    // you have json do whatever you want to do
                    var iconCounter = 0;
                    var labels = 'ABC';
                    var labelIndex = 0;
                    var dealerLength = dealerAddr.length ;
                    var dealerCount = (dealerAddr.length < 3) ? dealerAddr.length : 3;
                    var count = 0;
                    
                    for (var dealer = 0; dealer < dealerLength; dealer++) {
                        dealerTR = dealerAddr[dealer].programCodes.TR ? true : false;
                        dealerCountry = dealerAddr[dealer].address.country ? dealerAddr[dealer].address.country : '';
                        if (dealerTR && (iso3Array.indexOf(dealerCountry) + 1) && checkLocale(dealerCountry)) {
                            if (count == 0) {
                                $("#DealerID").val(dealerAddr[dealer].id);
                            }
                            var marker = new MarkerWithLabel({
                                position: new google.maps.LatLng(dealerAddr[dealer].position.lat, dealerAddr[dealer].position.lng),
                                map: map,
                                labelContent: labels[labelIndex++ % labels.length],
                                labelClass: "markerText",
                                labelAnchor: new google.maps.Point(5, 50),
                                icon: icons[iconCounter],
                                labelInBackground: false
                            });
                            markers.push(marker);
                            markers[0].icon = icons[1];
                            markers[0].set('labelClass', 'markerTextActive');

                            google.maps.event.addListener(marker, 'click', (function (marker, dealer) {
                                return function () {
                                    var markerText = marker.labelContent;
                                    $('#mapAccordian li').removeClass('active');
                                    $('#mapAccordian li[class=' + markerText + ']').addClass('active');
                                    setDealer();
                                    if (markerText == "A") {
                                        markers[1] && markers[1].setIcon(icons[0]);
                                        markers[2] && markers[2].setIcon(icons[0]);
                                        marker.setIcon(icons[1]);
                                        markers[1] && markers[1].set('labelClass', 'markerText');
                                        markers[2] && markers[2].set('labelClass', 'markerText');
                                        marker.set('labelClass', 'markerTextActive');
                                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[0]));
                                    }
                                    else if (markerText == "B") {
                                        markers[0] && markers[0].setIcon(icons[0]);
                                        markers[2] && markers[2].setIcon(icons[0]);
                                        marker.setIcon(icons[1]);
                                        markers[0] && markers[0].set('labelClass', 'markerText');
                                        markers[2] && markers[2].set('labelClass', 'markerText');
                                        marker.set('labelClass', 'markerTextActive');
                                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[1]));
                                    }
                                    else if (markerText == "C") {
                                        markers[0] && markers[0].setIcon(icons[0]);
                                        markers[1] && markers[1].setIcon(icons[0]);
                                        marker.setIcon(icons[1]);
                                        markers[0] && markers[0].set('labelClass', 'markerText');
                                        markers[1] && markers[1].set('labelClass', 'markerText');
                                        marker.set('labelClass', 'markerTextActive');
                                        $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[2]));
                                    }
                                    var dealerCde = $('#mapAccordian li.active').attr('data-code');
                                    $("#DealerID").val(dealerCde);
                                }
                            })(marker, dealer));
                            dd = markers;

                            autoCenter();

                            var addr = '',
                                addr = (dealerAddr[dealer].address.streetAddress) ? dealerAddr[dealer].address.streetAddress[0] + ', ' : '',
                                addrList = (dealerAddr[dealer].address.streetAddress) ? dealerAddr[dealer].address.streetAddress : '',
                                addrlen = dealerAddr[dealer].address.streetAddress.length;

                            for (var counter = 1; counter < addrlen; counter++) {
                                addr += addrList[counter] + ', ';
                            }
                            var dealerNam = (dealerAddr[dealer].name) ? dealerAddr[dealer].name + ', ' : '',
                                dealerTwn = (dealerAddr[dealer].address.city) ? dealerAddr[dealer].address.city + ', ' : '',
                                dealerContry = (dealerAddr[dealer].address.country) ? dealerAddr[dealer].address.country + ', ' : '',
                                dealerPcode = (dealerAddr[dealer].address.zipPost) ? dealerAddr[dealer].address.zipPost : '',
                                dealerTPhone = (dealerAddr[dealer].phone) ? 't: ' + dealerAddr[dealer].phone : '',
                                dealerFx = (dealerAddr[dealer].programCodes.RE && dealerAddr[dealer].programCodes.RE.fax) ? ', f: ' + dealerAddr[dealer].programCodes.RE.fax : '',
                                dealerEmil = (dealerAddr[dealer].programCodes.RE && dealerAddr[dealer].programCodes.RE.email) ? '<br/>e: ' + dealerAddr[dealer].programCodes.RE.email : '',
                                completeAddrR1 = dealerNam + dealerTwn,
                                completeAddrR2 = (addr + dealerPcode) ? '<br/> ' + addr + dealerPcode : '',
                                completeAddrR3 = (dealerTPhone + dealerFx) ? '<br/>' + dealerTPhone + dealerFx : '',
                                completeAddrR4 = (dealerEmil) ? dealerEmil : '';


                            var completeAddrR2A = completeAddrR2.length - 1,
								completeAddrR2B = completeAddrR2.substr[completeAddrR2A];
                            if (completeAddrR2B == ',') {
                                completeAddrR2 = completeAddrR2.substr(0, completeAddrR2A - 1);
                            }
                            var completeAddrR3A = completeAddrR3.length - 1,
								completeAddrR3B = completeAddrR3.substr[completeAddrR3A];
                            if (completeAddrR3B == ',') {
                                completeAddrR3 = completeAddrR3.substr(0, completeAddrR3A - 1);
                            }
                            dealerAddr[dealer].address.country = '';

                            dealerAddr[dealer].address.city = dealerAddr[dealer].address.city.replace("'", "&#39;");
                            for (var sa = 0, saLen = dealerAddr[dealer].address.streetAddress.length; sa < saLen; sa++) {
                                dealerAddr[dealer].address.streetAddress[sa] = dealerAddr[dealer].address.streetAddress[sa].replace("'", "&#39;");
                            }

                            MY18_2017.map.dealerArray[count] = {
                                "dealerAddress": dealerAddr[dealer].address,
                                "dealerName": dealerNam,
                                "dealerPhone": dealerAddr[dealer].phone,
                                "dealerWebsite": dealerAddr[dealer].website,
                                "dealerEmail": dealerEmil
                            }


                            $('<li data-pcode=' + dealerPcode + ' class=' + labels[count] + ' data-index=' + labels[count] + ' data-code=' + dealerAddr[dealer].id + '><span>' + labels[count] + '</span><p>' + completeAddrR1 + completeAddrR2 + completeAddrR3 + '</p></li>').appendTo('#mapAccordian');
                            $('#mapAccordian li:first-child').addClass('active');

                            $('#dealerJson').val(JSON.stringify(MY18_2017.map.dealerArray[0]));
                            count++;
                        }
                        if (count == dealerCount) {
                            break;
                        }
                    }
                    if (count == 0) {
                        // $('#dealerMap, #mapAccordian').hide();
                        $("#DealerID").val('-1');
                        ValidateElement("#DealerID");//removing validation message
                        $("#DealerID").val('');
                        $("#pac-input").val('');
                        $('#dealerMap, #mapAccordian').hide();
                        $('#no-dealer').show();
                    }
                    
                    window.parent.postMessage('height:' + $('body').height(), getUrl());
                    //$("#keepmeposted_iframe .wrapper").css('height', '5000px');

                }
                else {
                    $("#DealerID").val('-1');
                    ValidateElement("#DealerID");//removing validation message
                    $("#DealerID").val('');
                    $("#pac-input").val('');
                    $('#dealerMap, #mapAccordian').hide();
                    $('#no-dealer').show();
                }
            };

            var noDealerFound = function () {
                //$("#DealerID").val('-1');
                //BOK2017.project.ValidateElement("#DealerID");//removing validation message // RK[23/06]: Changed from BOK2017.project to BOK2017.project
                //$("#DealerID").val('');
                //$("#pac-input").val('');
                //$('#dealerMapDiv').hide();
                //$('#dealerMap, #mapAccordian').hide();
                //$('#findDealer .field-validation-error').removeClass('field-validation-error').addClass('field-validation-valid');
                //$('#findDealer .field-validation-valid')[0].innerHTML = "<span>" + $('#divDealerMap').attr('data-error') + "</span>";
                //$('#findDealer .field-validation-valid').removeClass('field-validation-valid').addClass('field-validation-error');

                //$('.location-cell .loader').removeClass('showIB show').addClass('hide');
                //$('#findDealer .field-validation-error').show();
                $('#DealerID').val('');
                $('#pac-input').val('');
                $('#dealerMap, #mapAccordian').hide();
                $('#dealerMap').hide();
                $('#divDealerMap').siblings('.field-validation-valid').removeClass('field-validation-valid').addClass('field-validation-error');
                $('#no-dealer').show();
               // $('#divDealerMap').siblings('.field-validation-error').attr("data-valmsg-for", 'DealerID').text(" Sorry, no dealer is available for this location. Please modify your search location.");

            }

            var autoCenter = function () {
                //  Create a new viewpoint bound
                var bounds = new google.maps.LatLngBounds();
                //  Go through each...
                for (var i = 0; i < markers.length; i++) {
                    bounds.extend(markers[i].position);
                }
                //  Fit these bounds to the map
                map.fitBounds(bounds);
            }

            return this;
        }
        return new _Map();
    }());

    $(function () {
        MY18_2017.map.init();

        $(document).delegate('body', 'click', function () {
			if ($('#pac-input').val() == '') {
				$('#dealerMap, #mapAccordian').hide();
				$('#DealerID').val('');
			}
        });

    });

    $(window).on('load', function () {
        MY18_2017.map.load();
    }).on('resize', function () {
    }).on('scroll', function () {
    });
})(jQuery, this, this.document, window.MY18_2017 = window.MY18_2017 || {});








