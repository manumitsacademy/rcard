<?php
include_once 'class/Revenue.class.php';

$site = new Revenue();
$site->init();

// force https on wpengine
function wpengine_force_https() {
  if (strpos(home_url(), 'wpengine') && !is_ssl()) {
    wp_redirect('https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'], 301);
    exit();
  }
}
add_action('template_redirect', 'wpengine_force_https');


function register_credit_card_tool_style() {
  if ( is_page_template( 'credit-card-tool-template.php' ) ) {
    wp_enqueue_style( 'cc-tool-style', get_stylesheet_directory_uri() . '/assets/css/cc-tool-style.css' );
  }
}
add_action( 'wp_enqueue_scripts', 'register_credit_card_tool_style' );

/*
 * Set post views count using post meta
 */
function setPostViews($postID) {
    $countKey = 'post_views_count';
    $count = get_post_meta($postID, $countKey, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $countKey);
        add_post_meta($postID, $countKey, '0');
    }else{
        $count++;
        update_post_meta($postID, $countKey, $count);
    }
}

// disable woocommerce css
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

// hide acf menu item on staging and live
function hide_acf_menu_item() {
  return !(strpos(get_bloginfo('url'), 'revenued.staging.wpengine.com') !== false || strpos(get_bloginfo('url'), 'www.revenued.com') !== false);
}
add_filter('acf/settings/show_admin', 'hide_acf_menu_item');

// star shortcode
function shortcode_star($atts) {
  $atts = shortcode_atts([
    'rating' => 0,
    'max' => 5,
  ], $atts, 'star');
  $stars = round($atts['rating']);
  $html = '';
  $html .= '<span class="rating-stars" style="font-size: 18px;">';
  for($i=0;$i<$stars;$i++)
    $html .= '<i class="fa fa-star active" style="color: #febf10;"></i>';
  for($j=0;$j<((int)$atts['max']-$stars);$j++)
    $html .= '<i class="fa fa-star" style="color: #dcdcdc;"></i>';
  $html .= '</span>';
  return $html;
}
add_shortcode('star', 'shortcode_star');

// add category support to pages
function add_page_category_support() {
  register_taxonomy_for_object_type('category', 'page');
}
add_action('init', 'add_page_category_support');

// get root id
function get_root_id($id, $type) {
  return end(get_ancestors($id, $type));
}

// revenued mega menu
function revenued_mega_menu() {
  $id = get_queried_object_id();
  $cat_ids = wp_get_post_categories($id);
  $cat_slugs = [];
  foreach ($cat_ids as $id) {
    $cat_slugs[] = get_category($id)->slug;
  }
  $post_slug = get_post_field('post_name', $id);

  $menu = [
    [
      'slug' => 'cash-flow',
      'title' => 'Cash Flow',
    ],
    [
      'slug' => 'business-credit',
      'title' => 'Business Credit',
    ],
    [
      'slug' => 'business-banking',
      'title' => 'Business Banking',
    ],
    [
      'slug' => 'business-loans',
      'title' => 'Business Loans',
    ],
    [
      'slug' => 'business-finance',
      'title' => 'Business Finance',
    ],
    [
      'slug' => 'business-revenue',
      'title' => 'Business Revenue',
    ],
  ];

  $html = '';

  $html .= '<div class="menu-main-mega-menu-container">';
    $html .= '<ul class="menu">';
      foreach ($menu as $item) :
        $active_root = in_array($item['slug'], $cat_slugs) || $post_slug === $item['slug'] ? 'current-menu-item' : '';
        $category = get_term_by('slug', $item['slug'], 'category');
        $subcats = get_term_children($category->term_id, 'category');
        $html .= "<li class='menu-item $active_root'>";
          $html .= "<a href='/{$item['slug']}/'>{$item['title']}</a>";
          $html .= revenued_subcats_menu($subcats);
        $html .= '</li>';
      endforeach;
    $html .= '</ul>';
  $html .= '</div>';

  return $html;
}

