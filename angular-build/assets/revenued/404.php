<?php
/**
 * The template for displaying 404 pages (Not Found)
 */

get_header(); ?>

<div id="bg-pattern"></div>
	<div id="main-content" class="container error404">
		<div class="row">
			<div class="col-md-6">
				<img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/revenued_404_page_illustration.jpg" class="full-width" alt="404">
			</div>
			<div class="col-md-6">
				<div id="content-wrapper">
					<h1>Uh, oh something happened.</h1>
					<p>You might be able to find what you're looking for by searching below.</p>
					<?php get_search_form(); ?>
					<p>All other inquries can email us at <a href="mailto:info@revenued.com">info@revenued.com</a></p>
				</div>
			</div><!-- .page-wrapper -->
		</div>
	</div><!-- #primary -->

<?php get_footer(); ?>