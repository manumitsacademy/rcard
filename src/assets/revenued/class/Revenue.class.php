<?php

class Revenue {

    /**
     * Initialize class
     */
    function init() {
        // Theme support
        add_theme_support( 'post-thumbnails' );
        add_image_size( 'revenued-post-thumbs', 490, 330, array( 'center', 'center' ) );
        add_image_size( 'revenued-post-thumbs-bigger', 490, 450, array( 'center', 'center' ) );
        add_image_size('component-split', 500, 500, false);
        add_image_size('component-list', 200, 200, false);

        // Excerpt
        //add_filter( 'excerpt_length', function() { return 25; }, 999 );

        // Enqueue
        add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ) );
        add_action( 'admin_enqueue_scripts', array( __CLASS__, 'admin_enqueue_scripts' ) );

        // Menues
        register_nav_menus( array(
            'nav_menu_top_left' => __( 'Top navigation, LEFT', 'revenued' ),
            'nav_menu_top_right' => __( 'Top navigation, RIGHT', 'revenued' ),
            'nav_menu_mobile' => __( 'Mobile Navigation', 'revenued' ),
        ) );

        // Sidebars
        add_action( 'widgets_init', array( __CLASS__, 'register_sidebars' ) );

        // Ajax calls
        add_action( 'wp_ajax_send_apply_for_loan', array( __CLASS__, 'sendApplyForLoanForm' ) );
        add_action( 'wp_ajax_nopriv_send_apply_for_loan', array( __CLASS__, 'sendApplyForLoanForm' ) );

        add_action( 'wp_ajax_send_contact_form', array( __CLASS__, 'sendContactForm' ) );
        add_action( 'wp_ajax_nopriv_send_contact_form', array( __CLASS__, 'sendContactForm' ) );

        // Shortcodes
        add_shortcode( 'revenued_apply_for_loan_form', array( __CLASS__, 'revenued_apply_form_display' ) );
        add_shortcode( 'revenued_contact_form', array( __CLASS__, 'revenued_contact_form_display' ) );
        add_shortcode( 'revenued_read_more_block', array( __CLASS__, 'revenued_read_more_block_func' ) );
        add_shortcode( 'revenued_top_picks', array( __CLASS__, 'revenued_top_picks_block_func' ) );
        add_shortcode( 'revenued_hexagon_row', array( __CLASS__, 'revenued_hexagon_row' ) );

        // Categories meta
        add_action( 'category_add_form_fields', array( __CLASS__, 'revenued_taxonomy_add_new_meta_field' ), 10, 2 );
        add_action( 'category_edit_form_fields', array( __CLASS__, 'revenued_taxonomy_edit_meta_field' ), 10, 2 );
        add_action( 'edited_category', array( __CLASS__, 'save_taxonomy_custom_meta' ), 10, 2 );
        add_action( 'create_category', array( __CLASS__, 'save_taxonomy_custom_meta' ), 10, 2 );
    }



    public static function revenued_hexagon_row() {
        // TODO: reuse hex code from page-category-template.php, test on subcategory pages (ex: /manage-cashflow/)
        $t_id = get_field('category_this_page_represents');
        $term_meta = get_option( "taxonomy_$t_id" );
        ?>
        <style>
        .landing-cat-hex-block {
            margin-top: -400px;
        }
        .hexagons-row {
            margin-top: 20px;
            margin-bottom: -200px;
        }
        .hexagon.white {
            color: <?php echo $term_meta['category_color']; ?>;
            float: none;
            margin: auto auto;
            display: inline-block;
            padding: 15px;
            transition: all 200ms linear;
        }
        .hexagon.white:hover {
            color: <?php echo Revenue::darken_color( $term_meta['category_color'], 1.6 ); ?>
        }
        .hexagon.white>img {
            margin: 30px 0px 24px;
            max-height: 75px;
        }
        @media (max-width: 1023px) {
            .hexagons-row {
                display: none !important;
            }
        }
        </style>
        <div class="category-header-block landing-cat-hex-block">
            <div class="row hexagons-row text-center hexagon-row-for-landingpage">

                <?php echo revenued_hexagon_menu(); ?>

            </div>
        </div>
        <?php
    }

    public static function revenued_top_picks_block_func( $atts ) {
        $atts = shortcode_atts( array(
    		'cat' => '',
            'purple' => 0
    	), $atts, 'revenued_top_picks' );

        $t_id = $atts['cat'];
        ?>

        <div class="container top-picks-block">
            <div class="row text-center">
                <div class="col-md-12">
                    <?php if ($atts['purple'] == 1) {
                        ?>
                        <div class="logo-purple"></div>
                        <?php
                    }else {?>
                        <div class="logo-white"></div>
                    <?php } ?>
                    <h3 class="block-title">Revenued Top Picks</h3>
                </div>
            </div>

            <div class="row">
                <?php
                $args = array(
                    'posts_per_page' => 4,
                    'category'  => array( $t_id ),
                    'orderby' => 'rand',
                    'order'    => 'ASC',
                    //'exclude'   => $exclude_arr
                );
                $most_popular = get_posts( $args );

                foreach ($most_popular as $tmp_post) {
                    ?>
                    <article class="col-md-3">
                        <a href="<?php echo get_permalink($tmp_post->ID); ?>">

                            <?php $img = has_post_thumbnail($tmp_post->ID) ? get_the_post_thumbnail_url($tmp_post->ID, 'revenued-post-thumbs-bigger') : get_first_image($tmp_post->ID, 'revenued-post-thumbs-bigger'); ?>
                            <img src="<?php echo $img; ?>" alt="<?php echo esc_attr( $tmp_post->post_title ); ?>" />

                            <h6><?php echo $tmp_post->post_title; ?></h6>
                            <p>
                                <?php //echo get_the_excerpt( $tmp_post->ID ); ?>
                            </p>
                        </a>
                        <div class="post_author_data">
                            <?php echo get_avatar(get_the_author_meta('ID')); ?>
                            <span>By <?php echo get_the_author_meta( 'display_name', $tmp_post->post_author ); ?></span>
                        </div>
                    </article>
                    <?php
                }
                ?>

            </div>
        </div>
        <?php
    }

    public static function revenued_read_more_block_func( $atts ) {
        $atts = shortcode_atts( array(
            'cat' => '',
            'heading' => '',
    	), $atts, 'revenued_read_more_block' );

        $t_id = $atts['cat'];
        ?>
        <div class="container read-more-block">
            <?php if ($atts['heading']): ?>
                <div class="row">
                    <div class="col-sm-12">
                        <h2 class="component-heading"><?php echo $atts['heading']; ?></h2>
                    </div>
                </div>
            <?php endif; ?>
            <div class="row">
                <?php
                $args = array(
                    'posts_per_page' => 4,
                    'category'  => array( $t_id ),
                    'orderby' => 'rand',
                    'order'    => 'ASC',
                    //'exclude'   => $exclude_arr
                );
                //$most_popular = get_posts( $args );
				$the_query = new WP_Query( $args );
				$count = -1;
				// The Loop
				if ( $the_query->have_posts() ) {
					while ( $the_query->have_posts() ) {
						$count = $count+1;
						$the_query->the_post();

					if($count==0){
                ?>
					<article class="col-md-6">
                        <a href="<?php echo get_permalink(); ?>">
                            <?php $img = has_post_thumbnail(get_the_ID()) ? get_the_post_thumbnail_url(get_the_ID(), 'revenued-post-thumbs-bigger') : get_first_image(get_the_ID(), 'revenued-post-thumbs-bigger'); ?>
							<img src="<?php echo $img; ?>" alt="<?php echo get_the_title(); ?>" />
							<h5><?php echo get_the_title(); ?></h5>
						</a>
							<p>
								<?php echo get_the_excerpt();?>
							</p>

						<div class="post_author_data">
							<?php echo get_avatar(get_the_author_meta('ID')); ?>
							<span>By <?php echo get_the_author_meta( 'display_name'); ?></span>
						</div>
					</article>

                <?php
					echo '<div class="col-md-6">';
					}
					else{
                 ?>

                        <article>
                            <a href="<?php echo get_permalink(); ?>">
                                <h5><?php echo get_the_title(); ?></h5>
							</a>
                                <p>
                                    <?php echo get_the_excerpt();?>
                                </p>

                            <div class="post_author_data">
                                <?php echo get_avatar(get_the_author_meta('ID')); ?>
                                <span>By <?php echo get_the_author_meta( 'display_name'); ?></span>
                            </div>
                        </article>
                <?php
					}
				}
				echo "</div>";
				/* Restore original Post Data */
				wp_reset_postdata();
			}
            ?>
        </div>
	</div>
        <?php
    }

    public static function save_taxonomy_custom_meta( $term_id ) {
    	if ( isset( $_POST['term_meta'] ) ) {
    		$t_id = $term_id;
    		$term_meta = get_option( "taxonomy_$t_id" );
    		$cat_keys = array_keys( $_POST['term_meta'] );
    		foreach ( $cat_keys as $key ) {
    			if ( isset ( $_POST['term_meta'][$key] ) ) {
    				$term_meta[$key] = $_POST['term_meta'][$key];
    			}
    		}
    		// Save the option array.
    		update_option( "taxonomy_$t_id", $term_meta );
    	}
    }

    public static function revenued_taxonomy_add_new_meta_field() {
    	// this will add the custom meta field to the add new term page
    	?>
    	<div class="form-field">
    		<label for="term_meta[category_color]"><?php _e( 'Color code (#hex)', 'revenued' ); ?></label>
    		<input type="text" name="term_meta[category_color]" id="term_meta[category_color]" value="">
    		<p class="description"><?php _e( 'Enter a value for this field','revenued' ); ?></p>
    	</div>
    <?php
    }

    public static function revenued_taxonomy_edit_meta_field($term) {
    	// put the term ID into a variable
    	$t_id = $term->term_id;

    	// retrieve the existing value(s) for this meta field. This returns an array
    	$term_meta = get_option( "taxonomy_$t_id" ); ?>
    	<tr class="form-field">
    	<th scope="row" valign="top"><label for="term_meta[category_color]"><?php _e( 'Color code (#hex)', 'pippin' ); ?></label></th>
    		<td>
    			<input type="text" name="term_meta[category_color]" id="term_meta[category_color]" value="<?php echo esc_attr( $term_meta['category_color'] ) ? esc_attr( $term_meta['category_color'] ) : ''; ?>">
    			<p class="description"><?php _e( 'Enter a value for this field','pippin' ); ?></p>
    		</td>
    	</tr>
        <?php
    }


    /**
     * Apply for Loan form
     */
    public static function revenued_apply_form_display() {
        ob_start();
        ?>
        <div class="apply_for_loan_form">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="firstname" placeholder="First Name*" />
                </div>
                <div class="col-md-6">
                    <input type="text" id="lastname" placeholder="Last Name*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <input type="text" id="email" placeholder="Email*" />
                </div>
                <div class="col-md-4">
                    <input type="text" id="phone" placeholder="Phone*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <input type="text" id="company" placeholder="Company*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <select id="industry">
                        <option value="" disabled="" selected="" data-reactid=".hbspt-forms-0.0:$5.$industry.0.0">- Select Industry Type -</option>
                        <option value="Agriculture" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Agriculture">Agriculture</option>
                        <option value="Apparel" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Apparel">Apparel</option>
                        <option value="Banking" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Banking">Banking</option>
                        <option value="Biotechnology" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Biotechnology">Biotechnology</option>
                        <option value="Chemicals" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Chemicals">Chemicals</option>
                        <option value="Communications" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Communications">Communications</option>
                        <option value="Construction" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Construction">Construction</option>
                        <option value="Consulting" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Consulting">Consulting</option>
                        <option value="Education" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Education">Education</option>
                        <option value="Electronics" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Electronics">Electronics</option>
                        <option value="Energy" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Energy">Energy</option>
                        <option value="Engineering" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Engineering">Engineering</option>
                        <option value="Entertainment" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Entertainment">Entertainment</option>
                        <option value="Environmental" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Environmental">Environmental</option>
                        <option value="Finance" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Finance">Finance</option>
                        <option value="Food &amp; Beverage" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Food &amp; Beverage">Food &amp; Beverage</option>
                        <option value="Government" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Government">Government</option>
                        <option value="Healthcare" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Healthcare">Healthcare</option>
                        <option value="Hospitality" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Hospitality">Hospitality</option>
                        <option value="Insurance" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Insurance">Insurance</option>
                        <option value="Machinery" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Machinery">Machinery</option>
                        <option value="Manufacturing" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Manufacturing">Manufacturing</option>
                        <option value="Media" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Media">Media</option>
                        <option value="Medical Supplies" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Medical Supplies">Medical Supplies</option>
                        <option value="Not For Profit" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Not For Profit">Not For Profit</option>
                        <option value="Recreation" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Recreation">Recreation</option>
                        <option value="Retail" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Retail">Retail</option>
                        <option value="Shipping" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Shipping">Shipping</option>
                        <option value="Technology" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Technology">Technology</option>
                        <option value="Telecommunications" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Telecommunications">Telecommunications</option>
                        <option value="Transportation" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Transportation">Transportation</option>
                        <option value="Utilities" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Utilities">Utilities</option>
                        <option value="Other" data-reactid=".hbspt-forms-0.0:$5.$industry.0.1:$Other">Other</option>
                    </select>
                </div>
                <div class="col-md-7">
                    <select id="monthly_deposit_volume__c">
                        <option value="" disabled="" selected="" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.0">- Select Monthly Deposit Volume -</option>
                        <option value="0-10k" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.1:$0-10k">0-10k</option>
                        <option value="10-25k" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.1:$10-25k">10-25k</option>
                        <option value="25-50k" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.1:$25-50k">25-50k</option>
                        <option value="50-100k" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.1:$50-100k">50-100k</option>
                        <option value="100k+" data-reactid=".hbspt-forms-0.0:$6.$monthly_deposit_volume__c.0.1:$100k+">100k+</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <a href="#" class="button button-orange button-apply-loan-send">Let’s Do Business</a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 email-us">
                    Questions? Email us at <a href="mailto:info@revenued.com">info@revenued.com</a>.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Apply for Loan form
     */
    public static function revenued_contact_form_display() {
        ob_start();
        ?>
        <div class="apply_for_loan_form">
            <div class="row">
                <div class="col-md-6">
                    <input type="text" id="firstname" placeholder="First Name*" />
                </div>
                <div class="col-md-6">
                    <input type="text" id="lastname" placeholder="Last Name*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <input type="text" id="email" placeholder="Email*" />
                </div>
                <div class="col-md-4">
                    <input type="text" id="phone" placeholder="Phone*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <input type="text" id="website" placeholder="Website*" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <a href="#" class="button button-orange button-contact-send">Let’s Do Business</a>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 email-us">
                    All other inquiries can email us at <a href="mailto:info@revenued.com">info@revenued.com</a>.
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Send Form
     *
     * value="{"rumScriptExecuteTime":1537.099999957718,"rumServiceResponseTime":2488.2999999681488,"rumFormRenderTime":878.2999999821186,"rumTotalRenderTime":2489.6999999764375,"rumTotalRequestTime":876.0999999940395,"css":"","sfdcCampaignId":"701E00000002O8LIAU","pageUrl":"https://www.revenued.com/contact-us/","pageTitle":"Contact Us | Revenued – Anand Kumar Blog","source":"FormsNext-static-1.845","isHostedOnHubspot":false,"timestamp":1520732387313,"userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36","referrer":"https://www.revenued.com/get-business-cash/","hutk":"704e85594bc5160762c418d7d1ce4466","originalEmbedContext":{"css":"","sfdcCampaignId":"701E00000002O8LIAU","portalId":"2490387","formId":"435fb75d-db9d-471f-a544-e32cbdbb91e6","target":"#hbspt-form-1520732386516-3366613711","redirectUrl":"","inlineMessage":true},"recentFieldsCookie":{},"boolCheckBoxFields":"","dateFields":"","redirectUrl":"","smartFields":{},"urlParams":{},"formValidity":{"firstname":{"valid":true,"errors":[],"errorTypes":[]},"company":{"valid":false,"errors":["Please complete this required field."],"errorTypes":["REQUIRED_FIELD"]},"phone":{"valid":false,"errors":["Please complete this required field."],"errorTypes":["REQUIRED_FIELD"]}},"formTarget":"#hbspt-form-1520732386516-3366613711","correlationId":"f8d1327e-6c61-4d7d-8bc7-b27e50c2e0cd","disableCookieSubmission":false,"usingInvisibleRecaptcha":false,"isFallback":false}"
     */
    public static function sendApplyForLoanForm() {
        //Process a new form submission in HubSpot in order to create a new Contact.
        $hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
        $ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
        $hs_context      = array(
         'hutk' => $hubspotutk,
         'ipAddress' => $ip_addr,
         'pageUrl' => 'https://www.revenued.com/',
         'pageName' => 'Revenued'
        );
        $hs_context_json = json_encode($hs_context);

        //Need to populate these variable with values from the form.
        $str_post = "firstname=" . urlencode($_POST['firstname'])
         . "&lastname=" . urlencode($_POST['lastname'])
         . "&email=" . urlencode($_POST['email'])
         . "&phone=" . urlencode($_POST['phone'])
         . "&company=" . urlencode($_POST['company'])
         . "&industry=" . urlencode($_POST['industry'])
         . "&monthly_deposit_volume__c=" . urlencode($_POST['monthly_deposit_volume__c'])
         . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

        //replace the values in this URL with your portal ID and your form GUID
        $endpoint = 'https://forms.hubspot.com/uploads/form/v2/2490387/435fb75d-db9d-471f-a544-e32cbdbb91e6';

        $ch = @curl_init();
        @curl_setopt($ch, CURLOPT_POST, true);
        @curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
        @curl_setopt($ch, CURLOPT_URL, $endpoint);
        @curl_setopt($ch, CURLOPT_HTTPHEADER, array(
         'Content-Type: application/x-www-form-urlencoded'
        ));
        @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response    = @curl_exec($ch); //Log the response from HubSpot as needed.
        $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
        @curl_close($ch);

        return $response;
        wp_die();
    }

    public static function sendContactForm() {
        //Process a new form submission in HubSpot in order to create a new Contact.
        $hubspotutk      = $_COOKIE['hubspotutk']; //grab the cookie from the visitors browser.
        $ip_addr         = $_SERVER['REMOTE_ADDR']; //IP address too.
        $hs_context      = array(
         'hutk' => $hubspotutk,
         'ipAddress' => $ip_addr,
         'pageUrl' => 'https://www.revenued.com/',
         'pageName' => 'Revenued'
        );
        $hs_context_json = json_encode($hs_context);

        //Need to populate these variable with values from the form.
        $str_post = "name=" . urlencode($_POST['firstname'])
        // . "&lastname=" . urlencode($_POST['lastname'])
         . "&email=" . urlencode($_POST['email'])
         . "&phone=" . urlencode($_POST['phone'])
         . "&website=" . urlencode($_POST['website'])
        // . "&industry=" . urlencode($_POST['industry'])
        // . "&monthly_deposit_volume__c=" . urlencode($_POST['monthly_deposit_volume__c'])
         . "&hs_context=" . urlencode($hs_context_json); //Leave this one be

        //replace the values in this URL with your portal ID and your form GUID
        $endpoint = 'https://forms.hubspot.com/uploads/form/v2/2490387/3a7493f6-037f-446f-b4a3-eeb439e9dc7f';

        $ch = @curl_init();
        @curl_setopt($ch, CURLOPT_POST, true);
        @curl_setopt($ch, CURLOPT_POSTFIELDS, $str_post);
        @curl_setopt($ch, CURLOPT_URL, $endpoint);
        @curl_setopt($ch, CURLOPT_HTTPHEADER, array(
         'Content-Type: application/x-www-form-urlencoded'
        ));
        @curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response    = @curl_exec($ch); //Log the response from HubSpot as needed.
        $status_code = @curl_getinfo($ch, CURLINFO_HTTP_CODE); //Log the response status code
        @curl_close($ch);

        return $response;
        wp_die();
    }

    /**
     * Enqueue all scripts and styles
     */
    public static function enqueue_scripts() {
        wp_enqueue_script( 'hubspot', '//js.hsforms.net/forms/v2.js', [], false, true );
        wp_enqueue_script( 'revenued-bootstrap', get_stylesheet_directory_uri() . '/libs/bootstrap/js/bootstrap.min.js', array( 'jquery' ), false, true );
        wp_enqueue_script( 'revenued-scripts', get_stylesheet_directory_uri() . '/libs/revenue.js', array( 'jquery' ), false, true );
        wp_enqueue_script( 'array.includes', get_stylesheet_directory_uri() . '/assets/js/array.includes.js', [], false, true );
        wp_enqueue_script( 'bb-tool', get_stylesheet_directory_uri() . '/assets/js/bb-tool-script.js', [], false, true );
        wp_enqueue_style( 'revenued-bootstrap', get_stylesheet_directory_uri() . '/libs/bootstrap/css/bootstrap.min.css' );
        wp_enqueue_style( 'revenued-fa', get_stylesheet_directory_uri() . '/libs/font-awesome/css/fontawesome-all.min.css' );
        wp_enqueue_style( 'revenued-fonts', get_stylesheet_directory_uri() . '/webfonts/webfonts.css' );
        wp_enqueue_style( 'revenued-custom', get_stylesheet_directory_uri() . '/style-custom.css' );
        wp_enqueue_style( 'revenued-style', get_stylesheet_directory_uri() . '/style-revenued.css' );
        wp_enqueue_style( 'bb-tool-style', get_stylesheet_directory_uri() . '/assets/css/bb-tool-style.css' );
        wp_enqueue_style( 'hero', get_stylesheet_directory_uri() . '/assets/css/hero.css' );
        wp_enqueue_style( 'component', get_stylesheet_directory_uri() . '/assets/css/component.css' );
        wp_enqueue_style( 'meter', get_stylesheet_directory_uri() . '/assets/css/meter.css' );
        wp_enqueue_style( 'rev-cc', get_stylesheet_directory_uri() . '/assets/css/rev-cc.css' );
        wp_enqueue_style( 'override', get_stylesheet_directory_uri() . '/assets/css/override.css' );
    }

    /**
     * Enqueue all scripts and styles for the admin panel
     */
    public static function admin_enqueue_scripts() {
        wp_enqueue_script( 'revenued-admin', get_stylesheet_directory_uri() . '/js/admin.js', array( 'jquery' ) );
    }

    /**
     * Register all sidebars needed for the site
     */
    public static function register_sidebars() {
        $args = array(
            'name'          => __( 'Footer Column #1', 'revenued' ),
            'id'            => 'revenued-footer-1',
            'description'   => '',
            'class'         => '',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widgettitle">',
            'after_title'   => '</h2>'
        );
        register_sidebar( $args );

        $args = array(
            'name'          => __( 'Footer Column #2', 'revenued' ),
            'id'            => 'revenued-footer-2',
            'description'   => '',
            'class'         => '',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widgettitle">',
            'after_title'   => '</h2>'
        );
        register_sidebar( $args );

        $args = array(
            'name'          => __( 'Footer Column #3', 'revenued' ),
            'id'            => 'revenued-footer-3',
            'description'   => '',
            'class'         => '',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widgettitle">',
            'after_title'   => '</h2>'
        );
        register_sidebar( $args );

        $args = array(
            'name'          => __( 'Blog Post Sidebar', 'revenued' ),
            'id'            => 'revenued-blog-sidebar',
            'description'   => '',
            'class'         => '',
            'before_widget' => '<div id="%1$s" class="single-widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h5 class="widgettitle">',
            'after_title'   => '</h5>'
        );
        register_sidebar( $args );
    }

    public static function get_random_posts( $num ) {
        $args = array(
            'post_type' => 'post',
            'orderby'   => 'rand',
            'posts_per_page' => $num,
            );

        $the_query = new WP_Query( $args );

        if ( $the_query->have_posts() ) {

        $string .= '<ul>';
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                $string .= '<li><a href="'. get_permalink() .'">'. get_the_title() .'</a></li>';
            }
            $string .= '</ul>';
            /* Restore original Post Data */
            wp_reset_postdata();
        } else {

        $string .= 'no posts found';
        }

        return $string;
    }

    public static function darken_color($rgb, $darker=2) {
        $hash = (strpos($rgb, '#') !== false) ? '#' : '';
        $rgb = (strlen($rgb) == 7) ? str_replace('#', '', $rgb) : ((strlen($rgb) == 6) ? $rgb : false);
        if(strlen($rgb) != 6) return $hash.'000000';
        $darker = ($darker > 1) ? $darker : 1;

        list($R16,$G16,$B16) = str_split($rgb,2);

        $R = sprintf("%02X", floor(hexdec($R16)/$darker));
        $G = sprintf("%02X", floor(hexdec($G16)/$darker));
        $B = sprintf("%02X", floor(hexdec($B16)/$darker));

        return $hash.$R.$G.$B;
    }
}
