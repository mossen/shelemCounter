import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {View, Text} from 'react-native';
import T from 'tailwind-rn';

import Main from '../pages/Main';
import History from '../pages/history';

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={T('flex-grow justify-between bg-green-100')}>
      <View>
        <Text style={T('mb-8 mt-8 text-center font-bold')}>Shelem Counter</Text>
        <DrawerItemList {...props} />
      </View>
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      /> */}
      <Text style={T('text-center mb-4')}>v 0.0.1</Text>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = createDrawerNavigator();
const Drawer = () => {
  return (
    <DrawerNavigator.Navigator
      openByDefault={true}
      drawerStyle={T('w-2/5')}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <DrawerNavigator.Screen name="Main" component={Main} />
      <DrawerNavigator.Screen name="History" component={History} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
