import Gantt from 'frappe-gantt'

export const ganttManager = (function () {

    function displayGantt(projectsArray, projectName) {
        // Create the tasks array used by Gantt.
        let tasks = [];

        // Use projectsArray for the current project to build the tasks array used by the gantt chart.
        projectsArray.Tasks.forEach(task => {
            tasks.push ({id: task.Task_ID, name: task.Task_Name, start: task.Start_Date, end: task.Due_Date, progress: task.Progress, dependencies: task.Dependencies, custom_class: ""});
        })

        // Set the overdue class if the task end date is less than today and it's not fully complete.
        var todaysDate = new Date().setHours(0,0,0,0);
        var endDate = new Date().setHours(0,0,0,0);
        var tasksIndex = 0;

        tasks.forEach(task => {
            endDate = new Date(task.end).setHours(0,0,0,0);
            if (endDate < todaysDate && task.progress != 100) {
                tasks[tasksIndex]['custom_class'] = 'overdue';
            } else {
                tasks[tasksIndex]['custom_class'] = '';
            }
            tasksIndex ++;
        });

        // Format date as yyyy-mm-dd
        const getYYYYMMDD = date => date.toISOString().split("T")[0];
        
        // Calculate days difference between 2 dates
        function dateDiff(oldDate, newDate) {
            const date1 = new Date(oldDate);
            const date2 = new Date(newDate);
            const diffTime = date2 - date1;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
            return diffDays;
        }

        // Add specified days to a date
        function addDaysToDate(dateToAddTo, noOfDays){
            var next_date = new Date(dateToAddTo);
            if (noOfDays > 0) {
                next_date.setDate(next_date.getDate() + noOfDays);
            } else {
                next_date.setDate(next_date.getDate() - noOfDays);
            }
            var incrementedDate = next_date.toISOString().slice(0, 10);
            return incrementedDate;
        }
        
        let ganttChart = new Gantt("#gantt", tasks, { 
            view_mode: 'Week', 
            scroll_to: "start",
            
            // Set the current view mode title and add the current project name on a new line.
            on_view_change: function(mode) {
                document.getElementById("current-timescale").innerText = mode.name + "\n" + "Project: " + projectName;
            },
            
            // Get the new task start and end dates if they've changed
            on_date_change: function(task, start, end) {
                task.start = getYYYYMMDD(start);
                task.end = getYYYYMMDD(end);

                // Have to manually calculate new end date as task.end is returning the original value.
                let startEndDiff = dateDiff(projectsArray.Tasks[task.id - 1].Start_Date, task.start);
                let newTaskEnd = addDaysToDate(task.end, startEndDiff);
                task.end = newTaskEnd;

                // Update the overdue class
                // endDate = new Date(task.end).setHours(0,0,0,0);
                // console.log(tasks, task);
                // if (endDate < todaysDate && task.progress != 100) {
                //     tasks[task.id - 1].custom_class = 'overdue';
                // } else {
                //     tasks[task.id - 1].custom_class = '';
                // }

                // Update the task start and end dates in projectsArray.
                projectsArray.Tasks[task.id - 1].Start_Date = task.start;
                projectsArray.Tasks[task.id - 1].Due_Date = task.end;
            },

            // Get the new task progress percentage if it's changed
            on_progress_change: function(task) {
                // Update the progress in projectsArray.
                projectsArray.Tasks[task.id - 1].Progress = task.progress;
                // Update the completed date if progress is 100%
                if (task.progress === 100) {
                    projectsArray.Tasks[task.id - 1].Completed_Date = getYYYYMMDD(new Date());
                } else {
                    projectsArray.Tasks[task.id - 1].Completed_Date = "";
                    }

            },

            // Change popup text when clicking a task.
            popup: function(task) {
                endDate = new Date(task.task.end).setHours(0,0,0,0);
                const diffTime = Math.abs(todaysDate - endDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
                if (endDate < todaysDate && task.progress != 100) {
                    var taskStatus = ', ' + diffDays + ' day(s) overdue.';
                } else {
                    taskStatus = '';
                }
                return `
                <div class="details-container">
                    <h5>${task.task.name}</h5>
                    <p>Task start on: ${task.task.start}</p>
                    <p>Expected to finish by ${task.task.end}</p>
                    <p>${task.task.progress}% completed ${taskStatus}</p>
                </div>
                `;
            }
        });

        document.querySelector(".chart-controls #day-btn").addEventListener("click", () => {
            ganttChart.change_view_mode("Day");
        })
        document.querySelector(".chart-controls #week-btn").addEventListener("click", () => {
            ganttChart.change_view_mode("Week");
        })
        document.querySelector(".chart-controls #month-btn").addEventListener("click", () => {
            ganttChart.change_view_mode("Month");
        })

    }

    return {displayGantt}
})();