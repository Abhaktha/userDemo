import React from "react";
import PieChart, {
  Legend,
  Series,
  Label,
  Font,
  Connector,
} from 'devextreme-react/pie-chart';

const LoadCountryPieChart = (props) => {
  return (
    <PieChart id="pie"
      palette="Bright"
      dataSource={props.popularCountires}
      title="Popular Countries"
    >
      <Legend
        orientation="horizontal"
        itemTextPosition="right"
        horizontalAlignment="center"
        verticalAlignment="bottom"
        columnCount={4}
        columnItemSpacing={10}/>
      <Series argumentField="country" valueField="value">
        <Label
          visible={true}
          position="columns"
          customizeText={customizeText}>
          <Font size={16} />
          <Connector visible={true} width={0.5} />
        </Label>
      </Series>
    </PieChart>
  );
}

function customizeText(arg) {
  return `${arg.valueText} (${arg.percentText})`;
}

export default LoadCountryPieChart;