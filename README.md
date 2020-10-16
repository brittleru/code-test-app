## Brief

Develop a JavaScript web application that fetches a relevantly-sized list of posts from the mock [GraphQL API](https://fakerql.stephix.uk/) available at https://fakerql.stephix.uk/ and displays a histogram representing the number of posts created in each month of 2019.

## Requirements and Suggestions

The application must be built using React, how you scaffold it is up to you. <br>
We use Apollo for GraphQL API communication, but you can use a different solution if you feel it is better suited. <br>
The histogram must be constructed using D3 or VX (recommended). <br>
Use Git for version control and to commit any progress you make. <br>
Write a brief summary in your README about your process, your choices and any challenges you faced. <br>
Please do not spend more than 4 hours on development for this task, just submit your progress at the end of that time. <br>

## My Solution

I used Apollo for the GraphQL API communication at https://fakerql.stephix.uk/graphql. 

**const client = new ApolloClient({uri: `https://fakerql.stephix.uk/graphql`});**

After that I made the query of posts using `allPosts(count: number){createdAt}` so I could get the data needed in order to plot it, the number from `count: number` represents the number of posts you want to generate. Here I was stuck for a bit because I didn't know what that `createdAt` result might mean (it was a number as `1560918569883`), but after some research I learned that this result might a number so PCs can read the date, https://www.epochconverter.com/ this site for reference.<br>

After I learned about epochconverter I used `moment.js` in order to translate it to human readable date. <br>

So I got my data set for plotting and started to build a new component in order to visualisate the data. I used `d3` and the react hooks `useEffect` and `useRef`. At first I hardcoded the data for `Y axis` so I could build a better data chart. After that I used the same thinking that I used earlier for the `client.query` in order to work with all kind of data<br>

Finally I build a button that can `show` or `hide` the raw data if you would like to.

## Screenshots

![alt text](https://i.ibb.co/mDykRWk/data-Chart.png)

![alt text](https://i.ibb.co/2SqWQrw/data.png)
 
 
## Future Improvments

I would like to add an input for the user to get as many posts they want. <br>

I would like to add more data about the chart when you hover on any bar, like number of posts. <br>

And I want to make raw data more prettier when you choose to show it.

