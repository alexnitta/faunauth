#! /usr/bin/env node
const { program } = require('commander');

const { createPublicKey } = require('./createPublicKey');
const { init } = require('./init');

const createPublicKeyDescription = `Create a Fauna key that has the "public" role. This key should
    be used by your client application for authentication requests.
    Before you run this command, make sure you have:
    1. Set the value of process.env.FAUNA_ADMIN_KEY by running:
            export FAUNA_ADMIN_KEY=<your_admin_key>
    2. Run your schema migration using fauna-schema-migrate in order to
       make sure the "public" role exists.
    For more details, see the faunauth README.md file`;

program
    .command('create-public-key')
    .description(createPublicKeyDescription)
    .option(
        '-r, --region-group <regionGroup>',
        'Fauna region group, used to set a connection domain for the database.\n' +
            'Options include "classic", "us", "eu", and "preview".\n' +
            'If you provide this option, do not provide the --domain (-d) option.',
        'us',
    )
    .option(
        '-d, --domain <domain>',
        'Fauna connection domain. If provided, this overrides any domain set by\n' +
            'providing the --region-group (-r) option.',
    )
    .option('-p, --port <port>', 'Fauna connection port.', '443')
    .option(
        '-s, --scheme <scheme>',
        'Fauna connection scheme. Options are "http" or "https".',
        'https',
    )
    .action(createPublicKey);

program
    .command('init')
    .description(
        'Import files into your project to use with fauna-schema-migrate,\n' +
            'including the /fauna folder and a .fauna-migrate.js config file.',
    )
    .option('-o, --overwrite', 'Overwrite existing files')
    .action(init);

program.parse();
