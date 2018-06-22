<?php
	get_header();

	//Template Name:About
	?>

<main role="main">
<style>
.carousel-control-prev-icon, .carousel-control-next-icon {
	 height: 10%;
    width: 37%;
    background-color: #ffc107;
    background-size: 41%, 51%;
    border-radius: 50%;
		border-color: rgba(0,0,0,0);
 }
 .carousel-indicators li {
    position: relative;
    flex: 0 1 auto;
    width: 30px;
    height: 10px;
    border-radius: 25px;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    background-color: rgb(243, 151, 37);
}
</style>


<!-- Large modal -->
<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="s1" style="width: 100%;">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
			<a href="http://www.science.kmitl.ac.th/sciencedays/">
      <img style="width: 100%;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/scienceDay.jpg">
		</a>
   </div>
  </div>
</div>

	<div id="header-carousel" class="carousel slide" data-ride="carousel" data-interval="10000">
		<ol class="carousel-indicators">
			<li data-target="#header-carousel" data-slide-to="0" class="active"></li>
			<li data-target="#header-carousel" data-slide-to="1"></li>
			<li data-target="#header-carousel" data-slide-to="2"></li>
			<li data-target="#header-carousel" data-slide-to="3"></li>
			<!-- <li data-target="#header-carousel" data-slide-to="4"></li> -->
		</ol>
		<div class="carousel-inner">

			<div class="carousel-item active">
				<img class="first-slide d-block img-fluid" style="object-position: 50% 50%;object-fit: scale-down" src="<?php echo get_template_directory_uri(); ?>/images/news/034.jpg" alt="First slide">
			<a href="https://youtu.be/Nrt9I8invA4">
				<div class="container">
					<div class="carousel-caption" id="banner">
						<h1>

						</h1>
						<p>
						</p>
					</div>
				</div>
			</a>
			</div>

			<div class="carousel-item">
				<img class="first-slide d-block img-fluid" style="object-position: 50% 50%;object-fit: scale-down" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel1.png" alt="First slide">
				<div class="container">
					<div class="carousel-caption" id="banner">
						<h1>
							ก้าวสู่ยุคใหม่ คณะวิทยาศาสตร์
						</h1>
						<p>
						</p>
					</div>
				</div>
			</div>


			<div class="carousel-item">
 			 <!-- <a href="https://drive.google.com/drive/folders/1kqzj9Jih3JhCO9S7E4JXrPwkY93Bgtxl?usp=sharing"> -->
 				 <!-- class="third-slide d-block img-fluid" -->
 			 <img  style="width: 100%;" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel2_2.png"
 				alt="Third slide">
 			<!-- </a> -->
 			 <div class="container">
 				 <div class="carousel-caption text-left">
 					 <!-- <h1>
 						 <span>ผลิตบัณฑิตที่มีคุณภาพเพื่อตอบสนองความต้องการของประเทศ</span>
 					 </h1>
 					 <div class="carousel-text">
 						 สร้างบัณฑิตเพื่อตอบสนองต่อการพัฒนาด้านอุตสาหกรรมและ เศรษฐกิจของประเทศ โดยคำนึงถึงคุณภาพชีวิตและสิ่งแวดล้อมที่ดีเป็นสำคัญ
 					 </div> -->
 				 </div>
 			 </div>
 		 </div>

		 <div class="carousel-item">
				<!-- <a href="https://drive.google.com/drive/folders/1kqzj9Jih3JhCO9S7E4JXrPwkY93Bgtxl?usp=sharing"> -->
					<!-- class="third-slide d-block img-fluid" -->
				<img  style="width: 100%;" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel3_2.png"
				 alt="Fourth slide">
			 <!-- </a> -->
				<div class="container">
					<div class="carousel-caption text-left">
						<!-- <h1>
							<span>ผลิตบัณฑิตที่มีคุณภาพเพื่อตอบสนองความต้องการของประเทศ</span>
						</h1>
						<div class="carousel-text">
							สร้างบัณฑิตเพื่อตอบสนองต่อการพัฒนาด้านอุตสาหกรรมและ เศรษฐกิจของประเทศ โดยคำนึงถึงคุณภาพชีวิตและสิ่งแวดล้อมที่ดีเป็นสำคัญ
						</div> -->
					</div>
				</div>
			</div>

		</div>



		<!-- <a class="carousel-control-prev" href="#header-carousel" role="button" data-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="carousel-control-next" href="#header-carousel" role="button" data-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a> -->
	</div>

