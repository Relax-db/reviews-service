import React from 'react';
import { shallow } from 'enzyme';
import ReviewsList from '../client/components/ReviewsList.jsx';
import ReviewsListElement from '../client/components/ReviewsListElement.jsx';
const sampleData = 
[
    {
        "id": 80,
        "review_text": "instruction set Granite silver redefine solid state secondary Gorgeous Licensed Granite Soap deposit Paradigm Fantastic Steel Shoes XSS",
        "rating": 1,
        "date_posted": "Sat Mar 03 2018",
        "user_id": 80,
        "listings_id": 29,
        "name": "Oscar Rohan",
        "photo": "https://loremflickr.com/320/240"
    },
    {
        "id": 30,
        "review_text": "Iowa Wooden TCP niches Riel Papua New Guinea",
        "rating": 5,
        "date_posted": "Sun Aug 30 2015",
        "user_id": 30,
        "listings_id": 23,
        "name": "Abigale Ondricka",
        "photo": "https://loremflickr.com/320/240"
    },
    {
        "id": 20,
        "review_text": "Clothing multi-byte invoice Accounts Persevering firewall vortals Accounts Communications",
        "rating": 4,
        "date_posted": "Mon Aug 15 2005",
        "user_id": 20,
        "listings_id": 24,
        "name": "Kari Gaylord",
        "photo": "https://loremflickr.com/320/240"
    },
    {
        "id": 92,
        "review_text": "Unbranded Frozen Fish B2C pixel Automated auxiliary evolve Hills invoice Facilitator Functionality Tools Meadows Handcrafted copy Ball",
        "rating": 1,
        "date_posted": "Sat Mar 19 2016",
        "user_id": 92,
        "listings_id": 89,
        "name": "Modesta Lockman",
        "photo": "https://loremflickr.com/320/240"
    },
    {
        "id": 39,
        "review_text": "Flats Automotive Credit Card Account orchid Investment Account US Dollar Unbranded Metal Soap Engineer Hawaii Chief",
        "rating": 4,
        "date_posted": "Fri Mar 25 1983",
        "user_id": 39,
        "listings_id": 39,
        "name": "Monique Hyatt",
        "photo": "https://loremflickr.com/320/240"
    },
    {
        "id": 33,
        "review_text": "deliverables ubiquitous Steel auxiliary Checking Account firewall Towels Handcrafted Metal Towels Agent gold solutions channels Assistant Savings Account EXE withdrawal ADP connect",
        "rating": 5,
        "date_posted": "Fri Feb 10 1978",
        "user_id": 33,
        "listings_id": 56,
        "name": "Darlene Torphy",
        "photo": "https://loremflickr.com/320/240"
    }
]

test('Should render 6 ReviewsListElement components', () => {
    const wrapper = shallow(
        <ReviewsList
        reviews = {sampleData}
        />
    )

    expect(wrapper.find(ReviewsListElement)).toHaveLength(6);

})