// revenued mega menu subcats
function revenued_subcats_menu($subcats, $nested = true) {
  $id = get_queried_object_id();

  $html = '';

  $html .= $nested ? '<ul class="sub-menu">' : '<ul class="menu">';

  foreach ($subcats as $cat) :
    $term = get_term($cat, 'category');
    $has_cat = has_category($term->term_id, $id);
    $cat_page_id = get_field('category_page', $term);
    $is_cat_page = $id === $cat_page_id ? true : false;
    $posts = get_posts([
      'post_type' => ['post', 'page'],
      'cat' => $term->term_id,
      'posts_per_page' => 4,
      'post__not_in' => [$cat_page_id],
      'orderby' => [
        'pinned' => 'DESC',
        'date' => 'DESC',
      ],
      'meta_query' => [
        'pinned' => [
          'key' => 'pin_page',
          'compare' => 'EXISTS',
        ],
      ],
    ]);
    $href = $cat_page_id ? get_permalink($cat_page_id) : '#';
    $html .= $has_cat || $is_cat_page ? '<li class="current-menu-item">' : '<li>';
      $html .= "<a href='$href'>$term->name</a>";
      $html .= '<ul class="sub-menu">';
        foreach ($posts as $post) :
          $is_post = $id === $post->ID ? true : false;
          $url = get_permalink($post->ID);
          $title = get_the_title($post->ID);
          $html .= $is_post ? '<li class="current-menu-item">' : '<li>';
            $html .= "<a href='$url'>$title</a>";
          $html .= '</li>';
        endforeach;
      $html .= '</ul>';
    $html .= '</li>';
  endforeach;

  $html .= '</ul>';

  return $html;
}

// revenued subnav shortcode
function shortcode_subnav() {
  $id = get_queried_object_id();
  $cat_id = wp_get_post_categories($id)[0];
  if (!$cat_id) {
    $children = get_children([
      'post_parent' => $id,
      'post_type' => 'page',
      'numberposts' => 1,
    ]);
    foreach ($children as $child) {
      $id = $child->ID;
    }
    $cat_id = wp_get_post_categories($id)[0];
  }
  $root_cat_id = get_root_id($cat_id, 'category') ? get_root_id($cat_id, 'category') : $cat_id;
  $subcats = get_term_children($root_cat_id, 'category');
  return '<div class="top-submenu">' . revenued_subcats_menu($subcats, false) . '</div>';
}
add_shortcode('subnav', 'shortcode_subnav');

// revenued hexagon menu
function revenued_hexagon_menu() {
  $id = get_queried_object_id();
  $cat_ids = wp_get_post_categories($id);
  $posts = get_posts([
      'post_type' => 'page',
      'category__in' => $cat_ids,
      'posts_per_page' => 4,
      'orderby' => 'rand',
      'post__not_in' => [$id],
      'meta_query' => [
        [
          'key' => 'title',
          'value' => '',
          'compare' => '!=',
        ],
      ],
  ]);
  $icons = [
    'revenued_icon-graph',
    'revenued_icon-magnifying_glass',
    'revenued_icon-hand',
    'revenued_icon-cogs',
  ];
  $html = '';
  $i = 0;
  foreach ($posts as $post) :
    $permalink = get_permalink($post->ID);
    $image = get_template_directory_uri() . '/assets/hex_assets/' . $icons[$i] . '.png';
    $title = get_field('title', $post->ID);
    $desc = get_field('description', $post->ID);
    $html .= '<div class="col-md-3">';
        $html .= "<a href='$permalink' class='hexagon white'>";
            $html .= "<img src='$image' alt='' />";
            $html .= "<h3 class='widget-title'>$title</h3>";
            $html .= "<p>$desc</p>";
        $html .= "</a>";
    $html .= "</div>";
    $i += 1;
  endforeach;
  return $html;
}

// business bank tag ctax
function ctax_business_bank_tag() {
  $args = [
    'public' => false,
    'label' => 'Tags',
    'show_ui' => true,
    'hierarchical' => true,
  ];
  register_taxonomy('business_bank_tag', 'business_bank', $args);
}
add_action('init', 'ctax_business_bank_tag');

// business bank cpt
function cpt_business_bank() {
  $args = [
    'public' => false,
    'label' => 'Business Banks',
    'show_ui' => true,
  ];
  register_post_type('business_bank', $args);
}
add_action('init', 'cpt_business_bank');

