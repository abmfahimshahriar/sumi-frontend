import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./VelocityChart.css";
import { getSprints } from "../../../store/actions/sprintActions";
import {
  ISprintMapStateToProps,
  SprintState,
} from "../../../interfaces/GlobalTypes";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts";

type Props = {
  getSprints: Function;
  sprint: SprintState;
};

interface ParamTypes {
  projectId: string;
  sprintId: string;
}
const VelocityChart: React.FC<Props> = ({ getSprints, sprint }) => {
  const { projectId } = useParams<ParamTypes>();
  const [chartData, setChartData] = useState<any[]>([]);

  const { innerWidth: width } = window;
  useEffect(() => {
    getSprints(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    makeChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprint.sprints]);

  const makeChartData = () => {
    const sprints = sprint.sprints;
    const tempChartData = [];
    const columns = ["Sprints", "Total story points", "Completed story points"];
    tempChartData.push(columns);
    for (let i = 0; i < sprints.length; i++) {
      const item = sprints[i];
      const chartDataItem = [];
      chartDataItem.push(item.SprintName);
      chartDataItem.push(item.TotalStoryPoints);
      chartDataItem.push(item.CompletedStoryPoints);
      tempChartData.push(chartDataItem);
    }
    setChartData(tempChartData);
  };
  return (
    <div className="velocity-chart-card">
      <div className="velocity-chart-wrapper">
      <Chart
        width={width > 600 ? "100%" : `${2 * width}px`}
        height={"100%"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          // Material design options
          chart: {
            title: sprint.projectDetails.ProjectName,
          },
        }}
        // For tests
        rootProps={{ "data-testid": "2" }}
      />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ISprintMapStateToProps) => ({
  sprint: state.sprint,
  ui: state.ui,
});

const mapActionToProps = {
  getSprints,
};
export default connect(mapStateToProps, mapActionToProps)(VelocityChart);
