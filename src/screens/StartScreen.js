import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

const StartScreen = ({setScreen}) => {

  return (
    <>
      <Layout style={styles.container} level='1'>
          <Button onPress={() => setScreen("form")} style={{minWidth: 200,  marginVertical: 5, width: "60%"}}>
              Начать
          </Button>
          <Button onPress={() => setScreen("addShop")} status='success' style={{minWidth: 200, marginVertical: 5, width: "60%"}}>
              Добавить магазин
          </Button>
      </Layout>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 8,
  },
  
});