import React, { useEffect, useState } from "react";
import "./MyChart.css";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Rectangle,
  Bar,
} from "recharts";

import Chart from "react-apexcharts";
import {
  os as osDummy,
  browser as browserDummy,
  dumyData,
  browser,
} from "../../assets/data";

export const MyChart = ({ shortUrlData }) => {
  ///extracting visits from shorturlData
  const visits = shortUrlData ? shortUrlData.visitHistory : [];
  //extracting created Date
  const createdAt = shortUrlData ? shortUrlData.createdAt : [];

  const [allMonthsChartData, setallMonthsChartData] = useState();
  const [lastSevenDaysChartData, setlastSevenDaysChartData] = useState();
  const [shortingCriteria, setShortingCriteria] = useState("Last 7 Days");
  const [chartData, setChartData] = useState();
  ///a function that return month name by month number
  const getMonthName = (monthNumber) => {
    const months = [
      "January",
      "Fabruary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];

    return months[monthNumber - 1];
  };

  //function that get all months url analytics data
  const allMonthsAnalytics = () => {
    const onlyVisitedMonthlyClicks = {};
    const monthlyClicks = {};

    const createdAtDate = new Date(createdAt);
    const createdAtmonth = String(createdAtDate.getMonth() + 1).padStart(
      2,
      "0"
    );
    const createdAtMonthName = getMonthName(createdAtmonth);
    const currentDate = new Date(Date.now());
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentMonthName = getMonthName(currentMonth);
    //maping over visits to get total clicks in a perticular month
    visits.map((visit) => {
      const visitDate = new Date(visit.timestamps);
      const visitMonth = String(visitDate.getMonth() + 1).padStart(2, "0");
      const visitMonthName = getMonthName(visitMonth);

      if (onlyVisitedMonthlyClicks[visitMonthName]) {
        onlyVisitedMonthlyClicks[visitMonthName]++;
      } else {
        onlyVisitedMonthlyClicks[visitMonthName] = 1;
      }
    });
    //for loopt that iterate over all months created month to current month and then add corresponding visit count it visit happend otherwise add 0 along with month
    for (let i = createdAtmonth; i <= currentMonth; i++) {
      const monthName = getMonthName(i);

      if (!onlyVisitedMonthlyClicks[monthName]) {
        monthlyClicks[monthName] = 0;
      } else {
        monthlyClicks[monthName] = onlyVisitedMonthlyClicks[monthName];
      }
    }
    //formating all months analytics data into Array form from objects form
    const formatedData = Object.keys(monthlyClicks).map((month) => ({
      Month: month,
      Clicks: monthlyClicks[month],
    }));
    ///adding formated data to the state
    setallMonthsChartData(formatedData);
    return formatedData;
  };

  //funtion that get last seven days url analytics data
  const lastSevenDaysAnalytics = () => {
    const sevenDaysClicks = {};

    const currentDate = new Date(Date.now());
    const currentDayName = currentDate.toLocaleString("en-US", {
      weekday: "long",
    });

    //for loop iterate over last seven days , if and also check visits data that extracted from shorturl data if , the any day and visit day match from visits data , then it will add visit to the day , otherwise add 0 along with that day
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000); //current day timestamp
      const Day = String(date.getDate()).padStart(2, "0"); //current day number

      const DayName = date.toLocaleString("en-US", { weekday: "long" }); //current day name

      ///filtering only those day from last seven days in which visit happen
      const clicks = visits.filter((visit) => {
        const visitDate = new Date(visit.timestamps);
        const visitDay = String(visitDate.getDate()).padStart(2, "0");
        console.log("visitDay:", visitDay);
        if (Day == visitDay) {
          return visitDay;
        }
      });

      if (clicks) {
        sevenDaysClicks[DayName] = {
          Clicks: clicks.length,
          Date: date,
        };
      } else {
        sevenDaysClicks[DayName] = {
          Clicks: 0,
          Date: date,
        };
      }
    }

    //formating object in array
    const formatedData = Object.keys(sevenDaysClicks).map((click) => ({
      Day: click,
      Date: sevenDaysClicks[click].Date,
      Clicks: sevenDaysClicks[click].Clicks,
    }));

    //changing last seven day state to hold anlysis data
    setlastSevenDaysChartData(formatedData);

    //also return formated Data
    return formatedData;
  };

  //use effect that run to analyse data this useEffect calls all the needed function that gets analysis data for urls
  useEffect(() => {
    if (visits.length > 0) {
      switch (shortingCriteria) {
        case "Last 7 Days":
          lastSevenDaysAnalytics();
          setChartData({
            chartData: lastSevenDaysAnalytics(),
            xDataKey: "Day",
            datakey: "Clicks",
            yDataKey: "",
          });
          break;
        case "Complete":
          allMonthsAnalytics();
          setChartData({
            chartData: allMonthsAnalytics(),
            datakey: "Clicks",
            xDataKey: "Month",
            yDataKey: "",
          });
      }
    }
  }, [visits, shortingCriteria]);

  //function data handle shorting criteria
  const handleShorting = (e) => {
    setShortingCriteria(e.target.value);
  };

  //function that get OS data form ease visits means from which operating system visit happend to the url
  const getOsAnalytics = () => {
    const osData = {};

    visits.map((visit) => {
      const os = visit.os;
      if(!os){
        if(osData.others){
          osData.others++;
        }else{
          osData.others=1;
        }
        
      }else{
        if (osData[os]) {
          osData[os]++;
        } else {
          osData[os] = 1;
        }
      }

    });

    const formatedData = Object.keys(osData).map((os) => ({
      os: os,
      visits: osData[os],
    }));

    return formatedData;
  };

  //function that get Browser details mean which click happend form which browser
  const getBrowserAnalytics = () => {
    const browserData = {};
    visits.map((visit) => {
      const browser = visit.browser;
      if(!browser){
        if(browserData.others){
          browserData.others++
        }else{
          browserData.others=1;
        }
      }else{
        if (browserData[browser]) {
          browserData[browser]++;
        } else {
          browserData[browser] = 1;
        }
      }
     
    });

    const formatedData = Object.keys(browserData).map((browser) => ({
      browser: browser,
      visits: browserData[browser],
    }));
    return formatedData;
  };

  //create browser option fro pi chart
  const browserChartOptions = {
    chart: {
      type: "pie",
    },
    labels:
      getBrowserAnalytics().length > 0
        ? getBrowserAnalytics().map((browser) => browser.browser)
        : browserDummy.map((browser) => browser.browser),
    dataLabels: {
      style: {
        fontSize: "20px", // Increase the size of data labels inside the pie chart
        fontWeight: "bold",
      },
    },
    legend: {
      fontSize: "20px", // Increase the size of the legend text
      labels: {
        colors: "whtie", // Color for the legend text
      },
    },
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for tablets and larger screens
        options: {
          chart: {
            width: "70%",
          },
        },
      },
      {
        breakpoint: 768, // Breakpoint for mobile devices
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom", // Adjust legend for smaller screens
          },
        },
      },
    ],
  };
  //creating browser seriese for pi chart
  const browserChartSeriese =
    getBrowserAnalytics().length > 0
      ? getBrowserAnalytics().map((browser) => browser.visits)
      : browserDummy.map((browser) => browser.visits);

  //creating os chart options for os pi chart
  const osChartOptions = {
    chart: {
      type: "pie",
    },
    labels:
      getOsAnalytics().length > 0
        ? getOsAnalytics().map((os) => os.os)
        : osDummy.map((os) => os.os),
    dataLabels: {
      style: {
        fontSize: "20px", // Increase the size of data labels inside the pie chart
        fontWeight: "bold",
      },
    },
    legend: {
      fontSize: "20px", // Increase the size of the legend text
      labels: {
        colors: "whtie", // Color for the legend text
      },
    },
    responsive: [
      {
        breakpoint: 1024, // Breakpoint for tablets and larger screens
        options: {
          chart: {
            width: "70%",
          },
        },
      },
      {
        breakpoint: 768, // Breakpoint for mobile devices
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom", // Adjust legend for smaller screens
          },
        },
      },
    ],
  };
  //creating os chart series for operating system
  const osChartSeriese =
    getOsAnalytics().length > 0
      ? getOsAnalytics().map((os) => os.visits)
      : osDummy.map((os) => os.visits);

  return (
    <>
      <div className="w-full  chart ">
        <select
          onChange={handleShorting}
          name="shorting"
          className="mb-5 filter"
        >
          <option>Last 7 Days</option>

          <option>Complete</option>
        </select>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            className="chart"
            data={chartData ? chartData.chartData : dumyData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chartData ? chartData.xDataKey : "day"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={chartData ? chartData.datakey : "clicks"}
              stroke="#8884d8"
              fill="rgba(130, 54, 206,0.8)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full  chart mt-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData ? chartData.chartData : dumyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey={chartData ? chartData.xDataKey : "day"} />
            <YAxis />
            <Tooltip stroke="red" />
            <Legend />

            <Bar
              width={100}
              dataKey={chartData ? chartData.datakey : "clicks"}
              fill="rgba(130, 54, 206,0.6)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-[100px] mt-[100px] ">
        <h1 className="url-analysis-heading">DEVICES AND BROWSERS</h1>
        <p className="url-analysis-subheading">
          Analyze User Traffic by OS, Device, and Browser
        </p>

        <div className="redial-charts">
          <div className="r-chart">
            <Chart
              options={browserChartOptions}
              series={browserChartSeriese}
              type="pie"
              width={500}
              height={500}
            />
          </div>

          <div className="r-chart">
            <Chart
              options={osChartOptions}
              series={osChartSeriese}
              type="pie"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
};
