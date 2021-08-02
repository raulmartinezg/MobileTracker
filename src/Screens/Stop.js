import React,{useState,useEffect} from 'react';
import { IconButton,Icon,NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuDrawer from 'react-native-side-drawer'
import {View,Text,Image,SafeAreaView,TouchableOpacity,BackHandler,Alert,StyleSheet} from 'react-native';
import { Feather,AntDesign,MaterialCommunityIcons,MaterialIcons,Entypo } from '@expo/vector-icons';
import {detailStyles} from '../Styles/DetailStyles';
import {viajesStyles} from '../Styles/ViajesStyles';
import { Table, Row, Rows } from 'react-native-table-component';

const Stop = ({navigation}) =>{
    const[service,setService] = useState({});
    const[tableHead,setTableHead] = useState([]);
    const[tableData,setTableData] = useState([]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress',backPressed);
        validateData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed);
        }
    }, [])

    const validateData = async () => {
        const s = await AsyncStorage.getItem('service');
        if(s){
            setService(JSON.parse(s));
        }

        setTableHead(['Entrada', 'Items', 'Incidente', 'Encuesta']);
        setTableData([
            [<AntDesign name="checkcircleo" size={24} color="black" />, <AntDesign name="checkcircleo" size={24} color="black" />, <AntDesign name="checkcircleo" size={24} color="black" />, <AntDesign name="checkcircleo" size={24} color="black" />]
          ]);
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
                <Text style={detailStyles.header}>Detalle de servicio</Text>
                <View style={detailStyles.stop}>
                    <Text style={detailStyles.conc}>{service ? service.nco : 'Not Data'}</Text>
                    <Text>{service ? service.nnc:'Not Data'}</Text>
                    <View style={detailStyles.bx}>
                        <Text style={detailStyles.bj}>{service ? service.dir : 'Not Data'}</Text>
                        <Entypo name="location" size={24} color="white"/>
                    </View>
                </View>
                <View style={styles.container}>
                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData} textStyle={styles.text}/>
                        </Table>
                    </View>
                </View>
            </MenuDrawer>
        </View>
        </NativeBaseProvider>
    )
}

export default Stop;

const styles = StyleSheet.create({
    container: { flex: 1,padding:10, backgroundColor: '#fff',marginTop:-20 },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });