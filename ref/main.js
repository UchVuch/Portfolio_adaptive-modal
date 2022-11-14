function showPreloader() {
    $('#preloader_overlay').css('display', 'block');
}

function hidePreloader() {
    $('#preloader_overlay').css('display', 'none');
}

function switchCatalogViewMode(modeView){
    $.ajax({
        'url' : '/ajax/switch_catalog_mode.php',
        'data' : {
            'AJAX' : 'Y',
            'ACTION' : 'SWITCH_CATALOG_VIEW_MOD',
            'VALUE' : modeView
        },
        'success' : function(data) {
            console.log(data);
        }
    });
}

function switchItemViewMode(modeView){
    $.ajax({
        'url' : '/ajax/switch_catalog_mode.php',
        'data' : {
            'AJAX' : 'Y',
            'ACTION' : 'SWITCH_ITEM_VIEW_MOD',
            'VALUE' : modeView
        }
    });
}

function switchCatalogSortMode(modeView, siteId, template, parameters){
    $('[data-entity=container-1]').animate({opacity:0.1}, 200, function() {
        $.ajax({
            'url' : '/ajax/switch_catalog_mode.php',
            'method' : 'POST',
            'data' : {
                'AJAX' : 'Y',
                'ACTION' : 'SWITCH_CATALOG_SORT_MOD',
                'VALUE' : modeView,
                'siteId': siteId,
                'template': template,
                'parameters': parameters
            },
            'success' : function(data) {
                window[containerCatalogInstance].sendRequest({action:'switchSortOrder', template: data.template, parameters:data.parameters});
            }
        });
    });
}

/* get viewport width */
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

/* auto-height */
var ids = [];
function blockHeight(ids){
    $.each(ids, function(i, id){
        $('.js-height[data-height="'+id+'"]').height('auto').removeClass('heighted');
        var h = 0;
        $('.js-height[data-height="'+id+'"]').each(function(){
            if($(this).outerHeight() > h){
                h = $(this).outerHeight();
            }
        });
        $('.js-height[data-height="'+id+'"]').outerHeight(h).addClass('heighted');
    });
}

/* masked classremover - $('div').removeClasses('status_*'); */
(function($) {
    $.fn.removeClasses = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})($);

/* carousel */
var carouselScroll = 4;
function initCarousel() {
    $('.carousel-container')
        .jcarousel({
            vertical: false,
            items: '.carousel-items .catalogue__list__one'
        })
        .touchwipe({
            wipeLeft: function() {
	            $('.carousel-container').jcarousel('scroll', '+='+carouselScroll);
	        },
	        wipeRight: function() {
	            $('.carousel-container').jcarousel('scroll', '-='+carouselScroll);
	        },
	        min_move_x: 20,
	        min_move_y: 20,
	        preventDefaultEvents: false
        });

    $('.carousel-prev')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('disabled');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('disabled');
        })
        .jcarouselControl({
            target: '-='+carouselScroll
        });

    $('.carousel-next')
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('disabled');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('disabled');
        })
        .jcarouselControl({
            target: '+='+carouselScroll
        });
}
/*
$( function () {
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            $.each(items, function (index, item) {
                var li;
                if (item.category != currentCategory) {
                    if (currentCategory != "") {
                        ul.append("<li class='ui-autocomplete-divider'></li>");
                    }
                    currentCategory = item.category;
                }
                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.category + " : " + item.label);
                }
            });
        }
    });
    var data = [
        {href: "?person=1", label: "ЯНА НЕДЗВЕЦКАЯ (JN)", cover: "ЯНА НЕДЗВЕЦКАЯ (JN)", category: "persons"},

        {href: "?cat=1", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Юбки и Брюки", cover: "Юбки и Брюки", category: "categories"},
        {href: "?cat=3", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Жилеты и Жакеты", cover: "Жилеты и Жакеты", category: "categories"},
        {href: "?cat=4", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Платья", cover: "Платья", category: "categories"},
        {href: "?cat=5", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Верхняя одежда", cover: "Верхняя одежда", category: "categories"},
        {href: "?cat=6", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Блузы", cover: "Блузы", category: "categories"},
        {href: "?cat=7", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Водолазки и свитера", cover: "Водолазки и свитера", category: "categories"},

        {href: "?page=1", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Тренды этого лета", cover: "Тренды этого лета", category: "pages"},
        {href: "?page=2", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Сезонный Показ", cover: "Сезонный Показ", category: "pages"},
        {href: "?page=3", label: "ЯНА НЕДЗВЕЦКАЯ (JN) Вечеринка у Яны", cover: "Вечеринка у Яны", category: "pages"}
    ];

    $('.js-search').catcomplete({
        delay: 0,
        source: data
    }).catcomplete( "instance" )._renderItem = function( ul, item ) {
        return $("<li>")
            .append("<a href='" + item.href + "'>" + item.cover + "</a>")
            .appendTo(ul);
    };
});
*/

