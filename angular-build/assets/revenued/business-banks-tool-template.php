<?php /* Template Name: Business Banks Tool Template */ ?>

<?php
$filters = ['bank_type', 'account_types', 'atm_fee', 'foreign_transaction_fee', 'overdraft_fee', 'apy_interest', 'remote_deposit', 'bill_pay', 'online_banking', 'mobile_apps'];
$results = get_posts([
  'post_type' => 'business_bank',
  'orderby' => 'title',
  'order' => 'ASC',
  'posts_per_page' => -1,
]);
$ref_id = $results[0]->ID;
?>

<?php get_header(); ?>

<div class="c-banner">
  <div class="container">
    <div class="c-banner__breadcrumbs">
      <?php echo do_shortcode('[subnav]'); ?>
    </div>
    <div class="c-banner__container">
      <div class="c-banner__image">
        <?php echo wp_get_attachment_image(get_field('hero_image'), 'medium'); ?>
      </div>
      <div class="c-banner__text">
        <h1><?php the_field('hero_title'); ?></h1>
        <p><?php the_field('hero_text'); ?></p>
      </div>
    </div>
  </div>
</div>

<div class="c-main">
  <div class="container">
    <div class="c-main__container">
      <div class="c-main__full">

        <div class="c-filtered"></div>

      </div>
      <div class="c-main__sidebar">

        <div class="c-controls">

          <?php
          $sorts = get_terms([
            'taxonomy' => 'business_bank_tag',
            'hide_empty' => false,
          ]);
          ?>
          <h2 class="c-controls__heading">Sort By</h2>
          <label class="c-controls__label">
            <input class="c-controls__radio" type="radio" name="sort" value="all" checked>
            <span class="c-controls__label__text">All</span>
          </label>
          <?php foreach ($sorts as $sort) : ?>
            <label class="c-controls__label">
              <input class="c-controls__radio" type="radio" name="sort" value="<?php echo $sort->slug; ?>">
              <span class="c-controls__label__text"><?php echo $sort->name; ?></span>
            </label>
          <?php endforeach; ?>

          <h2 class="c-controls__heading">Filter By</h2>
          <?php foreach ($filters as $filter) : ?>
            <?php $obj = get_field_object($filter, $ref_id); ?>
            <div class="c-controls__dropdown">
              <button class="c-controls__dropdown__toggle">
                <i class="fa fa-angle-down"></i>
                <?php echo $obj['label']; ?>
              </button>
              <div class="c-controls__dropdown__group" data-group="<?php echo $obj['label']; ?>">
                <?php foreach ($obj['choices'] as $value => $label) : ?>
                  <label class="c-controls__label">
                    <input class="c-controls__checkbox" type="checkbox" value="<?php echo $value; ?>" data-filter="<?php echo $obj['name']; ?>">
                    <span class="c-controls__label__text"><?php echo $label; ?></span>
                  </label>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endforeach; ?>

        </div>

      </div>
      <div class="c-main__content">

        <div class="c-results">

          <h2 class="c-results__heading">Business Bank Reviews <span class="c-results__count"><?php echo count($results); ?> Results</span></h2>

          <div class="c-results__container">

            <?php $all = 0; foreach ($results as $post) : setup_postdata($post); ?>

              <div class="c-results__item"
                <?php foreach ($filters as $filter) : ?>
                  data-<?php echo $filter; ?>="<?php the_field($filter); ?>"
                <?php endforeach; ?>
                data-sort-all="<?php echo $all; ?>"
                <?php
                $sort_terms = get_terms([
                  'taxonomy' => 'business_bank_tag',
                  'hide_empty' => false,
                ]);
                ?>
                <?php foreach ($sort_terms as $term) : ?>
                  data-sort-<?php echo $term->slug; ?>="<?php echo has_term($term, 'business_bank_tag', $post) ? '0' : '1'; ?>"
                <?php endforeach; ?>
              >
                <div class="c-results__item__header">
                  <div class="c-results__item__left">
                    <?php echo wp_get_attachment_image(get_field('logo'), 'medium', false, ['class' => 'c-results__logo']); ?>
                    <a class="c-results__button" href="<?php the_field('url'); ?>" target="_blank">Apply Now</a>
                  </div>
                  <div class="c-results__item__right">
                    <h3><?php the_title(); ?></h3>
                    <div class="c-results__stars">
                      <?php
                      $rating = get_field('rating');
                      echo do_shortcode("[star rating='$rating']");
                      ?>
                    </div>
                    <?php the_field('description'); ?>
                  </div>
                </div>
                <div class="c-results__item__block">
                  <div class="c-results__item__main">
                    <h4>Account Details</h4>
                    <?php the_field('bullet_points'); ?>
                  </div>
                  <div class="c-results__item__side">
                    <h4>Common Fees</h4>
                    <?php the_field('fees'); ?>
                  </div>
                </div>
                <div class="c-results__item__footer">
                  <h4>Typical Services</h4>
                  <?php the_field('services'); ?>
                </div>
              </div>

            <?php $all += 1; endforeach; wp_reset_postdata(); ?>

          </div>

        </div>

      </div>
    </div>
  </div>
</div>

<div class="hexagonbg bottom white category-top-pics" style="margin: 40px 0 0; padding: 0; height: 80px; background-color: #3dbeee;"></div>
<div class="category-top-pics" style="background-color: #3dbeee;">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h3 class="section-title text-center" style="margin-bottom: 40px;">Revenued Top Picks</h3>
            </div>
        </div>
        <div class="row">
            <?php
            $args = array(
                'posts_per_page' => 4,
                'category_name'  => 'business-banking',
                'orderby' => 'rand',
                'order'    => 'ASC',
                //'exclude'   => $exclude_arr
            );
            $top_picks = get_posts( $args );

            foreach ($top_picks as $tmp_post) {
                ?>
                <article class="col-md-3">
                    <a href="<?php echo get_permalink($tmp_post->ID); ?>">
                        <?php $img = has_post_thumbnail($tmp_post->ID) ? get_the_post_thumbnail_url($tmp_post->ID, 'revenued-post-thumbs') : get_first_image($tmp_post->ID, 'revenued-post-thumbs'); ?>
                        <img src="<?php echo $img; ?>" alt="<?php echo esc_attr( $tmp_post->post_title ); ?>" />
                        <h4><?php echo $tmp_post->post_title; ?></h4>
                    </a>
                    <div class="post_author_data">
                        <?php echo get_avatar( $tmp_post->post_author ); ?>
                        <span>By <?php echo get_the_author_meta( 'display_name', $tmp_post->post_author ); ?></span>
                    </div>
                </article>
                <?php
            }
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>
