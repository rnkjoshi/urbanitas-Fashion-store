import React, { Component } from 'react';
import Zoom from 'react-reveal';
import MyButton from './button';
class Card extends Component {
    // renderCardImage(images){
    //     if(images.length>0){
    //         return images[0].url
    //     }else{
    //         return '/images/image_not_available.png'
    //     }
    // }
    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
               <Zoom cascade>
               <div className="image"
                style={{
                    background:`url('/images/featured/no_image_available.png') no-repeat`
                }}>
                </div>
                <div className="action_container">
                    <Zoom cascade>
                    <div className="tags">
                        <div className="brand">{props.title}</div>
                        <div className="name">{props.description}</div>
                        <div className="name">{props.price} ₹</div>
                    </div>
                    </Zoom>
                </div>
                <div className="actions">
                    <div className="button_wrapp">
                        <MyButton
                        type="default"
                        altClass="card_link"
                        title="View Product"
                        linkTo={`/product_details/${props._id}`}
                        addStyles={{
                            margin:'10px 0 0 0',
                            borderRadius:'20px'
                        }}
                        />
                    </div>
                    <div className="button_wrap">
                        <MyButton
                        type="bag_link"
                        runAction={()=>{
                            console.log("add to Cart")
                        }}
                        addStyles={{
                            margin:'10px 0 0 0',
                            borderRadius:'50%'
                        }}
                        />
                    </div>
                </div>
               </Zoom>
            </div>
        );
    }
}

export default Card;