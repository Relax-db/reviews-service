import React from 'react';
import ReviewsListElement from './ReviewsListElement.jsx';
import ModalList from './elements/ModalList.js';


class PopupReviewsList extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        //renders a single file list of all of the reviews for the current listing,
        //the list scrolls in place
     return (
         <ModalList id ="popUpReviews">
         {this.props.reviews.map((review) => (
             <ReviewsListElement key={Math.random()} review = {review}/>)
         )}
        </ModalList>
     )
      }

    }

    export default PopupReviewsList;