import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Text as SvgText } from 'react-native-svg';
import type { ArticleLineChart, ArticleMatrix } from '../types';
import { Muted, useTheme } from './ui';

export function ArticleMatrixDiagram({ matrix }: { matrix: ArticleMatrix }) {
  const { colors } = useTheme();
  const cell = { flex: 1, minWidth: 0, justifyContent: 'center', padding: 7 } as const;
  return <View style={{ gap: 6 }}>
    <View accessible={false} aria-hidden style={{ gap: 3 }}>
      <View style={{ flexDirection: 'row', gap: 3 }}>
        <View style={cell} />
        {matrix.columns.map(column => <Text key={column} style={[cell, { color: colors.muted, fontSize: 12, textAlign: 'center' }]}>{column}</Text>)}
      </View>
      {matrix.rows.map((row, rowIndex) => <View key={row} style={{ flexDirection: 'row', gap: 3 }}>
        <Text style={[cell, { color: colors.muted, fontSize: 12 }]}>{row}</Text>
        {matrix.cells[rowIndex].map(cellText => <View key={cellText} style={[cell, { minHeight: 56, backgroundColor: colors.accentSoft, borderRadius: 6 }]}>
          <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600', textAlign: 'center' }}>{cellText}</Text>
        </View>)}
      </View>)}
    </View>
    <Muted>{matrix.description}</Muted>
  </View>;
}

export function ArticleLineDiagram({ chart }: { chart: ArticleLineChart }) {
  const { colors } = useTheme();
  const left = 38, right = 294, top = 25, bottom = 142;
  const minX = chart.xTicks[0], maxX = chart.xTicks[chart.xTicks.length - 1];
  const minY = chart.yTicks[0], maxY = chart.yTicks[chart.yTicks.length - 1];
  const x = (value: number) => left + (value - minX) / (maxX - minX) * (right - left);
  const y = (value: number) => bottom - (value - minY) / (maxY - minY) * (bottom - top);
  const svgPoints = (points: [number, number][]) => points.map(([a, b]) => `${x(a)},${y(b)}`).join(' ');
  return <View style={{ gap: 6 }}>
    <Svg width="100%" height={182} viewBox="0 0 320 182" accessible={false} aria-hidden>
      <SvgText x={left} y={13} fontSize={11} fill={colors.text}>{chart.yLabel}</SvgText>
      {chart.yTicks.map(tick => <React.Fragment key={tick}>
        <Line x1={left} y1={y(tick)} x2={right} y2={y(tick)} stroke={colors.border} />
        <SvgText x={left - 6} y={y(tick) + 4} textAnchor="end" fontSize={10} fill={colors.text}>{tick}</SvgText>
      </React.Fragment>)}
      <Line x1={left} y1={top} x2={left} y2={bottom} stroke={colors.muted} />
      <Line x1={left} y1={bottom} x2={right} y2={bottom} stroke={colors.muted} />
      {chart.xTicks.map(tick => <React.Fragment key={tick}>
        <Line x1={x(tick)} y1={bottom} x2={x(tick)} y2={bottom + 4} stroke={colors.muted} />
        <SvgText x={x(tick)} y={bottom + 16} textAnchor="middle" fontSize={10} fill={colors.text}>{tick}</SvgText>
      </React.Fragment>)}
      {chart.reference && <Polyline points={svgPoints(chart.reference)} fill="none" stroke={colors.muted} strokeDasharray="4 4" />}
      <Polyline points={svgPoints(chart.points)} fill="none" stroke={colors.accent} strokeWidth={2.5} />
      {chart.points.map(([a, b]) => <Circle key={a} cx={x(a)} cy={y(b)} r={3} fill={colors.accent} />)}
      <SvgText x={right} y={177} textAnchor="end" fontSize={11} fill={colors.text}>{chart.xLabel}</SvgText>
    </Svg>
    <Muted>{chart.description}</Muted>
  </View>;
}
