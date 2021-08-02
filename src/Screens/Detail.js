import React,{useEffect,useState} from 'react';
import { IconButton,Icon,NativeBaseProvider,Progress } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuDrawer from 'react-native-side-drawer'
import {View,Text,Image,SafeAreaView,TouchableOpacity,BackHandler,Alert} from 'react-native';
import { Feather,AntDesign,MaterialCommunityIcons,MaterialIcons,Entypo } from '@expo/vector-icons';
import {detailStyles} from '../Styles/DetailStyles';
import {viajesStyles} from '../Styles/ViajesStyles';

const Detail = ({navigation}) =>{
    const[summary,setSummary] = useState([]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])

    const validateData = async () =>{
        const a = await AsyncStorage.getItem('summary');
        if(a){
            setSummary(JSON.parse(a))
        }else{
            Alert.alert("EDS","Sin información")
        }
    }

    const[open,setOpen] = useState(false);

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
                <View>
                <Text style={detailStyles.header}>Detalle del viaje</Text>
                <View style={detailStyles.box}>
                    <Text style={detailStyles.data}>Folio: {summary[0] ? summary[0].fvi : 'Sin Datos'}</Text>
                    <Text style={detailStyles.p}>{summary[0] ? summary[0].cfv: 'Sin Datos'}</Text>
                    <View style={detailStyles.i}>
                        <Entypo style={detailStyles.img} name="location" size={24} color="black" />
                        <Text style={detailStyles.p}>{summary[0] ? summary[0].rut : 'Sin Datos'}</Text>
                    </View>
                    <View style={detailStyles.i}>
                        <Feather style={detailStyles.img} name="truck" size={24} color="black" />
                        <Text style={detailStyles.p}>{summary[0] ? summary[0].uni : 'Sin Datos'}</Text>
                    </View>
                    <View style={detailStyles.i}>
                        <MaterialIcons style={detailStyles.img} name="date-range" size={24} color="black" />
                        <Text style={detailStyles.p}>{summary[0] ? summary[0].fsp : 'Sin Datos'}</Text>
                    </View>
                    
                </View>
                <Progress style={detailStyles.bar} value={50} mx={4} />
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Detail;