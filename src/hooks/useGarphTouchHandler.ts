import {useTouchHandler} from '@shopify/react-native-skia';
import {SharedValue, withDecay} from 'react-native-reanimated';

export const useGraphTouchHandler = (x: SharedValue<number>) => {
  return useTouchHandler({
    onStart: () => {},
    onActive: pt => {
      x.value = pt.x;
    },
    onEnd: ({velocityX}) => {
      x.value = withDecay({velocity: velocityX, clamp: [0, 300]});
    },
  });
};
