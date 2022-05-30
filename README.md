<h1 align="center">Movie Recommendation System - Ketflix</h1>
### Instructions to use app.
<h3>Use on full screen for best experience</h3>
The account used in demo:- <br>
<strong>email: kanchanbartwal@gmail.com <br>
  password:- 111</strong>
  
<br><br>
<strong>If the deployed site gives application error on running, please clone the repository and run with localhost. <br>
Also if on running on localhost, it gives minor alerts like localhost says an error occured, simply click ok and repeat what you were doing,it would definately run on the second go.(It is due to different node versions installed on different devices.)</strong>
  
### Introduction & Research Phase
After getting selection mail from Microsoft, I immediately started examining the three project choices given there. As I was new to Machine Learning, I started the basics of ML from youtube. Being a quick & consistent learner, I was able to catch up and started researching. As per my research, we have 3 algorithms, content-based filtering (based on the likings of a particular user), collaborative filtering (based on the mindset of similar users and their activities), and a hybrid of both of them.

#### What kind of role would a sorting algorithm play in a Recommendation Engine?
Sorting Algorithm like Content Based Filtering, Collaborative Filtering and hybrid sort all movies in such a way that the movies which are similar to a particular movie gets filtered on either edge of the list deping on the algorithm applied, making it easy to recommend and increase the time consumed by user on the website.

#### What is the most efficient sorting algorithm to use in this scenario, and why?
Hybrid of content based and collaborative filtering is the most efficient way to deal with this problem as Content based and Collaborative has various loopholes and deficiencies when they stand alone. Hybrid covers up the loopholes and makes itself the best practice of the scenerio.

### Why I chose this challenge?
I am a student of Btech CSE 2nd year and being a college student, the second most popular topic is 'Movies' (as studies, DSA, and placements are the first ones.) Movies act as a stress buster when you have a long week full of hustle and sweat. All the friends keep on asking each other about movies in a particular genre, particular actors, and directors. Hence, I found that the movie recommendation system is quite applicable in the current life scenario. 

Also, I was curious that what is so special about recommendation system that, back in 2009 Netflix was ready to reward a peron with $1 million prize money to improve the company's recommendation engine by 10 percent.

### Initial Challenges (Mostly dataset)
When I was confident to start the project, I started searching for relevant dataset. I was willing to implement hybrid filtering which is a very new concept in market and is difficult to apply on high scale such as Youtube and Netflix. Believe me or not, it was a tough task to search for a dataset that could be best fit for both content based filtering & collaborative filtering. I wasn't willing to waste time so I picked two different data set and worked on both of them seperately. 

Later on discussing the same with my mentor, he told me that it is a very common and one of the major problems and is called COLD START.

### Initialization
I decided starting with content based filtering. I firstly filtered the essential features from data and dropped the less important ones. Then I manipulated the data set as per my requirements to form suitable tags for a movie. Moving on I managed to find the similarity matrics for the movie and then using some sort of vectorization to find the nearby vector movies to build the content based filtering. 

Then I applied similar methadology to implement Collaborative as well.

### Experiments & Results
When I was done with the backend of the content based filtering, I used Streamlit for frontend. As it was not giving me proper flexibility to set up desired UI, I dropped it and went on straight for HTML & CSS.

Also collaboartive filtering gave me a major headache, but it was worth it.

### Final Challenges
For me, integrating the frontend and backend had my nights holding my head. I felt low at times but eventually I didn't give up. Debugging the errors for 5-6 hours straight for some days got me the better results.

### My takeaways from this program
() Working with a scheduled plan = Planning <br>
() Interaction with my mentor and fellow mentees = Socializing <br>
() Learning in warkshops & AMA sessions = Active Listening & Participation <br>
() Working in limited time frame = Efficiency <br>
() A good hand in ML & Python = Learning <br>
() A look into work culture in my field = Experience & Exposure

To be honest, my key take away from this program was LEARNING new technology and stuff which I might have never touched. But as per the requirements of the program, I explored and experimented in it to justify my FLEXIBILITY.

It was a beautiful time frame and I had a lot of fun in this Engage Program by Microsoft. Looking forward to enjoy more opportunities from Microsoft, as working with them feels a happy sport. For me, this was worth the time and an overall sucess!

<a href="https://youtu.be/7qiU-Ouee6A">Click here for watching the youtube video of the same</a>
