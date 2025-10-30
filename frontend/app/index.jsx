"use client"

import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"

export default function Index() {
  const { width } = useWindowDimensions()

  const clamp = useCallback((val, min, max) => Math.max(min, Math.min(max, val)), [])
  const rf = useCallback((size) => Math.round(clamp(size * (width / 390), 12, 30)), [width, clamp])

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [isPressing, setIsPressing] = useState(false)

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start()
  }, [])

  function cadastro() {
    router.push("/cadastrar")
  }

  function cadastro() {
    router.push("/cadastrar");
  }
  function entrar() {
    router.push("/uploadMusic")
  }

  const dynamicStyles = useMemo(
    () => ({
      logoContainer: { marginTop: rf(-40), marginBottom: rf(20) },
      logo: { width: 200, height: 200 },
      formPadding: { paddingHorizontal: rf(25) },
      input: {
        width: "100%",
        height: rf(48),
        fontSize: rf(17),
        paddingHorizontal: rf(15),
        marginVertical: rf(8),
      },
      botao: { width: "100%", paddingVertical: rf(12), borderRadius: rf(40), marginTop: rf(20) },
      textoBotao: { fontSize: rf(19) },
      titulo: { fontSize: rf(26), marginBottom: rf(20) },
      linkText: { fontSize: rf(15), marginTop: rf(15) },
    }),
    [width, rf],
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={["#8000d5", "#f910a3", "#fddf00"]} style={styles.gradient}>
        <SafeAreaView style={styles.safe}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              keyboardShouldPersistTaps="handled"
            >
              <Animated.View style={{ opacity: fadeAnim, alignItems: "center", width: "100%" }}>
                <View style={[styles.logoContainer]}>
                  <Image
                    style={[styles.Logo, dynamicStyles.logo]}
                    source={require("../assets/images/Logofundo.png")}
                    accessibilityLabel="Logo do aplicativo"
                  />
                </View>

                <View style={[styles.formContainer]}>
                  <Text style={[styles.titulo]}>Login</Text>

                  <TextInput
                    style={[styles.input]}
                    placeholder="E-mail"
                    placeholderTextColor="#FFF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />

                  <TextInput
                    style={[styles.input]}
                    placeholder="Senha"
                    placeholderTextColor="#FFF"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                  />

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={[
                      styles.botao,
                      isPressing && { transform: [{ scale: 0.97 }], backgroundColor: "#26144d" },
                    ]}
                    onPressIn={() => setIsPressing(true)}
                    onPressOut={() => setIsPressing(false)}
                    onPress={entrar}
                  >
                    <Text style={[styles.textoBotao]}>Entrar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={cadastro}>
                    <Text style={[styles.linkText]}>Não possui conta?</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  logoContainer: { alignSelf: "center" },
  Logo: { resizeMode: "contain" },
  formContainer: { width: "90%", maxWidth: 450 },
  titulo: { fontFamily: "negrito", color: "#fff", textAlign: "center", fontSize: 30, margin: 15 },
  input: {
    borderRadius: 25,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#FFF",
    textAlign: "center",
    fontFamily: "normal",
    color: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
    backgroundColor: "#1D143642",
    height: 50,
  },
  botao: {
    backgroundColor: "#1d1436",
    borderWidth: 1,
    borderColor: "#8000D5",
    alignItems: "center",
    width: 200,
    textAlign: "center",
    alignSelf: 'center',
    justifyContent: "center",
    borderRadius: 25,
    height: 50,
    margin: 10,
  
  },
  textoBotao: { color: "#FFF", fontFamily: "negrito" },
  linkText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "normal",
    fontSize: 20,
  },
})
