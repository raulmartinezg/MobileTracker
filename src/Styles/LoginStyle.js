import { StyleSheet } from "react-native";
import { marginTop } from "styled-system";

const loginStyles = StyleSheet.create({
    mainContainer : {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    container:{
        flex:1,
        justifyContent:'space-around',
        paddingHorizontal:50,
    },
    inputContainer:{
        marginTop:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    login:{
        backgroundColor:'#0EADFF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:20,
        borderRadius:50,
        marginTop:20
    },
    loginText:{
        color:'#FFF',
        fontWeight:'bold',
    },
    inputs:{
        height:50,
        borderBottomColor:'#9A9FA7',
        borderBottomWidth:1,
        textAlign:'center',
        paddingVertical:10,
        fontSize:12,
    },
    logo:{
        width:100,
        height:100
    },
    error:{
        color:'#B1253A',
        fontSize:10,
        marginTop:10
    },
    loading:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
});

export {loginStyles};