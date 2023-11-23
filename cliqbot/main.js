const readline = require('readline');

function gatherProjectInfo() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const getInput = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

    console.log("Hey, just let me know how I can help you today. Enter the required fields.");

    const projectTitle = await getInput("Enter the Title of the project: ");
    const projectDays = parseInt(await getInput("Enter the number of weeks: "));
    const projectDaysLeft = parseInt(await getInput("Enter total days left: "));

    console.log("Now just let me know what works you will be doing!");
    const works = parseInt(await getInput('How many types of works will you have: '));
    const myWorks = [];

    for (let i = 0; i < works; i++) {
        const work = await getInput(`Work ${i + 1}: `);
        myWorks.push(work);
    }

    console.log("\nIn the above mentioned works, estimate the percentage of time you will be spending on each.");

    const totalWorks = {};
    for (const work of myWorks) {
        while (true) {
            try {
                const percentage = parseInt(await getInput(`Enter the percentage for ${work} (%): `));
                if (0 <= percentage && percentage <= 100) {
                    totalWorks[work] = percentage;
                    break;
                } else {
                    console.log("Percentage should be between 0 and 100. Try again.");
                }
            } catch (error) {
                console.log("Invalid input. Please enter a number.");
            }
        }
    }

    rl.close();

    return { projectTitle, projectDays, projectDaysLeft, totalWorks };
}

function main() {
    const { projectTitle, projectDays, projectDaysLeft, totalWorks } = await gatherProjectInfo();

    console.log(\nProject Title: ${projectTitle});
    console.log(Duration: ${projectDays} weeks);
    console.log(Days Left: ${projectDaysLeft});
    console.log("\nEstimated time breakdown:");

    for (const [work, percentage] of Object.entries(totalWorks)) {
        console.log(${work}: ${percentage}%);
    }
}

main();