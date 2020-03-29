# Contributing

***
- [Required Software](#required-software)
- [Setup](#setup)
- [Usage](#usage)
	- [Running the Project](#running-the-project)
	- [Running Tests](#running-tests)
***

## Required Software

- Node.js + npm, ideally installed via [nvm](http://nvm.sh/)
- [Docker](https://docs.docker.com/install/)
	- You may need to install the package `docker-compose` as well. It comes included in installations through the website as opposed to the package manager.
- If you're using Windows install [WSL](https://docs.microsoft.com/de-de/windows/wsl/install-win10)




## Setup

1. Clone the project onto your development machine: `git clone git@github.com:tripsit-me/tripsit.git`
1. Change directories into the project: `cd tripsit`
1. *(Optional)* Use the correct version of Node.js: `nvm use`
1. Install dependencies with: `npm install`


## Usage

### Running the Project

From the repository's root run `npm start`.

For development mode run `npm run dev`.


### Running Tests

From the repository's root run `npm t`. Alternatively run tests for a particular package by changing your present working directory to the package in question and run `npm t` or check it's npm scripts.
