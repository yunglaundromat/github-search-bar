import React, { Component } from 'react'
import logo from './logo.svg';
import axios from 'react-axios'
import './App.css';
import { Button, Divider, Form, Grid, Header, Image, Message, Segment, Icon, Card } from 'semantic-ui-react'

const GITHUB_API = 'https://api.github.com/users'

class App extends Component {

  state = {
    users: [],
    search: 'a'
  }

  onSearchChange(e) {
    fetch(`https://api.github.com/search/users?q=${e.target.value}`)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      this.setState({users: data.items})
    })
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' textAlign='center'>
            <Icon name='github' /> Find Github Users
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='search' iconPosition='left' placeholder='Search for a user' onChange={(e, target) => this.onSearchChange(e)}/>
            </Segment>
          </Form>
          <Divider hidden />
          <Card.Group>
          {this.state.users.map((user, i) => {
            console.log(user)
            return (<Card fluid key={i}>
                      <Card.Content>
                        <Image
                          floated='left'
                          size='mini'
                          src={user.avatar_url}
                        />
                        <Card.Header>{user.login}</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                          Steve wants to add you to the group <strong>best friends</strong>
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className='ui two buttons'>
                          <Button basic color='green'>
                            Approve
                          </Button>
                          <Button basic color='red'>
                            Decline
                          </Button>
                        </div>
                      </Card.Content>
                    </Card>)
            })}
          </Card.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
