import React,{useState,useEffect} from 'react';
import {View,Text,Image,SafeAreaView,TouchableOpacity,BackHandler,Alert} from 'react-native';
import { Feather,AntDesign,MaterialCommunityIcons,MaterialIcons,Entypo } from '@expo/vector-icons';
import { IconButton,Icon,NativeBaseProvider,FlatList,Box } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuDrawer from 'react-native-side-drawer'
import {viajesStyles} from '../Styles/ViajesStyles';
import { detailStyles } from '../Styles/DetailStyles';
import {CirclesLoader} from 'react-native-indicator';


const Pending = ({navigation}) => {
    const[data,setData] = useState([]);
    const[activity,setActivity] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])
    const[open,setOpen] = useState(false);

    const validateData = async () =>{
        const d = await AsyncStorage.getItem('pendings');
        if(d){
            setData(JSON.parse(d));
        }else{
            Alert.alert(
                'EDS Mobile',
                'Sin pendientes',
                [
                  {text: 'Ok', onPress: () => navigation.replace('Viajes')},
                ],
                { cancelable: false });

        }
    }

    const backPressed = () =>{
        Alert.alert(
            'EDS Mobile',
            'Quieres terminar el viaje?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Sí', onPress: () => navigation.replace('Viajes')},
            ],
            { cancelable: false });
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
        const ship = await AsyncStorage.getItem('shipment');
        await AsyncStorage.removeItem('service');
        await AsyncStorage.setItem('service',JSON.stringify(item));
        const embarque = await AsyncStorage.getItem('detail');
        const items = await AsyncStorage.getItem('items');
        const final = [];
        if(ship){
            JSON.parse(ship).forEach(element => {
                if(item.cco === element.cco){
                    
                    const a = [];
                    JSON.parse(embarque).forEach(e => {
                        if(element.coe === e.coe){
                            a.push(e);
                        }
                    });
                    
                    a.forEach(i => {
                        JSON.parse(items).forEach(o => {
                            if(i.csk === o.csk){
                                const j = {
                                    clave:i.csk,
                                    concesionario:i.coe,
                                    total:i.tpr,
                                    entregado:i.tpp,
                                    descripcion:o.des,
                                    sku:o.sku
                                }
                                final.push(j);
                            }
                        });
                    }); 
                }
            });
        }
        setActivity(false);
        await AsyncStorage.removeItem('deliveries');
        await AsyncStorage.setItem('deliveries',JSON.stringify(final));
        navigation.replace('Stop');
        
    }
    
    const drawerContent = () => {
        return (
          <View style={viajesStyles.animatedBox}>
            <IconButton
            style={viajesStyles.menu} 
            variant='solid'
            icon={<Icon size='md' as={<AntDesign name='close'/>} color='black'/>} onPress={handleClose}/>
            <View style={viajesStyles.items}>
                <TouchableOpacity onPress={() => navigation.replace('Detail')}>
                    <View style={detailStyles.btn}>
                    <MaterialCommunityIcons name="account-details-outline" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Detalle</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('Pending')}>
                    <View style={detailStyles.btn}>
                    <MaterialIcons name="pending-actions" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Pendientes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('Conclusion')}>
                    <View style={detailStyles.btn}>
                    <AntDesign name="book" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Concluidos</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        );
      };

    return(
        <NativeBaseProvider>
        <View style={detailStyles.detailcontainer}>
            <MenuDrawer
            open={open} 
            drawerContent={drawerContent()}
            drawerPercentage={50}
            animationTime={250}
            overlay={true}
            opacity={0.4}>
                <IconButton
                    style={detailStyles.menu} 
                    variant='solid'
                    icon={<Icon size='md' as={<Feather name='menu'/>} color='black'/>} onPress={onPress}/>
                <View style={detailStyles.center}>
                <Text style={detailStyles.header}>Concesionarios pendientes</Text>
                {
                    activity ? <CirclesLoader size={30}/> :
                    <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={viajesStyles.flat}>
                            
                            <TouchableOpacity onPress={()=>handleDetail(item)}>
                            <Box px={5} py={2} rounded="md" my={2} style={viajesStyles.box}>
                                <Text style={viajesStyles.title}>{item.nco}</Text>
                                <Text>{item.nnc}</Text>
                                <Text>{item.dir}</Text>
                                <Text style={detailStyles.fecha}>{item.fle}</Text>
                            </Box>
                            </TouchableOpacity>
                            
                            
                        </View>
                        
                    )}
                    keyExtractor={(item) => item.nco}
                    />
                }
                
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Pending;