<!-- ============================== End header picture slideshow =================================== -->

	<div class="container content-row page-content">
		<h2>ข่าวประชาสัมพันธ์</h2>
		<div id="carousel" style="margin-top:0rem" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<ol class="carousel-indicators">
					<li data-target="#carousel" data-slide-to="0"></li>
					<li data-target="#carousel" data-slide-to="1"></li>
					<li data-target="#carousel" data-slide-to="2"></li>
					<li data-target="#carousel" data-slide-to="3"></li>
					<li data-target="#carousel" data-slide-to="4"></li>
					<li data-target="#carousel" data-slide-to="5"></li>
					<li data-target="#carousel" data-slide-to="6"></li>
					<li data-target="#carousel" data-slide-to="7"></li>
					<li data-target="#carousel" data-slide-to="8"></li>
					<li data-target="#carousel" data-slide-to="9"></li>
					<li data-target="#carousel" data-slide-to="10"></li>
					<li data-target="#carousel" data-slide-to="11"></li>
					<li data-target="#carousel" data-slide-to="12"></li>
					<li data-target="#carousel" data-slide-to="13"></li>
					<li data-target="#carousel" data-slide-to="14"></li>
					<li data-target="#carousel" data-slide-to="15"></li>
					<li data-target="#carousel" data-slide-to="16"></li>
					<li data-target="#carousel" data-slide-to="17"></li>
					<li data-target="#carousel" data-slide-to="18"></li>
					<li data-target="#carousel" data-slide-to="19"></li>
					<li data-target="#carousel" data-slide-to="20"></li>
					<li data-target="#carousel" data-slide-to="21"></li>
						<li data-target="#carousel" data-slide-to="22"></li>
				</ol>
				<div class="carousel-item active">
					<a href="http://www.science.kmitl.ac.th/news_016/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/103.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">งาน นิทรรศการวิทยาศาสตร์วิชาการ ครั้งที่ 1</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									กรมวิทยาศาสตร์ทหารเรือ ร่วมกับ กรมวิทยาศาสตร์ทหารบก ได้จัดงาน นิทรรศการวิทยาศาสตร์วิชาการ ครั้งที่ 1 ในวันที่ 7 มิถุนายน 2561 ณ หอประชุมกองทัพเรือ คณะวิทยาศาสตร์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ได้นำผลงานวิชาการ
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration011/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/Academicadministration/102.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/099.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration010/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/AcademicAdministration/087.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- นักศึกษาชั้นปีที่ 4 ภาควิชาวิทยาการคอมพิวเตอร์ ได้รับรางวัล“บทความดีเด่น” -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- นายปวัน พานิชเจริญ และนายทรงสิทธิ์ วงศ์กิระปราชญ์ นักศึกษาระดับปริญญาตรีชั้นปีที่ 4 ภาควิชาวิทยาการคอมพิวเตอร์ ได้รับรางวัล บทความดีเด่นสาขาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ ในงานการประชุมเครือข่ายวิชาการด้านวิศวกรรมไฟฟ้า ครั้งที่ 10 (The 10th Electrical Engineering Network 2018) จากบทความวิชาการเรื่อง “แอปพลิเคชั่นประเมินระดับควันโดยใช้กล้องสมาร์ทโฟน” เมื่อวันที่ 2 พฤษภาคม 2561 ณ สถาบันเทคโนโลยีปทุมวัน โดยมี ผศ.วิสันต์ -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/056.jpg">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/098.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<a href="http://161.246.35.182:8080/Downloads/img-530152545.pdf">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/096.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>


				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/092.jpg">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/092.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/093.jpg">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/093.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.kmitl.ac.th/en/detail/2018-05-16-18-33-28">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/089.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							นักศึกษาระดับปริญญาตรีภาควิชาคณิตศาสตร์ ได้รับรางวัลรองชนะเลิศ ในการนำเสนอผลงานทางวิชาการแบบ poster	</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									นางสาวกชวรรณ ลิ่มสกุล นางสาวคัทรินทร์ พรมมินทร์ นางสาวชุติกาญจน์ จิตรมิตร นักศึกษาชั้นปีที่ 4  ภาควิชาคณิตศาสตร์ คณะวิทยาศาสตร์ ได้รับรางวัล รองชนะเลิศ ในการนำเสนอผลงานทางวิชาการแบบ poster กลุ่ม Statistics I จากผลงานทางวิชาการเรื่อง “A COMPARISON PERFORMANCE OF OPTION PRICING  MODELS” ในการประชุมวิชาการสำหรับนักศึกษาระดับปริญญาตรี สาขาวิชาคณิตศาสตร์ประยุกต์ ครั้งที่ 7
									เมื่อวันเสาร์ที่ 28 เมษายน 2561 ณ คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร วิทยาเขตพระราชวังสนามจันทร์
									จังหวัดนครปฐม โดยมี ดร.จิรภัทร์ หยกรัตนศักดิ์ เป็นอาจารย์ที่ปรึกษา
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/news_014/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/090.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- นักศึกษาระดับปริญญาตรีภาควิชาคณิตศาสตร์ ได้รับรางวัลรองชนะเลิศ ในการนำเสนอผลงานทางวิชาการแบบ poster	</h3> -->
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									<!-- นางสาวกชวรรณ ลิ่มสกุล นางสาวคัทรินทร์ พรมมินทร์ นางสาวชุติกาญจน์ จิตรมิตร นักศึกษาชั้นปีที่ 4  ภาควิชาคณิตศาสตร์ คณะวิทยาศาสตร์ ได้รับรางวัล รองชนะเลิศ ในการนำเสนอผลงานทางวิชาการแบบ poster กลุ่ม Statistics I จากผลงานทางวิชาการเรื่อง “A COMPARISON PERFORMANCE OF OPTION PRICING  MODELS” ในการประชุมวิชาการสำหรับนักศึกษาระดับปริญญาตรี สาขาวิชาคณิตศาสตร์ประยุกต์ ครั้งที่ 7  -->
									<!-- เมื่อวันเสาร์ที่ 28 เมษายน 2561 ณ คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร วิทยาเขตพระราชวังสนามจันทร์  -->
									<!-- จังหวัดนครปฐม โดยมี ดร.จิรภัทร์ หยกรัตนศักดิ์ เป็นอาจารย์ที่ปรึกษา -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<a href="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/088.jpg">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/088.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							วันพุธที่ 9 พฤษภาคม 2561 รศ.ดร.อิทธิพล แจ้งชัด คณบดีคณะวิทยาศาสตร์ สจล. หารือความมือร่วมกับคณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- นายปวัน พานิชเจริญ และนายทรงสิทธิ์ วงศ์กิระปราชญ์ นักศึกษาระดับปริญญาตรีชั้นปีที่ 4 ภาควิชาวิทยาการคอมพิวเตอร์ ได้รับรางวัล บทความดีเด่นสาขาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ ในงานการประชุมเครือข่ายวิชาการด้านวิศวกรรมไฟฟ้า ครั้งที่ 10 (The 10th Electrical Engineering Network 2018) จากบทความวิชาการเรื่อง “แอปพลิเคชั่นประเมินระดับควันโดยใช้กล้องสมาร์ทโฟน” เมื่อวันที่ 2 พฤษภาคม 2561 ณ สถาบันเทคโนโลยีปทุมวัน โดยมี ผศ.วิสันต์ -->
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="carousel-item">
					<a href="http://www.kmitl.ac.th/th/detail/2018-05-09-19-47-50">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/086.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							นักศึกษาชั้นปีที่ 4 ภาควิชาวิทยาการคอมพิวเตอร์ ได้รับรางวัล“บทความดีเด่น”
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 นายปวัน พานิชเจริญ และนายทรงสิทธิ์ วงศ์กิระปราชญ์ นักศึกษาระดับปริญญาตรีชั้นปีที่ 4 ภาควิชาวิทยาการคอมพิวเตอร์ ได้รับรางวัล บทความดีเด่นสาขาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ ในงานการประชุมเครือข่ายวิชาการด้านวิศวกรรมไฟฟ้า ครั้งที่ 10 (The 10th Electrical Engineering Network 2018) จากบทความวิชาการเรื่อง “แอปพลิเคชั่นประเมินระดับควันโดยใช้กล้องสมาร์ทโฟน” เมื่อวันที่ 2 พฤษภาคม 2561 ณ สถาบันเทคโนโลยีปทุมวัน โดยมี ผศ.วิสันต์
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration009/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/AcademicAdministration/082.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- 21/4/61 กิจกรรม สจล. จิตอาสาพัฒนาชุมชน”หัวตะเข้” -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration006/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/085.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- 21/4/61 กิจกรรม สจล. จิตอาสาพัฒนาชุมชน”หัวตะเข้” -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration008/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/AcademicAdministration/083.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- 21/4/61 กิจกรรม สจล. จิตอาสาพัฒนาชุมชน”หัวตะเข้” -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>


				<div class="carousel-item">
					<a href="http://www.science.kmitl.ac.th/academicadministration005/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/AcademicAdministration/076.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							 ปิดรับสมัครแล้ว
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<a href="https://www.youtube.com/watch?v=M5i1FZXdvao">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/074.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							21/4/61 กิจกรรม สจล. จิตอาสาพัฒนาชุมชน”หัวตะเข้”
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<a href="http://www.kmitl.ac.th/en/detail/2018-04-27-16-59-49">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/077.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							ทีมนักศึกษาคณะวิทยาศาสตร์ได้รับรางวัลชนะเลิศด้าน Presentation
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									นักศึกษาคณะวิทยาศาสตร์ สาขาเคมีสิ่งแวดล้อม  ชั้นปีที่ 4 จำนวน 3 ราย ได้แก่ 1. นางสาวอิษยา วงศ์นเรศ  2. นางสาวสุรีพร สุขช่วย 3. นางสาวอรรัมภา วรคันธ์ ได้เข้าร่วมกิจกรรม Project-Based Learning (PBL) ซึ่งสถาบันได้มีความร่วมมือกับ Kochi University Technology, Japan จัดขึ้นระหว่างวันที่ 7-10 มีนาคม  2561
ณ Suvarnabhumi Suite Hotel Bangkok
ในการนี้ กลุ่มนักศึกษาซึ่งมี นางสาวอิษยา วงศ์นเรศ (ยืนกลาง) อยู่ในทีมได้เสนอผลงาน เรื่อง “Sucide”  และได้รับรางวัลชนะเลิศด้าน Presentation เมื่อวันที่ 10 มีนาคม 2561 เมื่อวันที่ 10 มีนาคม 2561
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="carousel-item">
					<a href="http://www.kmitl.ac.th/en/detail/2018-04-27-16-41-51">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/075.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							อาจารย์ประจำภาควิชาเคมี คณะวิทยาศาสตร์ ได้รับสิทธิบัตร
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									ผศ.ดร.เสาวภาคย์ ธีราทรง และ ผศ.ดร.ณัฐวุฒิ เชิงชั้น อาจารย์ประจำภาควิชาเคมี คณะวิทยาศาสตร์ ได้รับสิทธิบัตรเลขที่ 52458 จากผลงาน “เครื่องสกัดพร้อมตรวจวัดปริมาณสารในทันทีแบบอัตโนมัติและกระบวนการดังกล่าว” จากกรมทรัพย์สินทางปัญญา เมื่อวันที่ 2 มีนาคม 2561
									คณะวิทยาศาสตร์จึงขอแสดงความยินดีกับความสำเร็จของอาจารย์ทั้ง 2 ท่าน

								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="carousel-item ">
					<a href="http://www.science.kmitl.ac.th/academicadministration003/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/AcademicAdministration/067.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- นักศึกษาระดับบัณฑิตศึกษา คณะวิทยาศาสตร์ ได้รับรางวัล Best poster presentation award -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>


				<div class="carousel-item">
					<a href="http://www.science.kmitl.ac.th/academicadministration004/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/064.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">

								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">

								</p>
							</div>
						</div>
					</div>
				</div>


				<div class="carousel-item">
					<a href="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/056.jpg">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/056.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- ผศ.ดร.อนุรักษ์ โพธิ์เอี่ยม รองคณบดีคณะวิทยาศาสตร์ เป็นตัวแทนเข้าร่วมประชุม การประชุมสภาคณบดีวิทยาศาสตร์ แห่งประเทศไทย (สภวท.) <br/>วันที่ 23-25 กุมภาพันธ์ 2561 ณ มหาวิทยาลัยเชียงใหม่ -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>



				<div class="carousel-item">
					<a href="http://www.science.kmitl.ac.th/academicadministration001/">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/055.jpg"
					 alt="0 slide">
					 </a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
							<!-- ผศ.ดร.อนุรักษ์ โพธิ์เอี่ยม รองคณบดีคณะวิทยาศาสตร์ เป็นตัวแทนเข้าร่วมประชุม การประชุมสภาคณบดีวิทยาศาสตร์ แห่งประเทศไทย (สภวท.) <br/>วันที่ 23-25 กุมภาพันธ์ 2561 ณ มหาวิทยาลัยเชียงใหม่ -->
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
									 <!-- ณ ห้องราชพฤกษ์ 1 ชั้น 2 อาคารคณะวิทยาศาสตร์ เมื่อวันที่ 31 มค 2561 -->
								</p>
							</div>
						</div>
					</div>
				</div>



				<!-- <div class="carousel-item">
					<a href="https://drive.google.com/drive/folders/1bszRBOYKo_hUfmD6-P8AqexWZPIUlycp?usp=sharing">
						<img class="second-slide d-block img-fluid" style=" min-width: 100%; object-position: 50% 50%; object-fit: fill;" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/031.jpg"
					 alt="0 slide">
					</a>
					<div class="container d-none d-xs-none d-sm-none d-lg-block">
						<div class="carousel-caption">
						<h3 style = "text-shadow: 0.1em 0.1em 0.2em black">
								</h3>
								<div class=""><p style = "text-shadow: 0.1em 0.1em 0.2em black">
								</p>
							</div>
						</div>
					</div>
				</div> -->



				<a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>

		<center>
			<div class="row">
				  <div class="col-md-7">
					</div>
					<div class="col-md-5">
						<div style="float: right; margin: 10px;">
							<a href="http://www.science.kmitl.ac.th/alllistnews/" class="btn btn-primary" style = "background-color: #ffd700;border-color: #ffd700; color: #000;">อ่านข่าวทั้งหมด</a>
						</div>
						<div style="float: right; margin: 10px;">
						  <a href="http://www.science.kmitl.ac.th/alllistacademicadministration/" class="btn btn-primary" style = "background-color: #ffd700;border-color: #ffd700; color: #000;">โครงการอบรม / สัมมนา / งานบริการวิชาการ</a>
					  </div>
				</div>
		</center>


