/**
 * @format
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from './App';

const HomeScreen = (props) => {
  return <App componentId={props.componentId} />;
};
Navigation.registerComponent('Home', () => HomeScreen);

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