// hex pattern
function hex_pattern($color) {
  $hex_pattern = file_get_contents(get_theme_file_path('/assets/hex-pattern.svg'));
  $hex_pattern = rawurlencode(str_replace('#000', $color, $hex_pattern));
  return "url('data:image/svg+xml;charset=utf-8,$hex_pattern')";
}

// paydex ranges shortcode
function paydex_ranges_shortcode() {
  return '
    <div class="component__inset">
      <div class="component__meter">
        <div class="meter meter--3 meter--3--3"></div>
        <p><strong class="component__meter__green">80-100:</strong> Low risk of late payment, meaning your business generally pays within 30 days</p>
      </div>
      <div class="component__meter">
        <div class="meter meter--3 meter--3--2"></div>
        <p><strong class="component__meter__yellow">50-79:</strong> Medium risk of late payment, meaning your business pays within 15-30 days after the due date</p>
      </div>
      <div class="component__meter">
        <div class="meter meter--3 meter--3--1"></div>
        <p><strong class="component__meter__red">0-49:</strong> High risk of late payment, meaning your business pays more than 30 days after the due date</p>
      </div>
    </div>
  ';
}
add_shortcode('paydex_ranges', 'paydex_ranges_shortcode');

// intelliscore plus ranges shortcode
function intelliscore_plus_ranges_shortcode() {
  return '
    <div class="component__inset">
      <div class="component__columns">
        <div class="component__columns__item">
          <div class="component__meter">
            <div class="meter meter--5 meter--5--5"></div>
            <p><strong>76-100:</strong> Risk class 1 (low)</p>
          </div>
          <div class="component__meter">
            <div class="meter meter--5 meter--5--4"></div>
            <p><strong>51-75:</strong> Risk class 2 (low-medium)</p>
          </div>
          <div class="component__meter">
            <div class="meter meter--5 meter--5--3"></div>
            <p><strong>26-50:</strong> Risk class 3 (medium)</p>
          </div>
        </div>
        <div class="component__columns__item">
          <div class="component__meter">
            <div class="meter meter--5 meter--5--2"></div>
            <p><strong>11-25:</strong> Risk class 4 (medium-high)</p>
          </div>
          <div class="component__meter">
            <div class="meter meter--5 meter--5--1"></div>
            <p><strong>1-10:</strong> Risk class 5 (high)</p>
          </div>
        </div>
      </div>
    </div>
  ';
}
add_shortcode('intelliscore_plus_ranges', 'intelliscore_plus_ranges_shortcode');

// hubspot cc embed shortcode
function hubspot_cc_embed_shortcode() {
  return '<div id="hubspot-cc-embed"></div>';
}
add_shortcode('hubspot-cc-embed', 'hubspot_cc_embed_shortcode');

// display the mce styles dropdown
function custom_mce_buttons_2($buttons) {
  array_unshift($buttons, 'styleselect');
  return $buttons;
}
add_filter('mce_buttons_2', 'custom_mce_buttons_2');

// add custom mce style formats
function custom_mce_before_init($settings) {
  $style_formats = [
    [
      'title' => 'Button',
      'selector' => 'a',
      'classes' => 'button button-orange'
    ],
  ];
  $settings['style_formats'] = json_encode($style_formats);
  return $settings;
}
add_filter('tiny_mce_before_init', 'custom_mce_before_init');

// rev cc animation shortcode
function shortcode_rev_cc() {
  $card_front = get_theme_file_uri('/assets/rev-cc-front.png');
  return "<div class='rev-cc'><div class='rev-cc__container'><div class='rev-cc__wrap'><img class='rev-cc__card-front' src='$card_front' alt='Revenued credit card'></div></div></div>";
}
add_shortcode('rev-cc', 'shortcode_rev_cc');

// get first image in content
function get_first_image($post_id, $size = 'full') {
  $attachments = get_children([
    'post_parent' => $post_id,
    'post_type' => 'attachment',
    'numberposts' => 1,
    'post_mime_type' => 'image'
  ]);
  if (is_array($attachments)) foreach ($attachments as $a)
    $img_id = $a->ID;
  if ($img_id)
    return wp_get_attachment_image_src($img_id, $size)[0];
  return false;
}
