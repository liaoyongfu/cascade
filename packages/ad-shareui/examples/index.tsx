import React from 'react';
import { render } from 'react-dom';
import '@share/shareui-html';
import './Demo.css';
import Basic from './Examples/Basic';
import CustomShow from './Examples/CustomShow';
import CustomLevel from './Examples/CustomLevel';
import DefaultValue from './Examples/DefaultValue';
import MultiSelect from './Examples/MultiSelect';
import Disabled from './Examples/Disabled';
import DisabledDefault from './Examples/DisabledDefault';
import HideEmptyItem from './Examples/HideEmptyItem';

const Demo = () => (
  <div>
    <h3>默认（市 + 区 + 街道 + 社区）：</h3>
    <Basic />
    <h3>控制显示层级（只显示区 + 街道）：</h3>
    <CustomShow />
    <h3>隐藏选项为空的项：</h3>
    <HideEmptyItem />
    <h3>市和区一起（市、区一起，选择市后不能选择下一层）：</h3>
    <CustomLevel />
    <h3>默认值：</h3>
    <DefaultValue />
    <h3>全部禁用</h3>
    <Disabled />
    <h3>部分禁用：</h3>
    <DisabledDefault />
    <h3>自定义级联/同步模式：</h3>
    <MultiSelect />
  </div>
);

render(
  <Demo />,
  document.getElementById('root')
);
