<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WP_Bootstrap_Starter
 */

?>
<?php if(!is_page_template( 'blank-page.php' ) && !is_page_template( 'blank-page-with-container.php' )): ?>
			</div><!-- .row -->
		</div><!-- .container -->
	</div><!-- #content -->
    <footer>
        <div class="nav navbar navbar-expand-md navbar-light" id="navbar-main">
            <div class="container">
                Follow us on
                <div class="float-right">

                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="fa fa-twitter color-twitter"></i> Twitter</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="fa fa-facebook color-facebook"></i> Facebook</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">
                                <i class="fa fa-youtube color-youtube"></i> Youtube</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
        <div class="container" id="site-footer">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <p>
                        <h5 class="bold">คณะวิทยาศาสตร์</br>
                            สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</br>
                        </h5>
                    </p>
                    <p>
                        ถนนฉลองกรุง เขตลาดกระบัง </br>
                        กรุงเทพมหานคร</br>
                        10520</br>
                        โทรศัพท์ 02-329-8400 ถึง 8411</br>
                        โทรสาร 02-329-8412</br>
                    </p>
                </div>
                <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">

                </div>
            </div>
            <br>
            <div class "row">
                <div id="map" height="100%">
                    <script>
                        function initMap() {
                            var map = new google.maps.Map(document.getElementById('map'), {
                                center: { lat: -33.866, lng: 151.196 },
                                zoom: 15
                            });

                            var infowindow = new google.maps.InfoWindow();
                            var service = new google.maps.places.PlacesService(map);

                            service.getDetails({
                                placeId: 'ChIJOWc8eTZmHTERP4O4NDG1VeU'
                            }, function (place, status) {
                                if (status === google.maps.places.PlacesServiceStatus.OK) {
                                    var marker = new google.maps.Marker({
                                        map: map,
                                        position: place.geometry.location
                                    });
                                    map.panTo(place.geometry.location);
                                    map.setCenter(place.geometry.location);
                                    map.setZoom(15);
                                    google.maps.event.addListener(marker, 'click', function () {
                                        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address + '</div>');
                                        infowindow.open(map, this);
                                    });
                                }
                            });
                        }
                    </script>
                    <script async defer src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBmrsS-XNWnC_3zsfUCxI7kXySRjfFOv6w&callback=initMap">
                    </script>
                </div>
            </div>
            <div class "row">
                <p class="float-right">
                    <a href="#">Back to top</a>
                </p>
                <p>&copy; 2017 คณะวิทยาศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                </p>
            </div>
        </div>
    </footer>
<?php endif; ?>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
