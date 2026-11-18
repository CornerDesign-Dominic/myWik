import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect, Text as SvgText } from 'react-native-svg';
import type { AbcChart } from '../types';
import { Muted, useTheme } from './ui';

export function AbcDiagram({ chart }: { chart: AbcChart }) {
  const { colors } = useTheme();
  const left = 31;
  const right = 310;
  const bottom = 155;
  const step = (right - left) / chart.positions.length;
  const x = (index: number) => left + (index + 0.5) * step;
  const y = (percent: number) => bottom - percent * 1.21;
  let sum = 0;
  const cumulative = chart.positions.map(({ share }) => (sum += share));

  return <View style={{ gap: 4 }}>
    <Svg width="100%" height={211} viewBox="0 0 320 211" accessible={false} aria-hidden>
      <SvgText x={left} y={12} fill={colors.text} fontSize={11}>Anteil am Gesamtwert (%)</SvgText>
      {[0, 50, 100].map(percent => <React.Fragment key={percent}>
        <Line x1={left} y1={y(percent)} x2={right} y2={y(percent)} stroke={colors.border} />
        <SvgText x={left - 5} y={y(percent) + 4} textAnchor="end" fill={colors.text} fontSize={10}>{percent}</SvgText>
      </React.Fragment>)}
      {chart.thresholds.map(limit => <Line key={limit} x1={left} y1={y(limit)} x2={right} y2={y(limit)} stroke={colors.muted} strokeDasharray="4 4" />)}
      {chart.positions.map((position, index) => <React.Fragment key={position.label}>
        <Rect x={x(index) - 14} y={y(position.share)} width={28} height={bottom - y(position.share)} rx={2} fill={colors.accent} opacity={0.55} />
        <SvgText x={x(index)} y={position.share > 15 ? y(position.share) + 16 : bottom - 12} textAnchor="middle" fill={colors.text} fontSize={10}>{position.share} %</SvgText>
        <SvgText x={x(index)} y={172} textAnchor="middle" fill={colors.text} fontSize={10}>{position.label}</SvgText>
        <SvgText x={x(index)} y={187} textAnchor="middle" fill={colors.text} fontSize={10}>{position.category}</SvgText>
      </React.Fragment>)}
      <Polyline points={cumulative.map((percent, index) => `${x(index)},${y(percent)}`).join(' ')} fill="none" stroke={colors.gold} strokeWidth={2.5} />
      {cumulative.map((percent, index) => <React.Fragment key={index}>
        <Circle cx={x(index)} cy={y(percent)} r={3} fill={colors.gold} />
        <SvgText x={x(index)} y={y(percent) - 7} textAnchor="middle" fill={colors.text} fontSize={10}>{Number(percent.toFixed(2))} %</SvgText>
      </React.Fragment>)}
      <SvgText x={left} y={206} fill={colors.muted} fontSize={10}>Balken: je Position · Linie: kumuliert</SvgText>
    </Svg>
    <Muted>{chart.description}</Muted>
  </View>;
}
