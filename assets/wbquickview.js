'use strict';
(function($){
    $('body').on('click', '.js-wbquickview-link', e => {
        e.preventDefault();
        const $currentTarget = $(e.currentTarget);
        var product_url = $currentTarget.data('url');
        if (product_url.indexOf("?") > 0) {
            var product_url = product_url.substring(0, product_url.indexOf("?"));
        }
        $.ajax({
            url: product_url + '?view=wbquickview',
            success: function(data) {
                if (!data) { return; }
                const html = $(data).find('[data-html="content"]').html();
                $('.js-wbquickview').html(html);
                if (!$('.fancybox-active').length) {
                    $.fancybox.open($('.js-wbquickview'), { 
                        baseClass: `quick-shop__lightbox product-${$currentTarget.data('id')}`,
                        hash: false,
                        infobar : false,
                        toolbar: false,
                        loop: false,
                        smallBtn : true,  
                        video: {
                            autoStart: false
                        },
                        touch: false,
                        mobile: {
                            preventCaptionOverlap: false,
                            toolbar: false,
                            buttons: [
                                "close"
                            ]
                        },
                        beforeLoad: (_e, instance) => {
                            if (Shopify.PaymentButton) {
                                Shopify.PaymentButton.init();
                            }
                            const { src } = instance;
                            const $wbquickview = $(src);
                            $wbquickview.addClass('wbquickview-loading');
                            $wbquickview.addClass('content-loading');
                        },
                        afterShow: (_e, instance) => {
                            // Use unique identifier for the product gallery
                            const { src } = instance;
                            const $wbquickview = $(src);
                            $wbquickview.removeClass('wbquickview-loading');
                            $wbquickview.removeClass('content-loading');
                            $wbquickview.addClass('wbquickview-loaded');
                            $wbquickview.addClass('content-loaded');
                        },
                        beforeClose: (_e, instance) => {
                            // Use unique identifier for the product gallery
                            const { src } = instance;
                            const $wbquickview = $(src);
                            $wbquickview.removeClass('wbquickview-loaded');
                            $wbquickview.removeClass('content-loaded');
                        },
                    });
                }
                if (e.keyCode == 27) { //Escape button
                    $.fancybox.close();
                }
            }
        });
    });

})(jQuery);
