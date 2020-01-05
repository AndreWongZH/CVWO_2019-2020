import * as React from 'react';
import {
  Grid, Header, Icon, Segment, Dimmer, Loader,
} from 'semantic-ui-react';

import { connect } from 'react-redux';

import { loadFocus, updateCategory } from '../store/actions';

import ItemSegment from './ItemSegment';
import CategoryHeader from './CategoryHeader';
import { SegmentMargin } from '../StyledComponents';

import { ReduxStateType, UpdateCategoryDataType } from '../TypeDeclarations';
import { LoadFocusType, UpdateCategoryType } from '../store/actions/ActionDeclaration';

type FocusProps = {
  loadFocus: LoadFocusType,
  updateCategory: UpdateCategoryType
}

class Focus extends React.Component<FocusProps & ReduxStateType> {
  async componentDidMount() {
    const { loadFocus } = this.props;
    loadFocus();
  }

  hide = (category: string) => () => {
    const { updateCategory, focusCategory } = this.props;
    const data: UpdateCategoryDataType = {};

    if (category === 'today') {
      data.today = !focusCategory.today;
    }
    if (category === 'past') {
      data.past = !focusCategory.past;
    }
    if (category === 'tmr') {
      data.tmr = !focusCategory.tmr;
    }
    if (category === 'impt') {
      data.impt = !focusCategory.impt;
    }

    updateCategory(data);
  }

  render() {
    const { loading, focus, focusCategory } = this.props;

    if (loading) {
      return (
        <div>
          <Dimmer inverted active>
            <Loader content="Loading" />
          </Dimmer>
        </div>
      );
    }
    return (
      <>
        <SegmentMargin>
          <Header as="h1" icon textAlign="center">
            <Icon name="coffee" circular />
            <Header.Content>At a glance...</Header.Content>
          </Header>
          <Grid columns={3} divided centered>
            <Grid.Row>
              <Grid.Column width={4}>
                <CategoryHeader
                  hide={this.hide}
                  iconName="archive"
                  type="past"
                  headingName="Overdue Tasks"
                  focusCategory={focusCategory.past}
                />
                <ItemSegment data={focus.past} visible={focusCategory.past} />
              </Grid.Column>


              <Grid.Column width={8}>
                <CategoryHeader
                  hide={this.hide}
                  iconName="bullseye"
                  type="today"
                  headingName="Today's Tasks"
                  focusCategory={focusCategory.today}
                />
                <ItemSegment data={focus.today} visible={focusCategory.today} />
              </Grid.Column>


              <Grid.Column width={4}>
                <CategoryHeader
                  hide={this.hide}
                  iconName="binoculars"
                  type="tmr"
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
                  iconName="thumbtack"
                  type="impt"
                  headingName="Important Task"
                  focusCategory={focusCategory.impt}
                />
                <ItemSegment data={focus.impt} visible={focusCategory.impt} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </SegmentMargin>
      </>
    );
  }
}

const matchStateToProps = (state: ReduxStateType) => {
  return {
    loading: state.loading,
    focus: state.focus,
    focusCategory: state.focusCategory,
  };
};

const matchDispatchToProps = (dispatch: Function) => ({
  loadFocus: () => dispatch(loadFocus()),
  updateCategory: (category: UpdateCategoryDataType) => dispatch(updateCategory(category)),
});


export default connect(matchStateToProps, matchDispatchToProps)(Focus);
