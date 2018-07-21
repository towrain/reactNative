import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthNav from './src/auth/AuthNav';
import Nav from './src/nav/Nav';

class App extends React.Component {
  state = {
    user: {},
    isLoading: true
  };
  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user, isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setState({ user });
    } catch (err) {
      this.setState({ user: {} });
    }
  }
  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    let loggedIn = false;
    if (this.state.user.username) {
      loggedIn = true;
    }
    if (loggedIn) {
      return <Nav />;
    }
    return <AuthNav />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(App);
