import React,{useEffect, useState} from 'react';
import {View,Text,Image,SafeAreaView,TouchableOpacity,BackHandler} from 'react-native';
import {homeStyles} from '../Styles/HomeStyles';
import Logo from '../../assets/LogoEds.png';
import { IconButton,Icon,NativeBaseProvider,Box } from 'native-base';
import { Feather,AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {viajes} from '../Hooks/Service';
import MenuDrawer from 'react-native-side-drawer'
import { Alert } from 'react-native';
import {CirclesLoader} from 'react-native-indicator';


const Home = ({navigation}) =>{
    const[open,setOpen] = useState(false);
    const[userInfo,setUserInfo] = useState({})
    const[activity,setActivity] = useState(false);

    useEffect(() => {
        validateUser();
        BackHandler.addEventListener('hardwareBackPress', backPressed)
        return () =>{
            BackHandler.removeEventListener('hardwareBackPress', backPressed)
        }
    }, [])

    const backPressed = () => {
        Alert.alert(
          'EDS Mobile',
          'Quieres salir?',
          [
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Sí', onPress: () => BackHandler.exitApp()},
          ],
          { cancelable: false });
          return true;
      }

    const validateUser = async () =>{
        const data = await AsyncStorage.getItem('userInfo');
        if(data){
            const c = JSON.parse(data);
            if(c.sincronizado === false){
                c.sincronizado = true;
                setUserInfo(c);
                await AsyncStorage.removeItem('userInfo');
                await AsyncStorage.setItem('userInfo',JSON.stringify(c));
            }else{
                setUserInfo(c);
            }
        }else{
            navigation.replace('Login')
        }
         
    }

    const onPress = () => {
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const handleLogout = async () =>{
        await AsyncStorage.clear();
        navigation.replace('Login')
    }

    const handleViajes = async () =>{
        setActivity(true);
        const json={
            "data":{
                "bdCat": "SIDTUM_PROD",
                "bdCc": 22,
                "bdSch": "SidMovil",
                "bdSp": "SPQRY_OrdenViajeV2",
                "encV": 2
            },
            "filter":`[{\"property\":\"claveOperador\",\"value\":${userInfo.clave}}]`
        }
        const v = await AsyncStorage.getItem('viajesFolio');
        if(v === null){
            try{
                const response = await viajes(json,userInfo.token);
                if(response.data.success === true){
                    const Folios = [];
                    response.data.data.newDataSet.forEach(element => {
                        const f = {
                            "claveFolioViaje":element.cfv,
                            "claveOperador":element.cop,
                            "folioViaje":element.fvi,
                            "ruta":element.rut,
                            "fecha":element.fsp,
                            "sincronizado":false
                        };
                        Folios.push(f)
                    });
                    await AsyncStorage.setItem("viajesFolio",JSON.stringify(Folios));
                    setActivity(false);
                    navigation.replace('Viajes')
                }else{
                    setActivity(false);
                    Alert.alert("EDS","No tienes viajes disponibles!");
                }
            }catch(e){
                setActivity(false);
                Alert.alert("EDS","Intenta de nuevo");
            }
        }else{
            setActivity(false);
            navigation.replace('Viajes')
        }
        
    }

    const drawerContent = () => {
        return (
          <View style={homeStyles.animatedBox}>
            <IconButton
            style={homeStyles.menu} 
            variant='solid'
            icon={<Icon size='md' as={<AntDesign name='close'/>} color='black'/>} onPress={handleClose}/>
            <View style={homeStyles.logout}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
      };

    return(
        <NativeBaseProvider>
        <View style={homeStyles.homecontainer}>
            <MenuDrawer
            open={open} 
            drawerContent={drawerContent()}
            drawerPercentage={50}
            animationTime={250}
            overlay={true}
            opacity={0.4}>
                <IconButton
                    style={homeStyles.menu} 
                    variant='solid'
                    icon={<Icon size='md' as={<Feather name='menu'/>} color='black'/>} onPress={onPress}/>
                <View style={homeStyles.contain}>
                    <Image source={Logo} style={homeStyles.logo}/>
                    <View style={homeStyles.box}>
                        <Text>Bienvenido!</Text>
                        <Text>{userInfo.nombre}</Text>
                    </View>
                    <Box
                    bg="primary.400"
                    width='80%'
                    marginBottom='10%'
                    p={4}
                    _text={{
                        fontSize: "md",
                        fontWeight: "bold",
                        color: "white",
                    }}
                    >
                    {userInfo.mensaje}
                    </Box>
                    
                    {
                        activity ? <CirclesLoader size={30}/> :
                    <TouchableOpacity style={homeStyles.login} onPress={handleViajes}>
                        <Text style={homeStyles.loginText}>Ingresar</Text>
                    </TouchableOpacity>
                    }
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
        
        
        
    )
}

export default Home;