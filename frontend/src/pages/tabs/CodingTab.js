import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Tabs,
  Tab,
  Chip,
  LinearProgress
} from '@mui/material';
import { Code, EmojiEvents, TrendingUp } from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './CodingTab.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coding-tabpanel-${index}`}
      aria-labelledby={`coding-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CodingTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const challenges = [
    {
      title: 'Array Manipulation',
      difficulty: 'Medium',
      points: 50,
      link: 'https://www.w3resource.com/data-structures-and-algorithms/array/array-data-structure-coding-problems.php'
    },
    {
      title: 'Binary Search',
      difficulty: 'Easy',
      points: 30,
      link: 'https://www.geeksforgeeks.org/binary-search/'
    },
    {
      title: 'Dynamic Programming',
      difficulty: 'Hard',
      points: 100,
      link: 'https://www.interviewbit.com/courses/programming/dynamic-programming/'
    },
    {
      title: 'Graph Algorithms',
      difficulty: 'Hard',
      points: 80,
      link: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/'
    },
    {
      title: 'Sorting Techniques',
      difficulty: 'Medium',
      points: 60,
      link: 'https://www.geeksforgeeks.org/sorting-algorithms/'
    },
    {
      title: 'Recursion Basics',
      difficulty: 'Easy',
      points: 40,
      link: 'https://www.programiz.com/javascript/recursion'
    },
    {
      title: 'Sorting Techniques',
      difficulty: 'Medium',
      points: 60,
      link: 'https://www.geeksforgeeks.org/sorting-algorithms/'
    },
    {
      title: 'Recursion Basics',
      difficulty: 'Easy',
      points: 40,
      link: 'https://www.programiz.com/javascript/recursion'
    }


  ];

  const competitions = [
    {
      title: 'Weekly Coding Challenge',
      end: '2 days left',
      prize: '$500',
      link: 'https://leetcode.com/contest/weekly-contest-400/'
    },
    {
      title: 'Algorithm Showdown',
      end: '5 days left',
      prize: 'Job Interview',
      link: 'https://www.hackerrank.com/contests'
    },
    {
      title: 'Monthly Marathon',
      end: '10 days left',
      prize: 'Goodies',
      link: 'https://www.codechef.com/contests'
    },
    {
      title: 'Bug Bash Challenge',
      end: '3 days left',
      prize: 'Swag Kit',
      link: 'https://www.topcoder.com/challenges'
    },
    {
      title: 'AI Hackathon',
      end: '1 week left',
      prize: 'Cash + Internship',
      link: 'https://devpost.com/hackathons'
    },
    {
      title: 'Frontend Fiesta',
      end: '6 days left',
      prize: 'Premium Course Access',
      link: 'https://frontendmentor.io'
    },
    {
      title: 'Algorithm Showdown',
      end: '5 days left',
      prize: 'Job Interview',
      link: 'https://www.hackerrank.com/contests'
    },
    {
      title: 'Monthly Marathon',
      end: '10 days left',
      prize: 'Goodies',
      link: 'https://www.codechef.com/contests'
    },
  ];

  const progressData = [
    { name: 'Mon', solved: 3 },
    { name: 'Tue', solved: 4 },
    { name: 'Wed', solved: 2 },
    { name: 'Thu', solved: 5 },
    { name: 'Fri', solved: 4 },
    { name: 'Sat', solved: 3 },
    { name: 'Sun', solved: 3 }
  ];

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box className="coding-tab">
      <Typography variant="h4" className="tab-header">
        <Code fontSize="large" sx={{ mr: 1 }} />
        Coding Challenges
      </Typography>

      <Typography variant="body1" className="tab-subheader">
        Practice coding problems and compete in challenges
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          className="coding-tabs"
          variant="fullWidth"
        >
          <Tab label="Practice Problems" className="coding-tab-button" />
          <Tab label="Competitions" className="coding-tab-button" />
          <Tab label="Your Progress" className="coding-tab-button" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box className="challenges-list">
            {challenges.map((challenge, index) => (
              <Paper key={index} className="challenge-card">
                <Typography variant="h6" className="challenge-title">
                  {challenge.title}
                </Typography>
                <Box className="challenge-meta">
                  <Chip
                    label={challenge.difficulty}
                    className={`difficulty-chip ${challenge.difficulty.toLowerCase()}`}
                  />
                  <Typography variant="body2" className="challenge-points">
                    {challenge.points} points
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  className="solve-button"
                  onClick={() => handleLinkClick(challenge.link)}
                >
                  Solve Challenge
                </Button>
              </Paper>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box className="competitions-list">
            {competitions.map((competition, index) => (
              <Paper key={index} className="competition-card">
                <Box className="competition-header">
                  <Typography variant="h6" className="competition-title">
                    {competition.title}
                  </Typography>
                  <Chip
                    label={competition.prize}
                    className="prize-chip"
                    icon={<EmojiEvents />}
                  />
                </Box>
                <Typography variant="body2" className="competition-end">
                  Ends in: {competition.end}
                </Typography>
                <Button
                  variant="contained"
                  className="join-button"
                  onClick={() => handleLinkClick(competition.link)}
                >
                  Join Competition
                </Button>
              </Paper>
            ))}
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Paper className="progress-card">
            <Box className="progress-header">
              <TrendingUp className="progress-icon" />
              <Typography variant="h6">Your Coding Progress</Typography>
            </Box>

            <Box className="progress-stats">
              <Box className="stat-item">
                <Typography variant="body2">Problems Solved</Typography>
                <Typography variant="h5">24</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(24 / 100) * 100}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
              <Box className="stat-item">
                <Typography variant="body2">Total Points</Typography>
                <Typography variant="h5">850</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(850 / 1000) * 100}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
              <Box className="stat-item">
                <Typography variant="body2">Current Rank</Typography>
                <Typography variant="h5">#156</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(1000 - 156) / 1000 * 100}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Weekly Progress
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="solved" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default CodingTab;
