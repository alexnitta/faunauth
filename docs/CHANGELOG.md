# [2.0.0](https://github.com/alexnitta/faunauth/compare/v1.1.1...v2.0.0) (2022-05-12)


### Bug Fixes

* convert tests/fauna/login.test.js to .ts ([c5897be](https://github.com/alexnitta/faunauth/commit/c5897be9a53f8eb9d5683ec032c649a7ffcb5621))
* ensure that `register` is aborted if user exists ([1d46f44](https://github.com/alexnitta/faunauth/commit/1d46f44545920430ab5cebcb3a862f21fc299f3f))
* fix Abort syntax; add missing test cases ([5aacbbc](https://github.com/alexnitta/faunauth/commit/5aacbbcf8d94b5e2e9080fd1423afe1f298a011e))
* refer to all Fauna secrets as secrets rather than tokens ([3507744](https://github.com/alexnitta/faunauth/commit/350774496380164452c3aad46f3e4f4fc1d40e21))
* return Abort statements in `changePassword` to actually abort ([0dbff21](https://github.com/alexnitta/faunauth/commit/0dbff215931689564f1db99197abe2d6ac68e6d9))
* update CLI `ini` command to actually overwrite files ([31f3a70](https://github.com/alexnitta/faunauth/commit/31f3a707961b46b0bd59ca4c44945dd3b120aee1))


### BREAKING CHANGES

* previously the accessSecret was returned as the accessToken,
and the refreshSecret was returned as the refreshToken.
