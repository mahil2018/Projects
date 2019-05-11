import React, { Component } from "react";
import '../index.css';
import ParkHeader from '../styles/img/MountRushmore.jpg';
import Carousel from 'react-bootstrap/Carousel'

class Home extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleSelect = this.handleSelect.bind(this);
  
      this.state = {
        index: 0,
        direction: null,
      };
    }
  
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
  
    render() {
      const { index, direction } = this.state;
  
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <img
              className="img-slider"
              src="https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/09/main/lower-yellowstone-falls.jpg"
              alt="Yellowstone"
            />
            <Carousel.Caption>
            <button type="button" class="btn btn-success">Plan Your Visit</button>
            <button type="button" class="btn btn-success">Learn and Explore</button>
            <button type="button" class="btn btn-success">Get Involved</button>
              

            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-slider"
              src="https://www.sunset.com/wp-content/uploads/yosemite-wildfire-closures-getty-0918-900x500.jpg"
              alt="Yosemite"
            />
  
            <Carousel.Caption>
            <button type="button" class="btn btn-success">Plan Your Visit</button>
            <button type="button" class="btn btn-success">Learn and Explore</button>
            <button type="button" class="btn btn-success">Get Involved</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-slider"
              src="https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2016/06/main/mountain-lake.jpg"
              alt="Glaciard"
            />
  
            <Carousel.Caption>
            <button type="button" class="btn btn-success">Plan Your Visit</button>
            <button type="button" class="btn btn-success">Learn and Explore</button>
            <button type="button" class="btn btn-success">Get Involved</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }
  }
  
  export default Home;


