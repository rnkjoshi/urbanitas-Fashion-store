import React, { Component } from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';
class HomeSlider extends Component {
    state = {
        hover:false
    }
    
    toggleHover = () => {
        //console.log("hover "+this.state.hover)
        this.setState(()=>
            this.state.hover = !this.state.hover
            )
    }
    render(){
        const slides = [
            {
                img:'/images/featured/featured_home_2.png',
                lineOne:'Denim',
                lineTwo:'Custom Shop',
                linkTitle:'Shop now',
                linkTo:'/shop'
            },
            {
                img:'/images/featured/featured_home_3.jpg',
                lineOne:'Western',
                lineTwo:'the way you like',
                linkTitle:'Shop now',
                linkTo:'/shop'
            },
            {
                img:'/images/featured/featured_home.png',
                lineOne:'Traditionals',
                lineTwo:'Awesome discount',
                linkTitle:'Shop now',
                linkTo:'/shop'
            }
        ]
    
        const settings = {
            dots:false,
            infinite:true,
            speed:500,
            slidesToShow:1,
            slidesToScroll:1,
            arrows:false
        }
        let styling = {
            display:'block',
            margin:'10px 0 0 0',
            borderRadius:'5px',
            transition:'linear .2s',
            width:'70px'
        }
        if (this.state.hover) {
            styling = {...styling ,color:'white',cursor: 'pointer',transform:'scale(1.1)', background:'rgba(0,0,0,0.2)',
        border:'1px solid black'}
        } else {
            styling = {...styling}
        }
        const generateSlides = () => (
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                    style = {{
                        background:`url(${item.img})`,
                        height:`${window.innerHeight+100}px`,
                        width:`${window.innerWidth}px`
                    }}>
                        
                        <div className="featured_action">
                            <div className="tag title">
                                {item.lineOne}
                            </div>
                            <div className="tag low_title">
                                {item.lineTwo}
                            </div>
                            <div style={{width:'70px'}} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                                <MyButton type="default"
                                title={item.linkTitle}
                                linkTo={item.linkTo}
                                addStyles={styling}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )
        return (
            <div className="featured_container">
                <Slider {...settings}>
                    {generateSlides()}
                </Slider>
            </div>
        );
    }
}

export default HomeSlider;