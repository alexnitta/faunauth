/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});

const faunadb = require('faunadb');
const { exit } = require('process');
const { Collection, Index } = require('faunadb');

const q = faunadb.query;
const adminKey = process.env.FAUNA_ADMIN_KEY;
const userRoleName = 'user';

/**
 * Create a FaunaDB role that is scoped appropriately for a user.
 *
 * NOTE: 9/24/21: This is the current method for adding user privileges, due to issues in
 * `fauna-schema-migrate`. See more notes in: packages/stories/fauna/resources/roles/loggedin.js
 * */
const main = async () => {
    const client = new faunadb.Client({ secret: adminKey });

    const roleExists = await client.query(q.Exists(q.Role(userRoleName)));

    if (roleExists) {
        console.log(`1. Found existing role "${userRoleName}"`);
    } else {
        try {
            await client.query(
                q.CreateRole({
                    name: userRoleName,
                    membership: [
                        {
                            resource: Collection('User'),
                        },
                    ],
                    privileges: [
                        {
                            resource: Collection('Person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('authoredStories'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('includedInFiles'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('mentionedInStories'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('person_residences'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('Group'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('group_persons'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('Story'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('File'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('file_stories'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('Residence'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('Place'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('Address'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Collection('PhoneNumber'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('findPersonByUserID'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index(
                                'authoredStories_by_person_and_story',
                            ),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('authoredStories_by_story'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('createdFiles_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('file_stories_by_file'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('file_stories_by_file_and_story'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('file_stories_by_story'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('group_persons_by_group'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index(
                                'group_persons_by_group_and_person',
                            ),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('group_persons_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('includedInFiles_by_file'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index(
                                'includedInFiles_by_file_and_person',
                            ),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('includedInFiles_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('mentionedInStories_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index(
                                'mentionedInStories_by_person_and_story',
                            ),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('mentionedInStories_by_story'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('person_phoneNumbers_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('person_residences_by_person'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index(
                                'person_residences_by_person_and_residence',
                            ),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                        {
                            resource: Index('person_residences_by_residence'),
                            actions: {
                                create: true,
                                read: true,
                                delete: true,
                                write: true,
                            },
                        },
                    ],
                }),
            );

            console.log(`1. Successfully created role "${userRoleName}"`);
        } catch (err) {
            console.error(err);

            console.error(`Failed to create role "${userRoleName}", closing`);

            exit(1);
        }
    }

    exit(0);
};

main();
