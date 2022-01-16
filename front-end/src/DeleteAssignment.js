import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DeleteAssignment = () => {
  const [isPending, setIspending] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    fetch("http://localhost:3001/admin/deleteAssignment/" + id, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="blog-details">
      {isPending && <div>Deleting The Assignment please wait...</div>}
    </div>
  );
};

export default DeleteAssignment;
