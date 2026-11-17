import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Polyline, Text as SvgText } from 'react-native-svg';
import type { InventoryChart } from '../types';
import { Muted, useTheme } from './ui';

export function InventoryDiagram({ chart }: { chart: InventoryChart }) {
  const { colors } = useTheme();
  const lastDay = Math.max(1, ...chart.days, ...chart.points.map(([day]) => day));
  const highest = Math.max(1, ...chart.levels, ...chart.points.map(([, stock]) => stock));
  const x = (day: number) => 36 + day / lastDay * 256;
  const y = (value: number) => 138 - value / highest * 109;

  return <View style={{ gap: 4 }}>
    <Svg width="100%" height={177} viewBox="0 0 320 177" accessible={false} aria-hidden>
      <SvgText x={36} y={13} fill={colors.text} fontSize={11}>Bestand (Stück)</SvgText>
      {chart.levels.map(level => <React.Fragment key={level}>
        <Line x1={36} y1={y(level)} x2={292} y2={y(level)} stroke={colors.border} strokeDasharray="4 4" />
        <SvgText x={30} y={y(level) + 4} textAnchor="end" fontSize={11} fill={colors.text}>{level}</SvgText>
      </React.Fragment>)}
      <Line x1={36} y1={22} x2={36} y2={138} stroke={colors.muted} />
      <Line x1={36} y1={138} x2={292} y2={138} stroke={colors.muted} />
      {chart.days.map(day => <React.Fragment key={day}>
        <Line x1={x(day)} y1={138} x2={x(day)} y2={143} stroke={colors.muted} />
        <SvgText x={x(day)} y={154} textAnchor="middle" fontSize={11} fill={colors.text}>{day}</SvgText>
      </React.Fragment>)}
      <SvgText x={292} y={171} textAnchor="end" fontSize={11} fill={colors.text}>Arbeitstag</SvgText>
      <Polyline points={chart.points.map(([day, stock]) => `${x(day)},${y(stock)}`).join(' ')} fill="none" stroke={colors.accent} strokeWidth={2.5} />
    </Svg>
    <Muted>{chart.description}</Muted>
  </View>;
}
