import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Segment,
  Button,
  Form,
  Input,
  Header as SemanticHeader,
} from 'semantic-ui-react'

const Header = props => {
  const [workspace, setWorkspace] = useState('')

  return (
    <header id="header" style={props.timeout ? { display: 'none' } : {}}>
      <Container textAlign="center">
        <SemanticHeader as="h1" className="main-heading">
          Collaborate Fast | No Authentication | Easy Sharing
        </SemanticHeader>
        <p style={{ margin: '0px 15em 30px' }}>
          Create a workspace and access it anywhere at anytime. Upload
          screenshots, paste long links, and easily reference them from one
          place. Try it!
        </p>
        <div className="segment-container">
          <SemanticHeader as="h3" attached="top" className="segment-heading">
            Create a workspace or join an existing one
          </SemanticHeader>
          <Segment textAlign="center" raised attached padded compact>
            <Form>
              <Form.Field
                control={Input}
                placeholder="Team, Project or Name"
                value={workspace}
                onChange={e => setWorkspace(e.target.value)}
              />
            </Form>
          </Segment>
          <Button.Group attached="bottom">
            <Button disabled={workspace ? false : true} color="green">
              Create
            </Button>
            <Button disabled={workspace ? false : true} color="blue">
              Join
            </Button>
          </Button.Group>
        </div>
      </Container>
    </header>
  )
}

Header.propTypes = {
  openWorkspace: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
