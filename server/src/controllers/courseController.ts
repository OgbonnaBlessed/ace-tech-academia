import { Request, Response } from "express";
import Course from "../models/courseModel";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";

const s3 = new AWS.S3();

export const listCourses = async (
    req: Request,
    res: Response
) : Promise<void> => {

    const { category } = req.query;

    try {
        const courses =
            category && category !== "all" 
            ? await Course.scan("category").eq(category).exec()
            : await Course.scan().exec();
            
        res.json({ message: "Courses retrieved successfully", data: courses });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving courses", error });
    }
}

export const getCourse = async (
    req: Request,
    res: Response
) : Promise<void> => {

    const { courseId } = req.params;

    try {
        const course = await Course.get(courseId);

        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }

        res.json({ message: "Course retrieved successfully", data: course });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving course", error });
    }
}

export const createCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { teacherId, teacherName } = req.body;

        if (!teacherId || !teacherName) {
            res.status(400).json({ message: "Teacher name and Id are required" });
            return;
        }

        const newCourse = new Course({
            courseId: uuidv4(),
            teacherId,
            teacherName,
            title: "Untitled Course",
            description: "",
            category: "uncategorized",
            image: "",
            price: 0,
            level: "Beginner",
            status: "Draft",
            sections: [],
            enrollments: [],
        })
        await newCourse.save();
        // console.log()

        res.json({ message: "Course created successfully", data: newCourse  })
    } catch (error) {
        res.status(500).json({ message: "Error creating course", error });
    }
}

export const updateCourse = async (
    req: Request,
    res: Response
) : Promise<void> => {
    const { courseId } = req.params;
    const updateData = { ...req.body };
    console.log(updateData);
    const { userId } = getAuth(req);

    try {
        const course = await Course.get(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }

        if (course.teacherId !== userId) {
            res.status(403).json({ message: "Not authorized to update this course" });
            return;
        }

        // Handle image upload to S3
        if (req.file) {
            const uniqueId = uuidv4();
            const fileName = req.file.originalname;
            const s3Key = `images/${uniqueId}/${fileName}`;

            const s3Params = {
                Bucket: process.env.S3_BUCKET_NAME || "",
                Key: s3Key,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            await s3.upload(s3Params).promise();

            updateData.image = `${process.env.CLOUDFRONT_DOMAIN}/images/${uniqueId}/${fileName}`;
        }

        if (updateData.price) {
            const price = parseInt(updateData.price);
            if (isNaN(price)) {
                res.status(400).json({
                    message: "Invalid price format",
                    error: "Price must be a valid nnumber",
                });
                return;
            }
            updateData.price = price * 100;
        }

        if (updateData.sections) {
            const sectionsData = 
                typeof updateData.sections === "string" 
                    ? JSON.parse(updateData.sections)
                    : updateData.sections;
            
            updateData.sections = sectionsData.map((section: any) => ({
                ...section,
                sectionId: section.sectionId || uuidv4(),
                chapters: section.chapters.map((chapter: any) => ({
                    ...chapter,
                    chapterId: chapter.chapterId || uuidv4(),
                })),
            }));
        }

        Object.assign(course, updateData);
        await course.save();

        res.json({ message: "Course updated successfully", data: course });
    } catch (error) {
        res.status(500).json({ message: "Error updating course", error });
        console.log(error)
    }
}

export const deleteCourse = async (
    req: Request,
    res: Response
) : Promise<void> => {
    const { courseId } = req.params;
    const { userId } = getAuth(req);

    try {
        const course = await Course.get(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }

        if (course.teacherId !== userId) {
            res.status(403).json({ message: "Not authorized to delete this course" });
            return;
        }
        await Course.delete(courseId);

        res.json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting course", error });
    }
}

export const getUploadVideoUrl = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { fileName, fileType } = req.body;
  
    if (!fileName || !fileType) {
      res.status(400).json({ message: "File name and type are required" });
      return;
    }
  
    try {
        const uniqueId = uuidv4();
        const s3Key = `videos/${uniqueId}/${fileName}`;
    
        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME || "",
            Key: s3Key,
            Expires: 60,
            ContentType: fileType,
        };
    
        const uploadUrl = s3.getSignedUrl("putObject", s3Params);
        const videoUrl = `${process.env.CLOUDFRONT_DOMAIN}/videos/${uniqueId}/${fileName}`;
    
        res.json({
            message: "Upload URL generated successfully",
            data: { uploadUrl, videoUrl },
        });
    } catch (error) {
        res.status(500).json({ message: "Error generating upload URL", error });
    }
};