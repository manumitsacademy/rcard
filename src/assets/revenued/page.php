

<?php get_header(); ?>

<style>
#bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg {
  margin-bottom: -80px !important;
}

@media (min-width: 768px) {
  #bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg {
    margin-bottom: -40px !important;
  }
}

@media (min-width: 1024px) {
  #bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg {
    margin-bottom: -70px !important;
  }
}

@media (min-width: 1280px) {
  #bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg {
    margin-bottom: -90px !important;
  }
}

@media (min-width: 1440px) {
  #bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg {
    margin-bottom: -8% !important;
  }
}

#bg-pattern + .panel-layout > .panel-grid:nth-child(2) .hexagonbg.n-m-b {
  margin-bottom: 0 !important;
}
</style>

<div id="bg-pattern"></div>

<?php the_content(); ?>

<?php get_footer(); ?>
