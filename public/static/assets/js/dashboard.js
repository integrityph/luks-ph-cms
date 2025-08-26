const services = document.getElementById('services');
services.innerHTML = ``;
fetch('/uadmin/api/d/category/read')
  .then(response => response.json()) // Parse the response body as JSON
  .then(data => data.result.map((category, index) => {
    if (index < 3) {
      services.innerHTML += `
        <div class="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
          <div class="services-one__single">
            <div class="services-one__single-inner">
              <div class="services-one__shape-1">
                <img src="../../static/assets/images/shapes/services-one-shape-1.png" alt="">
              </div>
              <div class="services-one__shape-2">
                <img src="../../static/assets/images/shapes/services-one-shape-2 4.png" alt="">
              </div>
              <div class="services-one__img-box">
                <div class="services-one__img">
                  <img src="`+ category.Icon +`" alt="">
                </div>
                <div class="services-one__icon">
                  <span class="icon-facial-mask"></span>
                </div>
              </div>
              <h3 class="services-one__title"><a href="/1Royal-NailCare/">`+ category.Name +`
              </a></h3>
              <p class="services-one__text"></p>
              <div class="services-one__btn-box">
                <a href="/service_offered?id=`+ category.ID +`" class="services-one__btn">Book now<i class="icon-right-arrow"></i></a>
              </div>
            </div>
          </div>
        </div>
      `
    }
  })) // Work with the fetched data
  .catch(error => console.error('Error:', error)); // Handle any errors