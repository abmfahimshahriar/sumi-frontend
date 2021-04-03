import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./GanttChart.css";
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
const GanttChart: React.FC<Props> = ({ getSprints, sprint }) => {
  const { projectId } = useParams<ParamTypes>();

  const [chartData, setChartData] = useState<any[]>([]);
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
    const columns = [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ];
    tempChartData.push(columns);
    for (let i = 0; i < sprints.length; i++) {
      const item = sprints[i];
      const chartDataItem = [];
      let percentDone;
      if(item.TotalStoryPoints === 0) percentDone = 0;
      else percentDone = Math.round((item.CompletedStoryPoints/item.TotalStoryPoints) * 100);
      chartDataItem.push(item._id);
      chartDataItem.push(item.SprintName);
      chartDataItem.push(new Date(item.StartDate));
      chartDataItem.push(new Date(item.EndDate));
      chartDataItem.push(null);
      chartDataItem.push(percentDone);
      chartDataItem.push(null);
      tempChartData.push(chartDataItem);
    }
    setChartData(tempChartData);
  };
  return (
    <div className="gantt-chart-card">
      <Chart
        width={"100%"}
        chartType="Gantt"
        loader={<div>Loading Chart</div>}
        data={chartData}
        rootProps={{ "data-testid": "1" }}
      />
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
export default connect(mapStateToProps, mapActionToProps)(GanttChart);
