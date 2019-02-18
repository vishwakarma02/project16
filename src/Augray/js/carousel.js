//importing assets for owl carousel
import 'owl.carousel2/dist/assets/owl.carousel.min.css';
import 'owl.carousel2/dist/assets/owl.theme.default.min.css';
import 'owl.carousel2/dist/owl.carousel.min.js';




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