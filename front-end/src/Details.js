import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const ClassDetails = () => {
  const { id } = useParams();
  const {
    data: class1,
    error,
    isPending,
  } = useFetch("http://localhost:3001/admin/classes/" + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:3001/admin/deleteAssignment/" + class1._id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };
  // if (class1) {
  //   console.log(class1[0].courses[0].assignments);
  // }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {class1 && (
        <article>
          <span>Class ID: </span> <h2>{class1[0].name}</h2>
          <p>The Teacher of the Class is: </p>
          <h2>{class1[0].teacher.name}</h2>
          <Link
            style={{
              color: "white",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
              margin: "10px",
              padding: "5px",
            }}
            to={`/class/${id}/teacher/${class1[0].teacher._id}`}
          >
            Update Teacher For The Class ?
          </Link>
          <article>
            <h1> Following are the Assignments</h1>
            <div className="blog-list">
              {class1[0].courses.map((course, i) => (
                <div key={course._id}>
                  {course.assignments.map((assign, j) => (
                    <div className="blog-preview" key={assign._id}>
                      <p>This is assigment No: {j}</p>
                      <p>ID: {assign._id}</p>
                      <h2>Description: {assign.description}</h2>
                      {/* <button onClick={}>delete</button> */}
                      <Link
                        style={{
                          color: "white",
                          backgroundColor: "#f1356d",
                          borderRadius: "8px",
                          margin: "10px",
                          padding: "5px",
                        }}
                        to={`/deleteAssignment/${assign._id}`}
                      >
                        Delete ?
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </article>
        </article>
      )}
    </div>
  );
};

export default ClassDetails;
