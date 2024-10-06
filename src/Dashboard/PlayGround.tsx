
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { move_position as MoveDispatch, set_player } from '../redux/Reducers/game'
import {reset as ResetDispatch, set_player as SetPlayerDispatch } from '../redux/Reducers/game'
import axios from 'axios';
import Toast from 'react-native-toast-message'
import { Button } from 'react-native-paper';
import {API_URL} from "@env"

export default function PlayGround(){
    const board = useSelector((state:any) => state.game.board);
    const currentPlayer = useSelector((state:any) => state.game.currentPlayer);
    const selectedPlayer = useSelector((state:any) => state.game.selectedPlayer);
    const user = useSelector((state:any) => state.auth)
    const dispatch = useDispatch();

    const handleClick = async(row:any, col:any) => {
        const newBoard = [...board];
        if (newBoard[row][col] === 0) {
            const cell = [...newBoard[row]]
            cell[col]  = selectedPlayer === 'X' ? -1 : 1 
            newBoard[row] = [...cell]
            
            await handle_cursor(newBoard, selectedPlayer)
        }
    } 
    
    const reset = () => {
        dispatch(ResetDispatch());
    };

    const startGame = async(selectedUser:any) => {
        dispatch(SetPlayerDispatch({set_player:selectedUser}))
        if(selectedUser === 'O'){
            await handle_cursor(board, 'O')
        }
    }

    const handle_cursor = async(board:any,currentPlayer:any) =>  {
        try{
            const { data } = await axios.post(`${API_URL}user/v1/move-position`,{board, player:currentPlayer},{
                headers : {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const newBoard = [...board]
            if(data?.nextMove){
                const row  = data.nextMove[0]
                const col  = data.nextMove[1]
            
                const cell     = [...newBoard[row]]
                cell[col]      = data.nextPlayer === 'X' ? -1 : 1
                newBoard[row]  = [...cell]
              
            }    
            const values = {
                nextPlayer : data.nextPlayer,
                board      : newBoard
            }
            dispatch(MoveDispatch(values));
           
        }
        catch(error:any){
            const message = (error?.response ? error.response.data.message : error?.message||'Undefined Error')
            Toast.show({
                type:'error',
                text1: message
            })
        }
    }
    console.log("Board ",board)
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>
            {!selectedPlayer && (<View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text 
                    style={{
                        fontSize:24,
                        color:'black'
                    }}>
                    Who will start first ? </Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{flex:1,height:150,backgroundColor:'green',margin:5,justifyContent:'center',alignItems:'center'}}
                        onPress={() => startGame('X')}>
                        <Text style={{color:'white',fontSize:20}}>Player </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex:1,height:150,backgroundColor:'red',margin:5,justifyContent:'center',alignItems:'center'}}
                        onPress={() => startGame('O')}>
                        <Text style={{color:'white',fontSize:20}}>Computer </Text>
                    </TouchableOpacity>
                </View>
            </View>
            )} 
            {
                selectedPlayer && (
                    <View>
                        {
                            board.map((row:any, rowIndex:any) => (
                                <View key={rowIndex} style={{borderWidth:1,flexDirection:'row'}}>
                                    {
                                        row.map((cell:any, colIndex:any) => (
                                        <TouchableOpacity 
                                            key={colIndex} 
                                            style={{width:100,height:100,borderRightWidth:1,justifyContent:'center',alignItems:'center'}}
                                            onPress={() => handleClick(rowIndex, colIndex)}>
                                            <Text style={{fontSize:26,color:'black'}}> {cell === -1 ? 'X ' : cell === 1 ? 'O ' : ""}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))
                        }
                        <Button mode="contained" style={{marginTop:20,backgroundColor:'red'}} onPress={reset}>
                            Reset Game
                        </Button>
                    </View>
                )
            }
        </View>
    )
}