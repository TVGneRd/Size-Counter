import React, { useState } from 'react';
import { StyleSheet, View} from "react-native";
import { Icon, Button, Layout, Text, Input, Divider, List, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { addShopAction } from "../store/actions/shops";


const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
);

const BackAction = ({callback}) => (
    <TopNavigationAction icon={BackIcon} onPress={callback} style={{marginLeft: 0}}/>
);


const AddShop = ({setScreen}) => {
    const [params, setParams] = useState({
        name: "",
        sizes: {
            mens:  {},
            womens: {}
        }, 
    });
    const [sizeName, setSizeName] = useState("");
    const dispatch = useDispatch();

    const Label = ({title}) => {
        return (<Text style={styles.label} category='label'>{title}</Text>);
    };

    const addSize = () => {
        if(!sizeName){
            alert("Название размера не может быть пустым.")
            return;
        }
        const newObj1 = {};
        const newObj2 = {};
        newObj1[sizeName.toUpperCase()] = [0, 0, 0];
        newObj2[sizeName.toUpperCase()] = [0, 0, 0];

        setParams({...params, ...{sizes: {mens: {...params.sizes.mens, ...newObj1}, womens: {...params.sizes.mens, ...newObj1}}}})
    };

    const removeSize = () => {

        setParams((old) => {
            let lasеKey = Object.keys(old.sizes.mens).pop();
            delete old.sizes.mens[lasеKey];

            lasеKey = Object.keys(old.sizes.womens).pop();
            delete old.sizes.womens[lasеKey];
            return {...old};
        });
    };
    
    const addShop = () => {
        if(!params.name){
            alert("Название магазина не должно быть путым.");
            return;
        }
        if(!Object.keys(params.sizes.mens).length){
            alert("Нужно добавить хотя бы 1 размер!");
            return;
        }

        dispatch(addShopAction(params)).then(() => {
            alert("Магазин добавлен успешно!");
            setScreen("main");
        }).catch(() => {
            alert("Возникла ошибка при добавлении магазина.");
            setScreen("main");
        });

    };

    return (
        <>
            <Layout level='1'>
                <TopNavigation
                    alignment='center'
                    title='Size Counter'
                    subtitle='Добавление магазина'
                    accessoryLeft={<BackAction callback={() => setScreen("main")}/>}
                />
            </Layout>

            <Layout style={styles.relativeContainer}>
                <Input
                    label={<Label title={`Название магазина`}/>}
                    placeholder='Введите название магазина'
                    size="large"
                    value={params.text}
                    onChangeText={(text) => setParams({...params, name: text})}
                    style={styles.input}
                />

                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <Text style={{textAlign: "center"}}>Размеры:</Text>
                </View>

                <View style={{flexDirection: "column", flex: 1}}>
                    <View style={{}}>
                        <SizesList params={params} setParams={setParams} />
                    </View>

                   
                </View>

            </Layout>

            <View style={styles.bottomButomWrap}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <Input size="large" value={sizeName} style={{flex: 2}} placeholder='S' onChangeText={(text) => setSizeName(text)}/>    
                    <Button style={{flex: 5,  marginLeft: 10}}  status={"info"} onPress={addSize}>Добавить размер +</Button>
                    {Object.keys(params.sizes.mens).length ? 
                    <Button style={{flex: 1, marginLeft: 10}}  status={"danger"} onPress={removeSize}>-</Button> 
                        :
                    <></>
                    }
                </View>
                <Button onPress={addShop} status={"success"}>Добавить магазин</Button>
            </View>
        </>
    );
};

const SizesList = ({params, setParams}) => {

    const setSize = (category, size, param, value) => {
        setParams((oldState) => {
            oldState.sizes[category][size][param] = Math.abs(Number(value));
            return oldState;
        })
    };

    const SizeInputs = ({index, item}) => {
        
        return (
            <View>
                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <Text style={{flex: 1, textAlign: "center"}} category={"h3"}>Размер: {item}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <Text style={{textAlign: "center"}}>Женский</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <View style={{flex: 1}}>
                        <Input placeholder='90' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("womens", item, 0, text)}/>
                    </View>
                    <View style={{flex: 1, marginHorizontal: 10}}>
                        <Input placeholder='60' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("womens", item, 1, text)}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Input placeholder='90' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("womens", item, 2, text)}/>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <Text style={{textAlign: "center"}}>Мужской</Text>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8}}>
                    <View style={{flex: 1}}>
                        <Input placeholder='90' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("mens", item, 0, text)}/>
                    </View>
                    <View style={{flex: 1, marginHorizontal: 10}}>
                        <Input placeholder='60' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("mens", item, 1, text)}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Input placeholder='90' size="large" keyboardType='number-pad' maxLength={3} onChangeText={(text) => setSize("mens", item, 2, text)}/>
                    </View>
                </View>
                
            </View>
        )
    };
    return (
        <List
            data={Object.keys(params.sizes.mens)}
            renderItem={SizeInputs}
            ItemSeparatorComponent={Divider}
            keyExtractor={(item, index) => index}
        />
    );
};


const styles = StyleSheet.create({
    relativeContainer: {
        flex: 1,
        height: "100%",
        flexShrink: 0
        // backgroundColor: "red"
    },

    bottomButomWrap:{ 
        // position: "absolute",
        // bottom: 0,
        paddingBottom: 15,
        // paddingTop: 5,
        // backgroundColor: "#fff",
        // left: 0,
        // right: 0,
        // marginTop: 30
    },

    formTitle: {
        marginBottom: 30
    },

    shopItem: {
        flex: 1,
        width: "60%",
        marginBottom: 16,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: "#aea3f1",
        alignItems: "center",
    },
    shopItemText: {
        fontWeight: "900",
        fontSize: 24
    },
    formSubTitle: {
        marginBottom: 30,
        textAlign: 'left'
    },

    label: {
        fontSize: 18,
        marginBottom: 10
    },

    input: {
        marginBottom: 18
    },

    checkbox: {
        marginBottom: 10 
    },
});

export default AddShop;
