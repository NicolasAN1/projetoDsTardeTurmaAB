import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 

const Cadastro = () => {
  const { width, height } = useWindowDimensions();

  const clamp = useCallback((val, min, max) => Math.max(min, Math.min(max, val)), []);
  const rf = useCallback((size) => Math.round(clamp(size * (width / 390), 12, 30)), [width, clamp]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isPressing, setIsPressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const debounceRef = useRef(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateFields = useCallback(() => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Informe um nome válido.';
    if (!email.includes('@')) newErrors.email = 'Email inválido.';
    if (senha.length < 6) newErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [nome, email, senha]);

  const handleCadastro = useCallback(() => {
    if (loading) return;

    if (!validateFields()) return;

    setLoading(true);
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);
      setLoading(false);
    }, 800);
  }, [nome, email, senha, loading, validateFields]);

  const dynamicStyles = useMemo(
    () => ({
      logoContainer: { marginTop: rf(-40), marginBottom: rf(20) },
      logo: { width: 200, height: 200 },
      formPadding: { paddingHorizontal: rf(25) },
      input: {
        width: '100%',
        height: rf(48),
        fontSize: rf(17),
        paddingHorizontal: rf(15),
        marginVertical: rf(8),
      },
      botao: { width: '100%', paddingVertical: rf(12), borderRadius: rf(40), marginTop: rf(20) },
      textoBotao: { fontSize: rf(19) },
      titulo: { fontSize: rf(26), marginBottom: rf(20) },
    }),
    [width, rf]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
        <SafeAreaView style={styles.safe}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.flex}
          >
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              keyboardShouldPersistTaps="handled"
            >
              <TouchableOpacity style={styles.backCircle} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={20} color="#fff" />
                      </TouchableOpacity>
              <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%' }}>
                
                <View style={[styles.logoContainer, dynamicStyles.logoContainer]}>
                  <Image
                    style={[styles.Logo, dynamicStyles.logo]}
                    source={require('../assets/images/Logofundo.png')}
                    accessibilityLabel="Logo do aplicativo"
                  />
                </View>

                
                <View style={[styles.formContainer, dynamicStyles.formPadding]}>
                  <Text style={[styles.titulo, dynamicStyles.titulo]}>Cadastro</Text>

                 
                  {[
                    {
                      placeholder: 'Nome de usuário',
                      value: nome,
                      setter: setNome,
                      error: errors.nome,
                      key: 'nome',
                    },
                    {
                      placeholder: 'Email',
                      value: email,
                      setter: setEmail,
                      error: errors.email,
                      key: 'email',
                      props: { keyboardType: 'email-address', autoCapitalize: 'none' },
                    },
                    {
                      placeholder: 'Senha',
                      value: senha,
                      setter: setSenha,
                      error: errors.senha,
                      key: 'senha',
                      props: { secureTextEntry: true },
                    },
                  ].map(({ placeholder, value, setter, error, key, props = {} }) => (
                    <React.Fragment key={key}>
                      <TextInput
                        style={[
                          styles.input,
                          dynamicStyles.input,
                          error && { borderColor: '#ff8080' },
                        ]}
                        placeholder={placeholder}
                        placeholderTextColor="#FFF"
                        value={value}
                        onChangeText={(t) => {
                          setter(t);
                          if (error) setErrors((e) => ({ ...e, [key]: null }));
                        }}
                        {...props}
                      />
                      {error && <Text style={styles.error}>{error}</Text>}
                    </React.Fragment>
                  ))}

                 
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[
                      styles.botao,
                      dynamicStyles.botao,
                      isPressing && { transform: [{ scale: 0.97 }], backgroundColor: '#26144d' },
                      loading && { opacity: 0.7 },
                    ]}
                    disabled={loading}
                    onPressIn={() => setIsPressing(true)}
                    onPressOut={() => setIsPressing(false)}
                    onPress={handleCadastro}
                  >
                    <Text style={[styles.textoBotao, dynamicStyles.textoBotao]}>
                      {loading ? 'Enviando...' : 'Cadastrar'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: { 
    flex: 1 
  },
  safe: { 
    flex: 1 
  },
  flex: {
    flex: 1 
  },
  logoContainer: {
    alignSelf: 'center' 
  },
  Logo: { 
    resizeMode: 'contain'
  },
  formContainer: {
    width: '90%',
    maxWidth: 450 
  },
  titulo: { 
    fontFamily: 'negrito',
    color: '#fff',
    textAlign: 'center' 
  },
  input: {
    width: 300,
    height: 55,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFF',
    textAlign: 'center',
    fontFamily: 'normal',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#1D143642',
    marginTop: 15,
    color: '#fff',
    fontSize: 20,
  },
  botao: {
    backgroundColor: '#1d1436',
    //borderWidth: 1,
    borderColor: '#8000D5',
    alignItems: 'center',
  },
  textoBotao: { color: '#FFF', fontFamily: 'negrito' },
  error: {
    color: '#ff8080',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'normal',
  },
});

export default Cadastro;
