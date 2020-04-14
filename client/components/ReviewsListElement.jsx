import React from 'react';
import styled from 'styled-components';
import ReviewLayout from './elements/ReviewLayout.js';
import Image from './elements/Image.js';
import ReviewHead from './elements/ReviewHead.js';
import Username from './elements/Username.js';

class ReviewsListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    //props: an object with review and user data
    render() {
        //renders user, userphoto, and date along with the review text
        const date = this.props.review.date_posted;
        const strDate = date.toDateString();
        return (
            <ReviewLayout>
                <ReviewHead>

                    <Image src={this.props.review.user_avatar} />

                    <div>
                        <Username>{this.props.review.user_name}</Username>
                        <div className='date' >{strDate}</div>
                    </div>

                </ReviewHead>
                {/* <div className = 'review_text'> */}
                {this.props.review.review_text};
            {/* </div> */}
            </ReviewLayout>
        )
    }
}

export default ReviewsListElement;