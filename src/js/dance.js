function dance(){
    //getting all dancing element with classname of .dance
    let dancingElement = document.querySelectorAll('.dance');
    let screenHeight = window.innerHeight;

    window.addEventListener('mousemove', (e)=>{
        let horizontal = e.pageX;
        let vertical = e.pageY;
        dancingElement.forEach(el=>{
            el.style.transform = "translateX("+(-horizontal/80)+"px) translateY("+(-vertical/80)+"px)";
        })
    })


    // window.onscroll = () => {
    //     dancingElement.forEach(el=>{
    //         if((parseInt(el.getBoundingClientRect().y) < screenHeight) && (parseInt(el.getBoundingClientRect().y) > 1)){
    //             console.log('scrolling');
    //         }
    //     })
    // }
}

export default dance;