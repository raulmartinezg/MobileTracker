import { StyleSheet } from "react-native";
import { justifyContent } from "styled-system";

const detailStyles = StyleSheet.create({
    detailcontainer:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    menu:{
        height:'10%',
        display:'flex',
        justifyContent:'flex-start',
        backgroundColor:'#0EADFF'
    },
    header:{
        fontSize:20,
        textAlign:'center',
        marginTop:'10%',
        marginBottom:'10%'
    },
    btn:{
        display:'flex',
        flexDirection:'row',
        height:40,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        marginRight:10
    },
    text:{
        fontSize:15
    },
    box:{
        borderColor:'black',
        borderRadius:10,
        borderWidth:1,
        height:'48%',
        width:'80%',
        alignSelf:'center'
    },
    data:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10
    },
    p:{
        fontSize:18,
        marginLeft:10
    },
    i:{
        display:'flex',
        flexDirection:'row'
    },
    img:{
        marginLeft:10
    },
    bar:{
        marginTop:30,
        width:'80%',
        alignSelf:'center'
    },
    fecha:{
        textAlign:'right'
    },
    center:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    stop:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    conc:{
        fontSize:20,
        fontWeight:'bold'
    },
    bx:{
        height:'48%',
        width:'90%',
        borderRadius:10,
        backgroundColor:'#002571',
        borderWidth:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    bj:{
        color:'white',
        padding:20,
        fontWeight:'bold'
    },
    sp:{
        width:'100%',
        height:'15%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    st:{
        fontWeight:'bold',
        fontSize:15
    },
    sl:{
        width:'60%',
        height:'75%',
        borderRadius:20,
        backgroundColor:'#0EADFF',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    slt:{
        color:'white',
        fontSize:15,
        fontWeight:'bold'
    }
    
});

export {detailStyles};