<!-- ===========================ข่าวแถวแรก=============================== -->
<div class="row h-100 align-items-stretch">
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
			<div class="card card-block h-100">
				<img class="card-img-top d-xs-none d-sm-none d-md-block " src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/059.jpg"
				 alt="Card image cap">
				<div class="card-body">
					<h4 class="card-title">วันที่ 13 มีนาคม 2561 งานประกันคุณภาพ จัดประชุมอาจารย์ประจำหลักสูตร ระดับปริญญาตรี</h4>
					<p class="card-text">วันที่ 13 มีนาคม 2561 งานประกันคุณภาพ จัดประชุมอาจารย์ประจำหลักสูตร ระดับปริญญาตรี เพื่อหารือการจัดเตรียมข้อมูลสำหรับเขียนรายงานการประเมินตนเองตามระบบ AUN-QA ประจำปีการศึกษา 2560 ณ ห้องประชุมราชราชพฤกษ์ 2-3 อาคารคณะวิทยาศาสตร์
					</p>
				</div>
				<div class="card-footer">
					<!-- <a href="https://www.facebook.com/pg/Faculty-of-Science-KMITL-145367872869812/photos/?tab=album&album_id=205023226904276" class="btn btn-primary">อ่านต่อ...</a> -->
				</div>
			</div>
		</div>

	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
		<div class="card card-block h-100">
			<img class="card-img-top d-xs-none d-sm-none d-md-block" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/060.jpg"
			 alt="Card image cap">
			<div class="card-body">
				<h4 class="card-title">เยือนคณะบริหารธุรกิจและเศรษฐศาสตร์ มหาวิทยาลัยอัสสัมชัญ</h4>
				<p class="card-text">
					16/3/61 รศ.ดร.อิทธิพล แจ้งชัด คณบดีคณะวิทยาศาสตร์ สจล. และคณะ เยือนคณะบริหารธุรกิจและเศรษฐศาสตร์ มหาวิทยาลัยอัสสัมชัญ เข้าพูดคุยความร่วมมือกับคณะบริหารธุรกิจ จะเกิดอะไรขึ้นเมื่อวิทยาศาสตร์และเทคโนโลยี มาเจอกับสุดยอดสายธุรกิจและการตลาดและขอบพระคุณ ดร.อุรีย์ เจี่ยสกุล คณบดีคณะบริหารธุรกิจและเศรษฐศาสตร์ มหาวิทยาลัยอัสสัมชัญ ที่ให้การต้อนรับเป็นอย่างดี
			</div>
			<div class="card-footer">
				<!-- <a href="https://www.facebook.com/145367872869812/photos/ms.c.eJw1y9sNwEAMAsGOIoxfXP~_NRec4nyMWItENgk46Hl7LzLMyMj4f4O5w~;o4xtb00ju3lmj97nRhbrqtKR~_18AU25GWg~-.bps.a.205077003565565.1073741841.145367872869812/205077020232230/?type=3&theater" class="btn btn-primary">อ่านต่อ...</a> -->
			</div>
		</div>
	</div>

	<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
		<div class="card card-block h-100" style="height:100%">
			<img class="card-img-top d-xs-none d-sm-none d-md-block" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/068.jpg"
			 alt="Card image cap">
			<div class="card-body">
				<h4 class="card-title">2 เม.ย. 61 รศ.ดร.อิทธิพล แจ้งชัด ได้รับพระราชทานเครื่องราชอิสริยาภรณ์ มหาวชิรมงกุฎ </h4>
				<p class="card-text">2 เม.ย. 61 รศ.ดร.อิทธิพล แจ้งชัด ได้รับพระราชทานเครื่องราชอิสริยาภรณ์ มหาวชิรมงกุฎ ในพิธีพระราชทานเครื่องราชอิสริยาภรณ์ชั้นสายสะพาย ต่อหน้าพระฉายาลักษณ์สมเด็จพระเจ้าอยู่หัว ณ หอประชุมครุสภา กระทรวงศึกษาธิการ
				</p>
			</div>
			<div class="card-footer">
				<!-- <a href="https://www.facebook.com/media/set/?set=ms.c.eJw9kVsSREEEQ3c0pRGP~%3BW9s6tLpz1OEBBWIS6oh~_rT99GPPNkRlxeNo0XN62dy~%3Beuu5nPbVVUE~_y3m58PVXCblEDXB~%3B84arLsOGk~%3Bty9f30tvOU~%3BavPpz~%3Bj73B~_rB~_jn9DlIK8~_qPfNg5vHoya~%3B3f0Q~%3B1jaX33u1cl7LddlnPGfuHpvHU5jfe~%3Bt1w9SZr4W~_237lftlOEB9Tn~%3Bdf0Dzy~_PCuq4f5ofMfV2b~%3Brf~%3BzRNsPvqz9cP7APr1G~%3B8J23zvPjbzrDnPavneC755lHkw9xWnPnafcZ9vHa~_~_~_~%3BPx5IvOPxpckD8~-.bps.a.205040706902528.1073741840.145367872869812&type=1" class="btn btn-primary">อ่านต่อ...</a> -->
			</div>
		</div>
	</div>

