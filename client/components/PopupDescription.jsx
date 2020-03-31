import React from 'react';
import Header from './Header.jsx';
import ModalDescription from './elements/ModalDescription.js';

class PopupDescription extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ModalDescription>
              
               <div> {this.props.rating} </div>
               <div>({this.props.numReviews} reviews)</div> 
            {/* <Header rating = {this.props.rating} numReviews = {this.props.numReviews} /> */}
            </ModalDescription>
        )

        
    }
}

export default PopupDescription;