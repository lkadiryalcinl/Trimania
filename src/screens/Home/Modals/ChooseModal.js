import { StyleSheet, Dimensions, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import Button from '../../../components/CustomButton'
import { categories, difficulties, questionTypes, amounts } from '../../../utils/modalData';
import colors from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

const ChooseModal = ({ modalVisible, setModalVisible }) => {
    const [category, setCategory] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [questionType, setQuestionType] = useState(null);
    const [amount, setAmount] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const toggleModal = () => setModalVisible(!modalVisible)

    const getQuestions = () => {
        setLoading(true)
        if (!category || !difficulty || !questionType || !amount) {
            Alert.alert("Error", "Please fill in all options.");
            setLoading(false)
            return;
        }
        const categoryID = category.value;
        const difficultyLevel = difficulty.value;
        const type = questionType.value;
        const amountSize = amount.value;

        const url = `https://opentdb.com/api.php?amount=${amountSize}&category=${categoryID}&difficulty=${difficultyLevel}&type=${type}&encode=url3986`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results.length == 0) {
                    Alert.alert('Soon', 'will be with you very soon...')
                } else {
                    navigation.navigate('Questions', {
                        data: data.results,
                        amountSize
                    });
                }
                setLoading(false)
                setModalVisible(false)
            })
            .catch(error =>{
                Alert.alert('Error', 'An error has occurred, please try again.')
                setLoading(false)
                setModalVisible(false)
            }
            );
    };

    useEffect(() => {
        setAmount(null)
        setCategory(null)
        setDifficulty(null)
        setQuestionType(null)
    }, [modalVisible])

    return (
        <Modal
            isVisible={modalVisible}
            onSwipeComplete={toggleModal}
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
        >
            <View style={styles.container}>
                <View style={styles.title_container}>
                    <Text style={styles.title}>Customize your settings</Text>
                </View>
                <View style={styles.dropdown_container}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder_style}
                        selectedTextStyle={styles.selected_text_style}
                        itemTextStyle={styles.dropdown_item_text_style}
                        itemContainerStyle={styles.dropdown_item_container_style}
                        iconColor={colors.ac}
                        showsVerticalScrollIndicator={false}
                        label="Category"
                        placeholder="Select category"
                        labelField="label"
                        valueField="value"
                        value={category}
                        data={categories}
                        onChange={setCategory}
                    />

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder_style}
                        selectedTextStyle={styles.selected_text_style}
                        itemTextStyle={styles.dropdown_item_text_style}
                        itemContainerStyle={styles.dropdown_item_container_style}
                        showsVerticalScrollIndicator={false}
                        iconColor={colors.ac}
                        label="Difficulty"
                        placeholder="Select difficulty"
                        labelField="label"
                        valueField="value"
                        value={difficulty}
                        data={difficulties}
                        onChange={setDifficulty}
                    />

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder_style}
                        selectedTextStyle={styles.selected_text_style}
                        itemTextStyle={styles.dropdown_item_text_style}
                        itemContainerStyle={styles.dropdown_item_container_style}
                        showsVerticalScrollIndicator={false}
                        iconColor={colors.ac}
                        label="Type"
                        placeholder="Select type"
                        labelField="label"
                        valueField="value"
                        value={questionType}
                        data={questionTypes}
                        onChange={setQuestionType}
                    />
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder_style}
                        selectedTextStyle={styles.selected_text_style}
                        itemTextStyle={styles.dropdown_item_text_style}
                        itemContainerStyle={styles.dropdown_item_container_style}
                        showsVerticalScrollIndicator={false}
                        iconColor={colors.ac}
                        label="Amount"
                        placeholder="Select amount"
                        labelField="label"
                        valueField="value"
                        value={amount}
                        data={amounts}
                        onChange={setAmount}
                    />
                </View>
                <View style={styles.button_container} >
                    <Button label={'Start Game'} icon={{ name: 'right', size: 24, color: colors.fg }} onPress={getQuestions} disabled={loading} loading={loading} />
                </View>
            </View>
        </Modal>
    );
}

export default ChooseModal


const deviceSize = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eceff1',
        borderRadius: 20,
        height: deviceSize.height / 2,
    },
    title_container: {
        flex: 1,
        backgroundColor: colors.ac,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        color: colors.fg,
    },
    dropdown_container: {
        flex: 4,
        padding: 10,
    },
    dropdown_item_text_style: {
        color: colors.black,
        textAlign: 'center',
    },
    dropdown_item_container_style: {
        borderBottomWidth: 1,
        borderBottomColor: colors.ac,
    },
    button_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 7,
        paddingHorizontal: 10,
        marginBottom: 20,
        textAlign: 'center'
    },
    placeholder_style: {
        fontSize: 16,
        color: colors.black,
        textAlign: 'center'
    },
    selected_text_style: {
        fontSize: 16,
        backgroundColor: colors.ac,
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
        height: 48,
        paddingTop: 13,
        marginLeft: -10,
        marginRight: 10,
        paddingLeft: 10,
        color: colors.fg,
        textAlign: 'center'
    },
    start_button_text: {
        backgroundColor: colors.lightblue,
        padding: 12,
        textAlign: 'center',
        borderRadius: 7,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
        marginBottom: 15,
    },
});