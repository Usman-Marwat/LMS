import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
//dasd
//ncdnck
function App() {
  const [name, setName] = useState("");
  const [home, setHome] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/home")
      .then((res) => {
        setHome(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  async function postName(e) {
    e.preventDefault();
    console.log("---------------------------------------------------------");
    try {
      await axios.post("http://localhost:3001/post_name", {
        name,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="App">
      <form onSubmit={postName}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Send Name</button>
      </form>
      {home}
    </div>
  );
}

export default App;
