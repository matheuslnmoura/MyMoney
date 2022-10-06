import chalk from 'chalk';
import app from './app.js';
app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.bold.blue('Server up and running on port', process.env.PORT));
});
