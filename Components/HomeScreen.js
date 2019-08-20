import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity,Alert, Image } from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'  
import { YellowBox } from 'react-native'; 
import { Logout, DisplayName } from '../Server/firebaseFunc'

const TwoMainButtons= props => (
    <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{paddingRight: 80}} onPress={()=>{
            props.nav.navigate('ChangePass')
        }}>
            <View style={[styles.button, {width: 100}]}>
                <Text style={[styles.buttonText, {textAlign: 'center'}]}>CHANGE PASSWORD</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingLeft: 80}} onPress={()=>{
            Logout().then(()=> {
                props.nav.navigate('Login', {logout: true});
            })       
        }}>
            <View style={[styles.button, {width: 100}]}>
                <Text style={styles.buttonText}>LOGOUT</Text>
            </View>
        </TouchableOpacity>

    </View>
)

const PassChange = props => {
    if(props.success) {
        return (
            <View style= {{paddingBottom: 30}}>
                <Text style={{color: 'green'}}>Password Changed Successfully</Text> 
            </View>
        )
    }

    else {
        return (
            <View>
            </View>
        ) 
    }
}


export default class HomeScreen extends Component {

    // static navigationOptions = ({navigation}) => ({
    //     headerTitle: "Home",
    //     // headerLeft: (<TouchableOpacity 
    //     //     // style={{paddingRight: 80}} 
    //     //     onPress={()=>{
    //     //     navigation.navigate('ChangePass')
    //     // }}>
    //     //     <View 
    //     //     // style={[styles.button, {width: 100}]}
    //     //     >
    //     //         <Text 
    //     //         // style={[styles.buttonText, {textAlign: 'center'}]}
    //     //         >CHANGE PASSWORD</Text>
    //     //     </View>
    //     // </TouchableOpacity>),
    //     headerRight: (
    //         <TouchableOpacity 
    //         // style={{paddingLeft: 80}} 
    //         onPress={()=>{
    //             Logout().then(()=> {
    //                 navigation.navigate('Login', {logout: true});
    //             })       
    //         }}>
    //             <View 
    //             // style={[styles.button, {width: 100}]}
    //             >
    //                 <Text 
    //                 // style={styles.buttonText}
    //                 >LOGOUT</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // })

    constructor(props) {
        super(props)
        this.state={
            name:''
        }

        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    componentDidMount() {
        this.readFromDb();
    }

    readFromDb = () => {    
        Firebase.database().ref('/users/' + this.props.navigation.getParam('user').uid).on('value',snapshot => {
            const object = snapshot.val()
            this.setState({name: object.name})
        }) 
    }


    render() {
        let thename =  
            <Text style={styles.welcome}>
                Hi <Text style={{color: 'green'}}>{this.state.name}</Text>
            </Text>
        return (
            <View style = {[mystyles.thecontainer,{paddingTop: 0}]}>
                <TwoMainButtons nav = {this.props.navigation}/>

                <Image 
                    style={{height: 200, width: 200}}
                    source={require('../assets/images.png')}
                />
                
                <PassChange success = {this.props.navigation.getParam('success')}/>
                <View>{thename}</View>
                <View style={{height:30}}/>

                <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Player1', {user: this.props.navigation.getParam('user'), name: this.state.name})
                    }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Single Player</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Player2Game', {user: this.props.navigation.getParam('user'), name: this.state.name})
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Multi-Player</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('GameRules', {user: this.props.navigation.getParam('user'), name: this.state.name})
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Game Rules</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const mystyles = new StyleSheet.create({
    thecontainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex:1,
        paddingTop: 10,
    } 
})

