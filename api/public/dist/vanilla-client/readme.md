# Instructions to Set Up and Use the Resume API

1. Install Node.js  
   Ensure you have Node.js installed on your device. You can download it from [Node.js Official Website](https://nodejs.org/).

2. Set Up the API:  
   Navigate to the `api` directory and install the required dependencies, then start the server:
   ```
   cd api
   npm install  
   npx nodemon server.js
   ```

3. Retrieve Resume JSON:  
   After starting the server, you can use the **GET** method to retrieve the resume JSON data via the following endpoint:  
   ```
   GET http://localhost:3072/resume
   ```
   ![Postman Example](postman-example.png)
4. Additional Information:  
   Once you click the **Download** icon of `edit.html`, the resume JSON will be available for retrieval. 

# Current status:
1) only fix issue related to first plain template. for engineers, it should be enough. (may fix other templates this if I still work on coding after grad lol)
2) save button will download a resume pdf that cannot be recognized by some websites/validators
3) print button just use browser functionality without any issue.
4) reload issue for refreshing page: restore to the initial instead of current progress.

# Scripts behind each button
1) Save:Save current modification to database and reload page.
2) Download: Automatically download a pdf of current modification and redirect to successful download page. No save operation.
3) Print: Use browser print functionality and reload page. Save current modification to localStorage instead of database.

#  Next steps:
Since all updates on plain draft have passed tests, I sync react app with those updates.
   