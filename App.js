import React from 'react';
import {
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      catName: 'ole',
      name: 'et',
      owner: 'sara',
      pnum: '1234',
      lat: 1.01,
      long: -1,
      messages: [],
      isLoading: true,
    };
    this.onPress = this.onPress.bind(this);
    this.onPress2 = this.onPress2.bind(this);
    this.onPress3 = this.onPress3.bind(this);
    this.onPress4 = this.onPress4.bind(this);
    this.onPress5 = this.onPress5.bind(this);
    this.findCoordinates = this.findCoordinates.bind(this);
  }

  componentDidMount() {
    return this.fetchlist();
  }

  findCoordinates() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({location});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  fetchlist() {
    fetch('http://192.168.1.19:8080/test')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.render();
  }

  onPress() {
    fetch('http://192.168.1.19:8080/cats')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.fetchlist();
  }

  onPress2() {
    fetch('http://192.168.1.19:8080/delete')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.fetchlist();
  }
  onPress3() {
    fetch('http://192.168.1.19:8080/add/ole-petter-123')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.fetchlist();
  }

  onPress4() {
    fetch('http://192.168.1.19:8080/new', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        catName: this.state.catName,
        owner: this.state.owner,
        pnum: this.state.pnum,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.fetchlist();
  }

  onPress5() {
    fetch('http://192.168.1.19:8080/loc', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        lat: this.state.lat,
        long: this.state.long,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            location: responseJson,
          },
          function() {},
        );
      })
      .catch(error => {
        console.error(error);
      });
    this.fetchlist();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <Text>
              {item.owner}, {item.catName}
            </Text>
          )}
          keyExtractor={({id}, index) => id}
        />
        <Button title="add" style={{paddingTop: 33}} onPress={this.onPress4} />
        <Button
          title="delete"
          style={{paddingTop: 33}}
          onPress={this.onPress2}
        />
        <Button title="geo" onPress={this.onPress5} />
        <Text>Location: {this.state.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
