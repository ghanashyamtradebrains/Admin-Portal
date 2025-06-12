import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { DatePicker } from "antd";
import { getAllAffiliateGraphData } from "@/api/fetchClient";
import ValueChangeButton from "@/app/utility/ValueChangeButton";
import SelectOptions from "../SelectionOption";
import AreaChart from "../Charts/AreaChart";
import numFormatter from "@/app/utility/numFormatter";
import numberWithCommas from "@/app/utility/numberWithCommas";
import styles from "./Admin.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function AdminAllAffiliateGraph() {
  const backdropColor1 = [
    "#1DAFDD",
    "#8348FF",
    "#CD7BE7",
    "#F765A3",
    "#1774FF",
    "#1DDD8D",
    "#D3E561",
    "#D09030",
  ];

  const [filter, setFilter] = useState("1M");
  const [allAffiliate, setAllAffiliate] = useState();
  const [changePicker, setChangePicker] = useState(true);
  const [dateString, setDateString] = useState();
  const [monthString, setMonthString] = useState();
  const [isFormat, setIsFormat] = useState(false);

  const timeLineData1 = [
    { label: "Date Range", value: "daterange" },
    { label: "Month Wise", value: "monthwise" },
  ];
  const timeLineData2 = [
    { label: "Today", value: "1D" },
    { label: "7 days", value: "1W" },
    { label: "1 month", value: "1M" },
    { label: "3 month", value: "3M" },
    { label: "6 month", value: "6M" },
    { label: "1 Year", value: "1Y" },
    { label: "Show ALL", value: "ALL" },
  ];
  const dateFormat = ["YYYY-MM-DD", "YYYY-MM-DD"];
  let timeFormat = ["HH:mm"];
  const graphDate = allAffiliate?.graph.map(({ date }) =>
    moment(date).format(filter === "1D" ? timeFormat[0] : dateFormat[0])
  );

  const graphRevenue = allAffiliate?.graph.map(
    ({ affilate_sign_ups }) => affilate_sign_ups
  );

  useEffect(() => {
    getAllAffiliateGraphData(filter, false, false).then((res) => {
      setAllAffiliate(res?.data);
    });
  }, [filter]);

  const onChange = (dateString) => {
    getAllAffiliateGraphData(
      dateString,
      !Array.isArray(dateString),
      Array.isArray(dateString)
    ).then((res) => {
      setAllAffiliate(res?.data);
    });
  };

  const data1 = useMemo(() => {
    return {
      labels: graphDate,
      datasets: [
        {
          pointStyle: "rectRot",
          label: "Sign Up",
          fill: true,
          backgroundColor: "transparent",
          borderColor: backdropColor1[1],
          data: graphRevenue,
          borderWidth: 2.5,
        },
      ],
    };
  }, [graphDate, graphRevenue]);
  const { RangePicker } = DatePicker;

  return (
    <div>
      <div className={styles.main_container}>
        <p className={styles.heading}>Sign Up Analysis Through Affiliate</p>
        <p>
          {" "}
          <ValueChangeButton
            setChangePicker={setChangePicker}
            changePicker={changePicker}
          />
        </p>
      </div>
      <div
        style={{
          gap: "10px",
        }}
        className="d-flex justify-content-end"
      >
        {changePicker ? (
          <RangePicker
            dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
            className={"DatePicker-Antd-Dark"}
            format={dateFormat}
            style={{ height: "34px" }}
            onChange={(e) => onChange(e)}
          />
        ) : (
          <DatePicker
            dropdownClassName={"DatePickerdropdrow-Antd-Dark"}
            className={"DatePicker-Antd-Dark"}
            style={{ height: "34px" }}
            onChange={(e) => onChange(e)}
            format={dateFormat}
            picker="month"
          />
        )}

        <SelectOptions
          defaultSelect={"1M"}
          filter={filter}
          setSelected={setFilter}
          data={timeLineData2}
          width={250}
        />
      </div>

      <p className={styles.total_affiliate}>
        Total Signup :{allAffiliate?.total_signup}
      </p>

      <div className="mb-10" style={{ height: "500px" }}>
        <AreaChart
          dataPoints={data1}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            tension: 0,
            scales: {
              y: {
                grid: {
                  display: false,
                  borderColor: "#545E78",
                },
                borderColor: "white",
                ticks: {
                  callback: (v, i) => numFormatter(v),
                  color: "rgba(84, 94, 120, 1)",
                  font: {
                    size: 14,
                  },
                  padding: 5,
                },
              },

              x: {
                grid: {
                  display: false,
                  borderColor: "#545E78",
                },

                tickColor: "red",
                ticks: {
                  color: "rgba(84, 94, 120, 1)",
                  font: {
                    size: 14,
                  },
                  maxTicksLimit: 12,
                  padding: 5,
                },
              },
            },
            elements: {
              point: {
                radius: 0,
              },
            },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "rgba(84, 94, 120, 1)",
                  fontSize: 14,
                  usePointStyle: true,
                  boxWidth: 5,
                  padding: 30,
                },
              },
              tooltip: {
                titleAlign: "center",
                yAlign: "center",
                backgroundColor: "#ffff",
                bodyFont: {
                  size: 14,
                  weight: 600,
                },
                titleColor: (context) => {
                  return "rgba(0, 0, 0, 0.8)";
                },
                displayColors: false,

                callbacks: {
                  title: (chart, args) => {
                    return chart[0]?.label;
                  },
                  labelTextColor: (context) => {
                    return backdropColor1[context.datasetIndex];
                  },
                  label: (context, value) => {
                    return (
                      context?.dataset.label +
                      " : " +
                      " " +
                      numberWithCommas(numFormatter(context?.raw))
                    );
                  },
                },
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          }}
        />
      </div>
    </div>
  );
}
export default AdminAllAffiliateGraph;
