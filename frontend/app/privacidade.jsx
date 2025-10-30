import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

export default function PrivacidadeScreen() {
  const [visOpen, setVisOpen] = useState(false);
  const [contaOpen, setContaOpen] = useState(false);
  const [mensagensOn, setMensagensOn] = useState(false);

  const visAnim = useRef(new Animated.Value(0)).current;
  const contaAnim = useRef(new Animated.Value(0)).current;

  const toggleVis = () => {
    const toValue = visOpen ? 0 : 1;
    setVisOpen(!visOpen);
    Animated.timing(visAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const toggleConta = () => {
    const toValue = contaOpen ? 0 : 1;
    setContaOpen(!contaOpen);
    Animated.timing(contaAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const visHeight = visAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 90] });
  const visRotate = visAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  const contaHeight = contaAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 70] });
  const contaRotate = contaAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });

  const toggleMensagens = () => setMensagensOn((v) => !v);

  return (
    <LinearGradient
      colors={["#7B1FA2", "#E1306C", "#FF6F61", "#F9A825"]}
      start={[0, 0]}
      end={[0, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        {/* botão voltar */}
        <TouchableOpacity style={styles.backCircle}>
          <AntDesign name="arrowleft" size={20} color="#fff" />
        </TouchableOpacity>

        {/* logo sem círculo */}
        <View style={styles.logoWrap}>
          <Image
            source={require("../assets/images/Logofundo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Privacidade</Text>

        <View style={styles.options}>
          {/* Visibilidade */}
          <TouchableOpacity style={styles.optionRow} activeOpacity={0.85} onPress={toggleVis}>
            <Text style={styles.optionText}>Visibilidade</Text>
            <View style={styles.chevronCircle}>
              <Animated.View style={{ transform: [{ rotate: visRotate }] }}>
                <AntDesign name="down" size={14} color="#E1306C" />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <Animated.View style={[styles.expandArea, { height: visHeight }]}>
            <View style={styles.expandContent}>
              <Text style={styles.expandText}>Público</Text>
              <Text style={styles.expandText}>Amigos</Text>
              <Text style={styles.expandText}>Apenas eu</Text>
            </View>
          </Animated.View>

          {/* Conta Privada */}
          <TouchableOpacity style={styles.optionRow} activeOpacity={0.85} onPress={toggleConta}>
            <Text style={styles.optionText}>Conta Privada</Text>
            <View style={styles.chevronCircle}>
              <Animated.View style={{ transform: [{ rotate: contaRotate }] }}>
                <AntDesign name="down" size={14} color="#E1306C" />
              </Animated.View>
            </View>
          </TouchableOpacity>

          <Animated.View style={[styles.expandArea, { height: contaHeight }]}>
            <View style={styles.expandContent}>
              <Text style={styles.expandText}>Ao ativar, somente aprovados verão seu conteúdo</Text>
            </View>
          </Animated.View>

          {/* Mensagens diretas */}
          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Mensagens diretas</Text>
            <TouchableOpacity onPress={toggleMensagens} activeOpacity={0.8}>
              <View style={[styles.switchTrack, mensagensOn && styles.switchTrackOn]}>
                <Animated.View style={[styles.switchThumb, mensagensOn && styles.switchThumbOn]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: 22 },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: -2,
  },
  logoWrap: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 140,
    height: 140,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 22,
  },
  options: { marginTop: 6 },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgba(255,255,255,0.9)",
    borderWidth: 2,
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 8,
    backgroundColor: "transparent",
  },
  optionText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  chevronCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  expandArea: { overflow: "hidden", marginHorizontal: 0 },
  expandContent: { paddingHorizontal: 22, paddingTop: 12 },
  expandText: { color: "rgba(255,255,255,0.95)", fontSize: 14, paddingVertical: 6 },
  switchTrack: {
    width: 56,
    height: 30,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.22)",
    padding: 3,
    justifyContent: "center",
  },
  switchTrackOn: { backgroundColor: "rgba(255,255,255,0.9)" },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  switchThumbOn: { alignSelf: "flex-end", backgroundColor: "#E1306C" },
});
