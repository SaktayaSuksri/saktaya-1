<?php 
	get_header();
	
	//Template Name:About
	?>
	
	<main role="main">

<div id="header-carousel" class="carousel slide" data-ride="carousel">
	<ol class="carousel-indicators">
		<li data-target="#header-carousel" data-slide-to="0" class="active"></li>
		<li data-target="#header-carousel" data-slide-to="1"></li>
		<li data-target="#header-carousel" data-slide-to="2"></li>
	</ol>
	<div class="carousel-inner">
		<div class="carousel-item active">
			<img class="first-slide d-block img-fluid" style="object-position: 50% 50%;
			object-fit: scale-down" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel1.png" alt="First slide">
			<div class="container">
				<div class="carousel-caption" id="banner">
					<h1>
						ก้าวสู่ยุคใหม่ คณะวิทยาศาสตร์2
					</h1>
					<p>
					</p>
				</div>
			</div>
		</div>
		<div class="carousel-item">
			<img class="second-slide d-block img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel2.png" alt="Second slide">
			<div class="container">
				<div class="carousel-caption text-left">
					<h1>
						<span>มุ่งเป็นสถาบันแนวหน้าในเอเชีย ด้านวิทยาศาสตร์และเทคโนโลยี</span>
					</h1>
					<div class="carousel-text">
						มุ่งมั่นให้การศึกษาและวิจัย เพื่อผลิตทรัพยากรมนุษย์ที่มีความรู้ทางด้านวิทยาศาสตร์และเทคโนโลยี ควบคู่จริยธรรม และรักษาไว้ซึ่งศิลปวัฒนธรรมอันดีของประเทศ
					</div>
				</div>
			</div>
		</div>
		<div class="carousel-item">
			<img class="third-slide d-block img-fluid" src="<?php echo get_template_directory_uri(); ?>/assets/images/carousel3.png" alt="Third slide">
			<div class="container">
				<div class="carousel-caption text-left">
					<h1>
						<span>ผลิตบัณฑิตที่มีคุณภาพเพื่อตอบสนองความต้องการของประเทศ</span>
					</h1>
					<div class="carousel-text">
						สร้างบัณฑิตเพื่อตอบสนองต่อการพัฒนาด้านอุตสาหกรรมและ เศรษฐกิจของประเทศ โดยคำนึงถึงคุณภาพชีวิตและสิ่งแวดล้อมที่ดีเป็นสำคัญ
					</div>
				</div>
			</div>
		</div>
	</div>
	<a class="carousel-control-prev" href="#header-carousel" role="button" data-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="carousel-control-next" href="#header-carousel" role="button" data-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</div>
<!-- 
<div class="container content-row page-content">
	<h2>ข่าวประชาสัมพันธ์</h2>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-items-stretch">
			<div class="card card-block h-100" style="height:100%">
				<img class="card-img-top d-xs-none d-sm-block d-md-block" src="http://www.science.kmitl.ac.th/images/slideshow/December2017/29th%20Anniversary.jpg"
					alt="Card image cap">
				<div class="card-body">
					<h4 class="card-title">ประมวลภาพวันคล้ายวันสถาปนา คณะวิทยาศาสตร์</h4>
					<p class="card-text">วันศุกร์ที่ 8 ธันวาคม 2560 ณ หอประชุมจุฬาภรณวลัยลักษณ์</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
	</div>
	<div class="row h-100 align-items-stretch">
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
			<div class="card card-block h-100" style="height:100%">
				<img class="card-img-top d-xs-none d-sm-none d-md-none" src="http://www.science.kmitl.ac.th/images/slideshow/November2017/%E0%B8%99.%E0%B8%AA.%20%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%8A%E0%B8%B8%E0%B8%94%E0%B8%B2%20%E0%B8%A0%E0%B8%B1%E0%B8%97%E0%B8%A3%E0%B8%81%E0%B8%B8%E0%B8%A5%E0%B8%8A%E0%B8%B1%E0%B8%A2.jpg"
					alt="Card image cap">
				<div class="card-body">
					<h4 class="card-title">นักศึกษาระดับบัณฑิตศึกษา คณะวิทยาศาสตร์ได้รับรางวัลชมเชย (งานวิจัยดีเด่น)</h4>
					<p class="card-text">นางสาววิชชุดา ภัทรกุลชัย นักศึกษาระดับบัณฑิตศึกษา หลักสูตร วท.ม.เทคโนโลยีชีวภาพ ภาควิชาชีววิทยา
						คณะวิทยาศาสตร์ ได้รับรางวัลชมเชย (งานวิจัยดีเด่น) จากผลงานทางวิชาการเรื่อง "การเพิ่มปริมาณยีนดื้อยาของเชื้อวัณโรคด้วยวิธีมัลติเพล็กซ์พีซีอาร์
						(Drug-Resistant Gene Amplification in Mycobacterium tuberculosis by Multiplex PCR Method)"</p>

				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
			<div class="card card-block h-100">
				<img class="card-img-top d-xs-none d-sm-none d-md-none" src="http://www.science.kmitl.ac.th/images/slideshow/November2017/KPN.jpg"
					alt="Card image cap">
				<div class="card-body">
					<h4 class="card-title">คณะวิทยาศาสตร์ ร่วมกับ KPN โครงการ KMITL Pre-TCAS 2018</h4>
					<p class="card-text">คณะวิทยาศาสตร์ ร่วมเป็นพยานในพิธีลงนามบันทึกข้อตกลงความร่วมมือ (MOU) และเปิดโครงการ KMITL Pre-TCAS
						2018 ระหว่าง KPN Academy กับ KMITL ทำ online test ชิงรางวัลมากมาย
					</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
		<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" style="margin-top:1rem">
			<div class="card card-block h-100">
				<img class="card-img-top d-xs-none d-sm-none d-md-none " src="http://www.science.kmitl.ac.th/images/slideshow/November2017/U.jpg"
					alt="Card image cap">
				<div class="card-body">
					<h4 class="card-title">งานกีฬาคณะวิทยาศาสตร์ สจล. “วิดย๊า..วิดยา ครั้งที่ ๑๓</h4>
					<p class="card-text">งานกีฬาคณะวิทยาศาสตร์ สจล. “วิดย๊า..วิดยา ครั้งที่ ๑๓ สนามกีฬา
					</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
	</div>


	<br>
	<div class="text-center">
		<a href="#" class="btn btn-primary">ดูข่าวทั้งหมด</a>
	</div>
