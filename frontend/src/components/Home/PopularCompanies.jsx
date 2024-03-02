import React from "react";
import {FaMicrosoft} from "react-icons/fa";
import { SiUber ,SiFiverr  } from "react-icons/si";
import { MdTask } from "react-icons/md";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "TaskRabbit",
      location: "Street 10 Mumbai, India",
      openPositions: 10,
      icon: <MdTask />,
    },
    {
      id: 2,
      title: "Uber",
      location: "San Francisco, USA",
      openPositions: 5,
      icon: <SiUber  />,
    },
    {
      id: 3,
      title: "Fiver",
      location: "Mountain View, USA",
      openPositions: 20,
      icon: <SiFiverr />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
