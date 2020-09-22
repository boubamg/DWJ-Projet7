import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Button, Input, Container } from 'reactstrap';

class createArticle extends Component {

    constructor(props){
        super(props)
        this.inputfileRef = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            errors : [],
            content: '',
        }
    }

    componentDidMount(){
        console.log(this.inputfileRef)
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.inputfileRef.value)
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({[name]: value})   
    }

    render () {
        return (
            <Fragment>
                <Container className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="content">Text</Label>
                            <Input type="textarea" name="content" placeholder="Le contenu du post" required
                            value={this.state.content} onChange={this.handleChange}/>
                            {/* <span style={{color: "red"}}>{this.state.errors["content"]}</span> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="attachment"></Label>
                            <Input type="file" name="attachment" ref={ (ref) => this.inputfileRef = ref} />
                            {/* <span style={{color: "red"}}>{this.state.errors["file"]}</span> */}
                        </FormGroup>
                        <Button type="submit" color="secondary" size="lg" block>Publier</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

export default createArticle