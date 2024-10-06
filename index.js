/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';
import { persistor, store } from "./src/redux/Store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Toast from 'react-native-toast-message';

export default function Main() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <PaperProvider>
                    <App />
                    <Toast
                        position='bottom'
                        bottomOffset={20}
                        autoHide
                    />
                </PaperProvider>
            </PersistGate>
        </Provider>    
      
    );
  }

AppRegistry.registerComponent(appName, () => Main);
