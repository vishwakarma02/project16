import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'normalize.css';
import '../../css/common.scss';
import '../../css/projectPages.scss';
import '../css/augray.scss';
import 'rellax';
import dance from '../../js/dance';

window.onload =() => {
    dance();
    var rellax = new Rellax('.rellax', {
        center: true
      });

    jQuery('.augray-impression__screens').owlCarousel({
        margin:16,
        loop:false,
        autoWidth: true,
        items:1,
        responsive: {
            768: {
                items: 2
            },
            992: {
                items :3,
                autoWidth: false,
            }
        }
    })
}