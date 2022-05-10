import React, { useState  } from 'react';
import { Provider } from "react-redux";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import store from "./src/store";
import Form from './src/screens/Form';
import StartScreen from './src/screens/StartScreen';
import AddShop from './src/screens/AddShop';
import { StatusBar, SafeAreaView } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const Switcher = () => {
	const [screen, setScreen] = useState("main"); // при вызове setScreen, обновляется компонент  
	
	switch (screen) {
		case "main":
			return (<StartScreen setScreen={setScreen} />) // setScreen - пропс
		case "form":
			return (<Form setScreen={setScreen}/>)
		case "addShop":
			return (<AddShop setScreen={setScreen}/>)
		default:
			console.warn("Unknown screen", screen);
			return (<StartScreen setScreen={setScreen} />)
	}
}	

export default function App() {

	return (
		<SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 15}}>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={eva.light} >
				<Provider store={store}>
					<Switcher />
				</Provider>
			</ApplicationProvider>
		</SafeAreaView>
	);
}

