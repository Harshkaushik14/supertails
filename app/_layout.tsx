import { store } from "@/store";
import { Slot } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();

  // useEffect(() => {
  //   const checkUserAddress = async () => {
  //     try {
  //       const storedAddress = await AsyncStorage.getItem("userAddress");

  //       if (storedAddress) {
  //         router.replace("/home"); // Navigate to home if address exists
  //       } else {
  //         router.replace("/address-setup"); // Navigate to address setup if no address
  //       }
  //     } catch (error) {
  //       console.error("Error fetching address:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserAddress();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
