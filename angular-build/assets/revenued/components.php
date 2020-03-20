<?php /* Template Name: Components */ ?>

<?php
$post_id = get_queried_object_id();
$term = get_the_terms($post_id, 'category')[0];
$term_id = $term->term_id;
$term_name = $term->name;
$term_meta = get_option("taxonomy_$term_id");
$category_color = $term_meta['category_color'];
$title = get_field('title_override') ? get_field('title_override') : get_the_title();
$subcats = get_term_children($term_id, 'category');
?>

<?php get_header(); ?>

<style>
  .hero {
    background-color: <?php echo $category_color; ?>;
  }
  .hero__hexagons {
    background-image: <?php echo hex_pattern($category_color); ?>;
  }
  .component--gray .component__hexagons--standard {
    background-image: <?php echo hex_pattern('#f2f2f2'); ?>;
  }
  .component--category {
    background-color: <?php echo $category_color; ?>;
  }
  .component--category .component__hexagons--standard {
    background-image: <?php echo hex_pattern($category_color); ?>;
  }
  .component__hexagons--inset {
    background-image: <?php echo hex_pattern('#fff'); ?>;
  }
  .component h2,
  .component-heading {
    color: <?php echo $category_color; ?>;
  }
</style>

<?php if (get_field('hide_hero') !== true) : ?>
  <div class="hero">
    <div class="hero__container">
      <div class="hero__subnav">
        <div class="top-submenu"><?php echo revenued_subcats_menu($subcats, false); ?></div>
      </div>
      <h1 class="hero__text"><?php echo $title; ?></h1>
    </div>
    <div class="hero__hexagons"></div>
  </div>
<?php endif; ?>

<?php while (have_rows('components')) : the_row(); ?>

  <div class="component component--<?php the_sub_field('background'); ?>
    <?php if (get_sub_field('flush_top')) : ?>component--flush-top<?php endif; ?>
    <?php if (get_sub_field('flush_bottom')) : ?>component--flush-bottom<?php endif; ?>
  ">

    <?php if (get_sub_field('top_hexagons') !== 'none') : ?>
      <div class="component__hexagons component__hexagons--top component__hexagons--<?php the_sub_field('top_hexagons'); ?>"></div>
    <?php endif; ?>

    <div class="component__container zero">

      <?php if (get_row_layout() === 'visual_editor') : ?>
        <?php the_sub_field('content'); ?>
      <?php endif; ?>

      <?php if (get_row_layout() === 'split') : ?>
        <?php the_sub_field('intro'); ?>
        <div class="component__split">
          <div class="component__split__image component__split__image--<?php the_sub_field('image_alignment'); ?>">
            <?php echo wp_get_attachment_image(get_sub_field('image'), 'component-split'); ?>
          </div>
          <div class="component__split__content zero">
            <?php the_sub_field('content'); ?>
          </div>
        </div>
      <?php endif; ?>

      <?php if (get_row_layout() === 'list') : ?>
        <?php the_sub_field('intro'); ?>
        <div class="component__list
          <?php if (get_sub_field('grid_view')) : ?>component__list--grid<?php endif; ?>
        ">
          <?php while (have_rows('items')) : the_row(); ?>
            <div class="component__list__item">
              <div class="component__list__image">
                <?php echo wp_get_attachment_image(get_sub_field('image'), 'component-list'); ?>
              </div>
              <div class="component__list__content zero">
                <?php the_sub_field('content'); ?>
              </div>
            </div>
          <?php endwhile; ?>
        </div>
      <?php endif; ?>

    </div>

    <?php if (get_sub_field('bottom_hexagons') !== 'none') : ?>
      <div class="component__hexagons component__hexagons--bottom component__hexagons--<?php the_sub_field('bottom_hexagons'); ?>"></div>
    <?php endif; ?>

  </div>

<?php endwhile; ?>

<?php if (get_field('hide_related_articles') !== true) : ?>
  <?php echo do_shortcode('[revenued_read_more_block cat="'.$term_id.'" heading="Read More About '.$term_name.'"]'); ?>
<?php endif; ?>

<?php get_footer(); ?>