$(document).ready(function () {
	let top = 0;
	$(document).scroll(function(){
console.log($(document).scrollTop());
		if($(document).width() < 768){
			$('.catalogue__filter').addClass('catalogue__filter_mobail');
			if($(document).scrollTop() >= 26){
				$('.site-header').css({'position':'fixed', 'top':0});
			}else{
				$('.site-header').css({'position':'absolute', 'top':26});
			}
			if($(document).scrollTop() >= 188){
				$('.bobile-search').css({'position':'fixed', 'width':'100%', 'top': 33, 'z-index': 2});
				$('.catalogue__settings').addClass('catalog-filrer_fixed');
			}else{
				$('.bobile-search').css({'position':'inherit'});
				$('.catalogue__settings').removeClass('catalog-filrer_fixed');
			}
			if($(document).scrollTop() >= 188){
				if($('.bobile-search').length){
					top = 73;
				}else{
					top = 33;
				}
				$('.breadcrumbs').css({'position':'fixed', 'width':'100%', 'top': top, 'z-index': 2, 'background-color': '#fff'});
			}else{
				$('.breadcrumbs').css({'position':'inherit'});
			}
		}
	});

	$('.js-more-all-text').on("click", function(){
		let blockText = $(this).closest('.block-more-all').find('.more-all-text').css({'display':'block'});
		$(this).remove();
	});

	//$('#qwe').mask('+7 (999) 999-99-99');

    if ($('.js-intro-carousel').length) {
      $('.js-intro-carousel').each(function () {
          $(this).owlCarousel({
              nav: true,
              items : 1, // THIS IS IMPORTANT
              responsive : {
                  480 : { items : 1  },
                  768 : { items : 1  },
                  1024 : { items : 1 },
              },
              navText: ['', ''],
              autoWidth: true,
              dots: true,
          });
      });
    }

    $('.js-carousel').each(function () {
        if ( $(this).hasClass('js-sortable-container') ) {
            var data = $(this).html();
            $(this).data('default', data);
        }
        
        if ($(this).hasClass('actual__carousel')) {
            $(this).owlCarousel({
	            nav: true,
	            navText: ['', ''],
                dots: true,
                responsive : {
                    0 : {
                        items: 1,
                    },
                    768 : {
                        items: 3,
                    }
                }
	        });
        } else if ($(this).hasClass('lastchance__items__wrap') || $(this).hasClass('bestsellers__items__wrap')) {
            $(this).owlCarousel({
	            nav: true,
	            navText: ['', ''],
                dots: true,
                responsive : {
                    0 : {
                        items: 1,
                    },
                    768 : {
                        items: 5,
                    }
                },
                autoWidth: true,
            });
        } else if ($(this).hasClass('news__main__carousel')) {
            $(this).owlCarousel({
	            nav: true,
	            navText: ['', ''],
                dots: true,
                responsive : {
                    0 : {
                        items: 1,
                    },
                    768 : {
                        items: 3,
                    }
                }
            });
        } else if ($(this).hasClass('news__main__carousel_2')) {
            $(this).owlCarousel({
                nav: true,
                navText: ['', ''],
                dots: true,
                responsive : {
                    0 : {
                        items: 1,
                    },
                    768 : {
                        items: 2,
                    }
                },
                //autoWidth: true,
            });
        } else if (!$(this).hasClass('not_autowidth-carousel')) {
	        $(this).owlCarousel({
				items: 1,
	            nav: true,
	            navText: ['', ''],
	            dots: true,
				autoWidth:true
	        });
	    } else {
	    	$(this).owlCarousel({
				items: 1,
	            nav: true,
	            navText: ['', ''],
	            autoWidth: true,
	            dots: true,
	        });
	    }
    });



    if (!$('.itemcard').length) {
      $('.js-carousel-vertical').each(function () {
          $(this).slick({
              infinite: false,
              vertical: true,
              slidesToShow: 4,
              slidesToScroll: 4,
              prevArrow: '<div class="slick-prev"></div>',
              nextArrow: '<div class="slick-next"></div>'
          });
      });
    }


    $('.js-sitenav > ul > li').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });

    $('.js-validate').each(function () {
        $(this).validate();
    });

    $('.js-phone').intlTelInput({
        initialCountry: 'ru',
        preferredCountries: ['ru', 'us']
    });

	var top_show = 600; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
	var delay = 1000; // Задержка прокрутки

	// При прокрутке попадаем в эту функцию
	$(window).scroll(function () {
		// В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" 
		if ($(this).scrollTop() > top_show)
			$('#top').fadeIn();
		else
			$('#top').fadeOut();
	});

	// При клике по кнопке "Наверх" попадаем в эту функцию
	$('#top').click(function () {
		// Плавная прокрутка наверх 
		$('body, html').animate({
			scrollTop: 0
		}, delay);
	});

});

