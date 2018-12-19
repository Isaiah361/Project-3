import React, {
    Component
} from 'react';
import "./App.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Yelp from './YelpList'

class RestaurantIndex extends Component {
    state = {
        allTheRestaurants: [],
    }
    componentWillMount() {
        this.fetchRestaurants()
        this.props.toggleRestaurantPage()
    }
    componentWillUnmount() {
        this.props.toggleRestaurantPage()
    }

    fetchRestaurants = () => {
        Axios.get(`http://localhost:5000/api/restaurants${this.props.location.search}`)
            .then((responseFromApi) => {
                  console.log(responseFromApi)
                this.setState({
                    allTheRestaurants: responseFromApi.data.obj.allTheRestaurants,
                    yelp:responseFromApi.data.obj.yelp
                })
            })
            .catch((err) => {})
    }

    showYelpRestaurants = () => {
        console.log(this.state.allTheRestaurants)
    }


    showAllRestaurants = () => {
        if (this.state.allTheRestaurants) {
            // console.log('there is a restaurant and a current user')
            const theRestaurants = this.state.allTheRestaurants.filter((eachRestaurant) => {
                return eachRestaurant.owner
            })
            return theRestaurants.map((eachRestaurant) => {
                return ( 
                // <div key={eachRestaurant._id}>
                //     <h3>{eachRestaurant.name}</h3>
                //     <h6>{eachRestaurant.description}</h6>
                //     <Link to={'/details/'+ eachRestaurant._id} >See Details</Link>
                // </div>

                <div className="yelp">
                                
                <a href='#'><img src={eachRestaurant.img}/></a>
                <div className='content'>
                    <h2>{eachRestaurant.name}</h2>
                    <p>{eachRestaurant.avgPrice}</p>
                    <p>Rating: {eachRestaurant.avgRating}</p>
                    <p>{eachRestaurant.phone}</p>
                    <p>{eachRestaurant.location}</p>
                    <Link to={'/details/'+ eachRestaurant._id} >See Details</Link>
                </div>
                </div> 
                )
            })
        }
    }
    render() {
        return (  
            
            <div id="restaurants-list">


            <div className="list-of-restaurants-container">
            {this.showAllRestaurants()}

            </div>

            <Yelp res={this.state.yelp}/>
            
            </div>
        )
    }
}
export default RestaurantIndex;