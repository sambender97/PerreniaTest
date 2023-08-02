## My Short Writeup

I enjoyed putting together this assessment, what I found most challenging was working with technologies that were not familiar to me, such as graphql and Apollo Client. Next functions getStaticProps and getStaticPaths are also new for me, and I wanted to implement my code without them to start since that's what I was more comfortable with. I also haven't worked with SASS before, but at the start I decided to leave that for the end.

I also found it a little bit strange starting from an unfamiliar template, so it took me a bit to get my bearings. I spent some time researching graphql and apollo to start, and played around with getting basic CRUD functions built out. I started out by trying to just read off the database, and ran into an issue trying to import the queries from the provdied file. After some frustration I gave up and just pasted the query into my component to define it since the importing won't work. 

Then I started building out components and pages, which was fairly straightforward. I got my main contact list working, and added links to a dynamically routed contact id page with all the contact information. I got my contact info page set up and added a delete button and functionality. Then I added a new contact button and new contact page to input the information. I noticed that after deleting contacts they were still showing up in the contact list when I routed back to the main page with the list, and was able to use onComplete with the mutation to fix that.

Then I added the edit button and a form for changing contact information, and got that to route back to the list and update correctly. For some reason, when adding a new contact I wasn't able to get the same thing to work despite structuring my code the same way, so you need to refresh the main page for a new contact to appear, but after a few minutes troubleshooting that I decided to move on because time is limited. 

At this point I had the CRUD functions all built out, and started investigating getStaticProps and getStaticPaths. I learned that they're used for server side rendering, which improves client performance and also optimizes SEO because the html is all fully built out when it's sent to the client. I started trying to set it up for my dynamic contact id page like the linked next documentation, but ultimately found it confusing how to get my graphql queries to work with them and gave up on it in the interest of time.

Lastly I made some basic styling for my components, I wasn't really sure if I could integrate it into the existing styles files so I made new files since I'm more comfortable with that. I mainly wanted to space things out nicely and make it clear when I was hovering on buttons, so I got that implemented. 

I thought about deployment, I'm familair with using github pages for hosting. It looks like there isn't really a quick way to set up environment variables with pages and again for the sake of time I'm not going to learn to deploy with a new tool, so I decided to just put my files up on github for you instead.

Ultimately, it was challenging  being handed a template with unfamiliar tools/technologies and having to get things working. It was uncomfortable and a little overwhelming at first, but I broke it down into tasks that seemed more managable and started reading and googling until I got things to work, at least in basic form. I'm sure there's a ton of issues with my implementation, and I look forward to talking with you on Friday so you can rip my project to shreds and I can learn a thing or two!

## Objective

Create a basic web application using React/Next.js and GraphQL that mimics a contacts list and contact card like the ones found in your phone.

## Expectations

- Users should be able to view/scroll their contact list
- Users should be able to add new contacts
- If a user clicks on a contact, they should be routed to the specific contact’s page(i.e. /contacts/1).
- Users should be able to view said contacts details and perform edits to the information
- Users should be able to remove contacts from their list

## Evaluation Criteria

- Good use of React / Next.js
- Good use of the `getStaticProps` and `getStaticPaths` functions in Next.js
- Proper implantation of CRUD functionality
- Code readability and organization

### Installation

- Clone the repo and run `npm install` to install dependencies
- Add a file called `aws-exports.js` to the src folder and add the details provided in the email
- Run `npm run dev` to start the application
- Navigate to `http://localhost:3000/` to view the application

## Backend

The backend is using AWS AppSync and DynamoDB and has already been setup. The API provides 2 queries and 3 mutation. You can find the schema in the `schema.graphql` file found in the **graphql** folder for reference.

### Apollo Client

We are using Apollo Client to connect to our API and the `apolloConfig.tsx` has already been setup for you and will be ready to use once you add the `aws-exports.js` file provided in the email to the src folder.

### Styling

SASS is already setup for you. You can find the styles in the **styles** folder and ready for your customization.

### Deliverables

- A link to a public repo with your code so it can be cloned and tested
- A link to a live demo of your application **See Below**
- A short write up on your thought process and any challenges you faced

### Deployment (Optional)

If you choose to deploy your application, it is important that you do not commit the `aws-exports.js` file to your repo as it contains sensitive information. Instead, you should add the details as environment variables to your hosting service. You will also need to update the `apolloConfig.tsx` file to use the environment variables instead of the `aws-exports.js` file.

### Documentation

- [Next.js](https://nextjs.org/docs/getting-started)
- [Dynamic Routing](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Queries](https://www.apollographql.com/docs/react/data/queries)
- [Apollo Mutations](https://www.apollographql.com/docs/react/data/mutations/)
