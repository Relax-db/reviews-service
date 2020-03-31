import React from 'react';
import { shallow } from 'enzyme';
import Header from '../client/components/Header.jsx';


test('Renders average ratings', () => {
    const wrapper = shallow(
        <Header rating ={ '4.5'}
        numReviews = {34} />
    )
    expect(wrapper.find('#avg_rating').text()).toEqual('4.5');

})


test('Renders number of ratings', () => {
    const wrapper = shallow(
        <Header rating ={ '4.5'}
        numReviews = {'34'} />
    )
    expect(wrapper.find('numRatings').text()).toEqual('34');

})