</div>



		<div class="row h-100 align-items-stretch">
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
				<div class="card card-block h-100">
					<img class="card-img-top d-xs-none d-sm-none d-md-block " src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/075.jpg"
					 alt="Card image cap">
					<div class="card-body">
						<h4 class="card-title">อาจารย์ประจำภาควิชาเคมี คณะวิทยาศาสตร์ ได้รับสิทธิบัตร</h4>
						<p class="card-text">
							ผศ.ดร.เสาวภาคย์ ธีราทรง และ ผศ.ดร.ณัฐวุฒิ เชิงชั้น อาจารย์ประจำภาควิชาเคมี คณะวิทยาศาสตร์ ได้รับสิทธิบัตรเลขที่ 52458 จากผลงาน “เครื่องสกัดพร้อมตรวจวัดปริมาณสารในทันทีแบบอัตโนมัติและกระบวนการดังกล่าว” จากกรมทรัพย์สินทางปัญญา เมื่อวันที่ 2 มีนาคม 2561
							คณะวิทยาศาสตร์จึงขอแสดงความยินดีกับความสำเร็จของอาจารย์ทั้ง 2 ท่าน
						</p>
					</div>
					<div class="card-footer">
						<a href="http://www.kmitl.ac.th/en/detail/2018-04-27-16-41-51" class="btn btn-primary">อ่านต่อ...</a>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
				<div class="card card-block h-100">
					<img class="card-img-top d-xs-none d-sm-none d-md-block " src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/061.jpg"
					 alt="Card image cap">
					<div class="card-body">
						<h4 class="card-title">นักศึกษาระดับบัณฑิตศึกษา คณะวิทยาศาสตร์ ได้รับรางวัล Best poster presentation award</h4>
						<p class="card-text">
						</p>
					</div>
					<div class="card-footer">
						<a href="http://www.kmitl.ac.th/en/detail/2018-03-26-23-16-26" class="btn btn-primary">อ่านต่อ...</a>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
				<div class="card card-block h-100" style="height:100%">
					<img class="card-img-top d-xs-none d-sm-none d-md-block" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/news/069.jpg"
					 alt="Card image cap">
					<div class="card-body">
						<h4 class="card-title">ขอแสดงความยินดีกับทีม "Auttapon สั่งลุย !!" นักศึกษา CS-KMITL ชั้นปีที่ 3 ที่คว้ารางวัลชนะเลิศ Hackathon Krungsri - KMITL Uni Startup ครั้งที่ 1</h4>
						<p class="card-text">ได้รับเงินรางวัล 50,000 บาท พร้อม AWS cloud Credit 313,000 บาท และบัตรเข้าร่วมงาน Techsauce Global Summit มูลค่า 81,000 บาท รายชื่อสมาชิกในทีม "Auttapon สั่งลุย !!"
						</p>

					</div>
					<div class="card-footer">
						<a href="http://www.kmitl.ac.th/th/detail/2018-05-09-19-42-38" class="btn btn-primary">อ่านต่อ...</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>




	<div style="background:gold">
	<br>
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-md-offset-2 ">
					<h3 class="title">Let's Change @ Science KMITL - Episode 5: Let’s voice your opinion. :The Dean</h3>
						<h5 >โดย พี่อ้อม รศ.ดร.อิทธิพล แจ้งชัด คณบดีคณะวิทยาศาสตร์ สจล.</h5>
						<div >
							<center>
							<a href="https://www.youtube.com/channel/UCuU-IWCmc10r4DDRnyV4y6A" class="nav-link" style=" color: #4a3608;  padding: 8%;">
							<i class="fa fa-youtube color-youtube"></i > All Video</a> </center>
						</div>

				</div>
				<div class="col-md-6 col-md-offset-2 text-right">
				<div class="embed-responsive embed-responsive-16by9">
						<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/gchO9xm8Qxs" allowfullscreen>
						</iframe>
					</div>

				</div>


			</div>
		</div>
		</br>
	</div>

	<div id="page-break" style="background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('<?php echo get_template_directory_uri(); ?>/assets/images/bangkok.jpg');">
		<div class="container">
			<h2>เพราะเราเชื่อว่า</h2>
			<h1>การศึกษา วิจัย ด้านวิทยาศาสตร์และเทคโนโลยีเป็นรากฐานที่ดีของการพัฒนาประเทศ</h1>
		</div>
	</div>
	<div class="container page-content" style "padding-top: 4rem">
		<span style="text-align:center">
			<h1>หลักสูตร</h1>
			<h4>เราจัดสอนหลักสูตรในระดับอุดมศึกษาทั้งระดับปริญญาตรี ระดับปริญญาโท และระดับปริญญาเอก</h4>
			<hr>
		</span>
		</br>
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
				<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
					<img class="card-img" src="<?php echo get_template_directory_uri(); ?>/assets/images/undergrad.png" alt="Card image">
					<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
						<div class="text-center my-auto mx-auto text-center">
							<h4 class="card-title">ปริญญาตรี</h4>
							<h5 class="card-text">จุดเริ่มต้นการพัฒนาความรู้และทักษะวิชาชีพ</h5>
							<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">รายละเอียด</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
				<div class="card card-inverse text-center" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
					<img class="card-img" src="<?php echo get_template_directory_uri(); ?>/assets/images/grad.png" alt="Card image">
					<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
						<div class="text-center my-auto mx-auto text-center">
							<h4 class="card-title">ปริญญาโท</h4>
							<h5 class="card-text">เพิ่มพูนทักษะการวิจัย ต่อยอดความรู้เฉพาะด้าน</h5>
							<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05g.php" class="btn btn-primary">รายละเอียด</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
				<div class="card card-inverse text-center" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
					<img class="card-img" src="<?php echo get_template_directory_uri(); ?>/assets/images/phd.png" alt="Card image">
					<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
						<div class="text-center my-auto mx-auto text-center">
							<h4 class="card-title">ปริญญาเอก</h4>
							<h5 class="card-text">สร้างความรู้ใหม่อย่างไร้ขีดจำกัด</h5>
							<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05g.php" class="btn btn-primary">รายละเอียด</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<div class="container page-content" style "padding-top: 4rem">
		<span style="text-align:center">
			<h1>ภาควิชาและหน่วยงาน</h1>
			<hr>
		</span>
		<div class="card-deck">
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="http://study.com/cimages/course-image/praxis-ii-chemistry-test_117894_large.jpg"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาเคมี</h4>
						<a href="http://161.246.35.182:8080/links/department/chem/" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://scienceofsingularity.files.wordpress.com/2014/04/58945-neural-cell-electricity.jpg"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาชีววิทยา</h4>
						<a href="http://161.246.35.182:8080/links/department/bio/" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.joshmatthews.net/cusec16/pictures/shutterstock_124758646-copy.jpg"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาวิทยาการคอมพิวเตอร์</h4>
						<a href="http://www.comsci.science.kmitl.ac.th/cs/" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
		</div>
		</br>
		<div class="card-deck">
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.dailywire.com/sites/default/files/styles/article_full/public/uploads/2017/08/math.jpg?itok=vlqwg76Q"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาคณิตศาสตร์</h4>
						<a href="http://www.math.sci.kmitl.ac.th" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.phys.soton.ac.uk/sites/www.phys.soton.ac.uk/files/Light1.jpg"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาฟิสิกส์</h4>
						<a href="http://physics.kmitl.ac.th/" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="http://www.diaglobal.org/en/~/media/americas/images/hero/1024x576/2017/17008-1024x576.jpg"
				 alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาสถิติ</h4>
						<a href="http://161.246.35.182:8080/links/department/Webstat59/index.html" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>



