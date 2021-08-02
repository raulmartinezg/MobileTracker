import React,{useEffect,useState,useRef} from 'react';
import { IconButton,Icon,NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuDrawer from 'react-native-side-drawer'
import {View,Text,TouchableOpacity,BackHandler,Alert} from 'react-native';
import { Feather,AntDesign,MaterialIcons,Entypo } from '@expo/vector-icons';
import {detailStyles} from '../Styles/DetailStyles';
import {viajesStyles} from '../Styles/ViajesStyles';

const Start = ({navigation}) =>{
    const[user,setUser] = useState({});
    const[service,setService] = useState({})

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])

    const validateData = async () =>{
        const j = await AsyncStorage.getItem('llegada');
        if(j){
            Alert.alert(
                'EDS Mobile',
                'Ya confirmaste tu entrada!',
                [
                  {text: 'Ok', onPress: () => navigation.replace('Delivery')},
                ],
                { cancelable: false });
        }else{
            const s = await AsyncStorage.getItem('service');
            if(s){
                setService(JSON.parse(s));
            }
            const u = await AsyncStorage.getItem('userInfo');
            if(u){
                setUser(JSON.parse(u));
            }
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
                <TouchableOpacity onPress={() => navigation.replace('Stop')}>
                    <View style={detailStyles.btn}>
                    <Entypo name="location" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Parada</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('Start')}>
                    <View style={detailStyles.btn}>
                    <MaterialIcons name="pending-actions" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Llegada</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.replace('Delivery')}>
                    <View style={detailStyles.btn}>
                    <AntDesign name="book" size={24} color="black" style={detailStyles.icon}/>
                    <Text style={detailStyles.text}>Entregas</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        );
      };

    const[open,setOpen] = useState(false);

    const onPress = () => {
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false)
    }

    const backPressed = () =>{
        Alert.alert(
            'EDS Mobile',
            'Quieres terminar el servicio?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Sí', onPress: () => navigation.replace('Pending')},
            ],
            { cancelable: false });
            return true;
    }

    const handleStart = async () =>{
        const date = new Date(Date.now());
        const json = {
            operador:user.nombre,
            numero:user.numero,
            fecha:date.toString(),
            ncon:service.nco,
            con:service.nnc
        }
        await AsyncStorage.setItem('llegada',JSON.stringify(json));
        navigation.replace('Delivery')
    }

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
                <View>
                    <Text style={detailStyles.header}>Llegada</Text>
                    <View style={detailStyles.sp}>
                        <Text style={detailStyles.st}>Operador: </Text>
                        <Text>{user.nombre ? user.nombre : 'Not Data'}</Text>
                    </View>
                    <View style={detailStyles.sp}>
                        <Text style={detailStyles.st}>No. Operador: </Text>
                        <Text>{user.numero ? user.numero : 'Not Data'}</Text>
                    </View>
                    <View style={detailStyles.sp}>
                        <Text style={detailStyles.st}>Concesionario: </Text>
                        <Text>{service.nnc ? service.nnc : 'Not Data'}</Text>
                    </View>
                    <View style={detailStyles.sp}>
                    <TouchableOpacity style={detailStyles.sl} onPress={handleStart}>
                        <Text style={detailStyles.slt}>Confirmar llegada</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Start;