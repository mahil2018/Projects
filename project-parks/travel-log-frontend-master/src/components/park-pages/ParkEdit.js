import React, { Component } from 'react';
import axios from "axios";



class ParkEdit extends Component {
    constructor(props){
        super(props);
        console.log('please show props: ',this.props)
        const { name, description, imagePark } = this.props.thePark;
        this.state = {
            name,
            description,
            imagePark
        };
    }

     // for all fields except images and specs
     genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleSubmit(event) {
        event.preventDefault();

        axios.put(
            `${process.env.REACT_APP_API_URL}/api/parks/${this.props.thePark._id}`,
          this.state,
          { withCredentials: true } // FORCE axios to send cookies across domains
        )
          .then(response => {
            //   instead of using <Redirect /> we use this.props.history.push()
            this.props.history.push('/park-list'); 
          })
          .catch(err => {
            console.log("Update Park ERROR", err);
            alert("Sorry! Something went wrong.");
          });
      }

    render(){
        const { name, description, imagePark} = this.state;
        return (
            <section>
                <h2>Edit { name }</h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Name: </label>
                    <input 
                        value={ name }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="name" 
                    />

                    <label> Description: </label>
                    <input 
                        value={ description }
                        onChange={event => this.genericSync(event)}
                        type="text" 
                        name="description" 
                    />

                    {/* <label> Image: </label>
                    <input
                        onChange={ event => this.uploadImage(event) }
                        type="file"   
                    />
                    <br /> */}
                    <img src={ imagePark } width="200"/>

                    <br />
            
                    <button> Save </button>
                    
                </form> 

            </section>
        )
    }
}

export default ParkEdit;