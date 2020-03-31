import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../client/components/Popup.jsx';
import PopupDescription from '../client/components/PopupDescription';
import PopupReviewsList from '../client/components/PopupReviewsList';

test('Should render PopupDescription component', () => {
    const wrapper = shallow (
        <Popup />
    )
    expect(wrapper.find(PopupDescription)).toExist();
}) 

test('Should render PopupReviewsList component' , () => {
    const wrapper = shallow (
        <Popup />
    )
    console.log(wrapper);
    expect(wrapper.find(PopupReviewsList)).toExist();
})