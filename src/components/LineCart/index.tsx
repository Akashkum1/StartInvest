import React from 'react';

import {
  Canvas,
  Group,
  LinearGradient,
  Path,
  Skia,
  SkPath,
  vec,
} from '@shopify/react-native-skia';

import {animatedData, DataPoint, originalData} from '@/data/data';
import {curveBasis, line, ScaleLinear, scaleLinear, scaleTime} from 'd3';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  useSharedValue,
  Easing,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import {useGraphTouchHandler} from '@/hooks/useGarphTouchHandler';
import {COLORS, Cursor} from '../Cursor';
import {getYForX} from '@/data/Maths';
// import {getYForX} from '@/data/Maths';

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
  line: string;
  y: ScaleLinear<number, number, never>;
}

export const LineChart = () => {
  const window = useWindowDimensions();
  const {width} = window;
  const transition = useSharedValue(1);
  const state = useSharedValue({
    current: 0,
    next: 1,
  });

  const GRAPH_HEIGHT = 400;
  const GRAPH_WIDTH = 360;

  const makeGraph = (data: DataPoint[]): GraphData => {
    const max = Math.max(...data.map(val => val.value));
    const min = Math.min(...data.map(val => val.value));
    const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

    const x = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 16)])
      .range([0, GRAPH_WIDTH]);

    const curvedLine = line<DataPoint>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);
    console.log(skPath?.toCmds());

    return {
      max,
      min,
      curve: skPath!,
      line: curvedLine!,
      y,
    };
  };

  const transitionStart = (end: number) => {
    state.value = {
      current: end,
      next: state.value.current,
    };
    transition.value = 0;
    transition.value = withTiming(1, {
      duration: 750,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const graphData = [makeGraph(originalData), makeGraph(animatedData)];

  const path = useDerivedValue(() => {
    const start = graphData[state.value.current].curve;
    const end = graphData[state.value.next].curve;
    return end.interpolate(start, transition.value)!;
  }, [state, transition]);

  const x = useSharedValue(0);
  const y = useDerivedValue(() => {
    return getYForX(path.value.toCmds(), x.value) || 0;
  });

  const onTouch = useGraphTouchHandler(x);

  return (
    <View style={styles.container}>
      <Canvas
        onTouch={onTouch}
        style={{
          width: GRAPH_WIDTH,
          height: GRAPH_HEIGHT,
        }}>
        {/* <Line
          p1={vec(0, 130)}
          p2={vec(400, 130)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(0, 250)}
          p2={vec(400, 250)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Line
          p1={vec(0, 370)}
          p2={vec(400, 370)}
          color="lightgrey"
          style="stroke"
          strokeWidth={1}
        />
        <Path style="stroke" path={path} strokeWidth={4} color="#6231ff" /> */}
        <Group>
          <Path
            style="stroke"
            path={path}
            strokeWidth={4}
            strokeJoin="round"
            strokeCap="round">
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, 0)}
              colors={COLORS}
            />
          </Path>
          <Cursor x={x} y={y} width={width} />
        </Group>
      </Canvas>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => transitionStart(0)}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Graph 1</Text>
        </Pressable>
        <Pressable
          onPress={() => transitionStart(1)}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Graph 2</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: '#6231ff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
});
