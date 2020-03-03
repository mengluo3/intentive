# Intentive
A browser extension for attention management. 
Just like how people track what they eat, what effect that has on their bodies, their mood, etc — could we track the activities that people do when they get distracted, and help them become more cognizant of the source of their distractions, and maybe cultivate strategies to combat that distraction?
"A major source of error, especially memory-lapse errors, is interruption. When an activity is interrupted by some other event, the cost of the interruption is far greater than the loss of the time required to deal with the interruption: it is also the cost of resuming the interrupted activity. To resume, it is necessary to remember precisely the previous state of the activity: what the goal was, where one was in the action cycle, and the relevant state of the system. Most systems make it difficult to resume after an interruption." -- Design of Everyday Things, Don Norman.

## How to use
1. Download zip file
2. Open up Google Chrome
3. Go to chrome://extensions
4. Put chrome in developer mode
5. Click "load unpacked"
6. Select the downloaded zip file.
7. Open a new window, you should be prompted to enter your goal. Enter your goal.
8. Open a new site. Your sticky note should appear in the bottom right corner.


## How to read this repo
1. manifest.json would be a good place to start to understand the structure of the extension.
2. content.js is the content script that loads on every page. 
3. newWindow.js is the background script that loads once. 
