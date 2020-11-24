# PayPay Employee Review (Blockchain edition)

This is my version of the challenge and just to be different it stores employee reviews and feedback on the blockchain. Let's say that we noticed that our DBA employees seem like they never get bad performance reviews. For example, let's say you know you left a critical review, then you notice it's edited or magically gone from the database. Blockchain to the rescue!

This projects uses [ProvenDB](https://www.provendb.com/) to store documents on the blockchain. ProvenDB makes it possible to verify the history of review submissions and all of their edits as well as pull up earlier versions of edited reviews. I implemented a few API endpoints on the backend for some of these features but not all are accessible from the client due to time constraints.

## Tech stack
- Node.js with Express for Backend API
- Postgres for local DB
- ProvenDB driver (with MongoDB API)
- React front-end with Bootstrap CSS
- Typescript (I tried to use it as much as I had time)
- Docker

## Run


```bash

# get all services up
docker-compose up

```

NB: currently NPM is failing to build React and Typescript packages in docker-compose but they install ok locally. If that happens comment out the client (and server if you wish) in docker-compose.yml and just get Postgres up. Then go into server and client folders and run 'npm install && npm start' in each.

## Partial implementation

Login and authentication where done on the backend but I ran out of time with the client and disabled them. You log in as the admin and can CRUD employees. You can create and edit reviews. There is a list of employees to be assigned to the review but it's in the  TODO stage. The employee view is not implemented.

## Assumptions made

* All API endpoints require admin access by default. An employee is allowed to see a review when they are assigned to it and shouldn't see feedback submitted by other employees. (Auth eventually disabled anyway)
* There is only one admin, everyone else is an employee. It’s not necessary to manage employee privileges
* Admin doesn't need to be reviewed and doesn’t require feedback
* A review can have multiple feedback submissions. May need to make sure the same employee is not assigned twice
* An employee
    * can have multiple reviews
    * doesn’t need to edit their profile or password
    * doesn’t need to view reviews about themselves and can't be assigned to give feedback on their own review
    * doesn’t need to view or edit feedback entries they already submitted
* We don’t need to sort employees into categories, e.g. departments or teams
* When an employee is deleted we disable the account but don’t remove them or their reviews and feedback entries from the DB
Undone
* User doesn't need to set their own password
* Input data validation is always needed (except here)
* Pagination is not needed
* And many more...




# /** ORIGINAL CONTENTS **/ Full Stack Developer Challenge
This is an interview challenge. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
