var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});

connection.connect();


// deleting the table every time we run the application so we can write it again
const deleteDatabase = `DROP DATABASE IF EXISTS publishing`;
connection.query(deleteDatabase, (error) => {
    if(error){
        console.log(`You have a problem deleting publishing the authors table and the error is: ${error}`)
    } else {
    console.log("The database publishing has been deleted");
    }


// Creating the database publishing
const createDatabase = `CREATE DATABASE IF NOT EXISTS publishing`;
connection.query(createDatabase, (error) => {
    if(error){
        console.log(`You have a problem creating publishing the authors table and the error is: ${error}`)
    } else {
    console.log("The database publishing has been created")
        }
    
    // Select the database publishing 
    connection.query(`USE publishing`);

    // creating table authors 
    const createAuthors = `
    CREATE TABLE IF NOT EXISTS authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR (100),
        university VARCHAR (100),
        date_of_birth DATE,
        h_index INT,
        gender ENUM('Male', 'Female')
    )`;
    
        connection.query(createAuthors, (error) => {
            if(error) {
                console.log(`You have a problem creating authors table and the error is: ${error}`)
            } else {
                console.log("The table authors has been created")
            }

    
    // Creating research_paper table
    const createResearchPaper = `
    CREATE TABLE research_paper (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255),
        conference VARCHAR(255),
        publish_date DATE
    )`;

    connection.query(createResearchPaper, (error) => {
        if(error) {
            console.log(`You have a problem creating research_paper table and the error is: ${error}`);
        }else{
            console.log("research_paper table has been created");
        }
    
    // Create author_research table
    const createAuthorPaper = `
    CREATE TABLE author_paper (
        author_paper_id INT AUTO_INCREMENT PRIMARY KEY,
        author_id INT,
        paper_id INT,
        mentor_id INT,
        CONSTRAINT author_fk FOREIGN KEY (author_id) REFERENCES authors(author_id),
        CONSTRAINT paper_fk FOREIGN KEY (paper_id) REFERENCES research_paper(paper_id),
        CONSTRAINT mentor_fk FOREIGN KEY (mentor_id) REFERENCES authors(author_id)
    )`;
    connection.query(createAuthorPaper,(error) => {
        if(error) {
            console.log(`You have a problem creating author_paper table and the error is: ${error}`);
        }else{
            console.log("author_paper table has been created");
        }
    

    // Adding data to authors table
    const insertAuthorsData = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender)
    VALUES
        ('John Doe', 'KLM University', '1985-03-15', 10, 'Male'),
        ('Jane Smith', 'XYZ University', '1990-07-20', 15, 'Female'),
        ('Michael Johnson', 'KLM University', '1988-11-30', 8, 'Male'),
        ('Emily Williams', 'GHI University', '1992-06-12', 12, 'Female'),
        ('David Lee', 'XYZ University', '1983-09-25', 7, 'Male'),
        ('Maria Garcia', 'KLM University', '1989-12-03', 11, 'Female'),
        ('Robert Johnson', 'GHI University', '1987-02-17', 9, 'Male'),
        ('Sophia Brown', 'STU University', '1995-04-09', 13, 'Female'),
        ('William Davis', 'XYZ University', '1991-08-11', 14, 'Male'),
        ('Olivia Martinez', 'XYZ University', '1993-01-22', 12, 'Female'),
        ('Daniel Anderson', 'GHI University', '1986-07-05', 6, 'Male'),
        ('Ava Wilson', 'NOP University', '1994-11-14', 10, 'Female'),
        ('James Taylor', 'HIJ University', '1984-02-28', 11, 'Male'),
        ('Emma Hernandez', 'KLM University', '1992-05-07', 9, 'Female'),
        ('Alexander Moore', 'NOP University', '1989-10-18', 13, 'Male');
     `;
     connection.query(insertAuthorsData,(error) => {
        if(error) {
            console.log(`You have a problem inserting author Data and the error is: ${error}`);
        }else{
            console.log("Data has been inserted to authors table");
        }


    // Insert data to the research_paper table
    const insertResearchPapersData = `
    INSERT INTO research_paper (paper_title, conference, publish_date)
    VALUES
        ('Advances in AI', 'Conference X', '2022-05-10'),
        ('Machine Learning Trends', 'Conference Y', '2021-08-22'),
        ('Data Analysis Techniques', 'Conference Z', '2023-01-15'),
        ('Natural Language Processing', 'Conference X', '2021-06-30'),
        ('IoT Innovations', 'Conference Y', '2020-09-25'),
        ('Cybersecurity Measures', 'Conference Z', '2022-12-10'),
        ('Cloud Computing Solutions', 'Conference X', '2023-02-18'),
        ('Blockchain Applications', 'Conference Y', '2022-04-05'),
        ('Quantum Computing Developments', 'Conference Z', '2020-11-14'),
        ('Robotics Advances', 'Conference X', '2021-07-22'),
        ('Medical Research Breakthroughs', 'Conference Y', '2022-10-08'),
        ('Environmental Sustainability', 'Conference Z', '2023-03-30'),
        ('Space Exploration Discoveries', 'Conference X', '2021-04-17'),
        ('Renewable Energy Innovations', 'Conference Y', '2020-12-02'),
        ('Future of Transportation', 'Conference Z', '2023-05-09'),
        ('AI Ethics and Governance', 'Conference X', '2022-08-07'),
        ('Nanotechnology Applications', 'Conference Y', '2022-06-18'),
        ('Climate Change Impacts', 'Conference Z', '2023-09-12'),
        ('Advances in Medicine', 'Conference X', '2021-03-25'),
        ('Economic Trends', 'Conference Y', '2022-11-03'),
        ('Social Media Analysis', 'Conference Z', '2023-07-28'),
        ('Urban Planning Innovations', 'Conference X', '2021-09-14'),
        ('AI in Education', 'Conference Y', '2022-12-01'),
        ('Sustainable Agriculture', 'Conference Z', '2023-04-20'),
        ('Renewable Energy Policy', 'Conference X', '2021-02-09'),
        ('Space Travel Challenges', 'Conference Y', '2022-05-22'),
        ('Ethical AI Development', 'Conference Z', '2022-10-15'),
        ('Epidemiological Modeling', 'Conference X', '2023-04-05'),
        ('Digital Privacy Concerns', 'Conference Y', '2021-12-20'),
        ('Transportation Sustainability', 'Conference Z', '2022-11-28');
        `;
        connection.query(insertResearchPapersData,(error) => {
            if(error) {
                console.log(`You have a problem inserting research_paper Data and the error is: ${error}`);
            }else{
                console.log("Data has been inserted to research_paper table");
            }

        // Insert data to author_paper table
        const insertAuthorPaperData = `
        INSERT INTO author_paper (author_id, paper_id, mentor_id)
    VALUES
    (1, 1, 7),
    (2, 1, 7),
    (3, 26, 7),
    (4, 2, 9),
    (5, 2, 9),
    (6, 3, 4),
    (7, 4, 7),
    (8, 4, 7),
    (9, 5, 7),
    (10, 5, 7),
    (11, 6, 4),
    (12, 6, 4),
    (13, 21, 2),
    (14, 7, 2),
    (1, 8, 10),
    (2, 26, 10),
    (3, 8, 10),
    (4, 9, 1),
    (5, 9, 1),
    (6, 10, 9),
    (7, 11, 7),
    (8, 19, 7),
    (9, 11, 7),
    (10, 12, 9),
    (11, 22, 9),
    (12, 13, 4),
    (13, 14, 7),
    (14, 28, 2),
    (1, 16, 7);
     `;
        connection.query(insertAuthorPaperData,(error) => {
            if(error) {
                console.log(`You have a problem inserting author_paper Data and the error is: ${error}`);
            }else{
                console.log("Data has been inserted to author_paper table");
            }


    // 3.3.1 Write a query that prints names of all authors and their corresponding mentors
    const selectAuthorMentor = `
    SELECT author_id, mentor_id FROM author_paper;
    `;
    connection.query(selectAuthorMentor, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving author-mentor data and the error is: ${error}`);
        }else{
         console.log("Retrieve author-mentor data");
         console.log(results);
    }


    //3.3.2 Write a query that prints all columns of authors and their published paper_title
    const printAuthorPaper =  `
        SELECT a.*, rp.paper_title
        FROM authors a
        LEFT JOIN author_paper ap ON a.author_id = ap.author_id
        LEFT JOIN research_paper rp ON ap.paper_id = rp.paper_id;
    `;
    connection.query(printAuthorPaper, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving author-paper data and the error is: ${error}`);
        }else{
         console.log("Retrieve author-paper data");
         console.log(results);
    }


    //3.4.1 All research papers and the number of authors that wrote that paper.
    const papersAuthorsNum = `
    SELECT rp.paper_title, COUNT(ap.author_id) AS authors_num
    FROM research_paper rp
    JOIN author_paper ap ON rp.paper_id = ap.paper_id
    GROUP BY ap.paper_id;
    `;
    connection.query(papersAuthorsNum, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving papers-authors data and the error is: ${error}`);
        }else{
         console.log("Retrieve paper-author data");
         console.log(results);
    }


    //3.4.2 Sum of the research papers published by all female authors
    const sumFemalePapers = `
    SELECT a.gender, COUNT(ap.paper_id) AS num_of_papers
    FROM authors a
    JOIN author_paper ap ON a.author_id = ap.author_id
    join research_paper rp ON ap.paper_id = rp.paper_id
    WHERE a.gender = "Female";
    `;
    connection.query(sumFemalePapers, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving female papers data and the error is: ${error}`);
        }else{
         console.log("Retrieve female papers data");
         console.log(results);
    }


    //3.4.3 Average of the h-index of all authors per university.
    const h_index_average = `
    SELECT authors.university, AVG(authors.h_index) AS h_index_average
    FROM authors
    GROUP BY authors.university;
    `;
    connection.query(h_index_average, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving h_index_average data and the error is: ${error}`);
        }else{
         console.log("Retrieve h_index_average data");
         console.log(results);
    }


    //3.4.4 Sum of the research papers of the authors per university.
    const sumUniversityPapers = `
    SELECT a.university, COUNT(ap.paper_id) AS sum_of_papers
    FROM authors a
    JOIN author_paper ap ON a.author_id = ap.author_id
    GROUP BY a.university;
    `;
    connection.query(sumUniversityPapers, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving sum of a university papers data and the error is: ${error}`);
        }else{
         console.log("Retrieve sum of a university papers data");
         console.log(results);
    }


    //3.4.5 Minimum and maximum of the h-index of all authors per university.
    const min_max_h_index = `
    SELECT a.university, MIN(a.h_index) AS min_h_index, MAX(a.h_index) AS max_h_index
    FROM authors a
    GROUP BY a.university;
    `;
    connection.query(min_max_h_index, (error, results) => {
        if(error) {
            console.log(`You have a problem retrieving min and max h_index data and the error is: ${error}`);
        }else{
         console.log("Retrieve min and max h_index data");
         console.log(results);
    }



        connection.end();
              });
             });
            });
           });
          });
         });
        });
       });
      });  
     });
    });
   });
  });
 });
});


