"use client";

import Loading from "@/src/components/Loading";
import { Button } from "@/src/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Header from "@/src/components/Header";
import Toolbar from "@/src/components/Toolbar";
import TeacherCourseCard from "@/src/components/TeacherCourseCard";
import { useCreateCourseMutation, useDeleteCourseMutation, useGetCoursesQuery } from "@/src/state/api";

const Courses = () => {
    const router = useRouter();
    const { user } = useUser();
    const {
        data: courses,
        isLoading,
        isError,
    } = useGetCoursesQuery({ category: "all" });

    const [createCourse] = useCreateCourseMutation();
    const [deleteCourse] = useDeleteCourseMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredCourses = useMemo(() => {
        if (!courses) return [];

        return courses.filter((course) => {
        const matchesSearch = course.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
        });
    }, [courses, searchTerm, selectedCategory]);

    const handleEdit = (course: Course) => {
        router.push(`/teacher/courses/${course.courseId}`, {
            scroll: false,
        });
    };

    const handleDelete = async (course: Course) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            await deleteCourse(course.courseId).unwrap();
        }
    };

    const handleCreateCourse = async () => {
        if (!user) return;

        const result = await createCourse({
            teacherId: user.id,
            teacherName: user.fullName || "Unknown Teacher",
        }).unwrap();
            router.push(`/teacher/courses/${result.courseId}`, {
            scroll: false,
        });
    };

    if (isLoading) return <Loading />;
    if (isError || !courses) return <div>Error loading courses.</div>;

    return (
        <div className="teacher-courses">
            <Header
                title="Courses"
                subtitle="Browse your courses"
                rightElement={
                    <Button
                        onClick={handleCreateCourse}
                        className="teacher-courses__header"
                    >
                        Create Course
                    </Button>
                }
            />
            <Toolbar
                onSearch={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                currentPage="courses"
            />
            <div className="teacher-courses__grid">
                {filteredCourses.map((course) => (
                    <TeacherCourseCard
                        key={course.courseId}
                        course={course}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        isOwner={course.teacherId === user?.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default Courses;