import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Icon, Button, Layout, Text, Input, CheckBox, Divider, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { getShops } from "../store/actions/shops";


const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
);

const BackAction = ({callback}) => (
    <TopNavigationAction icon={BackIcon} onPress={callback} style={{marginLeft: 0}}/>
);

const Form = ({setScreen}) => {
    const dispatch = useDispatch();
    
    useEffect(() => dispatch(getShops()), [])

    const [state, setState] = useState(0);
    const [params, setParams] = useState({
        // height: 167,
        bust: 88,
        waist: 66,
        hips: 94,
        sex: false, // true - men, false - women
        shop: "", 
    });

    switch (state) {
        case 0:
            return (<ParamsForm params={params} setState={setState} setParams={setParams} setScreen={setScreen}/>)
        case 1:
            return (<ShopList params={params} setState={setState} setParams={setParams}/>)
        default:
            console.error("Unknown form state.");
            return (<View></View>)
    }
};

const ParamsForm = ({params, setState, setParams, setScreen}) => {

    const Label = ({title}) => {
        return (<Text style={styles.label} category='label'>{title}</Text>);
    };

    return (
        <>
            <Layout level='1'>
                <TopNavigation
                    alignment='center'
                    title='Size Counter'
                    subtitle='Ввод параметров'
                    accessoryLeft={<BackAction callback={() => setScreen("main")}/>}
                />
            </Layout>

            <Layout style={styles.relativeContainer}>

                <Label title={`Обхват груди: ${params.bust} см`}/>
                <Slider
                    style={{width: "100%", height: 50, margin: 0}}
                    minimumValue={50}
                    maximumValue={170}
                    value={88}
                    step={1}
                    onValueChange={(number) =>  setParams({...params, bust: number})}
                />
                <Label title={`Обхват талии: ${params.waist} см`}/>
                <Slider
                    style={{width: "100%", height: 50, margin: 0}}
                    minimumValue={50}
                    maximumValue={170}
                    value={66}
                    step={1}
                    onValueChange={(number) => setParams({...params, waist: number})}
                />
                <Label title={`Обхват бедер: ${params.hips} см`}/>
                <Slider
                    style={{width: "100%", height: 50, margin: 0}}
                    minimumValue={50}
                    maximumValue={170}
                    value={94}
                    step={1}
                    onValueChange={(number) => setParams({...params, hips: number})}
                />

                <Text style={styles.formSubTitle} category='h2'>Пол:</Text>

                <CheckBox
                    checked={!params.sex}
                    style={styles.checkbox}
                    onChange={() => setParams({...params, sex: false})}
                >
                    Женский
                </CheckBox>

                <CheckBox
                    checked={params.sex}
                    style={styles.checkbox}
                    onChange={() => setParams({...params, sex: true})}
                >
                    Мужской
                </CheckBox>


                <View style={styles.bottomButomWrap}>
                    <Button onPress={() => setState(1)}>Расчитать</Button>
                </View>

            </Layout>
        </>
    );
};

const ShopList = ({params, setState}) => {
    
    const {shopsList} = useSelector((state) => state.shops);

    const getВifferenceRatio = (size1, size2) => {
        let ratio = 0;

        for (let index = 0; index < size1.length; index++) {
            ratio += Math.abs(1 - size1[index] / size2[index]); // делим магаззиный размер, на введенный 

        }

        return ratio;
    };
    
    const getMySize = (sizes) => { // функция выбора нужного размера

        const sizeList = params.sex ? sizes.mens : sizes.womens;
        const mySize = [ params.bust, params.waist, params.hips]; // params.height,
        // console.log(sizeList, mySize);
        const ratioList = Object.keys(sizeList).map((key) => [key, getВifferenceRatio(sizeList[key], mySize)]);
        let minIndex = 0;


        for(let ratioIndex in ratioList){
            if(ratioList[ratioIndex][1] < ratioList[minIndex][1]){
                minIndex = ratioIndex;
            }
        }


        return {name: ratioList[minIndex][0], sizes: sizeList[ratioList[minIndex][0]]};
    };


    const SelectShopItem = ({index, item}) => {
        
        const tableSize = getMySize(item.sizes);
        return (
            <ListItem 
                title={item.name} 
                description={`Параметры: ${tableSize.sizes[0]} ${tableSize.sizes[1]} ${tableSize.sizes[2]}`} // Рост: ${tableSize.sizes[0]} см, 
                accessoryRight={<Text>{tableSize.name}</Text>}
                />
        )
    };

    return (
        <>
            <Layout level='1'>
                <TopNavigation
                    alignment='center'
                    title='Size Counter'
                    subtitle='Ваш размер в магазинах'
                    accessoryLeft={<BackAction callback={() => setState(0)}/>}
                />
            </Layout>

            <Layout>
                <List
                    data={Object.values(shopsList)}
                    renderItem={SelectShopItem}
                    ItemSeparatorComponent={Divider}
                    keyExtractor={(item, index) => index}
                />

            </Layout>
        </>
    );
};


const styles = StyleSheet.create({
    relativeContainer: {
        flex: 1,
        height: "100%",
        position: "relative",
    },

    bottomButomWrap:{
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0,
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

export default Form;
