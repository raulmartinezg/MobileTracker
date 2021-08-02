import React,{useState,useEffect} from 'react';
import { View, Text, StatusBar, TextInput,BackHandler, KeyboardAvoidingView,TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert,Image } from 'react-native';
import {loginStyles} from '../Styles/LoginStyle';
import Logo from '../../assets/LogoEds.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../Hooks/Service';
import {CirclesLoader} from 'react-native-indicator';

const Login = ({navigation}) => {
    const[usr,setUsr] = useState('');
    const[pwd,setPwd] = useState('');
    const[error,setError] = useState(false);
    const[message,setMessage] = useState('');
    const[number,setNumber] = useState(null);
    const[activity,setActivity] = useState(false);

    useEffect(() => {
        validateUser();
    }, [])

    const validateUser = async () =>{
        const user = await AsyncStorage.getItem('userInfo');
        if(user){
            navigation.replace('Home')
        }
    }

    const handleUser = (e) =>{
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < e.length; i++) {
            if(numbers.indexOf(e[i]) > -1 ) {
                newText = newText + e[i];
            }else{
                Alert.alert("EDS Cargo","Ingresa unicamente números!")
            }
        }

        setNumber(newText);
        
        if(e.length === 0){
            setError(true);
            setMessage('Ingresa un usuario');
        }else{
            setError(false);
            setUsr(e);
        }
    }

    const handlePwd = (e) =>{
        if(e.length === 0){
            setError(true);
            setMessage('Ingresa una contraseña');
            
        }else{
            setError(false);
            setPwd(e);
        }
    }

    const handleLogin =  async () =>{
        if(usr.length <= 1){
            Alert.alert("EDS","Ingresa tu usuario");
        }else if(pwd.length <= 1){
            Alert.alert("EDS","Ingresar tu contraseña");
        }else{
            try{
                setActivity(true)
                const json = {
                    "data": {
                        "bdCat": "SIDTUM_PROD",
                        "bdCc": 22,
                        "bdSch": "SidMovil",
                        "bdSp": "SPQRY_ValidaCredencialV2",
                        "encV": 2
                    },
                    "filter": {
                        pwd,
                        usr
                    }
                }
                const response = await login(json);
                const userInfo = {
                    "mensaje":response.data.data.exhorto,
                    "nombre":response.data.data.nom,
                    "numero":response.data.data.nop,
                    "token":response.data.token,
                    "clave":response.data.data.cus,
                    "sincronizado":false
                }
                await AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
                setActivity(false);
                navigation.replace('Home');
            }catch(e){
                Alert.alert("EDS","Algo salio mal!"+e)
                setActivity(false);
            }
        }
    }

    return(
        <KeyboardAvoidingView style={loginStyles.mainContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={loginStyles.container}>
                {
                    activity?
                    <View style={loginStyles.loading}>
                        <CirclesLoader />
                    </View>:
                    <View style={loginStyles.inputContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor='#ecf0f1'/>
                    <Image source={Logo} style={loginStyles.logo}/>
                    <TextInput value={number} maxLength={6} placeholder='Operador' style={loginStyles.inputs} autoCorrect={false} autoCapitalize="none" keyboardType='numeric' clearButtonMode='while-editing' minWidth={200} onChangeText={handleUser}></TextInput>
                    <TextInput maxLength={3} secureTextEntry={true} placeholder='Contraseña' style={loginStyles.inputs} autoCorrect={false} autoCapitalize="none"  clearButtonMode='while-editing' minWidth={200} onChangeText={handlePwd}></TextInput>
                    {error && <Text style={loginStyles.error}>{message}</Text>}
                </View>
                }
                
                <TouchableOpacity style={loginStyles.login} onPress={handleLogin}>
                    <Text style={loginStyles.loginText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Login;