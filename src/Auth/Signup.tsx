
import React,{useState, useEffect} from 'react';
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import Toast from 'react-native-toast-message'
import axios from 'axios';
import { login as LoginDispatch } from '../redux/Reducers/authenticate'
import { useSelector,useDispatch } from 'react-redux'
import {API_URL} from "@env"


const SignUp = () => {

    const [formData, setformData] = useState({
        email : "",
        password : "",
        phone:"",
        name:""
    })
    const dispatch = useDispatch()


    const onChangeText = (key:string, value:string) => {
        setformData({
            ...formData,
            [key]:value
        })        
    }

    const doRegister = async() => {
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
        if(!formData.name){
            Toast.show({
                type: "error",
                text1: "Name Required"
            })
            return
        }
        if(!formData.phone){
            Toast.show({
                type: "error",
                text1: "Phone Required"
            })
            return
        }

        if(formData.password.length < 8){
            Toast.show({
                type: "error",
                text1: "Minimum 8 Characters Required"
            })
            return
        }

        try{
            const {data} = await axios.post(`${API_URL}auth/v1/signup`,{
                email    : formData.email,
                password : formData.password,
                name     : formData.name,
                phone    : formData.phone 
            })
            Toast.show({
                type:"success",
                text1: data.message
            })
        }
        catch(error:any){
            console.log("Error ",error)
            const message = (error?.response ? error.response.data.message : error?.message||'Undefined Error')
            Toast.show({
                type:'error',
                text1: message
            })
        }

        
        
    }

    return (
        <View style={{flex:1,justifyContent:'center',padding:15}}>

            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:20,color:"black"}}>User Registration </Text>
            </View>

            <TextInput
                label="Name"
                mode="outlined"
                value={formData.name}
                onChangeText={text => onChangeText("name",text)}
            />
            <TextInput
                label="Email"
                mode="outlined"
                value={formData.email}
                onChangeText={text => onChangeText("email",text)}
            />
            <TextInput
                label="Phone"
                mode="outlined"
                value={formData.phone}
                keyboardType='number-pad'
                onChangeText={text => onChangeText("phone",text)}
            />
            <TextInput
                label="Password"
                value={formData.password}
                secureTextEntry
                mode="outlined"
                onChangeText={text => onChangeText("password",text)}
            />
            <Button mode="contained" style={{marginTop:20}} onPress={doRegister}>
                Create Account
            </Button>
        </View>
    )
}

export default SignUp