import * as React from "react";
import ClassList from "./List";
import useFetch from "./useFetch";

import Chart from "./charts/Bar";

const Home = () => {
  const [chartObjectArray, setChartObjectArray] = React.useState([]);
  const [arrayLength, setArrayLength] = React.useState(1);
  const [isLengthSet, setIsLengthSet] = React.useState(false);
  const {
    error,
    isPending,
    data: classes,
  } = useFetch("http://localhost:3001/admin/graph");

  if (classes && !isLengthSet) {
    classes.forEach((class1, index) => {
      let obj = {
        name: class1.name,
        //if students length is 0 grap gives error
        studentsNo: class1.students.length + 2,
      };
      chartObjectArray[index] = obj;
    });
    let dummyObj = {
      name: "Programming",
      studentsNo: 5,
    };
    let dummyObj2 = {
      name: "Physics",
      studentsNo: 3,
    };
    let dummyObj3 = {
      name: "TCS",
      studentsNo: 7,
    };
    setChartObjectArray([dummyObj3, ...chartObjectArray, dummyObj, dummyObj2]);
    console.log(chartObjectArray);
    setArrayLength(chartObjectArray.length);
    setIsLengthSet(true);
  }

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {classes && <ClassList classes={classes} />}
      {classes && (
        <Chart chartObjectArray={chartObjectArray} arrayLength={arrayLength} />
      )}
    </div>
  );
};

export default Home;
