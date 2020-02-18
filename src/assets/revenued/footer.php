        <footer id="footer">
            <div class="container">
                <div class="row">

                    <div class="col-md-3 column-1">
                        <?php dynamic_sidebar( 'revenued-footer-1' ); ?>
                    </div>
                    <div class="col-md-4 column-2">
                        <?php dynamic_sidebar( 'revenued-footer-2' ); ?>
                    </div>
                    <div class="col-md-5 text-right column-3">
                        <?php dynamic_sidebar( 'revenued-footer-3' ); ?>
                    </div>

                    <div class="col-md-12 copyright">
                        &copy;<?php echo date('Y', time()); ?> Revenued | <?php echo __( 'All Rights Reserved', 'revenued' ); ?>
                    </div
                    >
                </div>
            </div>
        </footer>

    <?php wp_footer(); ?>

    </body>
</html>
