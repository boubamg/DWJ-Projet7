import React, {Fragment} from "react";
import API from '../../Api/userAPI'
import { Redirect } from 'react-router-dom'
import { Card, Container, Row, Col } from "reactstrap";
import Button from '@material-ui/core/Button';
import './Profile.css'

import UpdateProfileForm from './updateProfile'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class Profile extends React.Component {

    state = {
        user: {},
        redirect: false
    }

  componentDidMount() {
    // document.documentElement.scrollTop = 0;
    // document.scrollingElement.scrollTop = 0;
    // this.refs.main.scrollTop = 0;
    
    API.getProfile(headers)
    .then(user => {
        this.setState({
            user: user.data
        })
        console.log(this.state.user)
    })
    .catch(err => console.log(err))
  }

  handleDelete = () => {
    API.deleteAccount(headers)
    .then(() => {
        console.log("Account was deleted")
        localStorage.clear()
        this.setState({redirect: true})
    })
    .catch(err => {
        console.log(err)
    })
}

  render() {

    const {profilePicture, firstname, lastname, biography, email, redirect} = this.state.user

    if(!localStorage.getItem('token')){
        return <Redirect to='/' />
    }

    if(redirect){
        return <Redirect to='/' />
    }

    return ( 
      <Fragment>
       
        <main className="profile-page mb-5" ref="main">
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a  onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={profilePicture}
                          /> </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                    </Col>
                    
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {lastname}  {' '}  {firstname}
                    </h3>
            
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {email}
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                         {biography}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <UpdateProfileForm /> 
                <Button variant="contained" color="secondary" onClick={this.handleDelete}>
                  Supprimer le compte
                </Button>
              </Card>
            </Container>
          </section>
          
        </main>
      </Fragment>  
    );
  }
}

export default Profile;
