const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

(async function main() {
    while (true) {
        const file = await ask('File to add: ');
        const message = await ask('Commit message: ');

        if (file && message) {
            try {
                execSync(`git add ${file}`, { stdio: 'inherit' });
                execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
                console.log('✅ Commit successful.\n');
            } catch (err) {
                console.error('❌ Error during Git operation:', err.message);
            }
        } else {
            console.log('⚠️  File and message are required.\n');
        }

        const cont = await ask('Continue? (yes/no): ');
        if (cont.trim().toLowerCase() !== 'yes') {
            rl.close();
            break;
        }
    }
})();