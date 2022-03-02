#! /usr/bin/env node
const { program } = require("commander");
const { exec } = require("child_process");

const existingFileWarning = `IMPORTANT: any files listed above with "exists" next to them were not copied
into your /fauna folder because they already exist. You will need to rename your
existing files manually and re-run this command in order to make sure things
will work properly.\n`;

program
    .command("import")
    .description(
        "Import `faunauth` files to your project for use with fauna-schema-migrate"
    )
    .action((options) => {
        exec(
            "rsync -r -vv --ignore-existing node_modules/faunauth/fauna/ ./fauna/",
            (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }

                console.log("Copying resources...\n");

                console.log(stdout);

                console.log(existingFileWarning);

                console.log(
                    "✅ Copied faunauth resources into /fauna folder.\n"
                );
            }
        );

        exec(
            "cp node_modules/faunauth/.fauna-migrate.js .fauna-migrate.js",
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

                console.log("✅ Created .fauna-migrate.js config file\n");
            }
        );
    });

program.parse();