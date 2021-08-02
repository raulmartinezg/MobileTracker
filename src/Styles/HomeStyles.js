import { StyleSheet } from "react-native";
import { alignContent } from "styled-system";

const homeStyles = StyleSheet.create({
    homecontainer:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    contain:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:100,
        height:100
    },
    animatedBox:{
        height:'100%',
        flex:1,
        backgroundColor:"#0EADFF",
        padding:10
    },
    menu:{
        height:'10%',
        display:'flex',
        justifyContent:'flex-start',
        backgroundColor:'#0EADFF'
    },
    logout:{
        height:'80%',
        marginLeft:10,
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-start'
    },
    box:{
        marginBottom:30
    },
    login:{
        width:'80%',
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
    

})

export  {homeStyles};