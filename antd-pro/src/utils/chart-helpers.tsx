import React from 'react';
import { yuan, formatChartDate, TChartDateType } from '@/utils/utils';

export type TGeomType =
  | 'area'
  | 'line'
  | 'polygon'
  | 'interval'
  | 'edge'
  | 'heatmap'
  | 'point'
  | 'line-advance';
export interface IChartProps {
  adjust?: any;
  customTooltip?: any;
  data: any;
  title: string;
  type: TGeomType;
  tooltipTitleType?: TChartDateType;
  height?: number;
  padding?: any;
}

export const scale = {
  name: {
    type: 'cat',
    tickCount: 8,
  },
  value: {
    type: 'linear-strict',
    min: 0,
    tickCount: 5,
  },
};

export const yLabel = {
  formatter(text: string) {
    if (!Number(text)) return '';
    return `${Number(text) / 10000}万`;
  },
};

export const yGrid = {
  line: {
    style: {
      stroke: '#ddd',
      lineDash: [3, 3],
    },
  },
};

type options = {
  tooltipTitleType: TChartDateType;
};

export const getTooltipFields = ({ tooltipTitleType }: options) =>
  [
    'type*value*name',
    (type: string, value: string, name: string) => {
      return {
        name: type,
        title: `${formatChartDate(name, tooltipTitleType)}`,
        value: yuan(value),
      };
    },
  ] as [string, () => any];

/**
 * 获取数字位数
 */
const digits = (num: number, count = 0): number => {
  if (num) {
    return digits(Math.floor(num / 10), ++count);
  }
  return count;
};

/**
 * 获取比 max 大的尽可能整的数
 * @param max
 * @returns
 *
 * 举例: 有多个 Y 轴时 ，需要手动设置 max, 以统一 y 轴的坐标
 * const [max] = [formatted.currSum, formatted.lastSum, formatted.benchmark].sort((a, b) => b - a);
 * scale.value.max = niceMax(max);
 * scale.benchmark.max = niceMax(max);
 */
export const niceMax = (max: number) => {
  const i = Math.pow(10, digits(max) - 2);
  return Math.ceil(max / i) * i;
};

export const monthlyOverviewTooltip = (title = '', items = []) => {
  const summary = items.reduce((prev, curr: any) => prev + curr.data.value, 0);
  return (
    <div className="pb1">
      <div className="my2">{title}</div>
      <div className="">
        <div className="pb1 flex space-between items-center">
          <span>本月总计：</span>
          <span className="text-right">{yuan(summary)}</span>
        </div>
        {items.map((item: any) => (
          <div key={item.name} className="my1 flex space-between items-center">
            <span className="tooltip-marker" style={{ background: item.color }} />
            <span className="text-nowrap pr3">
              {item.name} {Math.round((Number(item.data.value) / summary) * 100)}%
            </span>
            <span className="flex-1 text-nowrap text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
