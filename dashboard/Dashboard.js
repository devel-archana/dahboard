import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [singleuser, setSingleuser] = useState([]);
  // const navigate = useNavigate;
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    axios.get(`http://localhost:8080/users/createuser/${id}`)
    .then((res) => {
      setSingleuser(res.data.data);
      console.log(setSingleuser);
    });
  },[]);
  console.log(singleuser);

  return (
    <div>
      <h1>userdetails</h1>
      <div className="card ms-2 mt-2 col-lg-4 m-1" key={singleuser._id}>
        <h4 className="card-title text-center mt-4">{singleuser.name} Profile</h4>
        <div className="card-body p-4">
          <h5 className="card-title">singleuserID: {singleuser._id}</h5>
          <p>Name: {singleuser.name}</p>
          <p>email: {singleuser.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
