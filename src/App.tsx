/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  useSharedValue,
  // useAnimatedStyle,
  useFrameCallback,
} from 'react-native-reanimated';

import {Colors} from '@/theme/colors';
import {LineChart} from './components/LineCart';

// const data = [
//   {
//     name: 'NIFTY 50',
//     up: true,
//     currrentPrice: '46,569.2',
//     upBy: '71.3',
//     upByPercentage: '0.34',
//   },
//   {
//     name: 'SENSEX',
//     up: true,
//     currrentPrice: '73,569.2',
//     upBy: '305.3',
//     upByPercentage: '0.02',
//   },
//   {
//     name: 'GOLD 24K',
//     up: false,
//     currrentPrice: '6,569.2',
//     downBy: '71.3',
//     downByPercentage: '1.4',
//   },
//   {
//     name: 'NASDQL',
//     up: false,
//     currrentPrice: '6,569.2',
//     downBy: '71.3',
//     downByPercentage: '1.4',
//   },
// ];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.light.Black : Colors.light.White,
  };

  // const stopped = useRef(false);

  const t = useSharedValue(0);
  const animationStoped = useSharedValue(false);

  // eslint-disable-next-line no-unused-vars
  useFrameCallback(_frameInfo => {
    if (animationStoped.value === true) {
      return null;
    }
    t.value -= 1;
  });

  // const animatedStyles = useAnimatedStyle(() => ({
  //   transform: [{translateX: t.value % 840}],
  // }));

  // const handleStart = () => {
  //   animationStoped.value = false;
  // };

  // const handleCancelAnimation = () => {
  //   animationStoped.value = true;
  // };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <View style={styles.marqueeContainer}>
        <Animated.View style={[styles.marqueeGroup, animatedStyles]}>
          {data.map((stock, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (!stopped.current) {
                    handleCancelAnimation();
                    stopped.current = true;
                  } else {
                    handleStart();
                    stopped.current = false;
                  }
                }}
                key={index}
                style={styles.stocksElement}>
                <Text style={styles.boldText}>{stock.name}</Text>
                <Text style={styles.regularText}>
                  {stock.up ? stock.upBy : stock.downBy}
                </Text>
                <Text
                  style={[
                    styles.regularText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {color: stock.up ? 'green' : 'red'},
                  ]}>
                  {stock.up ? stock.upByPercentage : stock.downByPercentage}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
        <Animated.View style={[styles.marqueeGroup, animatedStyles]}>
          {data.map((stock, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (!stopped.current) {
                    handleCancelAnimation();
                    stopped.current = true;
                  } else {
                    handleStart();
                    stopped.current = false;
                  }
                }}
                key={index}
                style={styles.stocksElement}>
                <Text style={styles.boldText}>{stock.name}</Text>
                <Text style={styles.regularText}>
                  {stock.up ? stock.upBy : stock.downBy}
                </Text>
                <Text
                  style={[
                    styles.regularText,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {color: stock.up ? 'green' : 'red'},
                  ]}>
                  {stock.up ? stock.upByPercentage : stock.downByPercentage}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View> */}
      <LineChart />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marqueeContainer: {
    flexDirection: 'row',
  },
  marqueeGroup: {
    flexDirection: 'row',
    marginTop: 20,
    width: 840,
  },
  stocksElement: {
    flexDirection: 'row',
    borderColor: Colors.light.Black,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    marginRight: 10,
    padding: 10,
    gap: 5,
    width: 200,
  },
  boldText: {
    fontFamily: 'Montserrat-Bold',
  },

  regularText: {
    fontFamily: 'Montserrat-Regular',
  },
});

export default App;
