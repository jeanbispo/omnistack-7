import React, { Component } from 'react';
import api from '../services/api';
import { View, Image, TouchableOpacity } from 'react-native';

// import { Container } from './styles';
import camera from '../assets/camera.png';

export default class Feed extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity style={{marginHorizontal:20}} onPress={() => navigation.navigate('New')}>
                <Image source={camera}/>
            </TouchableOpacity>
        ),
    });

    state = {
        feed: []
    };
    async componentDidMount(){
        // this.registerToSocket();
        console.log('oi');
        const response = await api.get('posts');
        console.log(response.data);
        this.setState({feed: response.data});

    }

  render() {
    return ( <View /> );
  }
}
