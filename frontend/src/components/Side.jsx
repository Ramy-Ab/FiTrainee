import React from "react";
import profil from "../assets/profil.svg";
import objectif from "../assets/objectif.png";
import progression from "../assets/progression.svg";
import Documents from "../assets/draft.svg";
import dashboard from "../assets/dashboard.svg";
import { Link } from "react-router-dom";

function Side() {
  return (
    <div>
      <div class="wrapper">
        <div class="sidebar">
          <img
            src={dashboard}
            alt="Profile"
            style={{
              width: "5rem",
              marginLeft: "25%",
              marginBottom: "30px",
              marginTop: "30px",
            }}
            className="imgSidebar"
          />
          <ul>
            <li>
              <Link to="/trainee">
                <img
                  src={profil}
                  alt="Profile"
                  style={{ width: "1.5rem" }}
                  className="pr-1"
                />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/trainee/objectif">
                <img
                  src={objectif}
                  alt="Profile"
                  style={{ width: "1.5rem" }}
                  className="pr-1"
                />
                Objectif
              </Link>
            </li>
            <li>
              <Link to="/trainee/progress">
                <img
                  src={progression}
                  alt="Profile"
                  style={{ width: "1.5rem" }}
                  className="pr-1"
                />
                Progression
              </Link>
            </li>
            <li>
              <Link to="/trainee/orders">
                <img
                  src={Documents}
                  alt="Profile"
                  style={{ width: "1.5rem" }}
                  className="pr-1"
                />
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Side;
