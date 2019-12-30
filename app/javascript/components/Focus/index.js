import React, { Component } from 'react'
import { Grid, Header, Icon, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { loadFocus, updateCategory } from '../store/actions'

import ItemSegment from './ItemSegment'
import CategoryHeader from './CategoryHeader'

class Focus extends Component {

    async componentDidMount() {
        const { loadFocus } = this.props;
        await loadFocus()
    }

    hide = (category) => () => {
        const { updateCategory, focusCategory } = this.props;
        const data = {}

        if (category === 'today') {
            data.today = !focusCategory.today
        }
        if (category === 'past') {
            data.past = !focusCategory.past
        }
        if (category === 'tmr') {
            data.tmr = !focusCategory.tmr
        }
        if (category === 'impt') {
            data.impt = !focusCategory.impt
        }

        updateCategory(data)
    }

    render() {
        const { loading, focus, focusCategory } = this.props

        if (loading) {
            return (
                <div>
                    <Dimmer inverted active>
                        <Loader content='Loading' />
                    </Dimmer>
                </div>
            )
        } else {
            return(
                <React.Fragment>
                    <Segment>
                        <Header as='h1' icon textAlign='center'>
                            <Icon name='coffee' circular />
                            <Header.Content>At a glance...</Header.Content>
                        </Header>
                        <Grid columns={3} divided centered>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <CategoryHeader
                                        hide={this.hide}
                                        iconName='archive'
                                        type='past'
                                        headingName='Overdue Tasks'
                                        focusCategory={focusCategory.past}
                                    />
                                    <ItemSegment data={focus.past} visible={focusCategory.past} />
                                </Grid.Column>


                                <Grid.Column width={8}>
                                    <CategoryHeader
                                        hide={this.hide}
                                        iconName='bullseye'
                                        type='today'
                                        headingName="Today's Tasks"
                                        focusCategory={focusCategory.today}
                                    />
                                    <ItemSegment data={focus.today} visible={focusCategory.today} />
                                </Grid.Column>


                                <Grid.Column width={4}>
                                    <CategoryHeader
                                        hide={this.hide}
                                        iconName='binoculars'
                                        type='tmr'
                                        headingName="Tomorrow's Tasks"
                                        focusCategory={focusCategory.tmr}
                                    />
                                    <ItemSegment data={focus.tmr} visible={focusCategory.tmr} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column floated="right" width={4}>
                                    <CategoryHeader
                                        hide={this.hide}
                                        iconName='thumbtack'
                                        type='impt'
                                        headingName='Important Task'
                                        focusCategory={focusCategory.impt}
                                    />
                                    <ItemSegment data={focus.impt} visible={focusCategory.impt} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </React.Fragment>
            )
        }
    }
}

const matchStateToProps = (state) => {
    return {
        loading: state.loading,
        focus: state.focus,
        focusCategory: state.focusCategory
    }
}

const matchDispatchToProps = (dispatch) => ({
    loadFocus: () => dispatch(loadFocus()),
    updateCategory: (category) => dispatch(updateCategory(category))
})


export default connect(matchStateToProps, matchDispatchToProps)(Focus)