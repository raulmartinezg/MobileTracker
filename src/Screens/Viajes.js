import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,Text,Image,SafeAreaView,TouchableOpacity,BackHandler,Alert} from 'react-native';
import {viajesStyles} from '../Styles/ViajesStyles';
import { IconButton,Icon,NativeBaseProvider,Box,FlatList } from 'native-base';
import { Feather,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import MenuDrawer from 'react-native-side-drawer'
import { viajes } from '../Hooks/Service';
import {CirclesLoader} from 'react-native-indicator';

const Viajes = ({navigation}) =>{
    const[open,setOpen] = useState(false);
    const[userInfo,setUserInfo] = useState({});
    const[data,setData] = useState([]);
    const[activity,setActivity] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])

    const validateData = async () =>{
        const u = await AsyncStorage.getItem('userInfo');
        setUserInfo(JSON.parse(u));
        const d = await AsyncStorage.getItem('viajesFolio');
        const a = [];
        if(d){
            const j = JSON.parse(d);
            j.forEach(element => {
                if(element.sincronizado === false){
                    element.sincronizado = true;
                    a.push(element);
                }else{
                    a.push(element);
                }
            });
            await AsyncStorage.removeItem('viajesFolio');
            await AsyncStorage.setItem('viajesFolio',JSON.stringify(a));
            setData(a);
        }else{
            navigation.replace('Home');
        }
    }

    const backPressed = () =>{
        navigation.replace('Home');
        return true;
    }

    const onPress = () => {
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const handleDetail = async (item) =>{
        setActivity(true);
        try{
            const json={
                "data":{
                    "bdCat": "SIDTUM_PROD",
                    "bdCc": 22,
                    "bdSch": "SidMovil",
                    "bdSp": "SPQRY_OrdenViajeDetalleV2",
                    "encV": 2
                },
                "filter":`[{\"property\":\"claveFolioViaje\",\"value\":${item.claveFolioViaje}}]`
            }
            const response = await  viajes(json,userInfo.token);
            if(response.data.success === true){
                await AsyncStorage.removeItem('summary');
                await AsyncStorage.setItem('summary',JSON.stringify(response.data.data.newDataSet));
                await AsyncStorage.removeItem('shipment');
                await AsyncStorage.setItem('shipment',JSON.stringify(response.data.data.newDataSet1));
                await AsyncStorage.removeItem('detail');
                await AsyncStorage.setItem('detail',JSON.stringify(response.data.data.newDataSet2));
                await AsyncStorage.removeItem('items');
                await AsyncStorage.setItem('items',JSON.stringify(response.data.data.newDataSet3));
                await AsyncStorage.removeItem('pendings');
                await AsyncStorage.setItem('pendings',JSON.stringify(response.data.data.newDataSet4));
                setActivity(false);
                navigation.navigate('Detail');
            }else{
                setActivity(false);
                Alert.alert("EDS","No hay información");
            }
            
        }catch(e){
            setActivity(false);
            Alert.alert("EDS","Intenta de nuevo!")
        }
        
    }

    const drawerContent = () => {
        return (
          <View style={viajesStyles.animatedBox}>
            <IconButton
            style={viajesStyles.menu} 
            variant='solid'
            icon={<Icon size='md' as={<AntDesign name='close'/>} color='black'/>} onPress={handleClose}/>
            <View style={viajesStyles.items}>
                <TouchableOpacity onPress={() => navigation.replace('Home')}>
                    <View style={viajesStyles.bar}>
                    <AntDesign name="home" size={24} color="black" />
                    <Text style={viajesStyles.t}>Home</Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
          </View>
        );
      };

    return(
        <NativeBaseProvider>
        <View style={viajesStyles.homecontainer}>
            <MenuDrawer
            open={open} 
            drawerContent={drawerContent()}
            drawerPercentage={50}
            animationTime={250}
            overlay={true}
            opacity={0.4}>
                <IconButton
                    style={viajesStyles.menu} 
                    variant='solid'
                    icon={<Icon size='md' as={<Feather name='menu'/>} color='black'/>} onPress={onPress}/>
                <View>
                <Text style={viajesStyles.header}>Estos son tus viajes disponibles</Text>
                <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={viajesStyles.flat}>
                        {
                            activity ? <CirclesLoader size={30}/> : 
                        <TouchableOpacity onPress={()=>handleDetail(item)}>
                        <Box px={5} py={2} rounded="md" my={2} style={viajesStyles.box}>
                            <View style={viajesStyles.truck}>
                            <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="black" />
                            <Text style={viajesStyles.title}>{item.folioViaje}</Text>
                            </View>
                            <Text>{item.fecha}</Text>
                            <Text>{item.ruta}</Text>
                        </Box>
                        </TouchableOpacity>
                        }
                        
                    </View>
                    
                )}
                keyExtractor={(item) => item.folioViaje}
                />
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Viajes;