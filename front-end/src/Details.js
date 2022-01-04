import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: class1,
    error,
    isPending,
  } = useFetch("http://localhost:3001/admin/classes/" + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };
  if (class1) {
    console.log(class1[0].courses[0].assignments);
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {class1 && (
        <article>
          <span>Class ID: </span> <h2>{class1[0]._id}</h2>
          <p>The Teacher of the Class is: </p>
          <h2>{class1[0].teacher.name}</h2>
          <article>
            <h2> Following are the Assignments</h2>
            <div className="blog-list">
              {class1[0].courses.map((course, index) => (
                <div className="blog-preview" key={course._id}>
                  <Link to={`/deleteAssignment/${course.assignments[0]._id}`}>
                    {course.assignments[0] && (
                      <span>
                        <p>This is assigment No: {index}</p>
                        <p>ID: {course.assignments[0]._id}</p>
                        <p>Description: {course.assignments[0].description}</p>
                        <button onClick={handleClick}>delete</button>
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </article>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