$(document)
    .on('click', '.js-classtoggle-trigger', function () {
        var css = $(this).data('class') ? $(this).data('class') : 'active',
            obj = $(this).data('object') ? $($(this).data('object')) : $(this).closest('.js-classtoggle');
        obj.add(this).toggleClass(css);
    })
    .on('click', '.js-containers-trigger', function () {
        var isActive = $(this).closest('.js-containers-container').hasClass('active');
        $(this).closest('.js-containers').find('.js-containers-container').removeClass('active');
        if (!isActive) {
            $(this).closest('.js-containers-container').addClass('active');
        }
    })
    .on('click', '.js-popup-open', function () {
        var top = $(window).scrollTop() + viewport().height / 2,
            id = $(this).data('popup'),
            h = $('#'+id).outerHeight(),
            fader = $(this).data('fader');
        if (h + 40 > viewport().height) {
            top = $(window).scrollTop();
        } else {
            top = top - h / 2;
        }
        if (fader) {
           $('#fader').addClass('alternate');
        }
        $('#fader').fadeIn(500);
        $('#'+id).css('top', top);
    })
    .on('click', '.js-popup-close, #fader', function () {
        $('#fader').fadeOut(500, function () {
            $(this).removeClass('alternate');
        });
        $('.popup').removeAttr('style');
    })
    .on('click', '.js-footnav .parent', function () {
        $(this).toggleClass('active');
    })
    .on('click', '.js-help-trigger', function () {
        $('.js-help-container').toggleClass('active');
    })
    .on('click', '.js-navtrigger', function () {
        $('.js-adnav').toggleClass('active');
    })
    .on('click', '.js-adnav-category', function () {

        var url = $(this).data('url');
        var podmenuList = $('.js-adnav').find('ul[data-url="'+url+'"]');

        if (podmenuList.length > 0) {
            podmenuList.css('display', 'block');
            podmenuList.siblings().css('display', 'none');
            $('.js-adnav-container').addClass('active');
        } else {
            window.location.href=url;
        }

        
    })
    .on('click', '.js-adnav-back', function () {
        $('.js-adnav-container').removeClass('active');
    })
    .on('click', '.js-image-previews img', function () {
        var id = $(this).attr('data-preview-id');
        $('.itemcard__left__carousel__one').removeClass('active');
        $(this).closest('.itemcard__left__carousel__one').addClass('active');

        $('.itemcard__big-image').hide();
        $('.itemcard__big-image[data-preview-id='+id+']').show();
    })
    .on('click', '.js-itemcard-video', function () {
        $('.js-itemcard-video-link').trigger('click');
    })
    .on('change', '.js-color-triggers input', function () {
        var color = $(this).data('color');
        $(this).closest('.js-color').find('.js-color-holder').text(color);
    })
    .on('mouseenter', '.js-hover', function () {
        $(this).addClass('hover');
    })
    .on('mouseleave', '.js-hover', function () {
        $(this).removeClass('hover');
    })
    .on('focus', '.js-expand', function () {
        $(this).addClass('active');
    })
    .on('blur', '.js-expand', function () {
        $(this).removeClass('active');
    })
    .on('click', '.js-catalogue-34-trigger span:not(.active)', function () {
        $(this).closest('.js-catalogue-34-trigger').find('span.active').removeClass('active');
        $('.js-catalogue-list').toggleClass('wide');
        $(this).toggleClass('active');
        switchCatalogViewMode($(this).data('entity'));
    })
    .on('click', '.js-catalogue-item-view-trigger span:not(.active)', function () {
        $(this).closest('.js-catalogue-item-view-trigger').find('span.active').removeClass('active');
        $('.js-catalogue-list').toggleClass('show-item-view');
        $(this).toggleClass('active');
        switchItemViewMode($(this).data('entity'));
    })
    .on('change', '.js-showpass', function () {
        var inp = $(this).data('pass');
        if (this.checked) {
            $('#'+inp).attr('type', 'text');
        } else {
            $('#'+inp).attr('type', 'password');
        }
    })
    .on('click', '.js-sortable-triggers [data-sort]', function() {
        var sort = $(this).data('sort') && $(this).data('sort') != 'all' ? $(this).data('sort').toString() : false,
            objs = $(this).closest('.js-sortable').find('.js-sortable-container');
        objs.trigger('destroy.owl.carousel');
        objs.html(objs.data('default'));
        if (sort) {
            objs.html('');
            objs.html(objs.data('default'));
            objs.children(':not([data-sort="'+sort+'"])').remove();
        }
        objs.owlCarousel({
            nav: true,
            navText: ['', ''],
            autoWidth: true,
            dots: true
        });
        return false;
    })
    .on('click', '.iconed_save.wishlist_catalog', function () { //В избранное в каталоге
        __this = $(this);
        var prodId = __this.data('prod-id');

        if (__this.hasClass('active')) {

            $.ajax({
                url: '/ajax/removeLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.removeClass('active');
                    __this.text('Сохранить');
                }
            });

        } else {

            $.ajax({
                url: '/ajax/setLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.addClass('active');
                    __this.text('Убрать');
                }
            });

        }
        return false;
    })
    .on('click', '.viewed_wishlist_btn', function () { //В избранное в просмотренных товарах
        __this = $(this);
        var prodId = __this.data('prod-id');

        if (__this.hasClass('active')) {

            $.ajax({
                url: '/ajax/removeLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.removeClass('active');
                }
            });

        } else {

            $.ajax({
                url: '/ajax/setLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.addClass('active');
                }
            });

        }
        return false;
    })
    .on('click', 'a.prod_wishlist_btn', function () { //В избранное в карточке
        __this = $(this);
        var prodId = __this.data('prod-id');

        if (__this.hasClass('active')) {

            $.ajax({
                url: '/ajax/removeLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.removeClass('active');
                    __this.text('СОХРАНИТЬ ТОВАР В WISHLIST');
                }
            });

        } else {

            $.ajax({
                url: '/ajax/setLike.php',
                data: 'prod_id=' + prodId,
                success: function(data){
                    __this.addClass('active');
                    __this.text('УБРАТЬ ИЗ WISHLIST');
                }
            });

        }
        return false;
    });

$(window).resize(function () {

});

$(window).load(function () {
    $('.js-carousel').each(function () {
        $(this).trigger('refresh.owl.carousel');
    });

    if (!$('.itemcard').length) {
      $('.js-carousel-vertical').each(function () {
          $(this).slick('setPosition');
      });
    }

	$('.cart__item__delete').on('click', function(e){
		e.preventDefault();
		console.log('Удалить товар');
	});

	$('#form-promo').on("submit", function(e){
		e.preventDefault();
		let arPromoKeys = {};
		$("tr.row").each(function() {
			$this = $(this);
			var promokey = $this.find(".promokey input").val();
			var promoart = $this.find(".promoart input").val();
			if(promokey && promoart){
				arPromoKeys[promokey] = promoart;
			}
		});
		$.ajax({
			url: '/promoart/save_promokeys.php',
			method: 'POST',
			data: {'promodata': JSON.stringify(arPromoKeys)},
			success: function(data){
				location.reload();
			}
		});
	});


});

//# sourceMappingURL=main.js.map
