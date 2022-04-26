const { exec } = require('child_process');

const existingFileWarning = `IMPORTANT: any files listed above with "exists" next to them were not copied
into your /fauna folder because they already exist. You will need to rename your
existing files manually and re-run this command in order to make sure things
will work properly.\n`;

/**
 * Copy .js files from faunauth/dist/fauna and faunauth/.fauna-migrate.js into the consuming application directory.
 */
const init = () => {
    exec(
        "rsync -r -vv --exclude '*.d.ts' --exclude '*.js.map' --ignore-existing node_modules/faunauth/dist/fauna/ ./fauna/",
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log('Copying functions and roles...\n');

            console.log(stdout);

            console.log(existingFileWarning);

            console.log('✅ Copied faunauth functions and roles into /fauna\n');
        },
    );

    exec(
        'rsync -r -vv --ignore-existing node_modules/faunauth/src/fauna/resources/faunauth/collections ./fauna/resources/faunauth',
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log('Copying collections...\n');

            console.log(stdout);

            console.log(existingFileWarning);

            console.log(
                '✅ Copied faunauth collections into /fauna/collections\n',
            );
        },
    );

    exec(
        'cp node_modules/faunauth/.fauna-migrate.js .fauna-migrate.js',
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log(stdout);

            console.log('✅ Created .fauna-migrate.js config file\n');
        },
    );
};

module.exports = { init };
