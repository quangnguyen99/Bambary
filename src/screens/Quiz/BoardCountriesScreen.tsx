import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import React, {useMemo, useRef, useState, useCallback, useEffect} from 'react';
import Svgs from '../../constants/Svgs';
import Svg, {G, Circle} from 'react-native-svg';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import useWorldStore, {Menu} from '../../store/useWorldStore';
import {QuantityQuestionData} from '../DataQuiz/QuantityQuestionData';
import {DATAVI} from '../DataQuiz/DataVi';
import useMenuStore from '../../store/useMenuStore';

const {width, height} = Dimensions.get('window');
const BoardCountriesScreen = ({route, navigation}) => {
  const {
    // countryMenu.quantityQuestionCountries,
    // setQuantityQuestionCountries,
    // countryMenu.scoreCountries,
    getScore,
    getQuantity,
    setMenuQuestion,
  } = useWorldStore();
  const {setArrayQuestion, typeCategory} = useMenuStore();
  const [preFill, setPrefill] = useState(100);
  const [score, setScore] = useState(0);
  const quantityQuestion = getQuantity(`quantity${typeCategory}`);
  const scoreQuestion = getScore(`score${typeCategory}`);

  useEffect(() => {
    console.log(`quantity${typeCategory}`);
    console.log('getMenuQuestion(`quantity${typeCategory}`)');
    console.log(getQuantity(`quantity${typeCategory}`));
    console.log(getScore(`score${typeCategory}`));
    // let type; //Country/World/Africa/Asia/Europe/NAmerica/SAmerica/Oceania
    const dataQuestion = QuantityQuestionData.find(
      i => i.quantity == quantityQuestion,
    );
    if (dataQuestion) {
      setScore(scoreQuestion[dataQuestion.index]);
      if (
        scoreQuestion &&
        scoreQuestion[dataQuestion?.index] <= dataQuestion?.quantity / 2
      ) {
        setPrefill(100);
      } else {
        setPrefill(0);
      }
    }
  }, []);

  const onChangeQuantity = (item: any) => {
    // setQuantityQuestionCountries(item.quantity);
    // countryMenu.quantityQuestionCountries = item.quantity;
    setMenuQuestion(`quantity${typeCategory}`, item.quantity);
    const dataQuestion = QuantityQuestionData.find(
      i => i.quantity == item.quantity,
    );
    if (dataQuestion) {
      setScore(scoreQuestion[dataQuestion.index]);
    }
  };

  const shuffleArray = () => {
    let array: any = [];
    for (let i = 0; i < quantityQuestion; i++) {
      array.push(i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const renderItem = () => {
    const columns = [];
    for (let i = 0; i < QuantityQuestionData.length; i += 3) {
      const columnItems = QuantityQuestionData.slice(i, i + 3);
      const column = (
        <View key={i} style={styles.row}>
          {columnItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChangeQuantity(item);
              }}>
              <View style={styles.column}>
                <View className="m-4">
                  <View className="rounded-xl">
                    <ImageBackground
                      style={{
                        height: 50,
                        width: width / 4,
                        justifyContent: 'center',
                      }}
                      imageStyle={{borderRadius: 12}}
                      source={
                        quantityQuestion === item.quantity
                          ? require('../../assets/image/gradient.png')
                          : require('../../assets/image/gradient1.png')
                      }>
                      <View className="rounded-xl flex flex-row justify-center">
                        <Text className="text-base font-bold items-center">
                          {item.quantity}
                        </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      );
      columns.push(column);
    }
    return columns;
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className="bg-emerald-200 mx-4 mt-4 h-2/5 rounded-3xl">
        <TouchableOpacity className="m-2" onPress={() => navigation.goBack()}>
          <Svgs.BackSVG height={40} width={40} />
        </TouchableOpacity>
        <View className="bg-emerald-200 h-3/4 rounded-3xl justify-center items-center">
          {/*<Text className="m-8 font-bold text-xl">Điểm cao nhất</Text>*/}
          <View className="justify-center items-center">
            <AnimatedCircularProgress
              prefill={preFill}
              delay={400}
              duration={700}
              size={200}
              width={20}
              fill={Math.round((score / quantityQuestion) * 100)}
              lineCap={'round'}
              rotation={0}
              tintColor="#00e0ff"
              renderCap={({center}) => (
                <Circle cx={center.x} cy={center.y} r="10" fill="#00e0ff" />
              )}
              backgroundColor="#3d5875">
              {fill => (
                <Text className="text-xl font-bold">{`${
                  scoreQuestion[
                    QuantityQuestionData.find(
                      i => i.quantity == quantityQuestion,
                    )?.index || 0
                  ]
                }/${quantityQuestion}`}</Text>
              )}
            </AnimatedCircularProgress>
            <View className={'absolute'}>
              {/*<Text className="m-8 font-bold text-xl">20/195</Text>*/}
            </View>
          </View>
          <View className="items-center justify-center m-6">
            {/*<Text className="text-sm">*/}
            {/*  Bao gồm 195 quốc gia thuộc Liên Hiệp Quốc, bao gồm 193 quốc gia và*/}
            {/*  2 quan sát viên là Thành Vatican và Palestine.*/}
            {/*</Text>*/}
          </View>
        </View>
      </View>
      <View className="items-center m-4">
        <View className="flex flex-row">
          <View className="mx-2 box-content h-28 w-28 rounded-full justify-center">
            <TouchableOpacity
              onPress={() => {
                setArrayQuestion(shuffleArray());
                navigation.navigate('QuizCountries');
              }}>
              <View className="items-center">
                <Svgs.PlaySVG height={120} width={120} />
              </View>
            </TouchableOpacity>
          </View>

          {/*<View className="mx-2 box-content h-28 w-28 rounded-full justify-center">*/}
          {/*  <TouchableOpacity*/}
          {/*    onPress={() => {*/}
          {/*      navigation.navigate('QuizCountries');*/}
          {/*    }}>*/}
          {/*    <View className="items-center">*/}
          {/*      <Svgs.ReturnSVG height={130} width={130} />*/}
          {/*    </View>*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>
      </View>
      {renderItem()}
      <View className="flex flex-row">
        {/*<FlatList*/}
        {/*  nestedScrollEnabled*/}
        {/*  data={QuantityQuestionData}*/}
        {/*  numColumns={3}*/}
        {/*  columnWrapperStyle={{*/}
        {/*    justifyContent: 'center',*/}
        {/*  }}*/}
        {/*  initialNumToRender={QuantityQuestionData.length}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  keyExtractor={(item, index) => String(index)}*/}
        {/*  renderItem={({item, index}) => (*/}
        {/*    <TouchableOpacity*/}
        {/*      onPress={() => {*/}
        {/*        onChangeQuantity(item);*/}
        {/*      }}>*/}
        {/*      <View className="m-2">*/}
        {/*        <View className="rounded-xl">*/}
        {/*          <ImageBackground*/}
        {/*            style={{*/}
        {/*              height: 50,*/}
        {/*              width: width / 4,*/}
        {/*              justifyContent: 'center',*/}
        {/*            }}*/}
        {/*            imageStyle={{borderRadius: 12}}*/}
        {/*            source={*/}
        {/*              countryMenu.quantityQuestionCountries === item.quantity*/}
        {/*                ? require('../../assets/image/gradient.png')*/}
        {/*                : require('../../assets/image/gradient1.png')*/}
        {/*            }>*/}
        {/*            <View className="rounded-xl flex flex-row justify-center">*/}
        {/*              <Text className="text-base font-bold items-center">*/}
        {/*                {item?.name}*/}
        {/*              </Text>*/}
        {/*            </View>*/}
        {/*          </ImageBackground>*/}
        {/*        </View>*/}
        {/*      </View>*/}
        {/*    </TouchableOpacity>*/}
        {/*  )}*/}
        {/*  ListHeaderComponent={*/}
        {/*    <Text className="text-lg font-bold m-2 ml-10">*/}
        {/*      Chọn số lượng câu hỏi*/}
        {/*    </Text>*/}
        {/*  }*/}
        {/*  // ListFooterComponent={*/}
        {/*  //   <View*/}
        {/*  //     style={{*/}
        {/*  //       height: Dimensions.get('window').height / 3,*/}
        {/*  //       width: Dimensions.get('window').width,*/}
        {/*  //       marginBottom: 10,*/}
        {/*  //     }}*/}
        {/*  //   />*/}
        {/*  // }*/}
        {/*  onEndReachedThreshold={0.2}*/}
        {/*/>*/}
      </View>
    </ScrollView>
  );
};

export default BoardCountriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBox: {
    backgroundColor: 'blue',
    margin: 10,
  },
  dot: {
    height: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
