"use client";

import Loading from "@/src/components/Loading";
import { Button } from "@/src/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Header from "@/src/components/Header";
import Toolbar from "@/src/components/Toolbar";
import TeacherCourseCard from "@/src/components/TeacherCourseCard";
import { useCreateCourseMutation, useDeleteCourseMutation, useGetCoursesQuery } from "@/src/state/api";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
    const router = useRouter();
    const { user } = useUser();
    const {
        data: courses,
        isLoading,
        isError,
    } = useGetCoursesQuery({ category: "all" });
    const modalRef = React.useRef<HTMLDivElement>(null);

    const [createCourse] = useCreateCourseMutation();
    const [deleteCourse] = useDeleteCourseMutation();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

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

    const handleDeleteConfirm = async () => {
        if (courseToDelete) {
            await deleteCourse(courseToDelete.courseId).unwrap();
            setIsModalOpen(false);
            setCourseToDelete(null);
        }
    };

    const handleDeleteClick = (course: Course) => {
        setCourseToDelete(course);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                isModalOpen &&
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                setIsModalOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen]);

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
                        onDelete={() => handleDeleteClick(course)}
                        isOwner={course.teacherId === user?.id}
                    />
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="modal-overlay"
                    >
                        <motion.div 
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="modal-content" 
                            ref={modalRef}
                        >
                            <h3>Confirm Delete</h3>
                            <p>
                                Are you sure you want to delete this course? This action cannot
                                be undone.
                            </p>
                            <div className="modal-actions">
                                <Button onClick={handleDeleteConfirm} className="btn-danger">
                                    Delete
                                </Button>
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Courses;