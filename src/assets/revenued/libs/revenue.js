jQuery(document).ready(function(){


    jQuery('.button-contact-send').click(function(e) {
        e.preventDefault();
        var _firstname = jQuery('#firstname').val() + ' ' + jQuery('#lastname').val();
        var _email = jQuery('#email').val();
        var _phone = jQuery('#phone').val();
        var _website = jQuery('#website').val();

        var data = {
    		'action': 'send_contact_form',
            'firstname': _firstname,
            'email': _email,
            'phone': _phone,
            'website': _website,
    	};

    	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
    	jQuery.post(ajaxurl, data, function(response) {
    		alert('success');
    	});
    });



    jQuery('.button-apply-loan-send').click(function(e) {
        e.preventDefault();
        var _firstname = jQuery('#firstname').val();
        var _lastname = jQuery('#lastname').val();
        var _email = jQuery('#email').val();
        var _phone = jQuery('#phone').val();
        var _company = jQuery('#company').val();
        var _industry = jQuery('#industry').val();
        var _monthly_deposit_volume__c = jQuery('#monthly_deposit_volume__c').val();

        var data = {
    		'action': 'send_apply_for_loan',
            'firstname': _firstname,
            'lastname': _lastname,
            'email': _email,
            'phone': _phone,
            'company': _company,
            'industry': _industry,
            'monthly_deposit_volume__c': _monthly_deposit_volume__c

    	};

    	// We can also pass the url value separately from ajaxurl for front end AJAX implementations
    	jQuery.post(ajaxurl, data, function(response) {
    		alert('success');
    	});
    });

    jQuery('.hamburguer').click(function(e) {
        jQuery('body').toggleClass('menu-mobile-open');
        e.stopPropagation();
    });

    jQuery('body').click(function(e) {
        var _t = jQuery(this);

        if (_t.hasClass('menu-mobile-open')) {
            e.stopPropagation();
            e.preventDefault();
            _t.removeClass('menu-mobile-open');
        }
    });

    jQuery('.menu-mobile').click(function(e) {
        e.stopPropagation();
    });

    jQuery('#site-header .menu-main-mega-menu-container .menu > li').mouseenter(function() {
        jQuery(this).addClass('active');
    });

    jQuery('#site-header .menu-main-mega-menu-container .menu > li').mouseleave(function() {
        jQuery(this).removeClass('active');
    });

    jQuery('.top-submenu .menu > li').mouseenter(function() {
        jQuery(this).addClass('active');
    });

    jQuery('.top-submenu .menu > li').mouseleave(function() {
        jQuery(this).removeClass('active');
    });

    jQuery('.menu-mobile ul.menu > li > a').click(function(e) {
        if (jQuery(this).hasClass('active')) {
            return true;
        }

        e.preventDefault();
        var _t = jQuery(this);

        jQuery('.menu-mobile ul.menu .active').removeClass('active');
        _t.addClass('active');
        _t.closest('li').find('> .sub-menu').addClass('active');
    });

    jQuery('.menu-mobile ul.menu > li > ul.sub-menu > li > a').click(function(e) {
        if (jQuery(this).hasClass('active')) {
            return true;
        }

        e.preventDefault();
        var _t = jQuery(this);

        jQuery('.menu-mobile ul.sub-menu .active').removeClass('active');
        _t.addClass('active');
        _t.closest('li').find('> .sub-menu').addClass('active');
    });

    jQuery(function(){
        jQuery('#head_search_icon').click(function(){
            jQuery('#header-search-form').slideToggle('fast', function() {
                jQuery('#header-search-form #s').focus();
            });
        });
        jQuery('#head_close_search_icon').click(function(){
            jQuery('#header-search-form').slideToggle('fast');
        });
    });

	jQuery('.cc-dd-filter > li > a').click(function() {
		event.preventDefault();
		jQuery(this).parent().find('ul').slideToggle('fast');
	})

	jQuery('.cc-dd-filter > li > i').click(function() {
		jQuery(this).next('ul').slideToggle('fast');
	})
	jQuery('.show-more-link').click(function(event) {
		event.preventDefault();
		jQuery(this).parent().toggleClass('active');
    })

    hbspt.forms.create({
        portalId: "2490387",
        formId: "c3c1f136-6ae3-4595-80a6-d677485628b1",
        target: "#hubspot-ad-embed"
    });

    hbspt.forms.create({
        portalId: "2490387",
        formId: "65604919-4ecb-4e86-84a1-27c2b6ac7267",
        target: "#hubspot-cc-embed"
    });

});
