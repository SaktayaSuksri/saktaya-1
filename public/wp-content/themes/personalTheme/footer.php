<footer>
        <div class="nav navbar navbar-expand-md navbar-light" id="navbar-main">
            <div class="container">
                Follow us on
                <div class="float-right">

                    <ul class="navbar-nav mr-auto">
                        
                        <li class="nav-item">
                            <a href="https://www.facebook.com/Faculty-of-Science-KMITL-145367872869812/" class="nav-link">
                                <i class="fa fa-facebook color-facebook"></i> Facebook</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://www.youtube.com/channel/UCuU-IWCmc10r4DDRnyV4y6A" class="nav-link">
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
            </div>
            <br>
            <div class "row">
                
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

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.min.js"><\/script>')</script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/popper.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/bootstrap.bundle.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/js/main.js"></script>
</body>

</html>