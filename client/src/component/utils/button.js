import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const MyButton = (props) => {
    const buttons = () =>{
            let template = '';
            //console.log("entered function="+props.type);
            switch(props.type){
                case "default":
                    //console.log("button found.");
                    template = <Link 
                    className={!props.altClass ?'link_default':props.altClass}
                    to={props.linkTo}
                    style={{...props.addStyles}}
                    >
                        {props.title}
                        {/* {console.log(props.title)} */}
                    </Link>
                break;
                case "bag_link":
                    template = 
                    <div className="bag_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                        style={{...props.addStyles}}
                    >
                         <FontAwesomeIcon
                            icon={faShoppingBag}
                        />
                    </div>
                break;
                default:
                    template='';
            }
            return template;
    }
    
    return (
        <div className="my_link">
            {buttons()}
            {/* {console.log(props.title)} */}
        </div>
    );
};

export default MyButton;