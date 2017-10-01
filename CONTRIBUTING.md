# How to contribute
Vue Tag Picker was created for the public. It was made open source to give developers something to learn from and so I can learn from you. If you have found a bug that you would like to fix, or a feature that you think other users would like, then fork the repo and create a pull request. PRs are very welcome. 

## Getting started
- Make sure you have a [GitHub account](https://github.com/signup/free)
- Submit a ticket for your issue, assuming one does not already exist.
    - Clearly describe the issue including steps to reproduce when it is a bug.  
    - Make sure you fill in the earliest version that you know has the issue.
- Fork the repository on GitHub.

## Making Changes
- Clone your forked repository
- Create a branch from master i.e `features/improve-mobile-touch-support` or `bugs/some-bug`
- Write your tests (where applicable). I'm aiming for 90% coverage at all times. 
- Make your changes / fixes in your branch.
- If you are adding new functionality, checkout the docs branch and submit information about your shiny new feature. Or if you've fixed a bug and the documentation needs to be updated, you can crack on with that, too. :smiley:
- Commit your changes with a meaningful commit message.
- Create a pull request
    - If the Travis-CI build fails on your PR there will be small red cross. Take a look to see if you can fix it.
        -  If the build is failing, then go back to your branch and commit the fix.
-  Sit back and wait for it to be accepted and give yourself a pat on the back for being part of the Open-Source community :heart:

## Running the Tests
There are 2 scripts you can run. 
- `npm run unit` or `yarn run unit` - This will run all the tests once.
- `npm run unit:watch` or `yarn run unit:watch` - This will continuously run tests, best for a TDD approach (preferred).

### Notes
 - Don't be shy to criticise the code, too. I'll take all the advice I can get. 
 - Don't be afraid of asking questions, I'll answer them as fully as I know how. 
 - There is no judgement here :revolving_hearts:
