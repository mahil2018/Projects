import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import axios from "axios";

class ParkAdd extends Component {
       constructor(props){
           super(props);
           this.state = {
               name: "",
               description: "",
               imagePark: "",
               isSubmitSuccessful: false,
           };
       } 

       // for all fields except images and specs
        genericSync(event) {
            const { name, value } = event.target;
            this.setState({ [name]: value });
        }

        uploadImage(event){
            // console.log("upload image: ", event.target.files);
            const { files } = event.target;    
            const uploadData = new FormData();

            uploadData.append("submittedFile", files[0]);

            axios.post(
                `${process.env.REACT_APP_API_URL}/api/upload/file`,
                uploadData,
                { withCredentials: true }
            )
            .then( response  => this.setState({ imagePark:response.data.fileUrl }))
            .then( response => {
                console.log('The response from the server is: ',response )
                this.setState({ imagePark: response.data }) })
            .catch( err => console.log(err) );
        }


        handleSubmit(event){
            event.preventDefault();

            axios.post(
                `${process.env.REACT_APP_API_URL}/api/parks`,
                this.state,
                { withCredentials: true }
            )
            .then( response => {
                console.log("new park: ", response.data);
                this.setState({ isSubmitSuccessful: true })
            } )
            .catch( err => console.log(err) );
        }


       render(){
            if(!this.props.currentUser){
                return <Redirect to='login-page'/>
            }
           if(this.state.isSubmitSuccessful){
               return <Redirect to='/park-list'/>
           }
           return(
               <section>
                   <h2> Add a Park </h2>
                   <form onSubmit={ e => this.handleSubmit(e) } >
                       <label> Name: </label>
                       <input 
                            value = { this.state.name }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "name"
                            placeholder = ""
                        />

                        <label> Description: </label>
                        <input 
                            value = { this.state.description }
                            onChange={ e => this.genericSync(e) }
                            type = "text"
                            name = "description"
                            placeholder = ""
                        />


                        <label> Image: </label>
                        <input 
                            onChange={ e => this.uploadImage(e) }
                            type= "file"
                        />
                        <br />
                        <img width="200"  src={ this.state.imagePark } />

                        <button> Save </button>

                   </form>
               </section>
           )
       }

}


export default ParkAdd;