import React, { Component } from 'react';
import HomeSlider from './home_slider';
import {connect} from 'react-redux';
import {getProductsBySell,getProductByArrival} from '../../actions/product_actions';
import CardBlock from '../utils/card_block';

class Home extends Component{
    componentDidMount(){
        this.props.dispatch(getProductsBySell());
    }
    render(){
    return (
        <div>
            <HomeSlider />
            <CardBlock list={this.props.products.bySell}
            title="Best Selling" />
        </div>
    );
    }
}
const mapStateToProps = (state) => {
    return {
        products:state.dresses
    }
}
export default connect(mapStateToProps)(Home);