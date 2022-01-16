import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const UpdateTeacher = () => {
  const [isPending, setIspending] = useState(false);
  const navigate = useNavigate();
  const { cid, tid } = useParams();
  const [id, setId] = useState(tid);

  const {
    data: class1,
    error,
    isPendingC,
  } = useFetch("http://localhost:3001/admin/classes/" + cid);

  let {
    data: teachers,
    errorT,
    isPendingT,
  } = useFetch("http://localhost:3001/admin/teachers");

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { id };
    setIspending(true);

    fetch(`http://localhost:3001/admin/class/${cid}/teacher/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log("updated");
      setIspending(false);
      navigate(`/classes/${cid}`);
    });
  };

  //   if (teachers) {
  //     teachers = { ...teachers };
  //     console.log(teachers);
  //   }
  return (
    <>
      {class1 && teachers && (
        <div className="create">
          <h3>Change the Teacher of the Class:</h3>
          <h2>{class1[0].name}</h2>
          <form onSubmit={handleSubmit}>
            <label>Class Id:</label>
            <input type="text" required disabled value={cid} />
            <label>Current Teacher:</label>
            <textarea
              disabled
              value={"Id: " + tid + "\nname: " + class1[0].teacher.name}
            ></textarea>
            <label>Select Teacher:</label>
            <select
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                console.log(id);
              }}
            >
              <option value={teachers[0]._id}>{teachers[0].name}</option>
              <option value={teachers[1]._id}>{teachers[1].name}</option>
            </select>
            {!isPending && <button>Update</button>}
            {isPending && <button disabled>Updating...</button>}
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateTeacher;
