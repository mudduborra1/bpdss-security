import { useEffect } from "react";

import axios from "axios";

export default function Details({
  onEmployeesFetched,
}) {

  useEffect(() => {

    fetchEmployees();

  }, []);

  const fetchEmployees = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:8000/employees"
        );

      console.log(
        "Employees",
        response.data
      );

      // Send data to parent
      onEmployeesFetched(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>
      Details Component
    </div>
  );
}