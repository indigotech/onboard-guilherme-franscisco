/**
 * @format
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { App } from './App';
import { AppProviders } from './components/providers/app-providers';
import { UserListScreen } from './screens/user-list';
import { UserSignUpScreen } from './screens/user-signup';

const HomeScreen = (props) => {
  return <App componentId={props.componentId} />;
};
Navigation.registerComponent(
  'Home',
  () => (props) =>
    (
      <AppProviders>
        <HomeScreen {...props} />
      </AppProviders>
    ),
  () => HomeScreen,
);

Navigation.registerComponent(
  'UserListScreen',
  () => (props) =>
    (
      <AppProviders>
        <UserListScreen {...props} />
      </AppProviders>
    ),
  () => UserListScreen,
);

Navigation.registerComponent(
  'UserSignUpScreen',
  () => (props) =>
    (
      <AppProviders>
        <UserSignUpScreen {...props} />
      </AppProviders>
    ),
  () => UserSignUpScreen,
);

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
