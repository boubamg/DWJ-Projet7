import React, { Component } from 'react'
import Comment_Form from '../Form/Comment_form'
import commentAPI from '../../Api/commentAPI'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class createComment extends Component {

    state = {
        comment: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        commentAPI.postComments(this.props.id, this.state.comment, headers)
        .then(() => console.log("Commentaire ajouté"))
        .catch(err => console.log(err))
    }

    render () {
        return (
           <Comment_Form 
            commentValue={this.state.comment}
            commentChange={this.handleChange}
            commentSubmit={this.handleSubmit}
           />
        )
    }
}

export default createComment