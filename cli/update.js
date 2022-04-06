const { exec } = require('child_process');

/**
 * Copy .js files from faunauth/dist/fauna into the consuming application directory, overwriting any existing files.
 */
const update = () => {
    exec(
        "rsync -r -v --exclude '*.d.ts' --exclude '*.js.map' node_modules/faunauth/dist/fauna/ ./fauna/",
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log('Updating resources...\n');

            console.log(stdout);

            console.log('✅ Copied faunauth resources into /fauna folder.\n');
        },
    );
};

module.exports = { update };