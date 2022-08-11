# SponsorArc

 ### 💻 Installing / Getting Started: <br>
**Development:**
- Clone repo => git clone repo-url
- Go into porject directory (sponsoarc or sponsorarc-api for the backend) 
```bash 
cd sponsorarc or cd sponsorarc-api
```
- Install dependencies 
```bash
npm install
```
- Start the development server => 
```bash
npm run dev
```
- Create a YouTube Data API key through Google Cloud console and your Google account. For demo purposes, please feel free to contact me directly. I can provide a working API key if it is easier for you. This should be added in the .env file. A sample.env has been provided.
- You will also need to run the migrations and the seeds in knex to set up the database schemas and seed data. 
```bash
[npx] knex migrate:latest
[npx] knex seed:run
```

- Open http://localhost:3000 in your browser to see the app. (If using front-end repo).


## 📝 Description
Web application that lets content creators connect with sponsor brands. Brands will have the ability to showcase their products to the correct audience though creators. The app is destined for content creator and brands of any kind or industry.

From the content creator side, the can browse through deals/contracts. From the brand perspective, they will receive recommended creators that suit the services/product they are trying to showcase. There is a special consideration given that there are two types of users a brand and a creator.


## 📸 Screenshots (Presentation):
- ### **The Problem**
![Teck ](../Extra%20Assets/TheProblem.png)
- ### **Home Page**
![Teck ](../Extra%20Assets/HomePage.png)
- ### **My Deals**
![Teck ](../Extra%20Assets/MyDealsBrand.png)
- ### **Browse Creator**
![Teck ](../Extra%20Assets/BrowseCreator.png)

## Next Steps
- Adding user preferences and filtering based on industry
- Adding authentication
- Adding ability to pay a creator
- Support more content creator platforms (i.e. TikTok, Twitch, etc).

## 🛠 Tech Stack

![Teck ](../Extra%20Assets/Capstone%20Presentation.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
