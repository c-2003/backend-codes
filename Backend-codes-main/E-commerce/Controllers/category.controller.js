// const category_model = require("../Models/category.model")

// // category controls here

// exports.createNewCategory = async(res, req) =>{
//     // read the body

//     //create category
//     const cat_data = {
//         name:req.body.name,
//         description:req.body.description
//     }
//     try {
//         //insert into mongoose
//         const category = await category_model.create(cat_data)
//         return res.status(201).send(category)
        
//     } catch (error) {
//         console.log("error in createing category",error)
//         return res.status(500).send({
//             message:"error in creating category"
//         })
//     }

//     //retrun the response

// }

const categoryModel = require("../Models/category.model"); // Corrected filename

// category controls here

exports.createNewCategory = async (req, res) => {
    try {
        // Read the body
        const { name, description } = req.body; // Destructuring for cleaner access

        // Create category data
        const catData = {
            name,
            description,
        };


        // Create category using Mongoose
        const category = await categoryModel.create(catData);

        // Return success response
        return res.status(201).send(category);

    } catch (error) {
        console.error("Error creating category:", error); // Log specific error details
        let errorMessage = "Error creating category"; // Generic message for client

        // Handle specific errors (optional)
        if (error.code && error.code === 11000) { // Assuming duplicate key error code
            errorMessage = "Category name already exists";
        }

        // Return error response
        return res.status(500).send({ message: errorMessage });
    }
};
