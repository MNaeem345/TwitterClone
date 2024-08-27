import { withLayoutContext } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from 'react-native'

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator)

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};


{/**Video Timestamp 3:50:00 */}

export default function DrawerLayour() {
    return (
    <>
    

    <Drawer>
        <Drawer.Screen name="(tabs)" options={{headerShown:false, title: 'Home'}}/>
        <Drawer.Screen name="bookmarks" options={{headerShown:false, title: 'Bookmarks'}}/>
        <Drawer.Screen name="twitter-blue" options={{headerShown:false, title: 'Twitter Blue'}}/>

    </Drawer>
    
    </>
    )
}