import React,{useEffect,useState,useRef} from 'react';
import { IconButton,Icon,NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuDrawer from 'react-native-side-drawer'
import {View,Text,TouchableOpacity,BackHandler,Alert} from 'react-native';
import { Feather,AntDesign,MaterialIcons,Entypo } from '@expo/vector-icons';
import {detailStyles} from '../Styles/DetailStyles';
import {viajesStyles} from '../Styles/ViajesStyles';


const Delivery = ({navigation}) =>{

    useEffect(() => {
          
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])
    
    const[open,setOpen] = useState(false);

    const validateData = async () => {
    }

    const onPress = () => {
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false)
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

    const backPressed = () =>{
        Alert.alert(
            'EDS Mobile',
            'Quieres interrumpir la entrega?',
            [
              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Sí', onPress: () => navigation.replace('Stop')},
            ],
            { cancelable: false });
            return true;
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
                    <Text style={detailStyles.header}>Entregas</Text>
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Delivery;