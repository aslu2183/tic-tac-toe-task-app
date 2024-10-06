
import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { login as LoginDispatch } from '../redux/Reducers/authenticate'
import { useSelector,useDispatch } from 'react-redux'
import {API_URL} from "@env"


const Login = ({navigation}:any) => {

    const [formData, setformData] = useState({
        email : "",
        password : ""
    })
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    const onChangeText = (key:string, value:string) => {
        setformData({
            ...formData,
            [key]:value
        })        
    }

    const dologin = async() => {
        if(!formData.email){
            Toast.show({
                type: "error",
                text1: "Email Required"
            })
            return
        }
        if(!formData.password){
            Toast.show({
                type: "error",
                text1: "Password Required"
            })
            return
        }
        try{
            const {data} = await axios.post(`${API_URL}auth/v1/login`,{
                email    : formData.email,
                password : formData.password 
            })
            const values = {
                token : data.token
            }
            dispatch(LoginDispatch(values))
            navigation.navigate("Dashboard")
            
        }
        catch(error:any){
            const message = (error?.response ? error.response.data.message : error?.message||'Undefined Error')
            Toast.show({
                type:'error',
                text1: message
            })
        }
       
    }

    const gotoSignup = () => {
        navigation.navigate('Signup')
    }

    return (
        <View style={{flex:1,justifyContent:'center',padding:15}}>
            
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:20,color:"black"}}>User Login </Text>
            </View>

            <TextInput
                label="Email"
                mode="outlined"
                value={formData.email}
                onChangeText={text => onChangeText("email",text)}
            />
            <TextInput
                label="Password"
                value={formData.password}
                secureTextEntry
                mode="outlined"
                onChangeText={text => onChangeText("password",text)}
            />

            <TouchableOpacity onPress={() => gotoSignup()} style={{padding:10}}>
                <Text style={{textAlign:'right',color:"blue"}}>Don't hava account, Tap here ?</Text>
            </TouchableOpacity>
            <Button mode="contained" style={{marginTop:20}} onPress={dologin}>
                Login
            </Button>
        </View>
    )
}

export default Login