<!-- PondS 19 Jan 2018 -->
<div class="row">

    <div class="col-sm-4 offset-sm-4">
			<div class="card-deck">
				<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
					<img class="card-img" width="308px" height="180px" src="http://www.science.kmitl.ac.th/wp-content/themes/personalTheme/images/lab-2107510_1280.jpg"
					 alt="Card image">
					<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
						<div class="text-center my-auto mx-auto">
							<h4 class="card-title">ศูนย์เครื่องมือวิทยาศาสตร์</h4>
							<a href="http://www.science.kmitl.ac.th:8080/sic/index.php/CHome" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
						</div>
					</div>
				</div>
			</div>
    </div>
		</div>
</div>

</div>

	<div class="container page-content" id="personel-section" style "padding-top: 4rem">
		<span style="text-align:center">
			<h1>บุคลากร</h1>
			<hr>
		</span>
		</br>
		<div class="row">
		<div class="col align-self-center">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:10rem; height:14rem;" src="http://www.science.kmitl.ac.th/wp-content/uploads/2018/01/DSC_4805-683x1024.jpg">
					<div class="team-content">
						<h5>รศ.ดร.อิทธิพล แจ้งชัด</h5>
						<div class="border-team"></div>
						<p>คณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
				<div class="col-md-4">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:10rem; height:14rem;" src="http://www.science.kmitl.ac.th/wp-content/uploads/2018/01/DSC_4928.jpg">
					<div class="team-content">
						<!-- <h5>ผศ.ดร.อนุรักษ์ โพธิ์เอี่ยม</h5> -->
						<h5>ผศ.ดร.ปุณณมา ศิริพันธ์โนน</h5>
						<div class="border-team"></div>
						<p>รองคณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:10rem; height:14rem;" src="http://www.science.kmitl.ac.th/wp-content/uploads/2018/01/DSC_4856-683x1024.jpg">
					<div class="team-content">
						<!-- <h5>ผศ.ดร.ปุณณมา ศิริพันธ์โนน</h5> -->
						<h5>ดร.บุญญสิทธิ์ วรจันทร์</h5>
						<div class="border-team"></div>
						<p>รองคณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:12rem; height:14rem;" src="http://www.science.kmitl.ac.th/wp-content/uploads/2018/01/DSC_5232-683x1024.jpg">
					<div class="team-content">
						<!-- <h5>ดร.บุญญสิทธิ์ วรจันทร์</h5> -->
						<h5>รศ.ดร.ตะวัน สุขน้อย</h5>
						<div class="border-team"></div>
						<p>รองคณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4 offset-md-2">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:10rem; height:14rem;" src="http://161.246.35.182:8080/images/aboutImg/executive2017/4.jpg">
					<div class="team-content">
						<h5>ผศ.วิสันต์ ตั้งวงษ์เจริญ</h5>
						<div class="border-team"></div>
						<p>รองคณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
			<div class="col-md-4 ">
				<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
					<img class="card-img " style=" object-fit:cover; width:12rem; height:14rem;" src="http://www.science.kmitl.ac.th/wp-content/uploads/2018/01/DSC_5027-683x1024.jpg">
					<div class="team-content">
						<!-- <h5>รศ.ดร.ตะวัน สุขน้อย</h5> -->
						<h5>ผศ.ดร.อนุรักษ์ โพธิ์เอี่ยม</h5>
						<div class="border-team"></div>
						<p>รองคณบดีคณะวิทยาศาสตร์</p>
					</div>
				</div>
			</div>
		</div>

		<!-- <a href="http://www.science.kmitl.ac.th//index.php/CHome" class="btn btn-primary">เข้าสู่เว็บไซต์</a> -->


	</div>
</main>

<?php
	get_footer();
	?>
