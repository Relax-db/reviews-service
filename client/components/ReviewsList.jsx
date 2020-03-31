import React from 'react';
import ReviewsListElement from './ReviewsListElement.jsx';
import Reviews_List from './elements/reviews_list.js';
class ReviewsList extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
       
    }
    render(){
        return (
            <Reviews_List>
            {this.props.reviews.map((review) => 
                (
                <ReviewsListElement key={Math.random()} review = {review} />))}
            </Reviews_List>
        )
    }
}
export default ReviewsList;