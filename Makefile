install:
	npm ci

gendiff:
	node bin/gendiff.js

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npx eslint .

fix:
	npx eslint --fix .

.PHONY: test test-coverage lint fix
