import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';

class UserList extends Component {
    render() {
        const { users } = this.props;
        return (
            <Segment>
                <List animated style={{ height: 100, overflowY: 'scroll' }}>
                    <List.Header>Users</List.Header>
                    {
                        orderBy(users, ['points'], ['desc']).map((user) =>
                            <List.Item key={user.id}>
                                <List.Content floated='right' style={{ paddingRight: 15 }}>{user.points}</List.Content>
                                <List.Icon name='user' />
                                <List.Content>{user.isPresenter ? `${user.name} (p)` : user.name}</List.Content>
                            </List.Item>
                        )
                    }
                </List>
            </Segment>
        );
    }
}

export default UserList;