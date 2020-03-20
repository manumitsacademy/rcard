<?php
/*
    Template Name: Credit Card Tool Template
*/
?>
<?php get_header(); ?>
<div class="single-top-line">
       <div class="container">
           <div class="row">

               <div class="col-md-12 text-left">
					<?php echo do_shortcode('[subnav]'); ?>
					<style>
					.top-submenu {
						margin-top: 0;
					}
					</style>
               </div>
           </div>
       </div>
   </div>
<div id="bg-pattern"></div>
<?php the_content();
	$page_url = get_the_permalink();

	$selected_cats = array();
	$all_card_networks = array();
	$filter_conc = '';
	$filter_tax_conc = '';
	$filter_cat_conc = '';
	$sort_concat = '';
	$all_credit_scores = array();
	$all_finc_inst = array();
	$stars_concat = '';

	if (isset($_GET['stars'])) {
		$stars_val = intval($_GET['stars']);
		$stars_concat = "&stars=$stars_val";
	}

	//remove filters
	$rm_activated = false;
	$no_filter = false;
	if(isset($_GET['rm_tax'])){
		$all_tax = explode(' ', $_GET['tax']);
		$all_cats = explode(' ', $_GET['filter_cat']);

		$tax_pos = array_search($_GET['rm_tax'], $all_tax);
		unset($all_tax[$tax_pos]);
		$all_tax = array_values($all_tax);

		$cat_pos = array_search($_GET['rm_filter_cat'], $all_cats);
		unset($all_cats[$cat_pos]);
		$all_cats = array_values($all_cats);

		$rm_activated = true;
		if(count($all_tax)==0){
			$no_filter = true;
		}
	}

	if(isset($_GET['filter_cat']) && $no_filter==false){

		if(!$rm_activated){
			$all_tax = explode(' ', $_GET['tax']);
			$all_cats = explode(' ', $_GET['filter_cat']);
		}

		$all_tax_val = implode('+', $all_tax);
		$all_cats_val = implode('+', $all_cats);
		$filter_conc = "&tax=$all_tax_val&filter_cat=$all_cats_val";

		$all_card_networks = array();
		$all_credit_scores = array();
		$all_finc_inst = array();
		$selected_cats = array();

		for($i=0;$i<=sizeof($all_tax);$i++){

			switch($all_tax[$i]){
				case 'pa_card-network':
					array_push($all_card_networks,$all_cats[$i]);
					break;
				case 'pa_credit-score':
					array_push($all_credit_scores,$all_cats[$i]);
					break;
				case 'pa_financial-institution':
					array_push($all_finc_inst,$all_cats[$i]);
					break;
				default:
					if($all_cats[$i])
						array_push($all_finc_inst,$all_cats[$i]);
			}
			$category = get_term_by('slug', $all_cats[$i], $all_tax[$i]);

			array_push($selected_cats,$category);
		}

		$filter_tax_conc = '+'.implode('+', $all_tax);
		$filter_cat_conc = '+'.implode('+', $all_cats);

		if(!empty($_GET['sortby'])){
			$sort_concat = "&sortby=".$_GET['sortby'];
			$args = array(
			   'post_type'      => 'product',
			   'post_status'    => 'publish',
			   'order' => 'DESC',
			   'posts_per_page' => -1,
			   'meta_query'=> [
				   [
						'key' => $_GET['sortby'],
						'value' => true,
				   ],
			   ],
			   'tax_query'      => array(
					'relation' => 'AND',
					array(
						'taxonomy'        => 'pa_card-network',
						'field'           => 'slug',
						'terms'           =>  $all_card_networks,
						'operator'        =>  sizeof($all_card_networks)==0?"NOT IN":"IN",
					),
					array(
						'taxonomy'        => 'pa_credit-score',
						'field'           => 'slug',
						'terms'           =>  $all_credit_scores,
						'operator'        =>  sizeof($all_credit_scores)==0?"NOT IN":"IN",
					),
					array(
						'taxonomy'        => 'pa_financial-institution',
						'field'           => 'slug',
						'terms'           =>  $all_finc_inst,
						'operator'        =>  sizeof($all_finc_inst)==0?"NOT IN":"IN",
					)
				)
			);

			//var_dump($args);
		}
		else{

			$args = array(
			   'post_type'      => 'product',
			   'post_status'    => 'publish',
			   'posts_per_page' => -1,
			   'tax_query'      => array(
					'relation' => 'AND',
					array(
						'taxonomy'        => 'pa_card-network',
						'field'           => 'slug',
						'terms'           =>  $all_card_networks,
						'operator'        =>  sizeof($all_card_networks)==0?"NOT IN":"IN",
					),
					array(
						'taxonomy'        => 'pa_credit-score',
						'field'           => 'slug',
						'terms'           =>  $all_credit_scores,
						'operator'        =>  sizeof($all_credit_scores)==0?"NOT IN":"IN",
					),
					array(
						'taxonomy'        => 'pa_financial-institution',
						'field'           => 'slug',
						'terms'           =>  $all_finc_inst,
						'operator'        =>  sizeof($all_finc_inst)==0?"NOT IN":"IN",
					)
				)
			);
			//var_dump($args);
		}
	}
	else if(!empty($_GET['sortby'])){
		$args = array(
			'post_status' => 'publish',
			'post_type' => 'product',
            'order' => 'DESC',
			'posts_per_page' => -1,
			'meta_query' => [
				[
					'key' => $_GET['sortby'],
					'value' => true,
				],
			]
		);


		$sort_concat = "&sortby=".$_GET['sortby'];
	}
	else{
		$args = array(
			'post_type'      => 'product',
			'posts_per_page' => -1,
			'paged' => get_query_var('paged') ? get_query_var('paged') : 1
		);
	}

	if (isset($_GET['stars'])) {
		$stars = intval($_GET['stars']);
		$newargs = [
			'key' => 'revenued_rating',
			'value' => $stars,
			'compare' => '>=',
		];
		$args['meta_query'][] = $newargs;
	} else {
		$stars = false;
	}

	//temp
	//echo '<pre>';
	//print_r($args);
	//echo '</pre>';

	$loop = new WP_Query( $args );
	//echo "Last SQL-Query: {$loop->request}";
	$args_prod = array(
		'taxonomy'   => "product_cat",
		'hide_empty' => false
	);
	$product_categories = get_terms($args_prod);

	//get all sorting fields
