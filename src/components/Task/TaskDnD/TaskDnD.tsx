import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import "./TaskDnD.css";
import {
  ChangeBucketPayload,
  ITaskMapStateToProps,
  TaskState,
} from "../../../interfaces/GlobalTypes";
import { getTasks, changeBucket } from "../../../store/actions/taskActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CreateTaskDialog } from "../..";

type Props = {
  task: TaskState;
  changeBucket: Function;
};
const TaskDnD: React.FC<Props> = ({ task, changeBucket }) => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const isUpdate = true;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleStructureData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.tasks, task.SprintDetails]);

  const handleStructureData = () => {
    const tasks = [...task.tasks];
    const taskBuckets = task.SprintDetails.TaskBuckets;
    let structuredData: any[] = [];
    for (let i in taskBuckets) {
      const bucketId = taskBuckets[i].TaskBucketId;
      const filteredTasks = tasks.filter(
        (item) => item.CurrentBucket === bucketId
      );
      let item = {
        listId: taskBuckets[i].TaskBucketId,
        listName: taskBuckets[i].TaskBucketName,
        listArray: [...filteredTasks],
      };

      structuredData.push(item);
    }
    setData(structuredData);
  };
  const handleOnDragEnd = (result: any) => {
    const tempData = [...data];
    console.log(result);

    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) {
      const tempArray = tempData.find(
        (item) => item.listId === result.destination.droppableId
      );
      if (tempArray) {
        const dataIndex = tempData.findIndex(
          (item) => item.listId === result.destination.droppableId
        );
        const items = JSON.parse(JSON.stringify(tempArray.listArray));
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const updatedListItem = {
          listId: tempArray.listId,
          listName: tempArray.listName,
          listArray: [...items],
        };
        tempData[dataIndex] = { ...updatedListItem };
        setData(tempData);
      }
    } else {
      // get the arrays
      const tempSourceArray = tempData.find(
        (item) => item.listId === result.source.droppableId
      );
      const tempDestinationArray = tempData.find(
        (item) => item.listId === result.destination.droppableId
      );

      // get the arrays indexes
      const dataSourceIndex = tempData.findIndex(
        (item) => item.listId === result.source.droppableId
      );
      const dataDestinationIndex = tempData.findIndex(
        (item) => item.listId === result.destination.droppableId
      );
      if (tempSourceArray && tempDestinationArray) {
        // update the source list
        const sourceItems = JSON.parse(
          JSON.stringify(tempSourceArray.listArray)
        );
        const movedItem = { ...sourceItems[result.source.index] };
        sourceItems.splice(result.source.index, 1);
        const updatedSourceListItem = {
          listId: tempSourceArray.listId,
          listName: tempSourceArray.listName,
          listArray: [...sourceItems],
        };
        tempData[dataSourceIndex] = { ...updatedSourceListItem };

        // update the destination list
        const destinationItems = JSON.parse(
          JSON.stringify(tempDestinationArray.listArray)
        );
        destinationItems.splice(result.destination.index, 0, movedItem);
        const updatedDestinationListItem = {
          listId: tempDestinationArray.listId,
          listName: tempDestinationArray.listName,
          listArray: [...destinationItems],
        };
        tempData[dataDestinationIndex] = { ...updatedDestinationListItem };
        // set the state with updated value
        setData(tempData);
        handleBuckterChange(result.draggableId, result.destination.droppableId);
      }
    }
  };

  const handleBuckterChange = (taskId: string, newBucket: string) => {
    const payload: ChangeBucketPayload = {
      TaskId: taskId,
      NewBucket: newBucket,
    };
    changeBucket(payload, task.SprintDetails._id);
  };
  return (
    <div>
      {task.tasks.length > 0 && (
        <div className="dnd-wrapper">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="lists-container">
              {data.map((list) => {
                return (
                  <div className="list-item" key={list.listName}>
                    <div className="list-header">{list.listName}</div>
                    <Droppable droppableId={list.listId}>
                      {(provided) => (
                        <ul
                          className="task"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {list.listArray.map((item: any, index: any) => {
                            return (
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div onClick={handleClickOpen}>
                                      {item.TaskName}
                                    </div>
                                    <CreateTaskDialog
                                      open={open}
                                      onClose={handleClose}
                                      isUpdate={isUpdate}
                                      selectedTask={item}
                                    />
                                  </li>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: ITaskMapStateToProps) => ({
  task: state.task,
  ui: state.ui,
});

const mapActionToProps = {
  getTasks,
  changeBucket,
};
export default connect(mapStateToProps, mapActionToProps)(TaskDnD);
