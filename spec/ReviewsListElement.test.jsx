import React from 'react';
import { shallow } from 'enzyme';
import ReviewsListElement from '../client/components/ReviewsListElement.jsx';
import { TestScheduler } from 'jest';



const sampleData = 
    {
        "id": 80,
        "review_text": "instruction set Granite silver redefine solid state secondary Gorgeous Licensed Granite Soap deposit Paradigm Fantastic Steel Shoes XSS",
        "rating": 1,
        "date_posted": "Sat Mar 03 2018",
        "user_id": 80,
        "listings_id": 29,
        "name": "Oscar Rohan",
        "photo": "https://loremflickr.com/320/240"
    }

test('Should render user', () => {
    const wrapper = shallow(
        <ReviewsListElement review = {sampleData} />
    )
    expect(wrapper.find('user')).toEqual('Oscar Rohan');

})

test('Should render userPhoto', () => {
    const wrapper = shallow(
        <ReviewsListElement review = {sampleData} />
    )
    expect(wrapper.find('userPhoto')).toEqual("https://loremflickr.com/320/240");
})

test('Should render date', () => {
    const wrapper = shallow(
        <ReviewsListElement review = {sampleData} />
    )
    expect(wrapper.find('date')).toEqual("Sat Mar 03 2018");
})

test('Should render revuew_text', () => {
    const wrapper = shallow(
        <ReviewsListElement review = {sampleData} />
    )
    expect(wrapper.find('review_text')).toEqual("instruction set Granite silver redefine solid state secondary Gorgeous Licensed Granite Soap deposit Paradigm Fantastic Steel Shoes XSS");
})