# Habit Tracker / Goal Tracker
Keeping Track of your Habits and Goals easily, quickly and see how you are progressing.
Tracking Regular Habits/Goals
![Habit_tracker_front-end](habit_tracker1.png)

Tracking Challenge Habits/Goals
![challenge_habits_tracker](challenge_habit.png)
I am really into habit trackers and I am currently using various tools to track different parts of my life.

- Momentium iphone app - which is common habit tracking technique called "a don't break the streak"

- Goal Tracker - I use Evernote to track my monthly goals and yearly goals. 

I want a easy way to coorlate my tracking into one simple to use interface. Also the advantage of building my own tool I can add features or change it to whatever I like.

## Setup
This application comes in two parts and both can be deployed independently of each other. Altough, its probably best to deploy both on the same server. The technology stack is as follows:
* Front-end
    * React
    * Bootstrap v4
    * Font-awesome for icons

* Back-end
    * NodeJS 
        * Loopback 
    * DB
        * Mongodb 

### Deployment
As stated earlier this project is divided into two, front-end and back-end and because of that both will need to be started if you want to work on the development.

#### Local Deployment/Deployment

Starting the back-end
1. Once the repo is cloned run `cd Personal-Habit-Tracker`
2. Install the dependencies via running: `npm install`
3. Start the backend via running: `npm start`

Starting the Front-end
1. `cd Personal-Habit-Tracker`
2. `cd front-end`
3. Install the dependencies via running: `npm install`
4. Start the backend via running: `npm start`


## User Stores and Other Information
#### User Stories

- [X] As a user I want to be able to add habits

- [X] As a user I want to be able to remove habits

- [X] As a user I want to be able to edit a habit

- [X] As a user I want to be able to see all the habits I am tracking in a single ui

- [X] As a user I want to be able to make a habit or goal as successful

- [ ] As a user I want to be able to see my progress on habits overtime


### Habit Specific
- [X] As a user I want to track my monthly habits. e.g I want to go to the Gym at least 10 times this month

- [X] As a user I want to take X day challenges e.g. 30 Day Coding Challenge.

- [ ] As a user I want to be able to add specific steps for completing a goal
