import React, {Fragment} from 'react'
import { Form, FormGroup, Label, Button, Input, Container } from 'reactstrap'

const Article_form = ({submit, contentValue, contentChange, attachmentChange}) => {
    return (
        <Fragment>
        <Container className="container">
            <Form onSubmit={submit} id='form' >
                <FormGroup>
                    <Label for="content">Text</Label>
                    <Input type="textarea" name="content" placeholder="Le contenu du post" required
                    value={contentValue} onChange={contentChange} />
                    {/* <span style={{color: "red"}}>{contentError}</span> */}
                </FormGroup>
                <FormGroup>
                    <Label for="attachment"></Label>
                    <Input type="file" name="attachment" id="attachment"
                    onChange={attachmentChange} />
                    {/* <span style={{color: "red"}}>{{attachmentError}}</span> */}
                </FormGroup>
                <Button type="submit" color="secondary" size="lg" block>Publier</Button>
            </Form>
        </Container>
    </Fragment>
    )
}

export default Article_form