$metas = get_post_meta(1144);
?>
<div class="container">
        <div class="row cc-tool-wrapper">
			<?php if((is_array($selected_cats) && sizeof($selected_cats)>0) || $stars){
			?>
			<div class="col-md-12">
				<ul id="cc-tags">
				<?php
					foreach ( $selected_cats as $term ) {
						$remove_filter = '?rm_tax='.$term->taxonomy.'&rm_filter_cat='.$term->slug;
						if($term->name){
								echo '<li>' . $term->name . '<a href="'.$remove_filter.$filter_conc.$sort_concat.$stars_concat.'">X</a></li>';
						}
					}
					if ($stars) {
						$url = $_SERVER['REQUEST_URI'];
						$href = str_replace("stars=$stars", '', $url);
						echo "<li>$stars & Up<a href='$href'>X</a></li>";
					}
					echo '<li><a href="?">Clear All</a></li>';
				?>
				</ul>
			</div>
			<?php } ?>
            <div class="col-md-3 sidebar">
                <h4>Sort By</h4>
                <ul class="list-group list-group-flush borderless">
					<?php //echo $page_url;?>
					<li class="list-group-item"><a href="?sortby=<?php echo $filter_conc.$stars_concat;?>">All</a></li>
					<?php
					foreach($metas as $key=>$val) {
						if(substr( $key, 0, 6 ) === "field_"){
							$field = maybe_unserialize($val[0]);
							if(isset($_GET['sortby']) && $field['name']==$_GET['sortby']){
								$is_bold = 'bold';
							}
							else{
								$is_bold = '';
							}
							echo '<li class="list-group-item"><a class="'.$is_bold.'" href="?sortby='.$field['name'].$filter_conc.$stars_concat.'">'.$field['label'].'</a></li>';

						}
					}
					?>
                </ul>
                <h4>Filter By</h4>
				<?php
				$card_networks = get_terms( array(
					'taxonomy' => 'pa_card-network',
					'hide_empty' => false,
				) );
				$credit_scores = get_terms( array(
					'taxonomy' => 'pa_credit-score',
					'hide_empty' => false,
				) );
				$finc_insts = get_terms( array(
					'taxonomy' => 'pa_financial-institution',
					'hide_empty' => false,
				) );
				?>
                <ul class="list-group list-group-flush cc-dd-filter">
                    <li class="list-group-item"><a href="#">Card Networks</a>
                        <i class="fa fa-angle-down pull-right"></i>
                        <ul class="list-group list-group-flush borderless">
						<?php
						foreach ( $card_networks as $term ) {
							if(is_array($all_card_networks) && sizeof($all_card_networks)>0){
								if (in_array($term->slug, $all_card_networks)) {
									$remove_filter = '?rm_tax='.$term->taxonomy.'&rm_filter_cat='.$term->slug;
									echo '<li class="list-group-item"><span class="bold">' . $term->name . '<a href="'.$remove_filter.$filter_conc.$sort_concat.$stars_concat.'">X</a></span></li>';
									echo "<style>.cc-dd-filter>li:nth-child(1)>ul{ display:block; }</style>";
								}
								else{
									echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
								}
							}
							else{
								echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
							}
						}
						?>
                        </ul>
                    </li>
                    <li class="list-group-item"><a href="#">Credit Score</a>
                        <i class="fa fa-angle-down pull-right"></i>
                        <ul class="list-group list-group-flush borderless">
                        <?php
						foreach ( $credit_scores as $term ) {

							if(is_array($all_credit_scores) && sizeof($all_credit_scores)>0){
								if (in_array($term->slug, $all_credit_scores)) {
									$remove_filter = '?rm_tax='.$term->taxonomy.'&rm_filter_cat='.$term->slug;
									echo '<li class="list-group-item"><span class="bold">' . $term->name . '<a href="'.$remove_filter.$filter_conc.$sort_concat.$stars_concat.'">X</a></span></li>';
									echo "<style>.cc-dd-filter>li:nth-child(2)>ul{ display:block; }</style>";
								}
								else{
									echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
								}
							}
							else{
								echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
							}
						}
						?>
                        </ul>
                    </li>
                    <li class="list-group-item"><a href="#">Financial Institution</a>
                        <i class="fa fa-angle-down pull-right"></i>
                        <ul class="list-group list-group-flush borderless">
                        <?php
						foreach ( $finc_insts as $term ) {
							if(is_array($all_finc_inst) && sizeof($all_finc_inst)>0){
								if (in_array($term->slug, $all_finc_inst)) {
									$remove_filter = '?rm_tax='.$term->taxonomy.'&rm_filter_cat='.$term->slug;
									echo '<li class="list-group-item"><span class="bold">' . $term->name . '<a href="'.$remove_filter.$filter_conc.$sort_concat.$stars_concat.'">X</a></span></li>';
									echo "<style>.cc-dd-filter>li:nth-child(3)>ul{ display:block; }</style>";
								}
								else{
									echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
								}
							}
							else{
								echo '<li class="list-group-item"><a href="?tax='.$term->taxonomy.$filter_tax_conc.'&filter_cat='.$term->slug.$filter_cat_conc.$sort_concat.$stars_concat.'">' . $term->name . '</a></li>';
							}
						}
						?>
						</ul>
					</li>
					<?php $star_ratings = [5, 4, 3, 2, 1]; ?>
					<li class="list-group-item"><a href="#">Star Rating</a>
                        <i class="fa fa-angle-down pull-right"></i>
                        <ul class="list-group list-group-flush borderless">
						<?php
						$url = $_SERVER['REQUEST_URI'];
						foreach ( $star_ratings as $rating ) {
							if ($stars) {
								if ($stars === $rating) {
									$href = str_replace("stars=$stars", '', $url);
								} else {
									$href = str_replace("stars=$stars", "stars=$rating", $url);
								}
							} else if (count($_GET)) {
								$href = "$url&stars=$rating";
							} else {
								$href = "$url?stars=$rating";
							}
							if ($stars === $rating) {
								echo "<li class='list-group-item'><span class='bold'>$rating & Up<a href='$href'>X</a></span></li>";
								echo "<style>.cc-dd-filter>li:nth-child(4)>ul{ display:block; }</style>";
							} else {
								echo "<li class='list-group-item'><a href='$href'>$rating & Up</a></li>";
							}
						}
						?>
						</ul>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <h4>Credit Card Reviews <span><?php echo $loop->post_count;?> Results</span></h4>
				<?php
				while ( $loop->have_posts() ) : $loop->the_post();
				?>
                <div class="row cc-tool-list">
                    <div class="col-md-4">
						<?php
							$featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'medium');
							if($featured_img_url)
								echo '<img class="img-fluid" src="'.$featured_img_url.'" alt="product">';
							else
								echo '<img class="img-fluid" src="'.get_stylesheet_directory_uri().'/assets/dummy-image.jpg" alt="product">';
						?>

                        <a href="<?php echo get_field( "cta_button_link_to_the_card_" );?>" target="_blank" class="apply-now-btn">
							Learn More
						</a>
                        <div class="rating-sec">
                            <b>Revenued Rating</b>
							<?php
							$rating = get_field( "revenued_rating" );
							if($rating)
								echo "<span>$rating/5</span>";
							?>
                            <div class="rating-stars">
								<?php
								for($i=1;$i<=$rating;$i++)
									echo '<i class="fa fa-star active"></i>';
								for($j=1;$j<=(5-$rating);$j++)
									echo '<i class="fa fa-star"></i>';
								?>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h3><?php echo get_the_title();?></h3>
                        <div class="cc-meta-content">
                            <?php $content = get_the_content();
							$description = get_field( "description" );
							if($description)
								echo "<div class='card-description'>$description</div>";
							echo $content;?>
                        </div>
						<?php if(strlen($description.$content)>500)
							echo '<a href="#" class="show-more-link"><span class="screen-reader-text">Show more/less</span></a>';
						?>
                    </div>
                    <div class="col-md-12">
                        <div class="cc-meta-info">
                            <div class="meta-attrib-item">
                                <b>Intro APR</b>
                                <div class="mata-attrib-val">
								<?php
									$apr = get_field( "apr" );
									if($apr)
										echo "$apr% on purchase and balance Transfer";
									else
										echo "-";
								?>
                                </div>
                            </div>
                            <div class="meta-attrib-item">
                                <b>Associated Fees</b>
                                <div class="mata-attrib-val">
                                    <?php
										$fees = get_field( "fees" );
										if($fees)
											echo "$fees";
										else
											echo "-";
									?>
                                </div>
                            </div>
                            <div class="meta-attrib-item">
                                <b>Annual Income</b>
                                <div class="mata-attrib-val">
                                    <?php
										$annual_income = get_field( "annual_income" );
										if($annual_income)
											echo "$annual_income";
										else
											echo "-";
									?>
                                </div>
                            </div>
                            <div class="meta-attrib-item">
                                <b>Recommended Credit Score</b>
                                <div class="mata-attrib-val">
                                    <?php
										$recommended_credit_score = get_field( "recommended_credit_score" );
										if($recommended_credit_score)
											echo "$recommended_credit_score";
										else
											echo "-";
									?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

					<?php
					endwhile;

					$big = 999999999; // need an unlikely integer
					echo '<div id="cc_pagination_wrapper">';
						echo paginate_links( array(
							'base' => str_replace( $big, '%#%', get_pagenum_link( $big ) ),
							'format' => '?paged=%#%',
							'current' => max( 1, get_query_var('paged') ),
							'total' => $loop->max_num_pages
						) );
					echo '</div>';
					if ( !$loop->have_posts() )
						echo '<p>No Card Found!</p>';
					wp_reset_query();
					?>
            </div>
        </div>
    </div>
<style>
	 #bg-pattern {
       background-image:none;
	       position: absolute;
    top: 80px;
    z-index: -10;
    width: 100%;
	height: 320px;
	background-color: #5fbeee;
    background-repeat-x: repeat;
    background-size: contain;
    background-position: 0px top;
    background-repeat-y: no-repeat;
   }

   h1.post-title-single,
   blockquote,
   .single-widget h5,
   .dig-deeper {
       color: <?php echo $term_meta['category_color']; ?>
   }
   .single-top-line {
       background-color: <?php echo $term_meta['category_color']; ?>;
   }
   .top-submenu{
       position: relative;
    top: 25px;
	}
	a {
		color: #60bfef;
	}
	@media(max-width:768px){
		.top-submenu{
			display:none !important;
		}
		#bg-pattern {
			top: 66px;
			height: 150px;
			background-size: cover;
		}
	}
	#bg-pattern + .panel-layout {
		background-color: #5fbeee;
	}
	</style>
<?php get_footer(); ?>
