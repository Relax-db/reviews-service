import React from 'react';  
import HeaderStyle from './elements/HeaderStyle.js';

class Header extends React.Component{
    constructor(props) {
        super(props)
    }
    //gets rating and number of reviews as props
    //should render rating and number of reviews
    render() {
        return (
        <HeaderStyle>
           <div id = 'rating'>{this.props.rating} </div> 

           <div id = 'numReviews'>  ({this.props.numReviews} reviews) </div>
        </HeaderStyle>
        )
    }
}
export default Header;