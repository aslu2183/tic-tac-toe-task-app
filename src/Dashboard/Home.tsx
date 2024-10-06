
import React, {useEffect} from 'react';
import { Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useSelector,useDispatch } from 'react-redux'
import {API_URL} from "@env"
import axios from 'axios';
import { updateProfile as updateDispatch, logout as logoutDispatch } from '../redux/Reducers/authenticate'
import Toast from 'react-native-toast-message'
import { Avatar } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function HomeScreen({navigation}:any){
    const user = useSelector((state:any) => state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {
        getUserProfile()
    },[])

    const getUserProfile = async() => {
        try{
            const { data } = await axios.get(`${API_URL}auth/v1/profile`,{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            dispatch(updateDispatch(data.user))  
        }
        catch(error:any){
            const message = (error?.response ? error.response.data.message : error?.message||'Undefined Error')
            Toast.show({
                type:'error',
                text1: message
            })
        }
    }

    const dologout = async() => {
        try{
            const { data } = await axios.get(`${API_URL}auth/v1/logout`,{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            dispatch(logoutDispatch())  
        }
        catch(error:any){
            const message = (error?.response ? error.response.data.message : error?.message||'Undefined Error')
            Toast.show({
                type:'error',
                text1: message
            })
        }
    }
    return (
        <View style={{flex:1}}>
            <View style={{justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:10}}>
                <Avatar.Image size={175} source={require('../assets/avatar.png')} />
                <Text style={{fontSize:20,color:'black'}}>{user?.name||'Name'} </Text>
                <Text style={{fontSize:16,color:'black'}}>{user?.email||'Email'} </Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center',padding:10}}>
                <TouchableOpacity style={{flex:1,height:150,backgroundColor:'white',margin:5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:22,color:"green"}}>Win </Text>
                    <Text style={{fontSize:20,color:"green"}}>20 </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,height:150,backgroundColor:'white',margin:5,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,color:"red"}}>Loss </Text>
                    <Text style={{fontSize:20,color:"red"}}>15 </Text>
                </TouchableOpacity>    
            </View>

            <View style={{flex:1,justifyContent:'flex-end',padding:10}}>
                <Button mode="contained" style={{marginTop:20,backgroundColor:'red'}} onPress={dologout}>
                    Logout
                </Button>
            </View>
        </View>
    )
}