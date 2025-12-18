import asyncHandler from "../middlewares/AsyncHandler.js"
import Course from "../models/course-models.js"
import AppError from "../utilis/error-utile.js"
import cloudinary from "cloudinary"
import fs from "fs/promises"

const  getAllCourses = async (req,res,next)=>{
    try {
        const course  = await Course.find({}).select('-lectures')
        res.status(200).json({
            success:true,
            message:"All Course",
            course})
    } catch (error) {
        return next(new AppError(error ||"Faild to get All course",500))
    }
}

const getLecturesByCourseId = async (req,res,next)=>{
    try {
      const { id }  = req.params;
      const course  = await Course.findById(id)
      res.status(200).json({
        success:true,
        message:"All lectures are fetched successfully",
        lectures:course.lectures
      })
    } catch (error) {
        return next(new AppError(error ||"Faild to get All course",500))
    }

}
const createCourse = async (req,res,next) =>{
    try {
        const {title, description , category, createdBy} = req.body
        
        if (!title || !description || !category || !createdBy) {
            return next(new AppError("Please fill all the fields",400))
        }
         const course = await Course.create({
            title ,
            description,
            category,
            createdBy,
            thumbnail:{
                public_id: "course-thumbnail",
                secure_url: "Dummy"
            }
        })
        if(course){
            return next(new AppError("Course could not be created, Please try again  ",500))
        }
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms",
            })
            if(result){
                course.thumbnail.public_id = result.public_id
                course.thumbnail.secure_url = result.secure_url
            }
            fs.rm(`uploads/${req.file.filename}`)
        }
        await course.save()
        res.status(200).json({
            success:true,
            message:"Course created successfully",
            course
        })
    } catch (error) {
        return next(new AppError(error ||"Faild to create course",500))
        
    }
}
const updateCourse = async (req,res,next) =>{
    try {
        const {id} = req.params
        const course = await Course.findByIdAndUpadate(
            id,
            {
              $set:req.body
            },
            {
                runValidators:true
            }
        )
        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        })

        // if(req.file){
        //     const result = await cloudinary.v2.uploader.upload(req.file.path,{
        //         folder:"lms",
        //     })
        //     if(result){
        //         course.thumbnail.public_id = result.public_id
        //         course.thumbnail.secure_url = result.secure_url

        //     }
                
        // }

    }
    catch (error) {
        return next(new AppError(error ||"Faild to update course",500))
    }
}
const removeCourse = async (req,res,next) =>{
    try {
        const {id} = req.params
        const course = await Course.findById(id)
        if (!course) {
            return next(new AppError("Course with given id not found", 500));
        }

        await Course.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            
        })
    }
    catch (error) {
        return next(new AppError(error ||"Faild to delete course",500))
    }
}
const addLectureToCourseById = async (req,res,next) =>{
    try {
        const {title, description} = req.body
        const {id} = req.params

        const course = await Course.findById(id)

        if (!title || !description ) {
            return next(new AppError("Please fill all the fields",400))
        }

        if (!course) {
            return next(new AppError("Course with given id not found", 500));
        }
        const lectureData = {
             title,
             description,
             lecture:{}
        }
        if(req.file){
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                  folder: 'lms', // Save files in a folder named lms
                });
          
                // If success
                if (result) {
                  // Set the public_id and secure_url in array
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }
          
                // After successful upload remove the file from local storage
                fs.rm(`uploads/${req.file.filename}`);
              } catch (error) {
          
                // Send the error message
                return next(
                  new AppError(error || 'File not uploaded, please try again',
                    500
                  )
                );
              }
        }
        course.lectures.push(lectureData)
        course.numberOfLectures = course.lectures.length
        await course.save()
        res.status(201).json({
            status: 'success',
            message:'Lectures UpDated Successfully',
            course
        })

    } catch (error) {
        return next(
            new AppError(error ,
              500
            )
          );
    }
}
const removeLectureFromCourseById = asyncHandler(async (req, res, next) => {
    // Grabbing the courseId and lectureId from req.query
    const { courseId, lectureId } = req.query;
  
    console.log(courseId);
  
    // Checking if both courseId and lectureId are present
    if (!courseId) {
      return next(new AppError('Course ID is required', 400));
    }
  
    if (!lectureId) {
      return next(new AppError('Lecture ID is required', 400));
    }
  
    // Find the course uding the courseId
    const course = await Course.findById(courseId);
  
    // If no course send custom message
    if (!course) {
      return next(new AppError('Invalid ID or Course does not exist.', 404));
    }
  
    // Find the index of the lecture using the lectureId
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );
  
    // If returned index is -1 then send error as mentioned below
    if (lectureIndex === -1) {
      return next(new AppError('Lecture does not exist.', 404));
    }
  
    // Delete the lecture from cloudinary
    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: 'video',
      }
    );
  
    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);
  
    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;
  
    // Save the course object
    await course.save();
  
    // Return response
    res.status(200).json({
      success: true,
      message: 'Course lecture removed successfully',
    });
  });

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    removeLectureFromCourseById
}