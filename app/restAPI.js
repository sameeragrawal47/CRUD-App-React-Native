'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableHighlight,
    AlertIOS,
    ScrollView,

} from 'react-native';

export default class restAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            naData:[],
        }
        this.dataId = null;
        this.name = null;
        this.address = null;
    }
    getButton = () => {         // Returns All Data
        fetch("http://localhost:8082/customers", { method: "GET" })
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                console.log(jsonData);
                this.setState({ apiData: jsonData })
                console.log(this.state.apiData);
            })
            .done();
        this.dataId = null;

    }

    sendButton = () => {         // Sends All Data
        fetch("http://localhost:8082/customers", {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name, address: this.address })
        })
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                //console.log(jsonData);
                this.setState({ naData: jsonData })
                console.log(this.state.naData);
            })
            .done();
        this.name = null;
        this.address = null;
    }

    getDataById = () => {     //Returns Data By ID
        if (this.dataId != null || this.dataId != "") {
            fetch("http://localhost:8082/customers/"+(this.dataId) , { method: "GET" })
                .then((responseData) => {
                    return responseData.json();
                })
                .then((jsonData) => {
                    console.log(jsonData);
                    this.setState({ apiData: jsonData })
                })
                .done();
        }
            this.dataId = null;
    }


    deleteButton = () => {     //Delete Data By ID
        if (this.dataId != null || this.dataId != "") {
            fetch("http://localhost:8082/customers/"+(this.dataId) , { method: "delete" })
                .then((responseData) => {
                    console.log(responseData.rows);
                })
                .done();
        }
            this.dataId = null;
    }

    updateButton = () => {         // Update Data by ID
        fetch("http://localhost:8082/customers", {
            method: "put", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name, address: this.address, id: this.dataId})
        })
            .then((responseData) => {
                return responseData.json();
            })
            .done();
        this.dataId = null;
        this.name = null;
        this.address = null;
    }



    render() {
        const data = this.state.apiData;
        let dataDisplay = data.map(function (jsonData) {
            //console.log(data.length);
            return (
                <View key={jsonData.id}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{ color: "#511099" }}>{jsonData.id} </Text>
                        <Text style={{ color: "#511099" }}>{jsonData.name}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            )
        });
        return (
            <View style={styles.container}>
                <Text>Fetching Data From API URL</Text>
                <View>
                    <Text>Enter to read data</Text>
                    <TextInput style={styles.input}         //Get information input
                        onChangeText={(text) => {
                                this.dataId = text
                        }}
                        value={this.dataId}
                    />
                    <Text>Enter Name</Text>
                    <TextInput style={styles.input}         //Name Input
                        onChangeText={(text) => {
                                this.name = text
                        }}
                        value={this.name}
                    />
                    <Text>Enter Address</Text>
                    <TextInput style={styles.input}         //Address Input
                        onChangeText={(text) => {
                                this.address = text
                        }}
                        value={this.address}
                    />
                    <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                    <TouchableHighlight onPress={this.getButton} style={styles.button}>
                        <Text>GET All Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.getDataById} style={styles.button}>
                        <Text>GET Data By ID</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.sendButton} style={styles.button}>
                        <Text>Send Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.deleteButton} style={styles.button}>
                        <Text>Delete Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.updateButton} style={styles.button}>
                        <Text>Update Data</Text>
                    </TouchableHighlight>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {dataDisplay}
                </ScrollView>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },

    contentContainer: {
        paddingVertical: 20
    },
    input: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48afdb',
        borderRadius: 4,
        color: '#48BBEC'
    },
});
