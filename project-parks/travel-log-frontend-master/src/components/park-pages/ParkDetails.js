import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ParkEdit from './ParkEdit';
// Styling Components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ParkDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEdit: false,
        };
    }

    componentDidMount(){
        // console.log(' = == = = =', this.props.match.params);
        const { params } = this.props.match;

        axios.get(`${process.env.REACT_APP_API_URL}/api/parks/${params.id}`)
        .then(responseFromApi => {
            // console.log('this is res: ', responseFromApi);
            this.setState(responseFromApi.data.park);
        })
        .catch(err => console.log(err));
    }

    handleEdit(){
        this.setState({ showEdit: true });   
    }

    handleDelete(id){
        axios.delete(`${process.env.REACT_APP_API_URL}/api/parks/${id}`)
        .then(responseFromApi => {
            this.props.history.push('/park-list'); 
        })
        .catch(err => console.log(err));
    }

    render(){
        // console.log('state of Park Details: ', this.state);
        
        const { _id, name, description, imagePark} = this.state;
        return (
            <section>
                { this.state.showEdit ? <ParkEdit thePark={ this.state } { ...this.props }  /> : (
                    <Card className={name}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={name}
                                // className={imagePark}
                                height="400"
                                img src={ imagePark } width='100'
                                title= {name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {name}
                                </Typography>
                                <Typography component="p">
                                    {description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button onClick={() => this.handleEdit()} size="small" color="primary">
                                Edit
                            </Button>
                            <Button onClick={() => this.handleDelete(_id)} size="small" color="primary">
                                Delete
                            </Button>
                        </CardActions>
                        
                    </Card>
                    
                ) }
              
                <Link to={"/park-list"}>Go to parks page </Link>
            </section>
        )
    }
}

export default ParkDetails;

