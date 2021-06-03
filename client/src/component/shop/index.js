import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import {connect} from 'react-redux';



class Shop extends Component {
    render() {
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="copntainer">
                    <div className="shop_wrapper">
                        <div className="left">
                            Left
                        </div>
                        <div className="right">
                            Right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Shop;