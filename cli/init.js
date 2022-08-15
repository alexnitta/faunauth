const { exec } = require('child_process');

const ignoredExistingFilesWarning = `IMPORTANT: any files listed above with "exists" next to them were not copied
into your /fauna folder because they already exist. To change this behavior, you can run "faunauth init -o" to
overwrite existing files.\n`;

/**
 * Copy .js files from faunauth/dist/fauna and faunauth/.fauna-migrate.js into the consuming application directory.
 */
const init = ({ overwrite = false }) => {
    const flag = overwrite ? '--ignore-times ' : '--ignore-existing ';

    exec(
        `rsync -r -vv --exclude '*.d.ts' --exclude '*.js.map' ${flag}node_modules/faunauth/dist/fauna/ ./fauna/`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log('Copying JS files from faunauth/dist/fauna/...\n');

            console.log(stdout);

            if (!overwrite) {
                console.log(ignoredExistingFilesWarning);
            }

            console.log('✅ Copied faunauth JS files to /fauna\n');
        },
    );

    exec(
        `rsync -r -vv --exclude '*.js' ${flag}node_modules/faunauth/src/fauna/resources/faunauth ./fauna/resources`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            console.log('Copying non-JS files...\n');

            console.log(stdout);

            if (!overwrite) {
                console.log(ignoredExistingFilesWarning);
            }

            console.log('✅ Copied faunauth non-JS files to /fauna\n');
        },
    );

    exec(
        `rsync -vv ${flag}node_modules/faunauth/.fauna-migrate.js .fauna-migrate.js`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            if (!overwrite) {
                console.log(ignoredExistingFilesWarning);
            }

            console.log('✅ Created .fauna-migrate.js config file\n');
        },
    );
};

module.exports = { init };
