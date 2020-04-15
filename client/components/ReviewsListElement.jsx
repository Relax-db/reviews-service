import React from 'react';
import styled from 'styled-components';
import ReviewLayout from './elements/ReviewLayout.js';
import Image from './elements/Image.js';
import ReviewHead from './elements/ReviewHead.js';
import Username from './elements/Username.js';
import moment from 'moment';

class ReviewsListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    //props: an object with review and user data
    render() {
        //renders user, userphoto, and date along with the review text
        const date_posted = this.props.review.date_posted;
        const date = moment(new Date(this.props.review.date_posted)).format(('MMMM Do YYYY, h:mm:ss a')).split(',');
        return (
            <ReviewLayout>
                <ReviewHead>

                    <Image src={this.props.review.user_avatar} />
                    <div>
                        <Username>{this.props.review.user_name}</Username>
                        <div className='date' >{date[0]}</div>
                    </div>

                </ReviewHead>
                {this.props.review.review_text}
            </ReviewLayout>
        )
    }
}

export default ReviewsListElement;