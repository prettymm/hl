/**
 * All the reusable components are present below.
**/
(function ($, window, document, MY18_2017, undefined) {
    MY18_2017.selfPlugins = (function () {
        function _selfPlugins() {
            var context = this;

            // Call all init and attachEvent functions within this segment here.
            this.init = function () {
                cstmOverlay.init();
            };

            // Call all body click functions within this segment here.
            this.bodyClick = function () {
				cstmOverlay.bodyClick();
            };

            // Call all resize functions within this segment here.
            this.resize = function () {
                cstmOverlay.resize();
            };
			
			this.overlay = function(type, link){
				if (typeof type === 'string' && type === 'hash'){
					cstmOverlay.hashAnchor(link);
				}else if (typeof type === 'string' && type === 'ajax'){
					cstmOverlay.ajaxAnchor(link);
				}else if (typeof type === 'string' && type === 'iframe'){
					cstmOverlay.iframeAnchor(link);
				}
			};
			
            var cstmOverlay = (function () {
                function _cstmOverlay() {
                    var that = this,
						iframeHeight, iframeWidth,
						scrollPosition;

                    // initiating this component.
                    this.init = function () {
                        attachEvents();
                    };

                    this.resize = function () {
                        if ($(window).height() > 400) {
                            $('div.glsml-overlay .inner-wrap, iframe#overlayIframe').css('max-height', $(window).height() - 100);
                        } else {
                            $('div.glsml-overlay .inner-wrap, iframe#overlayIframe').css('max-height', 700);
                        }

						positionOverlay();
                    };
					
					this.bodyClick = function(){
						$(document).on('touchstart click', 'body:not(div.glsml-overlay)', function(evt){
							if ($(evt.target).parents('div.glsml-overlay .outer-wrap').length === 0 && $('body').hasClass('active-overlay') && $('#keepmeposted_iframe').hasClass('hidden') && ($('.galleryPopup').hasClass('height0') || $('.galleryPopup').css('display') != 'block')){
							    closeOverlay();
							}							
						});
					};

					var scrollTo = function ($elem, duration) {
					    var delay = duration || 500;
					    $('html, body').animate({
					        scrollTop: $elem.offset().top - 27
					    }, delay);
					};

					var attachEvents = function () {
                        // Attaching click event to overlay anchor. When triggered, the overlay would be shown.
                        $(document).on('click', '.overlay-anchor', function (evt) {
                            evt.stopPropagation();
                            evt.preventDefault();
							
                            var $this = $(this);
							
							if ($this.attr('data-theme') && $this.attr('data-theme').length > 0){
								$('div.glsml-overlay .overlay-wrap').addClass($this.attr('data-theme'));
							}
							
                            if ($this.hasClass('hash-anchor')){
                                that.hashAnchor($this.data('display'));
                            }else if ($this.hasClass('ajax-anchor')) {
                                that.ajaxAnchor($this.data('display'));
                            } else if ($this.hasClass('iframe-anchor')) {
                               that.iframeAnchor($this.data('display'), $this);
							}
						});

                        $(document).on('touchend click', '.glsml-overlay span.close-overlay', function (evt) {
                            closeOverlay();
                        });
                    };
					
                    this.hashAnchor = function (contentId) {
                        var $contentHtml = $('#' + contentId).clone(),
							$innerWrap = $('div.glsml-overlay .inner-wrap'),
							contentImg = $contentHtml.find('img'),
							totalImg = contentImg.length,
							loadedImgCnt = 0;

                        beginOverlay();

                        $contentHtml.hasClass('hidden') && $contentHtml.removeClass('hidden');
                        $innerWrap.html($contentHtml);
						$('.outer-wrap').css('max-width', $contentHtml.width()+20);

                        if ($contentHtml.find('img').length > 0) {
                            $contentHtml.find('img').bind('load', function () {
                                loadedImgCnt++;

                                if (loadedImgCnt === totalImg) {
                                    completeOverlay();
                                }
                            });
                        }

                        completeOverlay();
                    };
										
					this.ajaxAnchor = function(link){
						var dispLink = link.split('#'),
							ajaxLink = dispLink[0],
							$contentHtml = "",
							$innerWrap = $('div.glsml-overlay .inner-wrap');
						
						beginOverlay();
						
						$.ajax({
							url: ajaxLink,
							type: "GET",
							cache: false,
							contentType: "text/html",
							success: function (response, status, jqXHR) {
								var doc = document.createElement('html');
								try {
									doc.innerHTML = response;
								} catch (e) {
									$(doc).html(response);
								}

								if (dispLink.length > 1) {
									$contentHtml = $(doc).find('#' + dispLink[1]);
								} else {
									$contentHtml = $(doc).find('body').html();
								}
								$contentHtml.removeClass('hidden');
								$innerWrap.html($contentHtml);


								//Form validation
								var $keepMePosted = $contentHtml.find('#keepMePosted');

								if ($keepMePosted[0]) {
									//if($('#keepMePosted')[0]) {
									$contentHtml.find('#keepMePosted').validate({
										rules: {
											firstname: "required",
											lastname: "required",
											email: {
												required: true,
												email: true
											},
											country: "required",
											agree: "required"
										},
										messages: {
											firstname: "Please enter your first name",
											lastname: "Please enter your last name",
											email: "Please enter a valid email address",
											agree: "Please accept our policy",
											country: "Please select country"
										}
									});
								};
								completeOverlay();
							},
							error: function (jqXHR, textStatus, errorThrown) {							
							}
						});
					};
					
					this.iframeAnchor = function(link, $anchor){
						var iframe = document.createElement('iframe'),
							url = link.split('#')[0],
							$innerWrap = $('div.glsml-overlay .inner-wrap');//.css('overflow','hidden');						
						beginOverlay();
						
						('frameBorder' in iframe) && (iframe.frameBorder = 0);
						('allowTransparency' in iframe) && (iframe.allowTransparency = "true");
						//iframe.scrolling = "no";
						
						$(iframe)
							.attr({
								src: url,								
								'class': 'overlay-iframe',
								'id': 'overlayIframe',
								'name' : 'overlayIframe',
								//'scrolling' : 'no',
								allowFullScreen : true // allow HTML5 video to go fullscreen
							})							
							.appendTo($innerWrap);
						
						iframeHeight = 500;
						
						completeOverlay();
					};
					
					
					var beginOverlay = function(){
						var $cstmOverlay = $('div.glsml-overlay'),
							$innerWrap = $cstmOverlay.find('.inner-wrap'),
							windowHeight = $(window).height(),
							maxHeight = windowHeight - 100;
						
						scrollPosition = $(document).scrollTop();
						
							$('body').addClass('active-overlay').css('top', -scrollPosition+'px');		
						

						$cstmOverlay.removeClass('hidden');
						
						// setting max-height for overlay.
						if (maxHeight > 500) {
							$innerWrap.css('max-height', maxHeight);
						} else {
							$innerWrap.css('max-height', 500);
						}
					}
					
					var positionOverlay = function () {
						var $cstmOverlay = $('div.glsml-overlay'),
							windowHeight = $(window).height(),
							$innerWrap = $cstmOverlay.find('.inner-wrap'),
							innerHeight = $innerWrap.height(),
							$iframe = $innerWrap.find('iframe'),
							hasIframe = $iframe.length > 0;
						
						if (hasIframe){
							$('#overlayIframe').attr('height', iframeHeight);
							$('#overlayIframe').attr('width', iframeWidth);
							if ($('#overlayIframe').attr('data-custom') && $('#overlayIframe').attr('data-custom') == 'true'){
								$('#overlayIframe').parents('.outer-wrap').css('width', parseInt(iframeWidth, 10)+20);
								$('#overlayIframe').parents('.inner-wrap').css({
									'max-height' : 'none',
									'overflow' : 'hidden'
								});
								$('#overlayIframe').parents('.glsml-overlay').css('overflow','auto');
							}
							var marginTop = (windowHeight > iframeHeight) ? (windowHeight-iframeHeight)/2 : 70;
						}else{
							var marginTop = (windowHeight > innerHeight) ? (windowHeight-innerHeight)/2 : 70;
						}
						if ($('.inner-wrap').children().height()+marginTop > $(window).height()){
							$('.glsml-overlay').css('overflow','auto');
							$('.glsml-overlay .inner-wrap').css({
								'max-height' : 'none',
								'overflow' : 'hidden'
							});
						}
						$innerWrap.css({'margin-top':marginTop+'px'});
					};
					
					var completeOverlay = function () {
					   
						positionOverlay();
						var $cstmOverlay = $('div.glsml-overlay');
						setTimeout(function () { $cstmOverlay.removeClass('fadeout') }, 100);
					};
					
					var closeOverlay = function(event){
						$('div.glsml-overlay').addClass('fadeout');
						setTimeout(function () { 
							$('div.glsml-overlay .inner-wrap').html('').removeAttr('style');
							$('div.glsml-overlay').addClass('hidden') 
							$('div.glsml-overlay, div.outer-wrap').removeAttr('style');
							$('div.glsml-overlay .overlay-wrap').removeAttr('class').addClass('overlay-wrap');
							$('body').removeClass('active-overlay');
							$('body').removeAttr('style');
							$(document).scrollTop(scrollPosition);
							$('div.glsml-overlay').removeClass('carouselOverlayWrap');
						}, 11);
					};
                };
                return new _cstmOverlay();
            }());

            return this;
        };
        return new _selfPlugins();
    }());
})(jQuery, this, this.document, window.MY18_2017 = window.MY18_2017 || {});
