import React from 'react'
import { Image, Item, Header, Icon, Segment } from 'semantic-ui-react'

const Focus = () => (
    <React.Fragment>
        <div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Friends</Header.Content>
            </Header>
        </div>
        <Segment>
            <Item.Group>
                <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                <Item.Content>
                    <Item.Header as='a'>Header</Item.Header>
                    <Item.Meta>Description</Item.Meta>
                    <Item.Description>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Item.Description>
                    <Item.Extra>Additional Details</Item.Extra>
                </Item.Content>
                </Item>

                <Item>
                <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

                <Item.Content>
                    <Item.Header as='a'>Header</Item.Header>
                    <Item.Meta>Description</Item.Meta>
                    <Item.Description>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Item.Description>
                    <Item.Extra>Additional Details</Item.Extra>
                </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </React.Fragment>
)

export default Focus