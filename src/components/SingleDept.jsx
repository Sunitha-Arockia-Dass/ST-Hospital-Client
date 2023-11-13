import axios from "axios";
import { useEffect, useState } from "react";


function SingleDept({departments}){
    const [selectedDeptId, setSelectedDeptId] = useState(null);
    const [selectedDept, setSelectedDept] = useState(null);
    const displayDept = (id) => {
        setSelectedDeptId(id);
        const filteredDept = departments.filter((department) => {
          return department._id === id;
        });
        setSelectedDept(filteredDept[0]);
      };

}

exportd default SingleDept