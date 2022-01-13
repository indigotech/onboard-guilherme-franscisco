/**
 * @format
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from './App';
import { SettingsScreen } from './SettingsScreen';

const HomeScreen = (props) => {
  return <App componentId={props.componentId} />;
};
Navigation.registerComponent('Home', () => HomeScreen);
Navigation.registerComponent('Settings', () => SettingsScreen);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
