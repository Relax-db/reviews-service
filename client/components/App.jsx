import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Header from './Header.jsx';
import axios from 'axios';
import styled from 'styled-components';
import Button from './elements/button.js';
import Modal from './elements/Modal.js';
import Popup from './Popup.jsx'
import Reviews_List from './elements/reviews_list.js';

class App extends React.Component {
    constructor(props) {
        super(props);
   
    
        this.state = {
            rating : 0, 
            showModal : false,
            reviews : [
                {
                    "id": 0,
                    "review_text": "",
                    "rating": 0,
                    "date_posted": "",
                    "user_id": 0,
                    "listings_id": 0,
                    "name": "",
                    "photo": ""
                }],
            currentReviews: []
        }
        this.getListing = this.getListing.bind(this);
        this.showAllReviews = this.showAllReviews.bind(this);
        this.getRating = this.getRating.bind(this);
        this.hideAllReviews = this.hideAllReviews.bind(this);
        this.getFirstSixReviews = this.getFirstSixReviews.bind(this);
    };

    componentDidMount() {
        this.getListing();
 
        this.getFirstSixReviews();
        this.getRating();
;
    };

    getListing() {
       axios.get('http://localhost:2500/onelisting')
       .then((response) => {
           
           this.setState({
               reviews : response.data,
               rating : this.getRating(response.data),
               currentReviews : response.data.slice(0,6),
               
           });
       })
       .catch((error) => {console.log(error + ' retrieving listing at app.jsx')} )

    };

    getRating(arr){
        var sum = 0;
        var avg = 0;
        if (arr != undefined) {
        for(var i = 0; i < arr.length; i++){
            sum += arr[i].rating;
        }
        avg = sum / arr.length;

    } 
  
    return avg.toFixed(2);

    };

    getFirstSixReviews() {

        const firstSix = this.state.reviews.slice(0,7);
        this.setState({currentReviews : firstSix })
        
    } ;

    showAllReviews(){
        this.setState({showModal : true});
        
   
    } ;

    hideAllReviews(){
        this.setState({showModal: false});
    };

    render(){
      return (
     <div key={1}>
         <Popup show={this.state.showModal} showAllReviews = {this.showAllReviews} hideAllReviews = {this.hideAllReviews} reviews = {this.state.reviews} rating = {this.state.rating} numReviews = {this.state.reviews.length} />
         <Header rating = {this.state.rating} numReviews = {this.state.reviews.length}/>
    

    
          
         <ReviewsList reviews ={this.state.currentReviews}/>

         <Button onClick = {()=>{this.showAllReviews()}}> Show All {this.state.reviews.length} Reviews </Button>
    </div>
      )

    }
}

//should render 1 Header component, 1 searchBar component, and one ReviewsList component

//on component did mount get a random listing and then pull the first
//5 reviews from that 



export default App;