</div> -->

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
		<h1>ภาควิชา</h1>
		<hr>
	</span>
	<div class="card-deck">
		<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="http://study.com/cimages/course-image/praxis-ii-chemistry-test_117894_large.jpg" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาเคมี</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://scienceofsingularity.files.wordpress.com/2014/04/58945-neural-cell-electricity.jpg" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาชีววิทยา</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.joshmatthews.net/cusec16/pictures/shutterstock_124758646-copy.jpg" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาวิทยาการคอมพิวเตอร์</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
	</div>
	</br>
	<div class="card-deck">
	<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.dailywire.com/sites/default/files/styles/article_full/public/uploads/2017/08/math.jpg?itok=vlqwg76Q" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาคณิตศาสตร์ประยุกต์</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="https://www.phys.soton.ac.uk/sites/www.phys.soton.ac.uk/files/Light1.jpg" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาฟิสิกส์ประยุกต์</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
					</div>
				</div>
			</div>
			<div class="card card-inverse text-center align-middle" style="margin-top:1rem; background: rgba(39, 39, 39, 0.664); border-color: #333;">
				<img class="card-img" width="308px" height="180px" src="http://www.diaglobal.org/en/~/media/americas/images/hero/1024x576/2017/17008-1024x576.jpg" alt="Card image">
				<div class="card-img-overlay d-flex" style="background:rgba(39, 39, 39, 0.664); color: white">
					<div class="text-center my-auto mx-auto">
						<h4 class="card-title">ภาควิชาสถิติประยุกต์</h4>
						<a href="http://www3.reg.kmitl.ac.th/curriculum/faculty05b.php" class="btn btn-primary">เข้าสู่เว็บไซต์</a>
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
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/1.jpg">
				<div class="team-content">
					<h5>รศ.ดร.อิทธิพล แจ้งชัด</h5>
					<div class="border-team"></div>
					<p>คณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/2.jpg">
				<div class="team-content">
					<h5>ผศ.ดร.ปุณณมา ศิริพันธ์โนน</h5>
					<div class="border-team"></div>
					<p>รองคณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/3.jpg">
				<div class="team-content">
					<h5>ดร.บุญญสิทธิ์ วรจันทร์</h5>
					<div class="border-team"></div>
					<p>รองคณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/4.jpg">
				<div class="team-content">
					<h5>ผศ.วิสันต์ ตั้งวงษ์เจริญ</h5>
					<div class="border-team"></div>
					<p>รองคณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/5.jpg">
				<div class="team-content">
					<h5>รศ.ดร.ตะวัน สุขน้อย</h5>
					<div class="border-team"></div>
					<p>รองคณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="team-img rounded-corner border thumbnail text-center" style="margin:1rem; padding-top:1rem;">
				<img class="card-img " style=" object-fit:cover; width:10rem; height:10rem;" src="http://www.science.kmitl.ac.th/images/aboutImg/executive2017/6.jpg">
				<div class="team-content">
					<h5>ผศ.ดร.อนุรักษ์ โพธิ์เอี่ยม</h5>
					<div class="border-team"></div>
					<p>รองคณบดีคณะวิทยาศาสตร์</p>
				</div>
			</div>
		</div>
	</div>
</div>
</main>

	<?php 
	get_footer();
	?>