import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DeleteAssignment = () => {
  const [isPending, setIspending] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/admin/deleteAssignment/" + id, {
      method: "GET",
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="blog-details">{isPending && <div>Deleting...</div>}</div>
  );
};

export default DeleteAssignment;
