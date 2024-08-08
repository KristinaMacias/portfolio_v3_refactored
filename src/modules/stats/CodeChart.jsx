import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";


const CodeChart = () => {
  const [commitsByDay, setCommitsByDay] = useState([0, 0, 0, 0, 0, 0, 0]);
  const owner = "KristinaMacias";
  const repo = "CodingChallenges";
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    ProcessCommitData(); // process commit data on component mount
  }, [owner, repo]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy previous chart instance so we can render a new one
    }
    const ctx = document.getElementById("commitChart").getContext("2d");
    const newChartInstance = renderChart(ctx, commitsByDay);
    setChartInstance(newChartInstance);

    // Cleanup function
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [commitsByDay]);

  const ProcessCommitData = async () => {
    // process
    try {
      const commitData = await fetchCommitData();
      const currentWeekCommits = filterCommitsByCurrentWeek(commitData);
      const newCommitsByDay = countCommitsByDay(currentWeekCommits);
      setCommitsByDay(newCommitsByDay); // Update state with new commits count
    } catch (error) {
      console.error("Error fetching and processing commit data:", error);
    }
  };

  const fetchCommitData = async () => {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
    return response.json();
  };

  const filterCommitsByCurrentWeek = (commits) => {
    const today = new Date();
    const currentDay = today.getDay();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - currentDay); // Set to Sunday of current week
    const currentWeekEnd = new Date(today);
    currentWeekEnd.setDate(today.getDate() + (6 - currentDay)); // Set to Saturday of current week

    return commits.filter((commit) => {
      const commitDate = new Date(commit.commit.author.date);
      return commitDate >= currentWeekStart && commitDate <= currentWeekEnd;
    });
  };

  const countCommitsByDay = (commits) => {
    const newCommitsByDay = [0, 0, 0, 0, 0, 0, 0];
    commits.forEach((commit) => {
      const commitDate = new Date(commit.commit.author.date);
      const dayOfWeek = commitDate.getDay();
      newCommitsByDay[dayOfWeek]++;
    });
    return newCommitsByDay;
  };

  const renderChart = (ctx, data) => {
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Completed Challenges",
            data: data,
            backgroundColor: "#6C75DA",
            borderColor: "#6C75DA",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Increment by 1
              precision: 0,
            },
          },
        },
      },
    });
  };

  return (
    console.log(commitsByDay),
    (
      <div className="container commit-stats-container unique-layout">
        <div className="commit-stats-content">
          <canvas id="commitChart" className="commit-chart"></canvas>{" "}
          {/* Canvas element for Chart.js */}
          <div className="paragraph-container">
            <p style={{ fontStyle: "italic" }}>
              * Weekly data is based on the current week's commits and resets
              with the start of each new week (Sunday).
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default CodeChart;
