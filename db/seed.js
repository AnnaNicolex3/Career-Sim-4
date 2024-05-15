const databaseClient = require('./client')
const {faker} = require('@faker-js/faker')
client.connect()


const createTables = async () => {
    const SQL = `
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS reviews
    DROP TABLE IF EXISTS reviewers
   
   CREATE TABLE reviewer(
   id UUID PRIMARY KEY DEFAULT gen_random_uuid()
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL
    );
  
    CREATE TABLE products(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        imgUrl varchar(255) 
    );

    CREATE TABLE product_reviews(
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES reviewers(id) NOT NULL,
        product_id UUID REFERENCES products(id) NOT NULL,
        review TEXT NOT NULL, 
        UNIQUE (reviewer_id, product_id)
    );
  `
    client.query(SQL)
}
const createProduct = (product) => {
    const SQL = `
    INSERT INTO product(name, description, imgUrl)
        VALUES($1,$2, $3)
        RETURNING *;

    `
    client.query(SQL,[product.name,product.description,product.imgUrl])
}
const createReview = (reviewers_id,product_id) => {
    const SQL = `
    INSERT INTO product_review(reviewer_id, product_id, review)
    VALUES($1,$2, $3)
    RETURNING *;
    
    `
    client.query(SQL,[reviewers_id, product_id])
}
const createReviewer = (reviewers) => {
    const SQL = `
    
    INSERT INTO reviewer(firstName, lastName, email, password)
        VALUES($1,$2, $3, $4)
        RETURNING *;
    `
    client.query(SQL, [reviewers.firstName, reviewers.lastName, reviewers.email, reviewers.password])
}
const createData =async()=>{
    createTables()
    for(let i=0; i<10; i++){
        const product = await createProduct({
            name:faker.commerce.productName(), 
            description: faker.commerce.productDescription(),
            imgUrl:faker.image.urlLoremFlickr({ category: faker.commerce.department(), height:300, width:300 })
        })
        const reviewer = await createReviewer({
            firstName:faker.person.firstName(), 
            lastName: faker.person.lastName(), 
            email:faker.internet.email(), 
            password:"password"
        })
        product.push(product)
        reviewer.push(reviewer)
       }
      
       const reviewedProducts = []
       for(let i=0; i<reviewers.length;i++){
            const dummyReviews = ["I loved it!", "I liked it!", "Best product ever", "Meh", "I've had better", "I disliked it", "I hated it", "worst product ever!", "It was alright, could be better", "10/10 don't recommend" ]
            const productIndex =  Math.floor(Math.random()*products.length)
            const productsToReview=products.slice(productIndex, productIndex+3)
            await Promise.all(productsToReview.map(product=>createProduct_review(reviewers[i].id, product.id, dummyReviews[Math.floor(Math.random()*dummyReviews.length)])))

    }
}
module.exports = {createData, createProduct, createReviewer, createProduct_review,reviewed}