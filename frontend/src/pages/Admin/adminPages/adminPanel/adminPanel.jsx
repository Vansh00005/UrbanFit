import Chart from "./../../adminComponents/chart/Chart";
import FeaturedInfo from "./../../adminComponents/featuredInfo/FeaturedInfo";
import "./adminPanel.css";
// import { userData } from "../../dummyData";
import WidgetSm from "./../../adminComponents/widgetSm/WidgetSm";
import WidgetLg from "./../../adminComponents/widgetLg/WidgetLg";
import ProductsTable from "../productsTable/productsTable";
import Sidebar from './../../adminComponents/sidebar/Sidebar.jsx';
import Navbar from './../../../../components/navbar.js';
import Footer from './../../../../components/Footer.js';
import { useState,useEffect,useMemo } from "react";
import {userRequest} from './../../../../requestMethods.js';


export default function AdminPanel() {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/user/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div>
    <div className="container">
    <div className="side"><Sidebar/></div>
    <div className="home">
        <FeaturedInfo />
    <Chart
      data={userStats}
      title="User Analytics"
      grid
      dataKey="Active User"
    />
    <div className="homeWidgets">
      <WidgetSm />
      <WidgetLg />
    </div>
  </div>
  </div>
    <Footer/>
    </div>
  );
}
