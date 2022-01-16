import { Link } from "react-router-dom";

const List = ({ classes }) => {
  return (
    <div className="blog-list">
      {classes.map((class1, index) => (
        <div className="blog-preview" key={class1._id}>
          <Link to={`/classes/${class1._id}`}>
            <h2>{class1.name}</h2>
            <p>This is class No: {index}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
