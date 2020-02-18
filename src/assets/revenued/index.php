<?php get_header(); ?>

<div id="bg-pattern"></div>

<div class="search-list__container container">

  <div class="search-list">

    <h1 class="search-list__page-title">Search results for <span class="search-list__query"><?php the_search_query(); ?></span></h1>

    <?php while (have_posts()) : the_post(); ?>

      <div class="search-list__item">
        <h2 class="search-list__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <?php the_excerpt(); ?>
      </div>

    <?php endwhile; ?>

    <div class="search-list__pagination">
      <?php the_posts_pagination(); ?>
    </div>

  </div>

</div>

<div class="hexagonbg top"></div>

<?php get_footer(); ?>
