import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/components/App.jsx';


// import { TestScheduler } from 'jest';


const sampleReviews = 
    [
        {
            "id": 19,
            "review_text": "Liaison implement upward-trending PNG Swedish Krona hacking Idaho",
            "rating": 4,
            "date_posted": "Thu Apr 15 1999",
            "user_id": 19,
            "listings_id": 83,
            "name": "Giovanna Gutkowski"
        },
        {
            "id": 45,
            "review_text": "Communications Dynamic Facilitator",
            "rating": 1,
            "date_posted": "Thu Sep 20 2012",
            "user_id": 45,
            "listings_id": 32,
            "name": "Cody Friesen"
        },
        {
            "id": 64,
            "review_text": "incentivize concept Corners Bacon Corporate help-desk",
            "rating": 2,
            "date_posted": "Thu May 09 1985",
            "user_id": 64,
            "listings_id": 42,
            "name": "Harrison McClure"
        }
    ]
//should render 1 Header component, 1 searchBar component, 
//and one ReviewsList component


test('should render App component', () => {
  const wrapper = shallow( 
      <App />
  );
    expect(wrapper).toExist();
});
test('should invoke showAllReviews when show all button is clicked', () => {
    const wrapper = shallow(<App/>);
    const mock = jest.fn();
    wrapper.instance().showAllReviews = mock;
    wrapper.instance().forceUpdate();
   const showAllButton = wrapper.find('button');
   console.log(wrapper.find('button'))
   showAllButton.simulate('click');
    expect(mock).toHaveBeenCalled();
    
})

// test('should invoke getListing and getFirstFiveReviews() on componentDidMount()', () => {
//     const wrapper = shallow(<App/>);
//     const mock = jest.fn();
//     wrapper.instance().getListing = mock;
//     wrapper.instance().forceUpdate();
//     wrapper
//       .instance()
//       .componentDidMount();
//     expect(mock).toHaveBeenCalled();
    
// })
// test('should invoke getFirstFiveReviews() on componentDidMount()', () => {
//     const wrapper = shallow(<App/>);
//     const mock = jest.fn();
//     wrapper.instance().getFirstFiveReviews = mock;
//     wrapper.instance().forceUpdate();
//     wrapper
//       .instance()
//       .componentDidMount();
//     expect(mock).toHaveBeenCalled();
// })
